

// @ts-nocheck
import moment from "moment-timezone";
import { onDestroy, onMount } from "svelte";
export const ordinalSuffix = (/** @type {string | number} */ i) => {

    // @ts-ignore
    const j = i % 10,
        // @ts-ignore
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + 'st';
    }
    if (j == 2 && k != 12) {
        return i + 'nd';
    }
    if (j == 3 && k != 13) {
        return i + 'rd';
    }
    return i + 'th';
}

/**
 * @param {any} element
 */
export function isInsideBlockquote(element) {
    let currentElement = element;
    while (currentElement.type) {
        if (currentElement.type === 'blockquote') {
            return true;
        }
        currentElement = currentElement.type;
    }
    return false;
}

export const timeToRead = (/** @type {number} */ text) => {
    if (!text) {
        return '';
    }
    const wordsPerMinute = 200;
    const estimatedReadingTimeMinutes = text / wordsPerMinute;
    const time_to_read = Math.ceil(estimatedReadingTimeMinutes);
    if (time_to_read < 60) {
        return `${Math.ceil(time_to_read)} min read`
    } else {
        const hours = Math.floor(time_to_read / 60);
        const minutes = Math.ceil(time_to_read % 60);
        return `${hours} hr ${minutes} min read`
    }
};

/**
 * @param {string} text
 */
export function slugify(text) {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters except dashes
        .replace(/-+/g, '-') // Replace multiple dashes with a single dash
        .replace(/^-|-$/g, ''); // Trim dashes from the start and end
}


export function extractInstagramID(url) {
    if (!url) {
        return null;
    }

    // Updated regular expression to match both post and reel URLs
    const regExp =
        /(?:http[s]?:\/\/)?(?:www.)?instagram.com\/(p|tv|reel)\/([A-Za-z0-9-_]+)/;
    const match = url.match(regExp);

    if (match && match[2]) {
        // The post ID is in match[2], but it might be followed by additional URL parameters.
        // We split it by '/' and take the first part to ensure we only get the ID.
        const postId = match[2].split("/")[0];
        return postId;
    } else {
        return null; // In case the URL is not a valid Instagram post URL
    }
}

export function extractFacebookPostID(url) {
    if (!url) {
        return null;
    }
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname.endsWith("facebook.com")) {
            const hrefParam = urlObj.searchParams.get("href");
            return hrefParam ? decodeURIComponent(hrefParam) : null;
        }
    } catch (error) {
        console.error("Invalid URL:", error);
    }
    return null;
}

export function extractYouTubeID(url) {
    if (!url) {
        return null;
    }
    const regExp =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    return match ? match[1] : null;
}

export function extractTwitterID(url) {
    if (!url) {
        return null;
    }
    const regExp = /^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?\w+\/status(?:es)?\/(\d+)/;
    const match = url.match(regExp);

    return match?.length > 0 ? match[1] : null;
}

/**
 * Transforms social media embeds to AMP components.
 * @param {string} content - The HTML content containing social media embeds.
 * @returns {string} Transformed HTML content with AMP components.
 * @param {any} extractInstagramID
 * 
 */

