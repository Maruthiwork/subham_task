import { fetchAnchorsList, fetchRightBarData, fetchTrendingStories } from '../../api/fetchData';
import { getParentCategories } from '$lib/utils/common';

export async function load({ locals }: any) {

    const { deviceType, language } = locals;

    try {
        const [ anchorsListResponse, trending,rightSideBar] = await Promise.all([
            fetchAnchorsList(language),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);
        let getParentCategory = getParentCategories(language)
        return {
            props: {
                anchor_list:anchorsListResponse?.data, 
                trending_stories: trending ? trending.data : null,
                rightSideBar : rightSideBar ? rightSideBar?.data?.data : null,
                device:deviceType,
                language:language,
                envDetails: locals.ENV_DETAILS,
                getParentCategory
            },
        };
    } catch (error:any) {
 
        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}
