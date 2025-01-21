import { fetchAuthorsList, fetchRightBarData, fetchTrendingStories } from '../../api/fetchData';
import { getParentCategories } from '$lib/utils/common';

export async function load({ locals }: any) {

    const { deviceType, language } = locals;

    try {
        const [ authorListResponse, trending,rightSideBar] = await Promise.all([
            fetchAuthorsList(language),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);
        let getParentCategory = getParentCategories(language)

        return {
            props: {
                author_list:authorListResponse?.data, 
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
