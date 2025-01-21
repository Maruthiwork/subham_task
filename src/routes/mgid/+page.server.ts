// src/routes/+page.ts

import { redirect } from '@sveltejs/kit';

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
