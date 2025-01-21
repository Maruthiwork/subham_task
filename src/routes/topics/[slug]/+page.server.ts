import { redirect, error as serror } from '@sveltejs/kit';
import { fetchRightBarData, fetchTagsAndTopics, fetchTrendingStories } from "../../api/fetchData";
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { params, locals, url }: any = props;
    const { deviceType, language } = locals;
    let { slug } = params;
    const paths = url.pathname.split('/').filter((eachPath: any) => eachPath);
    const requestHeader = props.request.headers.get('host') || '';
    const isAmp = paths?.[0] === 'amp' || url.searchParams.get('amp') === '1';
    let tagData;
    try {
        // Fetching the necessary data
        tagData = await fetchTagsAndTopics(language, slug, '');
        const [ trending, rightSideBar] = await Promise.all([
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);

        let getParentCategory = getParentCategories(language)

        // Check if `tagData` is null or undefined, and return a redirect response directly
        if (!tagData || !tagData.data || !tagData.data.data) {
            throw redirect(301, '/topics');
        }

        // Generate canonical URL
        let canonicalUrl = '';
        if (!canonicalUrl) {
            const cleanPath = slug?.split("#")?.[0]?.split("?")?.[0];
            const ensuredSlashPath = cleanPath?.startsWith("/")
                ? cleanPath
                : "/" + cleanPath;

            canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url?.replace(/\/$/, "")}${ensuredSlashPath}`;
        }

        // Return fetched data as props
        return {
            props: {
                tag_and_topics_data: tagData.data.data,
                trending_stories: trending ? trending.data : null,
                rightSideBar: rightSideBar ? rightSideBar?.data?.data : null,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                isAmp: isAmp,
                canonicalUrl: canonicalUrl,
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
            
            throw serror(404, { message: "PAGE NOT FOUND" });
        }
       
        if (!tagData) {
            throw redirect(301, '/topics');
        }
        console.error('Error occurred:', error);

    }
}
