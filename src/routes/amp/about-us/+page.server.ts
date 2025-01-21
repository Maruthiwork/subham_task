import { error as serror } from '@sveltejs/kit';
import { logErrorTodb } from '../../api/postData';
import { getParentCategories } from '$lib/utils/common';

export async function load(props) {
    const { locals }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;
    let getParentCategory = getParentCategories(language)
    try {
        return {
            props: {
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

        console.log(error)
        // Handle the error and return a serializable response

        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}