export function transformSocialEmbeds(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const root = doc.body;
    const replaceEmbedsWithAMP = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();
            if (tag === 'iframe' || tag === 'blockquote' || tag === 'a') {
                if (tag === 'blockquote' && node.getAttribute('class') === 'twitter-tweet') {
                    Array.from(node.childNodes).forEach(child => {
                        if (child.nodeType === Node.TEXT_NODE || (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'p')) {
                            node.removeChild(child);
                        }
                    });
                }
                const src = node.getAttribute('src') || node.getAttribute('data-instgrm-permalink') || node.getAttribute('href');
                if (src) {
                    const youtubeMatchId = extractYouTubeID(src);
                    const twitterMatchId = extractTwitterID(src);
                    const facebookMatchId = extractFacebookPostID(src);
                    const instagramMatchId = extractInstagramID(src);

                    if (youtubeMatchId) {
                        const ampElement = document.createElement('amp-youtube');
                        ampElement.setAttribute('width', '480');
                        ampElement.setAttribute('height', '270');
                        ampElement.setAttribute('layout', 'responsive');
                        ampElement.setAttribute('data-videoid', youtubeMatchId);
                        node.parentNode.replaceChild(ampElement, node);
                        const script = document.createElement("script");
                        script.src = 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js';
                        script.customElement = "amp-youtube";
                        script.defer = true;
                        document.head.appendChild(script);
                        const ampScriptId = document.getElementById("amp-script");
                        if (!ampScriptId) {
                            const script = document.createElement("script");
                            script.src = 'https://cdn.ampproject.org/v0.js';
                            script.defer = true;
                            script.id = "amp-script";
                            document.head.appendChild(script);
                        }
                    } else if (twitterMatchId) {
                        const ampElement = document.createElement('amp-twitter');
                        ampElement.setAttribute('width', '375');
                        ampElement.setAttribute('height', '472');
                        ampElement.setAttribute('layout', 'responsive');
                        ampElement.setAttribute('data-tweetid', twitterMatchId);
                        node.parentNode.replaceChild(ampElement, node);
                        const script = document.createElement("script");
                        script.src = 'https://cdn.ampproject.org/v0/amp-twitter-0.1.js';
                        script.customElement = "amp-twitter";
                        script.defer = true;
                        document.head.appendChild(script);
                        const ampScriptId = document.getElementById("amp-script");
                        if (!ampScriptId) {
                            const script = document.createElement("script");
                            script.src = 'https://cdn.ampproject.org/v0.js';
                            script.defer = true;
                            script.id = "amp-script";
                            document.head.appendChild(script);
                        }
                    } else if (instagramMatchId) {
                        const ampElement = document.createElement('amp-instagram');
                        ampElement.setAttribute('data-shortcode', instagramMatchId);
                        ampElement.setAttribute('width', '1');
                        ampElement.setAttribute('height', '1');
                        ampElement.setAttribute('layout', 'responsive');
                        node.parentNode.replaceChild(ampElement, node);
                        const script = document.createElement("script");
                        script.src = 'https://cdn.ampproject.org/v0/amp-instagram-0.1.js';
                        script.customElement = "amp-instagram";
                        script.defer = true;
                        document.head.appendChild(script);
                        const ampScriptId = document.getElementById("amp-script");
                        if (!ampScriptId) {
                            const script = document.createElement("script");
                            script.src = 'https://cdn.ampproject.org/v0.js';
                            script.defer = true;
                            script.id = "amp-script";
                            document.head.appendChild(script);
                        }
                    } else if (facebookMatchId) {
                        const ampElement = document.createElement('amp-facebook');
                        ampElement.setAttribute('width', '552');
                        ampElement.setAttribute('height', '303');
                        ampElement.setAttribute('layout', 'responsive');
                        ampElement.setAttribute('data-href', facebookMatchId);
                        node.parentNode.replaceChild(ampElement, node);
                        const script = document.createElement("script");
                        script.src = 'https://cdn.ampproject.org/v0/amp-facebook-0.1.js';
                        script.customElement = "amp-facebook";
                        script.defer = true;
                        document.head.appendChild(script);
                        const ampScriptId = document.getElementById("amp-script");
                        if (!ampScriptId) {
                            const script = document.createElement("script");
                            script.src = 'https://cdn.ampproject.org/v0.js';
                            script.defer = true;
                            script.id = "amp-script";
                            document.head.appendChild(script);
                        }
                    }
                }
            }
        }
        else if (node.nodeType === Node.TEXT_NODE) {
            // Handle text nodes if necessary
        }

        // Recursively traverse child nodes
        const children = [...node.childNodes];
        for (const child of children) {
            replaceEmbedsWithAMP(child);
        }
    };

    replaceEmbedsWithAMP(root);

    return root.innerHTML;
}

/**
 * @param {string} title
 */
