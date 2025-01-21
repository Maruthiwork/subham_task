
export async function load({ locals }: any) {
 

    const { deviceType, language } = locals;

    try {
        return {
            props: {
                device:deviceType,
                language:language,
                envDetails: locals.ENV_DETAILS
            },
        };
    } catch (error) {

    }
}
