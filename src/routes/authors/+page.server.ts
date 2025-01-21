import { error as serror } from '@sveltejs/kit';
import { fetchAuthorsList, fetchRightBarData, fetchTrendingStories } from "../api/fetchData";
import { logErrorTodb } from '../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals }: any = props;
    const requestHeader = props?.request?.headers.get('host') || '';
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
