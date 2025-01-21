import { fetchAllStates, fetchRightBarData, fetchTrendingStories } from "../api/fetchData";
import { logErrorTodb } from '../api/postData';

export async function load(props) {
    const { locals }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;

    try {
        const [allStates,trending,rightSideBar] = await Promise.all([
            fetchAllStates(language),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);
        


        return {
            props: {
                allStates: allStates?.data?.data,
                trending_stories: trending ? trending.data : null,
                rightSideBar : rightSideBar ? rightSideBar?.data?.data : null,
                device:deviceType,
                language:language,
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
        } 
       

    }
}
