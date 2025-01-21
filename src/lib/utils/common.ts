// @ts-nocheck
import { UAParser } from "ua-parser-js";
import { fetchPageType } from "../../routes/api/fetchData";
import * as amp from '@sveltejs/amp';
import dropcss from 'dropcss';
import { serverStore } from "$lib/stores/serverStore";


// Function to remove "!important" from CSS for AMP compatibility
export function removeImportant(css) {
    return css.replace(/!important/g, '');
}

// Get device type based on User-Agent string
export function getDeviceType(ua: string) {
    const parser = new UAParser(ua);
    const result = parser.getResult();
    return (result.device.type === 'tablet' || result.device.type === 'mobile' || result.device.type === 'wearable') ? 'mobile' :  'desktop';
}



// Redirect response generator
export function redirectResponse(location: string, permanent = true) {
    return new Response(null, {
        status: permanent ? 301 : 302,
        headers: { location }
    });
}

// Get the page type for specific paths
export async function getPageType(language: string, pathname: string) {
    const { data } = await fetchPageType(language, pathname) ?? {};
    return data?.data?.pageType;
}

// Determine if the page is AMP based on path components or URL parameters
export function checkIsAmpPage(paths: string[], urlParams: any, pageType: string) {
    return paths[0] === 'amp' || urlParams.get('amp') === '1' ||
        (paths[0] === 'web-stories' && paths.length > 1 && pageType === "Story");
}

export function formatAmount(amount :any) {
    return Math.ceil(amount).toLocaleString('en-IN', {
      maximumFractionDigits: 0,
    });
  }


// Set local event context
export function setEventLocals(event: string, deviceType: string, ENV_DETAILS: any, isAmp: any) {
    event.locals = {
        ...event.locals,
        deviceType,
        language: ENV_DETAILS.language || 'E',
        isAmp,
        ENV_DETAILS,
    };
}

export function getParentCategories(language: string) {
    let navBarData = serverStore.get(`navBarData-${language}`) || [];

    let getParentCategory = navBarData.filter(category =>
        category.is_category && !category.completeSlug.includes('/')
    );

    return getParentCategory;
}

export function filterRedirectUrls(redirectUrl: string): string {
    // Check if the redirectUrl contains "http" or "https"
    if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
        return redirectUrl;
    }

    return '/' + redirectUrl;
}



// Apply AMP transformations to the HTML buffer
export function handleAmpTransformation(html, ENV_DETAILS, paths, fullUrl, pageType) {
    let ampUrl = fullUrl?.href || '';
    let css = '';
    const customStyle = ENV_DETAILS?.sveltekitStyle;
    html = html.replace(/<link rel="preconnect".*?>/g, '')
        .replace(/<link rel="stylesheet".*?>/g, '')
        .replace(/<link rel="preload".*?>/g, '')
        .replace(/<noscript>.*?<\/noscript>/g, '');

    // Initial AMP transformations
    let markup = amp.transform(html)
        .replace('⚡', 'amp')
        .replace(/<style ([^>]*?)>([^]+?)<\/style>/, (match, attributes, contents) => {
            css = contents;
            return `<style ${attributes}></style>`;
        })
        .replace(/<link rel="stylesheet".*?>/g, ''); // Removes all <link rel="stylesheet"> tags

    // Minify and clean CSS
    css = removeImportant(css);
    try {
        css = dropcss({ css, html: markup }).css;
    } catch (error) {
        console.error('Error processing CSS with dropcss:', error);
    }

    markup = markup.replace('</style>', `${css}${customStyle}</style>`);
    markup = insertAmpComponents(markup, ENV_DETAILS,ampUrl);


    // JSON-LD script handling
    if (html.includes(`<script type="application/ld+json">`)) {
        const ldjsonMatches = Array.from(html.matchAll(/<script type="application\/ld\+json">([^]+?)<\/script>/g));
        const ldjsonScripts = ldjsonMatches.map(match => match[1]);
        const individualLdjsonScripts = ldjsonScripts.map(script => `
        <script type="application/ld+json">
            ${script}
        </script>
    `).join('\n');

        markup = markup.replace('</head>', `${individualLdjsonScripts}</head>`);
    }

    return markup;
}

