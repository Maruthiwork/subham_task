import { error as serror } from '@sveltejs/kit';
import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
import { logErrorTodb } from '../../api/postData';


const ensureXmlExtension = (slug: string) => {
  return slug.endsWith(".xml") ? slug : `${slug}.xml`;
};

const rssUrl = (slug: string,lang:string) => {
  const baseUrl = EnvironmentConfig.VITE_BUCKET_URL
  const directory = EnvironmentConfig.VITE_RSS_PATH

  if (EnvironmentConfig?.VITE_ENVIRONMENT != 'production') {
    return `${baseUrl}${directory}${lang}/${EnvironmentConfig.VITE_ENVIRONMENT}/${ensureXmlExtension(slug)}`;
  }

  return `${baseUrl}${directory}${lang}/${ensureXmlExtension(slug)}`;
}


export async function GET(props) {
  const { params,locals }: any = props;
  const requestHeader = props.request.headers.get('host') || '';
  const { deviceType, language } = locals;
  const { rssSlug } = params;
  try {
    const responseData = await fetch(rssUrl(rssSlug,language), { headers: { lang: language } })
    const xmlData = await responseData.text();
    // Set the appropriate headers
    const headers = {
      'Content-Type': 'application/xml',
    };

    // Return the XML response
    return new Response(xmlData, { headers });
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