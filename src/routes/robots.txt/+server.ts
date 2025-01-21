import { error as serror } from '@sveltejs/kit';
import { EnvironmentConfig } from "../../lib/components/utils/environmentConfig"
import { logErrorTodb } from '../api/postData';

const path = (path: string, lang: string) => {
    const baseUrl = EnvironmentConfig.VITE_BUCKET_URL
    const directory = 'ads-file/'

    if (EnvironmentConfig?.VITE_ENVIRONMENT != 'production') {
        return `${baseUrl}${directory}${lang}/${EnvironmentConfig.VITE_ENVIRONMENT}/${path}`;
    }
    return `${baseUrl}${directory}${lang}/${path}`;

}

export async function GET(props) {
    const { params, locals }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;
    try {
        const { rssSlug } = params;
        const responseData = await fetch(path('robots.txt', language), { headers: { lang: language } })

        const data = await responseData.text();


        // Set the appropriate headers
        const headers = {
            'Content-Type': 'text/plain',
        };
        // Return the XML response
        return new Response(data, { headers });
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