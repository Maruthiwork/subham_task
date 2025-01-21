import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
import { error as serror } from '@sveltejs/kit';
import { logErrorTodb } from "../api/postData";
import { fetchBreakingNewsWidget, fetchGainersLoosets, fetchMarketIndices } from "../api/fetchData";
import { getParentCategories } from "$lib/utils/common";

export async function load(props) {
    const { fetch, locals, url }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;
    const lang = { headers: { lang: language } };

    const fullRoute = url.pathname.replace("/", "");
    const level1Route = fullRoute.split("/")?.[0];

    const breakingNewsDataPromise = await fetchBreakingNewsWidget(language);
    const gainerAndLoosersPromise = await fetchGainersLoosets(language, 5);
    const marketPromise = await fetchMarketIndices(language);


    try {
        const [homepageResponse, breakingNewsData] = await Promise.all([
            fetch(`${EnvironmentConfig.VITE_API_END_POINT}/homepage/all-home-page-data-test`, lang),
            breakingNewsDataPromise,
            gainerAndLoosersPromise,
            marketPromise
        ]);

        let getParentCategory = getParentCategories(language)

        const homepageData = await homepageResponse.json();

        return {
            props: {
                homepage: homepageData,
                breakingNewsData: breakingNewsData ? (level1Route === "world-news" ? breakingNewsData?.data?.data?.globalNews : breakingNewsData?.data?.data?.breakingNews) : null,
                gainerAndLoosersData: gainerAndLoosersPromise?.data,
                marketData: marketPromise?.data,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                getParentCategory
            },
        };
    } catch (error: any) {
        if (error?.location == "/404") {
            await logErrorTodb({
                url: props?.url?.href,
                deviceType,
                requestHeader,
                language,
            });
            throw serror(404, { message: "PAGE NOT FOUND" });
        }
        // Handle the error and return a serializable response

        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}
