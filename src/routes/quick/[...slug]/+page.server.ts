import { error as serror  } from '@sveltejs/kit';
import { fetchQuicks } from '../../api/fetchData';
import { logErrorTodb } from '../../api/postData';

export async function load(props) {
    const { params, locals, url }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;
    let { slug } = params;
    slug = slug.replace(/\.news/g, '').replace(/\.html/g, '');
    const isAmp = url.searchParams.get('amp') === '1';

    try {
        const [quickList] = await Promise.all([
            fetchQuicks(language, 'quick'),

        ]);

        let canonicalUrl = '';
        if (!canonicalUrl) {
            const cleanPath = slug.split("#")[0].split("?")[0];
            const ensuredSlashPath = `/quick${cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath}`;
            canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url.replace(/\/$/, "")}${ensuredSlashPath}`;
        }

        return {
            props: {
                isAmp: isAmp,
                canonicalUrl: canonicalUrl,
                quicks_list: quickList ? quickList?.data : null,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
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
