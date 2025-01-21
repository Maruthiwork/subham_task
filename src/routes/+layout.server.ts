export const trailingSlash = 'ignore';
import { redirect, error as serror } from '@sveltejs/kit';
import { fetchMarketIndices, fetchMegaMenu, fetchNavigationData, fetchSEOFooter, fetchTrendingBar, fetchTrendingStories } from './api/fetchData';
import { logErrorTodb } from './api/postData';
import { checkIsAmpPage, getPageType } from '$lib/utils/common';
import { serverStore } from '$lib/stores/serverStore';

// Helper function to clean the URL by removing specific extensions
function cleanUrl(url: string): string {
    return url.replace(/\.news/g, '').replace(/\.html/g, '').split('?')[0];
}


// Helper function to fetch navigation and related data in parallel
async function fetchDataInParallel(language: string, pageType: string, urlArray: any, slug: string) {
    try {
        const [
            navBarResponse,
            megaMenuResponse,
            trendingBarResponse,
            trendingStoriesResponse,
            seoFooterResponse,
            marketDataResponse
        ] = await Promise.all([
            fetchNavigationData(language),
            fetchMegaMenu(language),
            fetchTrendingBar(language, pageType === 'CATEGORY' ? 'CATEGORY' : 'PAGE', urlArray[3] ?? '').catch(error => {
                console.log('Trending Bar Error:', error);
                return null;
            }),
            fetchTrendingStories(language).catch(error => {
                console.log('Trending Stories Error:', error);
                return null;
            }),
            fetchSEOFooter(language, pageType === 'CATEGORY' ? 'CATEGORY' : 'STORY', slug).catch(error => {
                console.log('SEO Footer Error:', error);
                return null;
            }),
            fetchMarketIndices(language).catch(error => {
                console.log('Market Bar Error:', error);
                return null;
            }),
        ]);

        return {
            navBarData: navBarResponse?.data?.data ?? [],
            megaMenuData: megaMenuResponse?.data?.data ?? [],
            trendingData: trendingBarResponse?.data?.data?.trendingbar ?? [],
            analyticsStories: trendingStoriesResponse?.data ?? null,
            seoFooterData: seoFooterResponse?.data?.data ?? null,
            marketData: marketDataResponse?.data?.["api-data"] || [],
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled at a higher level
    }
}

export async function load(props) {
    const { locals, request, params }: any = props;
    const { deviceType, language } = locals;
    let { slug } = params;
    let url = cleanUrl(request.url);
    const urlArray = url.split('/');
    const requestHeader = props.request.headers.get('host') || '';

    const fullUrl = new URL(request.url);
    const searchParams = fullUrl.searchParams.get('query') || '';
   
    const paths = fullUrl.pathname.split('/').filter(Boolean);
    const ampIndex = urlArray?.[3] === 'amp';
    const categorySlugString = ampIndex
    ? urlArray?.slice(4).join('/')
    : urlArray?.slice(3).join('/');
   
    const pageType = await getPageType(language, categorySlugString);
    const isAmp = checkIsAmpPage(paths, fullUrl.searchParams, pageType);
    // Determine whether to show the footer header and if the page is AMP
    const showFooterHeader = !(
        ['quick', "mgid", "privacy-policy-app", "policies-disclaimers-app"].includes(categorySlugString) ||
        (categorySlugString.includes("web-stories") && pageType === "Story") ||
        (categorySlugString.includes("quick/") && pageType === "Story") ||
        (categorySlugString.includes("shorts") && pageType === "Story")
    );
    
    if (categorySlugString === 'polls' && isAmp) {
        throw redirect(301, `/${categorySlugString}`);
    }

    const taboolaPage = categorySlugString === "taboola-app";

    try {
        let navBarData = [];
        let megaMenuData = {};
        let trendingData = {};
        let analyticsStories = {};
        let seoFooterData = {};
        let marketData: any = [];

        if (showFooterHeader) {
            // Fetch all required data in parallel
            const {
                navBarData: navBar,
                megaMenuData: megaMenu,
                trendingData: trending,
                analyticsStories: analytics,
                seoFooterData: seoFooter,
                marketData: market
            } = await fetchDataInParallel(language, pageType, urlArray, slug);

            serverStore.set(`navBarData-${language}`, navBar);

            navBarData = navBar;
            megaMenuData = megaMenu;
            trendingData = trending;
            analyticsStories = analytics;
            seoFooterData = seoFooter;
            marketData = market;

            // Move matching navBarData object to the first position
            const matchingIndex = navBarData.findIndex((item: any) => item.completeSlug === urlArray[3]);
            if (matchingIndex > -1) {
                const [matchingItem] = navBarData.splice(matchingIndex, 1);
                navBarData.unshift(matchingItem);
            }
            navBarData.unshift({ frontend_name: 'Home', completeSlug: '/' });
        }


        return {
            props: {
                nav_bar: navBarData,
                mega_menu: megaMenuData,
                trending: trendingData,
                analytics_stories: analyticsStories,
                device: deviceType,
                language: language,
                showFooterHeader,
                envDetails: locals.ENV_DETAILS,
                searchSlug: searchParams,
                isAmp,
                slug,
                url,
                seoFooterData,
                taboolaPage,
                marketData
            }
        };
    } catch (error: any) {

        if (error?.location == "/404") {
            await logErrorTodb({
                url: props?.url?.href,
                deviceType,
                requestHeader,
                language,
            });
            throw serror(404, { message: "PAGE NOT FOUND" });
        }

        
    }
}
