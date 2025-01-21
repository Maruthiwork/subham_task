import { error as serror } from '@sveltejs/kit';
import { fetchAllTagsAndTopics, fetchRightBarData, fetchTrendingStories } from "../api/fetchData";
import { logErrorTodb } from '../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { params, locals, url }: any = props;
    const { deviceType, language } = locals;
    const requestHeader = props.request.headers.get('host') || '';
    let { slug } = params;
    const paths = url.pathname.split('/').filter((eachPath:any) => eachPath);

    const isAmp = paths?.[0] === 'amp' || url.searchParams.get('amp') === '1';

    try {
        const [tagData, trending, rightSideBar] = await Promise.all([
            fetchAllTagsAndTopics(language),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);
        let getParentCategory = getParentCategories(language)

        let canonicalUrl = ''
        if (!canonicalUrl) {
            const cleanPath = slug?.split("#")?.[0]?.split("?")?.[0];
            const ensuredSlashPath = cleanPath?.startsWith("/")
                ? cleanPath
                : "/" + cleanPath;

            canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url?.replace(/\/$/, "")}${ensuredSlashPath}`;
        }

        return {
            props: {
                tag_and_topics_list: tagData ? tagData.data.data : null,
                trending_stories: trending ? trending.data : null,
                rightSideBar: rightSideBar ? rightSideBar?.data?.data : null,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                isAmp: isAmp,
                canonicalUrl: canonicalUrl,
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
