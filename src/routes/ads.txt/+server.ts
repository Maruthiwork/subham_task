import { EnvironmentConfig } from "../../lib/components/utils/environmentConfig"

const path = (path: string, lang: string) => {
    const baseUrl = EnvironmentConfig.VITE_BUCKET_URL
    const directory = 'ads-file/'

    if (EnvironmentConfig?.VITE_ENVIRONMENT != 'production') {
        return `${baseUrl}${directory}${lang}/${EnvironmentConfig.VITE_ENVIRONMENT}/${path}`;
    }
    return `${baseUrl}${directory}${lang}/${path}`;

}

export async function GET({ params, locals }: any) {


    const { deviceType, language } = locals;
    try {
        const { rssSlug } = params;
        const responseData = await fetch(path('ads.txt', language), { headers: { lang: language } })

        const data = await responseData.text();


        // Set the appropriate headers
        const headers = {
            'Content-Type': 'text/plain',
        };
        // Return the XML response
        return new Response(data, { headers });
    } catch (error) {
        // Handle the error and return a serializable response
  
        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}