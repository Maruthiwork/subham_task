import { error as serror } from '@sveltejs/kit';
import { fetchSearchList, fetchTrendingStories } from "../api/fetchData";
import { logErrorTodb } from '../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals,url }: any = props;
    let searchParams:any = url.searchParams.get('query');
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;

    try {
        const [searchBarData,trending] = await Promise.all([
            fetchSearchList(language, searchParams,1,10),
            fetchTrendingStories(language)
        ]);

        let getParentCategory = getParentCategories(language)

        return {
            props: {
                search_bar: searchBarData?.data,
                trending_stories: trending ? trending.data : null,
                device:deviceType,
                language:language,
                envDetails: locals.ENV_DETAILS,
                searchSlug:searchParams,
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
