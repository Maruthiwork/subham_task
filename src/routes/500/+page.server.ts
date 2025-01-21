import { fetchNavigationData } from "../api/fetchData";


export async function load({ params, locals, url }: any) {
    const { deviceType, language } = locals;
    let { slug } = params;
    const paths = url.pathname.split('/').filter(eachPath => eachPath);

    const isAmp = paths?.[0] === 'amp' || url.searchParams.get('amp') === '1';

    try {
        let navBarData: any = {};

        navBarData = await fetchNavigationData(language)

        let canonicalUrl;

        if (!canonicalUrl) {
            const cleanPath = slug?.split("#")?.[0]?.split("?")?.[0];
            const ensuredSlashPath = cleanPath?.startsWith("/")
                ? cleanPath
                : "/" + cleanPath;

            canonicalUrl = `${locals?.ENV_DETAILS?.allDomainList?.[0]?.url?.replace(/\/$/, "")}${ensuredSlashPath}`;
        }

        return {
            props: {
                nav_bar: navBarData?.data?.data ?? [],
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                canonicalUrl: canonicalUrl,
                isAmp: isAmp
            },
        };
    } catch (error) {
        console.log(error)
        
        // return {
        //     status: 500,
        //     error: "Could not fetch some data",
        // };
    }
}