export function generateSlug(title) {
    title = title.replace(/(\s)'/g, '$1-')
    title = title.replace(/([^'])'/g, '$1-')
    return slugify(title)
}

export const formatDate = (/** @type {string | number | Date} */ inputDate) => {
    const date = moment(inputDate);
    return date.tz('Asia/Kolkata').format('HH:mm z, MMMM Do YYYY');
}

// Function to get ordinal suffix for day (e.g., 1st, 2nd, 3rd, etc.)
export const getOrdinalSuffix = (/** @type {number} */ day) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export const ConvertDateFormat = (originalDate) => {
    return moment(originalDate).fromNow()
}

export const getLanguage = () => {
    if (typeof window !== 'undefined') {
        const domain = window.location.hostname;
        if (domain === "svelte-hindi.republicworld.com" || domain === "svelte-prod-hindi.republicworld.com") {
            return "H";
        } else if (domain === "svelte.republicworld.com" || domain === "svelte-prod.republicworld.com") {
            return "E";
        }
    }
    // Default language if window object is not defined or domain doesn't match
    return "E";
};

export const getTimeAndDateSeperatedFromDate = (inputDateTime) => {
    const inputDate = new Date(inputDateTime);

    const timeOptions = { hour: 'numeric', minute: '2-digit' };
    const timeFormatted = inputDate.toLocaleTimeString('en-US', timeOptions);

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = inputDate.toLocaleDateString('en-US', dateOptions);

    const result = {
        timeFormatted: `Updated: ${timeFormatted}`,
        dateFormatted: dateFormatted,
    };

    return result;
};


export function removeLeadingSlash(inputString) {
    if (inputString?.startsWith('/')) {
        return inputString?.slice(1); // Remove the leading slash
    } else {
        return inputString; // String does not start with a slash, return as is
    }
}

// Image Url Helper
export function getImageUrl(story) {
    return story?.images?.versions?.["16_9"]?.filePath || "";
}

const formatSecondsToTime = (seconds = 120) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let formattedTime = "";

    if (hours > 0) {
        const formattedHours = String(hours).padStart(2, "0");
        formattedTime += `${formattedHours}:`;
    }

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    formattedTime += `${formattedMinutes}:${formattedSeconds}`;

    return formattedTime;
};

export function interpretAQI(aqi) {
    if (aqi >= 0 && aqi <= 50) {
        return { text: 'Good', colorClass: 'good' };
    } else if (aqi >= 51 && aqi <= 100) {
        return { text: 'Satisfactory', colorClass: 'satisfactory' };
    } else if (aqi >= 101 && aqi <= 200) {
        return { text: 'Moderate', colorClass: 'moderate' };
    } else if (aqi >= 201 && aqi <= 300) {
        return { text: 'Poor', colorClass: 'poor' };
    } else if (aqi >= 301 && aqi <= 400) {
        return { text: 'Very Poor', colorClass: 'veryPoor' };
    } else {
        return { text: 'Severe', colorClass: 'severe' };
    }
}

export function capitalizeFirstLetter(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export function generateBreadCrumbs(storyData) {
    let breadcrumbSegments = [];
    let midHeading = '';

    if (storyData?.completeSlug) {
        breadcrumbSegments = storyData.completeSlug.split('/').filter((segment) => segment.trim() !== '');

        // Extract the last segment and replace it with mid_heading from storyData
        if (storyData?.mid_heading) {
            breadcrumbSegments.pop(); // Remove the last segment
            breadcrumbSegments.push({ title: storyData.mid_heading, link: '' });
            midHeading = storyData.mid_heading;
        }

        // Capitalize each segment and create objects with titles and links
        breadcrumbSegments = breadcrumbSegments.map((segment, index) => ({
            title: index === breadcrumbSegments?.length - 1 ? (storyData?.mid_heading ? storyData.mid_heading : capitalizeFirstLetter(segment)) : capitalizeFirstLetter(segment),
            link: index === breadcrumbSegments?.length - 1 ? (storyData?.mid_heading ? '' : breadcrumbSegments?.slice(0, index + 1).join('/')) : breadcrumbSegments?.slice(0, index + 1).join('/')
        }));

    }

    return breadcrumbSegments;
}

export const MARKET_INDICES = {
    nifty50: {
        value: 'Nifty 50',
        display: 'Nifty 50'
    },
    niftyBank: {
        value: 'Nifty Bank',
        display: 'Nifty Bank'
    },
    niftyIT: {
        value: 'Nifty IT',
        display: 'Nifty IT'
    },
    niftyPharma: {
        value: 'Nifty Pharma',
        display: 'Nifty Pharma'
    },
    niftyAuto: {
        value: 'Nifty Auto',
        display: 'Nifty Auto'
    },
    nifty100: {
        value: 'Nifty 100',
        display: 'Nifty 100'
    },
    niftyMidCap50: {
        value: 'Nifty Midcap 50',
        display: 'Nifty Midcap 50'
    },
    niftySmallCap50: {
        value: 'Nifty Smallcap 50',
        display: 'Nifty Smallcap 50'
    },
    niftyOilGas: {
        value: 'Nifty Oil & Gas',
        display: 'Nifty Oil & Gas'
    },
    niftyFMCG: {
        value: 'Nifty FMCG',
        display: 'Nifty FMCG'
    },
}

export const MARKET_INDICES_TICKER = {
    nifty50: {
        value: 'Nifty 50',
        display: 'Nifty 50'
    },
    niftyBank: {
        value: 'Nifty Bank',
        display: 'Nifty Bank'
    },
    niftyIT: {
        value: 'Nifty IT',
        display: 'Nifty IT'
    },
    niftyPharma: {
        value: 'Nifty Pharma',
        display: 'Nifty Pharma'
    },
    niftyAuto: {
        value: 'Nifty Auto',
        display: 'Nifty Auto'
    },
    nifty100: {
        value: 'Nifty 100',
        display: 'Nifty 100'
    },
    nifty500: {
        value: 'Nifty 500',
        display: 'Nifty 500'
    },
    niftyMidCap50: {
        value: 'Nifty Midcap 50',
        display: 'Nifty Midcap 50'
    },
    niftyMidCap150: {
        value: 'Nifty Midcap 150',
        display: 'Nifty Midcap 150'
    },
    indiaVix: {
        value: 'INDIA VIX',
        display: 'INDIA VIX'
    },
    niftySmallCap50: {
        value: 'Nifty Smallcap 50',
        display: 'Nifty Smallcap 50'
    },
    niftyOilGas: {
        value: 'Nifty Oil & Gas',
        display: 'Nifty Oil & Gas'
    },
    niftyFMCG: {
        value: 'Nifty FMCG',
        display: 'Nifty FMCG'
    },
    niftyMetal: {
        value: 'NIFTY METAL',
        display: 'NIFTY METAL'
    },
    niftyMedia: {
        value: 'NIFTY MEDIA',
        display: 'NIFTY MEDIA'
    },
    niftyPSUBank: {
        value: 'NIFTY PSU BANK',
        display: 'NIFTY PSU BANK'
    },
    niftyPSUBank: {
        value: 'NIFTY PRIVATE BANK',
        display: 'NIFTY PRIVATE BANK'
    },
    niftyRealty: {
        value: 'NIFTY REALTY',
        display: 'NIFTY REALTY'
    },
    niftyComodities: {
        value: 'NIFTY COMMODITIES',
        display: 'NIFTY COMMODITIES'
    },
    niftyEnergy: {
        value: 'NIFTY ENERGY',
        display: 'NIFTY ENERGY'
    },
    niftyCOTTONCNDY: {
        value: 'COTTONCNDY',
        display: 'COTTONCNDY'
    },
    niftyNATURALGAS: {
        value: 'NATURALGAS',
        display: 'NATURALGAS'
    },
    niftyNATGASMINI: {
        value: 'NATGASMINI',
        display: 'NATGASMINI'
    },
    niftyGOLDGUINEA: {
        value: 'GOLDGUINEA',
        display: 'GOLDGUINEA'
    },
    niftyGOLDM: {
        value: 'GOLDM',
        display: 'GOLDM'
    },
    niftyMENTHAOIL: {
        value: 'MENTHAOIL',
        display: 'MENTHAOIL'
    },
    niftyZINC: {
        value: 'ZINC',
        display: 'ZINC'
    },
    niftyGOLDGUINEA: {
        value: 'GOLDGUINEA',
        display: 'GOLDGUINEA'
    },
    niftyZINCMINI: {
        value: 'ZINCMINI',
        display: 'ZINCMINI'
    },
    niftyALUMINIUM: {
        value: 'ALUMINIUM',
        display: 'ALUMINIUM'
    },
    niftyALUMINI: {
        value: 'ALUMINI',
        display: 'ALUMINI'
    },
    niftyLEAD: {
        value: 'LEAD',
        display: 'LEAD'
    },
    niftyLEADMINI: {
        value: 'LEADMINI',
        display: 'LEADMINI'
    },
    niftyCRUDEOIL: {
        value: 'CRUDEOIL',
        display: 'CRUDEOIL'
    },
    niftyCRUDEOILM: {
        value: 'CRUDEOILM',
        display: 'CRUDEOILM'
    },
    niftySILVER: {
        value: 'SILVER',
        display: 'SILVER'
    },
    niftySILVERMIC: {
        value: 'SILVERMIC',
        display: 'SILVERMIC'
    },
}

export function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }
}


export const SOCIAL_PLATFORM = {
    WHATSAPP_WEB: {
        value: "WHATSAPP_WEB",
        display: "Whatsapp",
        createShareableLink: (shareUrl) =>
            `https://web.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
    },
    WHATSAPP_APP: {
        value: "WHATSAPP_APP",
        display: "Whatsapp",
        createShareableLink: (shareUrl) =>
            `whatsapp://send?text=${encodeURIComponent(shareUrl)}`,
    },
    FACEBOOK: {
        value: "FACEBOOK",
        display: "Facebook",
        createShareableLink: (shareUrl) =>
            `https://www.facebook.com/share.php?u=${encodeURIComponent(shareUrl)}`,
    },
    TWITTER: {
        value: "TWITTER",
        display: "Twitter",
        createShareableLink: (shareUrl) =>
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareUrl)}`,
    },
};

export const generateShareLink = (platform, customURL) => {
    if (typeof window !== 'undefined') {
        const shareUrl = customURL ? `${window.location.host}/${customURL}` : `${window.location.host}${window.location.pathname}`;
        const finalShareUrl =
            SOCIAL_PLATFORM?.[platform]?.createShareableLink(shareUrl);
        return finalShareUrl;
    }
};

export const getHomeTextFromLanguage = (language) => ({
    E: "News",
    H: "Hindi News",
}[language] || "News"); // Default to "Home" if language is not found

export const getLoadMoreLabel = (language, category) => {

    const categoryWords = category?.split(" ");

    // Default "More News" if language is not found
    return {
        E: `More ${category || ""} ${categoryWords?.includes("News") ? "" : "News"}`,
        RB: `More ${category || ""} ${categoryWords?.includes("News") ? "" : "News"}`,
        H: "और देखें",
        // B: "",
        KA: "ಇನ್ನಷ್ಟು",
    }[language] || "More News"
};

export const getViewAllUpdateText = (language) => ({
    E: `View All Updates`,
    RB: `View All Updates`,
    H: "और देखें",
    // B: "",
    KA: "ಇನ್ನಷ್ಟು ಓದಿ",
}[language] || "View All Updates");


export const getViewMoreLabel = (language) => ({
    E: `View More`,
    RB: `View More`,
    H: "और देखें",
    // B: "",
    KA: "ಇನ್ನಷ್ಟು",
}[language] || "View More");


export const getCalculatorTextFromLanguage = (language) => ({
    E: "Calculator",
    H: "कैलकुलेटर",
    RB: "Calculator",
    B: "ক্যালকুলেটর",
    KA: "ಕ್ಯಾಲ್ಕುಲೇಟರ್",
}[language] || "Calculator");

// intersectionObserver.js

export function useIntersectionObserver(targetId, threshold = 0.1, callback) {
    let loaded = false;

    onMount(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loaded) {
                    callback();
                    loaded = true;
                }
            },
            {
                root: null,
                threshold,
            }
        );

        const target = document.getElementById(targetId);
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    });
}

export function useIntersectionObserverforLiveBlogItems(refs, threshold = 0.1, onIntersect) {
    let cleanupObserver;

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = refs.indexOf(entry.target);
                if (index !== -1) {
                    onIntersect(index); // Call the intersection callback with the index
                }
            }
        });
    }, {
        rootMargin: '0px',
        threshold: threshold, // Trigger when a percentage of the item is visible
    });

    // Setup on mount
    onMount(() => {
        refs.forEach(ref => {
            if (ref) {
                observer.observe(ref); // Start observing each ref
            }
        });

        // Return cleanup function
        cleanupObserver = () => {
            refs.forEach(ref => {
                if (ref) {
                    observer.unobserve(ref); // Stop observing each ref
                }
            });
        };
    });

    // Cleanup on destroy
    onDestroy(() => {
        if (cleanupObserver) {
            cleanupObserver(); // Cleanup the observer
        }
    });
}

export function loadMgidScript(language) {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        const script = document.createElement("script");
        const scriptSources = {
            'E': "https://jsc.mgid.com/site/958314.js",
            'H': "https://jsc.mgid.com/site/958315.js",
            'RB': "https://jsc.mgid.com/site/960470.js",
            'B': "https://jsc.mgid.com/site/958318.js",
            'KA': "https://jsc.mgid.com/site/958317.js",
        };
        script.src = scriptSources[language] || scriptSources['E'];
        script.defer = true;
        document.body.appendChild(script);
    }
}

export const getSeoData = (language) => ({
    E: {
        title: "Financial Calculators | EMI, FD, SIP, Compound Interest, Currency & More- Try Now at Republicworld",
        description: "Use our range of financial calculators including Compound Interest Calculator, FD Calculator, EMI Calculator, Simple Interest Calculator, SIP Calculator, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, and more. Easily compute your savings, investments, and loan interests in India.",
        keywords: "Compound Interest Calculator, FD Calculator, EMI Calculator, SIP Calculator, Simple Interest Calculator India, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, Financial Calculators, Deposit Calculator",
    },
    H: {
        title: "Financial Calculators | EMI, FD, SIP, Compound Interest, Currency & More- Try Now at Republic Bharat",
        description: "Use our range of financial calculators including Compound Interest Calculator, FD Calculator, EMI Calculator, Simple Interest Calculator, SIP Calculator, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, and more. Easily compute your savings, investments, and loan interests in India.",
        keywords: "Compound Interest Calculator, FD Calculator, EMI Calculator, SIP Calculator, Simple Interest Calculator India, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, Financial Calculators, Deposit Calculator",
    },
    RB: {
        title: "Financial Calculators | EMI, FD, SIP, Compound Interest, Currency & More- Try Now at Republic Business",
        description: "Use our range of financial calculators including Compound Interest Calculator, FD Calculator, EMI Calculator, Simple Interest Calculator, SIP Calculator, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, and more. Easily compute your savings, investments, and loan interests in India.",
        keywords: "Compound Interest Calculator, FD Calculator, EMI Calculator, SIP Calculator, Simple Interest Calculator India, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, Financial Calculators, Deposit Calculator",
    },
    B: {
        title: "Financial Calculators | EMI, FD, SIP, Compound Interest, Currency & More- Try Now at Republic Bangla",
        description: "Use our range of financial calculators including Compound Interest Calculator, FD Calculator, EMI Calculator, Simple Interest Calculator, SIP Calculator, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, and more. Easily compute your savings, investments, and loan interests in India.",
        keywords: "Compound Interest Calculator, FD Calculator, EMI Calculator, SIP Calculator, Simple Interest Calculator India, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, Financial Calculators, Deposit Calculator",
    },
    KA: {
        title: "Financial Calculators | EMI, FD, SIP, Compound Interest, Currency & More- Try Now at Republic Kannada",
        description: "Use our range of financial calculators including Compound Interest Calculator, FD Calculator, EMI Calculator, Simple Interest Calculator, SIP Calculator, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, and more. Easily compute your savings, investments, and loan interests in India.",
        keywords: "Compound Interest Calculator, FD Calculator, EMI Calculator, SIP Calculator, Simple Interest Calculator India, RD Calculator, Currency Calculator, EPF Calculator, NPS Calculator, Financial Calculators, Deposit Calculator",
    },
}[language] || {});

export function loadUnibotScript(language, callback) {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const scriptIds = {
        'E': "republicworld1.com_1719637493308",
        'H': "republicbharat.com_1719829339250"
    };

    const scriptId = scriptIds[language];
    if (!scriptId) return; // Exit if language is not supported

    const loadScript = (src, onLoad) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.defer = true;
        script.src = src;
        script.onload = onLoad;
        document.head.appendChild(script);
    };

    loadScript("https://cdn.unibotscdn.com/player/mvp/player.js", () => {
        const inlineScript = document.createElement("script");
        inlineScript.type = "text/javascript";
        inlineScript.textContent = `
            window.unibots = window.unibots || { cmd: [] };
            unibots.cmd.push(function() { unibotsPlayer("${scriptId}") });
        `;
        document.head.appendChild(inlineScript);
        if (callback) callback();
    });
}




export function loadVdoAiScript(vdoaiId) {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        const script = document.createElement("script");
        script.src = `//a.vdo.ai/core/${vdoaiId}/vdo.ai.js`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
    }
}

