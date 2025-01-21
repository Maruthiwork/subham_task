import { error as serror } from '@sveltejs/kit';
import { fetchRssList } from '../../api/fetchData';
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';


export async function load(props) {
    const { locals }: any = props;
    const { language,deviceType } = locals;
    const requestHeader = props.request.headers.get('host') || '';
    try {
        const [rssList] = await Promise.all([
            fetchRssList(language),
        ]);

        
        let getParentCategory = getParentCategories(language)

        const seoRssData = rssSeoData(language);


        
       
            const cleanPath = ('/rss')?.split("#")?.[0]?.split("?")?.[0];
            const ensuredSlashPath = cleanPath?.startsWith("/")
                ? cleanPath
                : "/" + cleanPath;

            let canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url?.replace(/\/$/, "")}${ensuredSlashPath}`;
        

        return {
            props: {
                rssList: rssList ? rssList?.data?.data : [],
                seoRssData:seoRssData,
                language:language,
                envDetails: locals.ENV_DETAILS,
                canonicalUrl:canonicalUrl,
                siteNavigation: getParentCategory
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

const rssSeoData = (lang:string) => {
    let rssSeo = {};
    if(lang === 'E'){
        rssSeo = {
            title: 'RSS Feeds | Stay Updated with Republic World News',
            description: 'Subscribe to the RSS feeds of Republic World to get real-time updates on breaking news, top stories, and the latest developments across various categories directly to your feed reader.',
            keywords: 'RSS Feeds, Republic World RSS, Real Time News Updates, Latest News , Breaking News, Today Breaking News',
        }
    }
    else if(lang === 'H'){
        rssSeo = {
            title: 'RSS Feeds | Latest News RSS Feed | RSS Feed लेटेस्ट हिंदी न्यूज़',
            description: ' RSS Feeds: Latest News RSS feed of Republic Bharat, Get all News RSS feed for Hindi News, breaking news RSS feed, Live News News RSS Feed for Hindi News',
            keywords: 'RSS Feeds, Republic Bharat Latest news, news in Hindi, India news in Hindi, breaking news in Hindi, live news, हिंदी न्यूज़, Hindi news, लेटेस्ट हिंदी न्यूज़, latest news in Hindi, Hindi Samachar, हिन्दी समाचार, ब्रेकिंग न्यूज़, न्यूज़ इन हिंदी',
        } 
    }
    else if(lang === 'RB'){
        rssSeo = {
            title: 'RSS Feeds | Stay Updated with Business News & Market Insights',
            description: 'Subscribe to the RSS feed of our business news website to receive real-time updates on market trends, financial news, and business developments directly to your feed reader.',
            keywords: 'RSS feeds, Business news RSS, Market updates , business news, Financial news feed, Real-time market insights, Latest business news feed has context menu',
        } 
    }
    else{
        rssSeo = {
            title: 'RSS Feeds | Stay Updated with Republic World News',
            description: 'Subscribe to the RSS feeds of Republic World to get real-time updates on breaking news, top stories, and the latest developments across various categories directly to your feed reader.',
            keywords: 'RSS Feeds, Republic World RSS, Real Time News Updates, Latest News , Breaking News, Today Breaking News',
        }
    }


    return rssSeo;
}