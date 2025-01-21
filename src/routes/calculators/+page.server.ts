import { redirect, error as serror } from '@sveltejs/kit';
import { fetchTrendingStories } from '../api/fetchData';
import { getSeoData } from '$lib/components/utils/utils';
import { logErrorTodb } from '../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals }: any = props;
    const requestHeader = props?.request?.headers.get('host') || '';
    const { deviceType, language } = locals;

    const [  trending] = await Promise.all([
        fetchTrendingStories(language),
    ]);
    let getParentCategory = getParentCategories(language)
    const seoData = getSeoData(language)

    try {
        return {
            props: {
                trending_stories: trending ? trending.data : null,
                device:deviceType,
                language:language,
                envDetails: locals.ENV_DETAILS,
                seoData:seoData,
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
