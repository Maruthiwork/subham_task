// @ts-nocheck
import { configDetails } from '$lib/config/envConfig';
import { UAParser } from 'ua-parser-js';
import * as amp from '@sveltejs/amp';
import dropcss from 'dropcss';
import { fetchPageType } from './routes/api/fetchData';
import { checkIsAmpPage, getDeviceType, getPageType, handleAmpTransformation, redirectResponse } from '$lib/utils/common';
import { getRedirectionRule } from '$lib/utils/redirectionUrl';
import { logErrorTodb } from './routes/api/postData';


// Domains that require "www." prefix
const domainsRequiringWww = ['republicworld.com', 'republicbharat.com', 'republicbiz.com'];

// Handle redirection based on URL path or hostname
function handleRedirects(event: any, hostname: string, lang: string) {
    let pathname = event.url.pathname;

    let rewrites = getRedirectionRule(lang)

    for (const rewrite of rewrites) {
        const match = rewrite.source.test(pathname);
        if (match) {
            pathname = pathname.replace(rewrite.source, rewrite.destination);
            return redirectResponse(`http://${hostname}${pathname}`);
        }
    }

    if (pathname.endsWith('/') && pathname.length > 1) {
        return redirectResponse(`https://${hostname}${pathname.slice(0, -1)}`, true);
    }

    if (/\/{2,}/.test(pathname)) {
        pathname = pathname.replace(/\/{2,}/g, '/');
        return redirectResponse(`https://${hostname}${pathname}${event.url.search}`);
    }

    if (pathname === '/livetv.html') {
        return redirectResponse(`https://${hostname}/`);
    }
    if (pathname.endsWith('.html') || pathname.endsWith('.news')) {
        pathname = pathname.slice(0, -5); // Remove ".news"
        return redirectResponse(`https://${hostname}${pathname}`);
    }
    if (hostname === 'bharat.republicworld.com') {
        return redirectResponse(`https://www.republicbharat.com${pathname}${event.url.search}`);
    }
    if (hostname && !hostname.startsWith('www.') && domainsRequiringWww.includes(hostname)) {
        const urlValue = new URL(event.request.url);
        urlValue.host = 'www.' + hostname;
        return redirectResponse(urlValue.toString());
    }
    // Handle redirection based on URL path



    return null;
}

// Set local event context
function setEventLocals(event, deviceType, ENV_DETAILS, isAmp, pageType) {
    event.locals = {
        ...event.locals,
        deviceType: deviceType,
        language: ENV_DETAILS.language || 'E',
        isAmp: isAmp,
        ENV_DETAILS: ENV_DETAILS,
        pageType: pageType
    };
}

// Replace placeholders for language and AMP in HTML
function replacePlaceholders(html: string, ENV_DETAILS: any, isAmp) {
    return html.replace('%lang%', ENV_DETAILS.lang || 'en')
        .replace('%isamp%', isAmp ? ' amp' : '');
}

