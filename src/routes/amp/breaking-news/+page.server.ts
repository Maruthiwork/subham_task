import { fetchBreakingNewsStories, fetchTrendingStories } from '../../api/fetchData';
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals, request }: any = props;
    const requestHeader = props?.request?.headers.get('host') || '';

    const { deviceType, language } = locals;

    let url = request.url;

    const isAmp = true;

    let getParentCategory = getParentCategories(language)
    // Replace .news and .html from URL
    url = url.replace(/\.news/g, '').replace(/\.html/g, '');
    const urlArray = url.split('/');

    const cleanPath = urlArray?.[3]?.split("#")[0]?.split("?")?.[0];
    const ensuredSlashPath = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;
    let canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url.replace(/\/$/, "")}${ensuredSlashPath}`;


    try {
        const [breakingNewsData, trending] = await Promise.all([
            fetchBreakingNewsStories(language),
            fetchTrendingStories(language)
        ]);


        return {
            props: {
                breakingNewsData: breakingNewsData,
                trending_stories: trending ? trending.data : null,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                canonicalUrl,
                isAmp,
                getParentCategory
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
        } 
   
    }
}
