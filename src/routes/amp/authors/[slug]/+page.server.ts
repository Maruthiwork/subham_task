import { redirect } from '@sveltejs/kit';
import { EnvironmentConfig } from '$lib/components/utils/environmentConfig';
import { fetchAnchorAndAuthorDetails, fetchRightBarData, fetchTrendingStories } from '../../../api/fetchData';
import { postErrorLogs } from '../../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load({ params, locals }: any) {
    const { deviceType, language } = locals;
    let { slug } = params;

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
            throw redirect(301, '/authors');
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
        await postErrorLogs({ err_message:`Request failed with status code ${error?.location}`,apiUrl:"", err_code:error?.location , page_url:`authors/${slug}` , device:deviceType , environtment:EnvironmentConfig?.VITE_ENVIRONMENT },language);
       
        console.log('Error fetching data:', error);

        // If error is due to anchorAndAuthorData being missing, redirect to 404
        if (!anchorAndAuthorData) {
            throw redirect(301, '/authors');
        }


    }
}
