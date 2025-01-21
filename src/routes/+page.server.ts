import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
import { error as serror } from '@sveltejs/kit';
import { logErrorTodb } from "./api/postData";
import { getParentCategories } from "$lib/utils/common";

export async function load(props) {
    const { fetch,locals }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;
    const lang = { headers: { lang: language } };
    try {
        const [homepageResponse] = await Promise.all([
            fetch(`${EnvironmentConfig.VITE_API_END_POINT}/homepage/all-home-page-data-test`, lang),

        ]);
        let getParentCategory = getParentCategories(language)
        const homepageData = await homepageResponse.json();

        return {
            props: {
                homepage: homepageData,
                device:deviceType,
                language:language,
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
     
        // Handle the error and return a serializable response
       
        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}
