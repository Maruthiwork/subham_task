import { redirect, error as serror } from '@sveltejs/kit';
import { fetchTrendingStories } from '../api/fetchData';


export async function load({ locals }: any) {
 

    const { deviceType, language } = locals;

    try {

        if (language === 'H') {
            throw redirect(301, '/404');
        }

        let  trendingResponsePromise;
        trendingResponsePromise = fetchTrendingStories(language);

        const [ trendingResponse ] = await Promise.all([
            trendingResponsePromise || Promise.resolve(null),
        ]);



        return {
            props: {
                trending_stories: trendingResponse ? trendingResponse?.data : null,
                device:deviceType,
                language:language,
                envDetails: locals.ENV_DETAILS
            },
        };
    } catch (error:any) {
        console.log(error)
        // Handle the error and return a serializable response
        if(error.location == '/404'){
            throw serror(404, { message: "PAGE NOT FOUND" });
        }

        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}
