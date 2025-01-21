import { error as serror  } from '@sveltejs/kit';
import {  fetchPage, fetchRightBarData, fetchTrendingStories } from "../../api/fetchData";
import { getCalculatorListing } from '$lib/components/Calculators/utils/constants';
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';


export async function load(props) {
    const { params, locals }: any = props;
    const { deviceType, language } = locals;
    let { slug } = params;
    const requestHeader = props?.request?.headers.get('host') || '';

    try {

        const [pageData,trending,rightSideBar] = await Promise.all([
            fetchPage(language,slug),
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ]);
        let getParentCategory = getParentCategories(language)

        const calculatorDetails = Object.values(getCalculatorListing(language)).find((item) => item.path === slug);

        let canonicalUrl = null;
        if (!canonicalUrl) {
            const cleanPath = slug.split("#")[0].split("?")[0];
            const ensuredSlashPath = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;
            canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url.replace(/\/$/, "")}${ensuredSlashPath}`;
        }

        return {
            props: {
                calculatorDetails: calculatorDetails ? calculatorDetails : null,
                calculatorPath: slug,
                rightSideBar : rightSideBar ? rightSideBar?.data?.data : null,
                pageData: pageData ? pageData : null,
                trending_stories: trending ? trending.data : null,
                device: deviceType,
                language: language,
                canonicalUrl: canonicalUrl,
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