export function convertToTimeZone(timestamp) {
    // set asia time zone using moment timezone need ISO format
    const asiaTime = moment.utc(timestamp).tz('Asia/Kolkata').format();
    return asiaTime;
}

// Utility function to conditionally generate JSON-LD script
export function generateConditionalJsonLdScript(data) {
    if (Object.keys(data).length > 0) {
        return generateJsonLdScript(data);
    }
    return null;
}

export const generateJsonLdScript = (schema) => {
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
};

export function jwPlayerVideoUrl(videoId) {
    return `https://cdn.jwplayer.com/videos/${videoId}.mp4`;
}

export function convertDurationToISO8601(durationInSeconds = 120) {
    var duration = Math.trunc(durationInSeconds);
    var hours = Math.floor(duration / 3600);
    var minutes = Math.floor((duration % 3600) / 60);
    var seconds = duration % 60;

    return `PT${hours}H${minutes}M${seconds}S`;
}

export function stripHtmlAndEscape(html, lang) {

    if (!html) return '';

    // Step 1: Remove HTML tags
    let result = html?.replace(/<\/?[^>]+(>|$)/g, "");

    // Step 2: Escape special characters
    result = result?.replace(/[&<>"'\/\\]/g, function (match) {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#39;';
            case '/': return '&#47;';
            case '\\': return '&#92;';
            default: return match;
        }
    });

    return result;
}

