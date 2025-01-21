import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";


export async function createPost({ apiUrl, payload,language }: { apiUrl: string; payload: any,language: string }) {
    try {
        const lang = {
            headers: { lang: language },
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...lang.headers,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error creating post: ${response.status}`);
        }

        const data = await response.json();
        return {
            data,
        };
    } catch (error) {
        return {
            status: 500,
            data: { error: 'Internal Server Error' },
        };
    }
}


//   Sign Up 
export async function SignUp(payload: any,language:string) {
    const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/user/create`;
    return createPost({ apiUrl, payload,language });
}

//Login
export async function Login(payload: any,language:string) {
    const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/user/login-otp`;
    return createPost({ apiUrl, payload,language });
  
}

//Verify Otp
export async function VerifyOtp(payload: any,language:string) {
    const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/user/login-otp-verify`;
    return await createPost({ apiUrl, payload,language });
}

// Comments Post
export async function postComment(payload: any,language:string) {
    const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/comments/postcomment`;
    return await createPost({ apiUrl, payload,language });
}

// Poll Post
export async function postPoll(payload: any,language:string) {
    const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/poll/vote`;
    return await createPost({ apiUrl, payload, language});
}

// Error Logs
export async function postErrorLogs(payload: any,language:string) {
    const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/logError/v-2`;
    return await createPost({ apiUrl, payload, language});
}

export async function logErrorTodb(params: {
    url: string;
    deviceType: string;
    requestHeader: any;
    language: string;
    status?: string
}) {
    const { url, deviceType, requestHeader, language, status } = params;
    await postErrorLogs(
        {
            err_message: `Request failed with status code 404`,
            apiUrl: "",
            err_code: status ?? "404",
            page_url: url,
            device: deviceType,
            requestHeader: requestHeader,
        },
        language
    );
}

export async function logGenericError(params: {
    errorLocation: string;
    url: string;
    deviceType: string;
    requestHeader: any;
    language: string;
}) {
    const { errorLocation, url, deviceType, requestHeader, language } = params;
    await postErrorLogs(
        {
            err_message: `Request failed with status code ${errorLocation}`,
            apiUrl: "",
            err_code: errorLocation,
            page_url: url,
            device: deviceType,
            requestHeader: requestHeader,
        },
        language
    );
}


