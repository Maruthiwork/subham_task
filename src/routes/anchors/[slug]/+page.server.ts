import { redirect, error as serror } from '@sveltejs/kit';
import { fetchAnchorAndAuthorDetails, fetchRightBarData, fetchTrendingStories } from "../../api/fetchData";
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { params, locals }: any = props;
    const { deviceType, language } = locals;
    let { slug } = params;
    const requestHeader = props?.request?.headers.get('host') || '';
    // Declare these variables outside of the try-catch to allow granular error handling.
    let anchorAndAuthorData;

    try {
        // Fetch data, but handle API errors separately
        anchorAndAuthorData = await fetchAnchorAndAuthorDetails(language, slug, 'all', 1, 10);
        const [ trending,rightSideBar] = await Promise.all([
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);
        let getParentCategory = getParentCategories(language)

        // If anchorAndAuthorData has no valid data, redirect to 404
        if (!anchorAndAuthorData?.data || anchorAndAuthorData?.data.length === 0) {
            throw redirect(301, '/anchors');
        }

        // Return fetched data if everything is valid
        return {
            props: {
                anchor_author_data: anchorAndAuthorData?.data,
                trending_stories: trending ? trending.data : null,
                rightSideBar: rightSideBar ? rightSideBar?.data?.data : null,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                getParentCategory
            }
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
        // If error is due to anchorAndAuthorData being missing, redirect to 404
        if (!anchorAndAuthorData) {
            throw redirect(301, '/anchors');
        }

    }
}