export function keywordsSanitized(keywords) {

    if (!keywords) return '';

    let result = keywords?.replace(/<\/?[^>]+(>|$)/g, "");

    result = result?.replace(/[&<>"'\/\\]/g, function (match) {
        switch (match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case '/': return '&#47;';
            case '\\': return '&#92;';
            default: return match;
        }
    });

    return result;
}



export default formatSecondsToTime;


export function getWidthValue(totalParts, currentPart) {
    const eachPart = 100 / parseInt(String(totalParts || "0"));
    return eachPart * parseInt(String(currentPart || "0"));
};

export function getTotalPartCount(device, eachWidget) {
    if (device === "desktop") {
        return eachWidget?.story?.reduce((result, currectValue) => {
            result =
                result +
                parseInt(String(currectValue?.widget?.dGrid) || " 0");

            return result;
        }, 0);
    } else {
        return 1;
    }
};

export function add24HoursToDate(dateString) {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 24);
    return date.toISOString();
}

export function isValidSlug(slug) {
    if (typeof slug !== 'string') {
        return false;
    }

    // Define the regex pattern for a valid slug
    const regex = /^[a-z0-9]+(?:[-/][a-z0-9]+)*$/;

    // Test the slug against the regex pattern
    return regex.test(slug);
}

export const cleanHref = (element) => {
    if (element && element.tagName === 'A' && element.hasAttribute('href')) {
        const hrefValue = element.getAttribute('href');

        if (
            !(hrefValue.startsWith('http://') || hrefValue.startsWith('https://')) ||
            hrefValue.includes(' ') ||
            hrefValue.includes('.html') ||
            hrefValue.startsWith('\\')
        ) {
            element.setAttribute('href', '#');
        }
    }
};

