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
        console.error(error); // It is better to use console.error for error logging
        throw redirect(302, '/500');
        // return {
        //     status: 500,
        //     error: new Error('Could not fetch some data'), // Using Error object to better handle the error
        // };
    }
}