// Transform HTML chunk for AMP and other configurations
function transformHtmlChunk({ html, done }, ENV_DETAILS, isAmp, paths, fullUrl, pageType) {
    html = replacePlaceholders(html, ENV_DETAILS, isAmp);
    const customStyle = ENV_DETAILS?.sveltekitStyle;


    if (done) {
        const metaTags = [];
        const titleTags = [];
        const canonicalTags = [];
        // Collect <meta> and <title> tags from <body>
        html = html.replace(/<body>([\s\S]*?)<\/body>/, (match, bodyContent) => {
            const bodyMetaTags = [...bodyContent.matchAll(/<meta [^>]*>/g)];
            const bodyTitleTag = bodyContent.match(/<title>[\s\S]*?<\/title>/);

            if (bodyMetaTags.length) {
                bodyMetaTags.forEach((meta) => metaTags.push(meta[0]));
                bodyContent = bodyContent.replace(/<meta [^>]*>/g, ''); // Remove from <body>
            }

            if (bodyTitleTag) {
                titleTags.push(bodyTitleTag[0]);
                bodyContent = bodyContent.replace(/<title>[\s\S]*?<\/title>/, ''); // Remove from <body>
            }

            return `<body>${bodyContent}</body>`;
        });

        // Extract <meta> and <title> tags from <head>
        const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
        if (headMatch) {
            let headContent = headMatch[1];
            const headMetaTags = [...headContent.matchAll(/<meta [^>]*>/g)];
            const headTitleTag = headContent.match(/<title>[\s\S]*?<\/title>/);
            const headCanonicalTag = headContent.match(/<link rel="canonical" [^>]*>/);
            const headAmpTag = headContent.match(/<link rel="amphtml" [^>]*>/);
            const amphtmlTags = [];

            if (headMetaTags.length) {
                headMetaTags.forEach((meta) => metaTags.push(meta[0]));
                headContent = headContent.replace(/<meta [^>]*>/g, ''); // Remove duplicates from <head>
            }

            if (headTitleTag) {
                titleTags.push(headTitleTag[0]);
                headContent = headContent.replace(/<title>[\s\S]*?<\/title>/, ''); // Remove duplicates from <head>
            }

            if (headCanonicalTag) {
                canonicalTags.push(headCanonicalTag[0]);
                headContent = headContent.replace(/<link rel="canonical" [^>]*>/, ''); // Remove canonical tag from <head>
            }

            if (!isAmp && headAmpTag) {
                amphtmlTags.push(headAmpTag[0]);
            }

            headContent = headContent.replace(/<link rel="amphtml" [^>]*>/, ''); // Remove AMP tag from <head>

            let combinedTags = '';

            if (headCanonicalTag && headCanonicalTag.length > 0) {
                combinedTags = [metaTags?.[0],...headCanonicalTag, ...amphtmlTags, ...titleTags, ...metaTags?.splice(1)].join('\n');
            } else {
                combinedTags = [metaTags?.[0], ...amphtmlTags, ...titleTags, ...metaTags?.splice(1)].join('\n');
            }


            headContent = `${headContent}`;
            // Reconstruct <head>   
            html = html.replace(
                /<head>([\s\S]*?)<\/head>/,
                `<head>${headContent}\n</head>`
            );
            html = html.replace('<head>', `<head>\n${combinedTags}`);
        }
        // html = html.replace(/(<(meta|link|img|input|br|hr|source|base)[^>]*?)>/g, '$1 />');
    }


    if (!isAmp && customStyle) {
        let fonts = ENV_DETAILS?.fontFiles.map((font) => {
            return `<link rel="preload" href="${font}" as="font" type="font/woff" >`;
        }).join('');
        html = html.replace('</head>', `${fonts}</head>`);
        html = html.replace('</head>', `<style>${customStyle}</style></head>`);
    }
    if (done && isAmp) {
        return handleAmpTransformation(html, ENV_DETAILS, paths, fullUrl, pageType);
    }


    return html;
}

export async function handle({ event, resolve }) {
    const ua = event.request.headers.get('user-agent') || '';
    const hostname = event.request.headers.get('host');
    const fullUrl = new URL(event.request.url);

    const ENV_DETAILS = hostname ? configDetails(hostname) : {};
    const deviceType = getDeviceType(ua);


    // Handle specific redirects based on URL path and hostname
    const redirectResponse = handleRedirects(event, hostname, ENV_DETAILS.language);

    if (redirectResponse) return redirectResponse;

    const paths = fullUrl.pathname.split('/').filter(Boolean);
    const pageType = await getPageType(ENV_DETAILS.language, fullUrl.pathname.slice(1));

    const isAmp = checkIsAmpPage(paths, fullUrl.searchParams, pageType);


    // Set local context variables for event
    setEventLocals(event, deviceType, ENV_DETAILS, isAmp, pageType);


    const response = await resolve(event, {
        preload: ({ type }) => ['font', 'js', 'css'].includes(type),
        transformPageChunk: (chunk) => transformHtmlChunk(chunk, ENV_DETAILS, isAmp, paths, fullUrl, pageType),
    });

    if (response.headers.get('content-type') == 'text/html') {
        response.headers.set('Content-Type', 'text/html; charset=UTF-8');
    }
    return response;
}




/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
    try {
        const requestDetails = {
            method: event.request.method,
            headers: Object.fromEntries(event.request.headers.entries()), // Serialize headers
            url: event.request.url, // Include the request URL
            referrer: event.request.referrer || null, // Optional: referrer if available
            mode: event.request.mode, // Include the request mode
            credentials: event.request.credentials, // Credentials info
        };
        await logErrorTodb({
            url: event.url.href,
            deviceType: event.locals.deviceType,
            requestHeader: JSON.stringify(requestDetails), // If JSON is required
            language: event.locals.language,
            status,
        });
    } catch (logError) {
        console.error('Error logging 404 error:', logError);
    }
    return {
        message: 'Internal Error'
    };
}