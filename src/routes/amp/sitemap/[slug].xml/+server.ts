import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
import moment from "moment-timezone";
const baseUrl = EnvironmentConfig.VITE_API_END_POINT


function checkIfKeyExists(inputString: string, searchString: string) {
    return inputString.includes(searchString);
}
function extractDateFromString(inputString: string) {
    const datePattern = /(\d{4})(\d{2})(\d{2})/;
    const match = datePattern.exec(inputString);
    if (match && match[0]) {
        const matchedDate = match[0];
        return matchedDate;
    }
    return '';
}

function generateDateWiseSiteMapIndexUrl(date: string) {
    return `${baseUrl}/sitemap/sitemap-by-date?sitemapdate=${date}`
}

function generateGalleryDateWiseSiteMapIndexUrl(date: string = moment().format('YYYYMMDD')) {
    return `${baseUrl}/sitemap/sitemap-gallery-by-date?sitemapdate=${date}`
}

function generateDateWiseSiteMapArticleUrl(date: string = moment().format('YYYYMMDD')) {

    return `${baseUrl}/sitemap/article-by-date?sitemapdate=${date}`
}


function generateDateWiseSiteMapLiveBlog() {
    let date = moment().format('YYYYMMDD');
    return `${baseUrl}/sitemap/liveblog-by-date?sitemapdate=${date}`
}


function generateDateWiseSiteMapImageUrl() {
    let date = moment().format('YYYYMMDD');
    return `${baseUrl}/sitemap/image-by-date?sitemapdate=${date}`
}

function generateSiteMapIndexUrl(slug: string) {
    return `${baseUrl}/sitemap/${slug}`
}

function generateHistoricalSiteMapIndexUrl() {
   
    
    
    return `${baseUrl}/sitemap/historical-sitemap`;
}

const historicalSiteMapUrl = (slug: string, lang: string) => {
    const baseUrl = EnvironmentConfig.VITE_BUCKET_URL
    const directory = 'sitemap/' 
    if (EnvironmentConfig?.VITE_ENVIRONMENT != 'production') {
        return `${baseUrl}${directory}${lang}/${EnvironmentConfig.VITE_ENVIRONMENT}/${ensureXmlExtension(slug)}`;
    }

    return `${baseUrl}${directory}${lang}/${ensureXmlExtension(slug)}`;
}

const ensureXmlExtension = (slug: string) => {
    return slug.endsWith(".xml") ? slug : `${slug}.xml`;
};


function getUrlFromSlug(slug: string, language: string, requestUrl?: any): string {
    let url = '';
    if (slug == 'historical-sitemap') {
        url = generateHistoricalSiteMapIndexUrl();

    } else if (slug == 'sitemap-news-today') {
        let date = moment().format('YYYYMMDD');
        url = generateDateWiseSiteMapIndexUrl(date);
    } else if (slug == 'sitemap-article-today') {
        url = generateDateWiseSiteMapArticleUrl();
    } else if (slug == 'sitemap-liveblog-today') {
        url = generateDateWiseSiteMapLiveBlog();
    } else if (slug == 'sitemap-image-today') {
        url = generateDateWiseSiteMapImageUrl();
    } else if (slug == 'sitemap-news') {
        url = generateSiteMapIndexUrl('news-sitemap');
    } else if (slug == 'video') {
        url = generateSiteMapIndexUrl('video-sitemap');
    } else if (slug == 'index-sitemap') {
        url = generateSiteMapIndexUrl('index-sitemap');
    } else if (slug == 'sitemap') {
        url = generateSiteMapIndexUrl('sitemap-index');
    } else if (slug == 'webstory') {
        url = generateSiteMapIndexUrl('webstory-sitemap-index');
    } else if (slug == 'mobile') {
        url = generateSiteMapIndexUrl('mobile-sitemap');
    } else if (slug == 'topics') {
        url = generateSiteMapIndexUrl('tags-sitemap');
    }else if (slug == 'author') {
        url = generateSiteMapIndexUrl('author-sitemap');
    } else if (slug == 'anchor') {
        url = generateSiteMapIndexUrl('anchor-sitemap');
    } else if (slug == 'gallery-sitemap') {
        url = generateSiteMapIndexUrl('gallery-sitemap-index');
    } else if (slug == 'category') {
        url = generateSiteMapIndexUrl('category-sitemap');
    } else if (slug == 'image') {
        url = generateSiteMapIndexUrl('image-sitemap');
    } else if (checkIfKeyExists(slug, 'news')) {
        let date = extractDateFromString(slug);
        url = generateDateWiseSiteMapIndexUrl(date);
    } else if (checkIfKeyExists(slug, 'gallery')) {
        let date = extractDateFromString(slug);
        url = generateGalleryDateWiseSiteMapIndexUrl(date);
    } else if (checkIfKeyExists(slug, 'article')) {
        let date = extractDateFromString(slug);
        url = generateDateWiseSiteMapArticleUrl(date);
    } else if (checkIfKeyExists(slug, 'historical-sitemap')) {
        url = historicalSiteMapUrl(slug, language);
    }
    return url;
}



export async function GET({ params, url, locals }: any) {
    let { slug } = params
    let responseData: any = ""
    const { deviceType, language } = locals;

    let sendUrl = getUrlFromSlug(slug, language, url)
    try {
        const amp = url.searchParams.get('amp');
        if (amp) {
            sendUrl = sendUrl.includes('?') 
            ? `${sendUrl}&amp=${amp}` 
            : `${sendUrl}?amp=${amp}`;
          
        }
        responseData = await fetch(sendUrl, { headers: { lang: language } })
        const xmlData = await responseData.text();
        // Set the appropriate headers
        const headers = {
            'Content-Type': 'application/xml',
        };
        // Return the XML response
        return new Response(xmlData, { headers });

    } catch (error) {

    }

}