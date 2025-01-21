import { error as serror } from '@sveltejs/kit';
import { fetchSiteList } from "../../api/fetchData";
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals }: any = props;
    const { deviceType, language } = locals;
    const requestHeader = props.request.headers.get('host') || '';

    try {
        const [sitemapList] = await Promise.all([
            fetchSiteList(language)
        ]);

        let getParentCategory = getParentCategories(language)
  
            const cleanPath = ('/rss')?.split("#")?.[0]?.split("?")?.[0];
            const ensuredSlashPath = cleanPath?.startsWith("/")
                ? cleanPath
                : "/" + cleanPath;

            let canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url?.replace(/\/$/, "")}${ensuredSlashPath}`;
        

        const seoSiteMapData = siteMapSeoData(language);
   

        return {
            props: {
                sitemapList: sitemapList ? sitemapList?.data?.data : [],
                seoSiteMapData:seoSiteMapData,
                language:language,
                deviceType:deviceType,
                envDetails: locals.ENV_DETAILS,
                canonicalUrl:canonicalUrl,
                siteNavigation : getParentCategory

            },
        };
    } catch (error:any) {

        if (error?.location == "/404") {
            await logErrorTodb({
                url:props?.url?.href,
                deviceType,
                requestHeader,
                language,
            });
            throw serror(404, { message: "PAGE NOT FOUND" });
        } 

 
    }
}

const siteMapSeoData = (lang:string) => {
    let rssSeo = {};
    if(lang === 'E'){
        rssSeo = {
            title: 'Explore All Sections of News | Latest News | Top News',
            description: 'India News: Navigate through the complete sitemap of Republic World. Explore all sections, including news, business, politics, entertainment, sports, and more.',
            keywords: 'Breaking news, city news, india news, international news, latest news, local news, world news, latest national news, breaking world news, trending news, current news, latest news india',
        }
    }
    else if(lang === 'H'){
        rssSeo = {
            title: 'Sitemap - Latest  India News in Hindi | Sports News | Business News | Finance News | News in Hindi',
            description: 'Sitemap find there relevant news categories in one steps. Here you can find Top Sports News, Latest Hindi News, Business News India, Finance News, Hindi News in Today and more Republic Bharat News Sitemap',
            keywords: 'XML, Sitemap, RSS, Breaking News, Today in Hindi news, Business News in Hindi, Hindi News, Top News, Latest Business News, Bollywood News Hindi, Hindi news, Sports News',
        } 
    }
    else if(lang === 'RB'){
        rssSeo = {
            title: 'Explore All Sections of Our Business News Website | Business News | Todays Business News',
            description: 'Business News: Navigate through the complete sitemap of our business news website. Explore all sections, including business news, market updates, finance, economy, and more.',
            keywords: 'business news, finance news, India news, breaking news, stock market news, share market news, Sensex, nifty, economy news, market news, nifty, financial news, Indian economy, market analysis, NIFTY, SENSEX, latest market news',
        } 
    }
    else{
        rssSeo = {
            title: 'Explore All Sections of News | Latest News | Top News',
            description: 'India News: Navigate through the complete sitemap of Republic World. Explore all sections, including news, business, politics, entertainment, sports, and more.',
            keywords: 'Breaking news, city news, india news, international news, latest news, local news, world news, latest national news, breaking world news, trending news, current news, latest news india',
        }
    }


    return rssSeo;
}