// Insert AMP components dynamically based on content
export function insertAmpComponents(markup, ENV_DETAILS,ampUrl) {
    const ampComponents = [
        { tag: 'amp-social-share', src: 'https://cdn.ampproject.org/v0/amp-social-share-0.1.js' },
        { tag: 'amp-video', src: 'https://cdn.ampproject.org/v0/amp-video-1.0.js' },
        { tag: 'amp-story', src: 'https://cdn.ampproject.org/v0/amp-story-1.0.js' },
        { tag: 'amp-base-carousel', src: 'https://cdn.ampproject.org/v0/amp-base-carousel-0.1.js' },
        { tag: 'amp-carousel', src: 'https://cdn.ampproject.org/v0/amp-carousel-0.1.js' },
        { tag: 'amp-jwplayer', src: 'https://cdn.ampproject.org/v0/amp-jwplayer-0.1.js' },
        { tag: 'amp-facebook', src: 'https://cdn.ampproject.org/v0/amp-facebook-0.1.js' },
        { tag: 'amp-sidebar', src: 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js' },
        { tag: 'amp-instagram', src: 'https://cdn.ampproject.org/v0/amp-instagram-0.1.js' },
        { tag: 'amp-twitter', src: 'https://cdn.ampproject.org/v0/amp-twitter-0.1.js' },
        { tag: 'amp-ad', src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js' },
        { tag: 'amp-youtube', src: 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js' },
        { tag: 'amp-iframe', src: 'https://cdn.ampproject.org/v0/amp-iframe-0.1.js' },
        { tag: 'amp-lightbox', src: 'https://cdn.ampproject.org/v0/amp-lightbox-0.1.js' },
        { tag: 'amp-ima-video', src: 'https://cdn.ampproject.org/v0/amp-ima-video-0.1.js' }
    ];

    ampComponents.forEach(({ tag, src }) => {
        if (markup.includes(`<${tag}`)) {
            const preloadScript = `<link rel="preload" as="script" href="${src}" /><script async  custom-element="${tag}" src="${src}"></script>`;
            markup = markup.replace('</head>', `${preloadScript}</head>`);
        }
    });
    // Special handling for amp-story-auto-ads with configuration
    if (markup.includes('<amp-story') && ENV_DETAILS?.WebStoriesAd) {
        const ampAutoAdsConfig = `
            <amp-story-auto-ads>
                <script type="application/json">
                    {
                        "ad-attributes": {
                            "type": "doubleclick",
                            "data-slot": "${ENV_DETAILS.WebStoriesAd}"
                        }
                    }
                </script>
            </amp-story-auto-ads>
        `;

        // Insert the auto-ads script into the head
        markup = markup.replace('</head>', `
            <script async custom-element="amp-story-auto-ads" src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"></script>
            </head>
        `);

        // Ensure the auto-ads config is added before the closing </amp-story> tag
        markup = markup.replace('</amp-story>', `${ampAutoAdsConfig}</amp-story>`);
    }

    // Insert analytics scriptsq
    markup = markup.replace('</head>', `<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script></head>`);

    markup = insertAnalyticsScripts(markup, ENV_DETAILS,ampUrl);


    return markup;
}

// Insert analytics scripts conditionally
export function insertAnalyticsScripts(markup, ENV_DETAILS,ampUrl) {
    const analyticsScript = getAnalyticsScript(ENV_DETAILS);


    const gtmId = ENV_DETAILS?.gtmAmpCode;


    const ampAnalyticsTag = gtmId
        ? `
        <amp-analytics config="https://www.googletagmanager.com/amp.json?id=${gtmId}&gtm.url=SOURCE_URL" data-credentials="include"></amp-analytics>        `
        : '';

    if (markup.includes('<amp-story')) {
        markup = markup.replace('</amp-story>', `${analyticsScript}</amp-story>`);
    } else {
        markup = markup.replace(
            '<body data-sveltekit-preload-data="hover">',
            `<body data-sveltekit-preload-data="hover">
            ${ampAnalyticsTag}
            ${analyticsScript}`
        );
    }

    return markup;
}


// Generate AMP analytics script based on environment configuration
export function getAnalyticsScript(ENV_DETAILS) {

    const allDomainList = JSON.stringify(ENV_DETAILS?.domains || []);

    return `
    <amp-analytics type="gtag" data-credentials="include">
    <script type="application/json">
   {
     "vars": {
       "gtag_id": "${ENV_DETAILS?.gaCode}",
       "config": {
         "${ENV_DETAILS?.gaCode}": {
           "stream_id": "${ENV_DETAILS?.streamId ?? ''}",
           "groups": "default"
         }
       }
     },
     "linkers": {
       "enabled": true,
       "proxyOnly": false,
       "destinationDomains": ${allDomainList}
     },
     "triggers": {
       "trackPageview": {
         "on": "visible",
         "request": "pageview"
       }
     }
   }
</script>
</amp-analytics>
    `;
}


export function encodeImageName(url: string) {
    if(!url) return '';

    const parts = url.split("/");
    const imageName = parts[parts.length - 1];
    const encodedImageName = imageUrlEncode(imageName, ":");
    parts[parts.length - 1] = encodedImageName;
    const encodedUrl = parts.join("/");

    return encodedUrl;
}

export function imageUrlEncode(str: string, skipChar: string) {
    if (str.includes(skipChar)) {
        // Replace the skipChar with a unique placeholder
        const placeholder = 'PLACEHOLDER';
        const modifiedStr = str.split(skipChar).join(placeholder);
        // Encode the string
        const encodedStr = encodeURIComponent(modifiedStr);
        // Restore the skipChar in the encoded string
        const resultStr = encodedStr.split(encodeURIComponent(placeholder)).join(skipChar);
        return resultStr;
    } else {
        return encodeURIComponent(str);
    }
}


export function rssLink(slug, incremental = false, prefix = "") {
    // Now split the slug and get the first part
    if(!slug) return [];
    let allSlugs = slug.split("/");
    // now generate incremental slugs
    let incrementalSlugs = [];
    if (incremental) {
        for (let i = 0; i < allSlugs.length; i++) {
            incrementalSlugs.push(
                `${prefix}rss/${allSlugs.slice(0, i + 1).join("/")}.xml`,
            );
        }
    } else {
        incrementalSlugs.push(
            `${prefix}rss/${slug}.xml`,
        );
    }

    return incrementalSlugs;
}