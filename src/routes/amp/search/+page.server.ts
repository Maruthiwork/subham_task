import { error as serror } from '@sveltejs/kit';
import { fetchSearchList, fetchTrendingStories } from "../../api/fetchData";
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load({ locals, url, request }: any) {
    const searchParams = url.searchParams.get('query') || '';
    const page = url.searchParams.get('page') || '1';
    const requestHeader = request.headers.get('host') || '';
    const { deviceType, language, ENV_DETAILS } = locals;

    try {
        // Fetch data in parallel
        const [searchBarData, trending] = await Promise.all([
            fetchSearchList(language, searchParams, +page, 10),
            fetchTrendingStories(language)
        ]);

        let getParentCategory = getParentCategories(language)

        return {
            props: {
                search_bar: searchBarData?.data || null,
                trending_stories: trending?.data || null,
                device: deviceType,
                language,
                envDetails: ENV_DETAILS,
                searchSlug: searchParams,
                currentPage: +page,
                siteNavigation:getParentCategory
            },
        };
    } catch (error: any) {
        // Handle 404 error case
        if (error?.location === "/404") {
            await logErrorTodb({
                url: url.href,
                deviceType,
                requestHeader,
                language,
            });
            throw serror(404, { message: "PAGE NOT FOUND" });
        }


    }
}
