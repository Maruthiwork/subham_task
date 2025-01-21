// src/routes/+page.ts


export async function load({ locals }: any) {
    try {
        return {
            props: {
                envDetails: locals.ENV_DETAILS,
            },
        };
    } catch (error) {

    }
}
