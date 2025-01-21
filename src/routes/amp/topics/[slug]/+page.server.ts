import { fetchRightBarData, fetchTagsAndTopics, fetchTrendingStories } from "../../../api/fetchData";
import { getParentCategories } from '$lib/utils/common';
import { redirect } from "@sveltejs/kit";


export async function load({ params, locals, url }: any) {

    const { deviceType, language } = locals;

    let { slug } = params;
    const paths = url.pathname.split('/').filter((eachPath:any) => eachPath);

    const isAmp = paths?.[0] === 'amp' || url.searchParams.get('amp') === '1' ? true : false;

    try {
        const [tagData, trending, rightSideBar] = await Promise.all([
            fetchTagsAndTopics(language, slug, ''),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);

        if (!tagData || !tagData.data || !tagData.data.data) {
            throw redirect(301, '/topics');
        }

        
        let getParentCategory = getParentCategories(language)

        let canonicalUrl = ''
        if (!canonicalUrl) {
            const cleanPath = slug?.split("#")?.[0]?.split("?")?.[0];
            const ensuredSlashPath = cleanPath?.startsWith("/")
                ? cleanPath
                : "/" + cleanPath;

            canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url?.replace(/\/$/, "")}${ensuredSlashPath}`;
        }

        return {
            props: {
                tag_and_topics_data: tagData ? tagData.data.data : null,
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
        // Handle the error and return a serializable response
        if(error.status === 301) {
            throw redirect(301, '/topics');
        }
    }
}
