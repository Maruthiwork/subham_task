import { fetchAllTagsAndTopics, fetchRightBarData, fetchTrendingStories } from "../../api/fetchData";
import { getParentCategories } from '$lib/utils/common';

export async function load({ params, locals, url }: any) {
    const { deviceType, language } = locals;

    let { slug } = params;
    const paths = url.pathname.split('/').filter(eachPath => eachPath);
    
    const isAmp = paths?.[0] === 'amp' || url.searchParams.get('amp') === '1' ? true : false;

    try {
        const [tagData, trending, rightSideBar] = await Promise.all([
            fetchAllTagsAndTopics(language),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);

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
                tag_and_topics_list: tagData ? tagData.data.data : null,
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
    } catch (error) {

    }
}