export const replaceWithFigcaptionText = (element) => {
    if (element) {
        const textContent = element.textContent || '';
        const figcaptionElement = element.ownerDocument.createElement('figcaption');
        figcaptionElement.textContent = textContent.trim(); // Set plain text content
        element.replaceWith(figcaptionElement); // Replace the original element
    }
};

export const getTemplate = (device, widgetInfo) => {
    if (device === 'mobile' && widgetInfo?.["mTemplate"]) {
        return widgetInfo?.["mTemplate"]
    }

    return widgetInfo?.["template"]
}

export const getTemplateType = (device, widgetInfo) => {
    if (device === 'mobile' && widgetInfo?.["mTemplateType"]) {
        return widgetInfo?.["mTemplateType"]
    }

    return widgetInfo?.["templateType"]
}

// Function to get the value of a cookie by name
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to set a cookie with an expiration time of 1 hour
export function setCookie(name, value, date) {
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}


export function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(document.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function setUTMParatemerToCookies() {
    var utm_source = getParameterByName('utm_source');
    var utm_medium = getParameterByName('utm_medium');
    var utm_campaign = getParameterByName('utm_campaign');
    var utm_term = getParameterByName('utm_term');
    var utm_content = getParameterByName('utm_content');
    const date = new Date();
    date.setTime(date.getTime() + 1 * 60 * 30 * 1000);
    if (utm_source) {
        setCookie('utm_source', utm_source, date);
    }
    if (utm_medium) {
        setCookie('utm_medium', utm_medium, date);

    }
    if (utm_campaign) {
        setCookie('utm_campaign', utm_campaign, date);
    }
    if (utm_term) {
        setCookie('utm_term', utm_term, date);
    }
    if (utm_content) {
        setCookie('utm_content', utm_content, date);
    }
}

export function getAllUTMCookies() {

    let utm_source = getCookie('utm_source')
    let utm_medium = getCookie('utm_medium')
    let utm_campaign = getCookie('utm_campaign')
    let utm_term = getCookie('utm_term')
    let utm_content = getCookie('utm_content')

    const allUTMCookies = [utm_source, utm_medium, utm_campaign, utm_term, utm_content]
        .filter(cookie => cookie !== null)
        .join('-');
    return allUTMCookies;

}

export function getComScoreCookieConsent() {

    if (getCookie('cookie_consent') && getCookie('cs_ucfr')) {
        return "1"
    } else if (getCookie('cookie_consent')) {
        return "0"
    } else {
        return ""
    }
}


export function renderGPTAds() {
    const googletag = window.googletag || { cmd: [] };
    const adSlots = window.singleRequestAds;

    function defineAndDisplayAds() {
        if (!adSlots || adSlots.length === 0) {
            console.warn("Ad slots not ready, retrying...");
            setTimeout(defineAndDisplayAds, 1000); // Retry after 1 second
            return;
        }

        googletag.cmd.push(function () {
            // adSlots.forEach(slotData => {
            //     const { id, slot, size, elementId } = slotData;
            //     googletag.defineSlot(slot, size, elementId).addService(googletag.pubads());
            // });
            adSlots.forEach(slotData => {
                const { elementId, slot } = slotData;
                googletag.display(elementId);
                console.log("Displaying ad slot:", elementId, slot);
            });
        });
    }

    // Start the process
    setTimeout(defineAndDisplayAds, 2000); // Initial delay of 1 second
}


export function parseSizeString(sizeString) {
    try {
        // Clean the string by removing newlines, excessive spaces, and trailing commas
        const cleanedString = sizeString
            .replace(/[\n\s]+/g, '')  // Remove newlines and extra spaces
            .replace(/,\s*(?=\])/g, '') // Remove trailing commas inside the arrays
            .replace(/x/g, ',');  // Remove trailing commas inside the arrays


        return JSON.parse(cleanedString);

    } catch (e) {

        console.log(sizeString, e);

        return [];
    }
}




export function isEuropeanTimezone(timezone) {
    const europeanTimezones = moment.tz.names().filter(tz => tz.startsWith('Europe/'));
    return europeanTimezones.includes(timezone);
}
export function reverseSlug(slug) {
    let stateName = slug.replace(/-/g, " ");

    stateName = stateName.toUpperCase();

    return stateName;
}
export function toSlug(stateName) {
    let slug = stateName.toLowerCase();

    slug = slug.replace(/ /g, "-");

    return slug;
}

