import { error as serror } from '@sveltejs/kit';
import { fetchAnchorsList, fetchRightBarData, fetchTrendingStories } from "../api/fetchData";
import { logErrorTodb } from '../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals }: any = props;
    const { deviceType, language } = locals;
    const requestHeader = props.request.headers.get('host') || '';

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
                getParentCategory,
                envDetails: locals.ENV_DETAILS
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
