import { cleanHref, extractFacebookPostID, extractInstagramID, extractTwitterID, extractYouTubeID, isValidSlug, replaceWithFigcaptionText, SOCIAL_PLATFORM } from '$lib/components/utils/utils.js';
import { redirect, error as serror } from '@sveltejs/kit';
import { fetchCategory, fetchGainersLoosets, fetchLatestStory, fetchMarketIndices, fetchPageType, fetchRightBarData, fetchShortsStory, fetchStory, fetchTrendingStories, fetchVedioStory, fetchWebStoryDetail } from '../../api/fetchData';
import { JSDOM } from 'jsdom';
import { logErrorTodb } from '../../api/postData';
import facebook from "$lib/assets/images/facebook.svg";
import twitter from "$lib/assets/images/x-circle.svg";
import whatsapp from "$lib/assets/images/whatsapp.svg";
import { EnvironmentConfig } from '$lib/components/utils/environmentConfig';
import { getParentCategories } from '$lib/utils/common';

function cleanSlug(slug: string): string {
    return slug.replace(/\.news/g, '').replace(/\.html/g, '');
}

export async function load(props: { request: { headers: { get: (arg0: string) => string; }; }; url: { href: any; }; }) {
    const { params, locals, url }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const preview = url.searchParams.get('preview');
    const { deviceType, language } = locals;
    let slug = cleanSlug(params.slug);
    const categorySlug = slug.split('/')[0];
    const isAmp = locals.isAmp

    const langBasedLivTvID: any = {
        E: "ADe4psmE",
        H: "jBWcDH3F",
        RB: "ADe4psmE",
    };

    let livetv_video_id = '';



    if (categorySlug === 'quick' && isAmp) {
        throw redirect(301, `/${slug}`);
    }

    if (!isValidSlug(slug)) {
        throw redirect(301, '/404');
    }

    try {
        const { data } = await fetchPageType(language, slug) ?? {};
        const pageType = data?.data?.pageType;

        if (categorySlug === 'shorts' && pageType == 'Story') {
            throw redirect(301, `/${slug}`);
        }

        // Redirect to the correct page if the page type is different
        if (categorySlug === 'web-stories' && pageType == 'Story') {
            throw redirect(301, `/${slug}`);
        }

        let storyResponsePromise = null,
            categoryResponsePromise = null,
            videoResponsePromise = null,
            trendingResponsePromise = null,
            latestResponsePromise = null,
            shortsResponsePromise = null,
            webStoryResponsePromise = null,
            rightSideBarResponsePromise = null,
            gainerAndLoosersPromise = null,
            marketPromise = null;

        if (pageType === 'Category') {
            categoryResponsePromise = fetchCategory(language, slug);
            if (language === 'RB') {
                gainerAndLoosersPromise = fetchGainersLoosets(language, 5);
                marketPromise = fetchMarketIndices(language);
            }
        } else if (pageType === 'Story') {
            if (['the-debate', 'shows', 'videos'].includes(categorySlug)) {
                videoResponsePromise = fetchVedioStory(language, slug);
                latestResponsePromise = fetchLatestStory(language, categorySlug);
            } else if (categorySlug === 'web-stories') {
                webStoryResponsePromise = fetchWebStoryDetail(language, slug);
            } else if (categorySlug === 'shorts') {
                shortsResponsePromise = fetchShortsStory(language, slug);
            } else {
                storyResponsePromise = fetchStory(language, slug, preview);
            }

            if (!['web-stories', 'shorts'].includes(categorySlug)) {
                rightSideBarResponsePromise = fetchRightBarData(language);
                trendingResponsePromise = fetchTrendingStories(language);
            }
        }

        const [
            storyResponse,
            categoryResponse,
            videoResponse,
            trendingResponse,
            latestResponse,
            shortsResponse,
            webStoryResponse,
            rightSideBar,
            gainerAndLoosers,
            market
        ] = await Promise.all([
            storyResponsePromise,
            categoryResponsePromise,
            videoResponsePromise,
            trendingResponsePromise,
            latestResponsePromise,
            shortsResponsePromise,
            webStoryResponsePromise,
            rightSideBarResponsePromise,
            gainerAndLoosersPromise,
            marketPromise
        ].map(p => p || Promise.resolve(null)));

        let getParentCategory = getParentCategories(language)

        if (videoResponse?.data?.storyDetails?.[0]?.video) {
            try {
                const response = await fetch(
                    `https://content.jwplatform.com/v2/media/${videoResponse?.data?.storyDetails?.[0]?.video?.id}`,
                );

                if (response.status == 200) {
                    livetv_video_id = videoResponse?.data?.storyDetails?.[0]?.video?.id;
                } else {
                    livetv_video_id = langBasedLivTvID[language];
                }

            } catch (error) {
                console.error("Error validating video ID:", error);
                livetv_video_id = langBasedLivTvID[language];
            }

        }

        if (webStoryResponse?.data?.data?.redirect_url && webStoryResponse.data.data.redirect_url !== `/${slug}`) {
            throw redirect(301, `/${webStoryResponse.data.data.redirect_url}`);
        }
        if (videoResponse?.data?.redirect_url && videoResponse?.data?.redirect_url !== `/${slug}`) {
            throw redirect(301, `/${videoResponse.data.redirect_url}`);
        }
        if (shortsResponse?.data?.data?.redirect_url && shortsResponse?.data?.data?.redirect_url !== `/${slug}`) {
            throw redirect(301, `/${shortsResponse.data.data.redirect_url}`);
        }
        if (storyResponse?.data?.data?.redirect_url && storyResponse.data.data.redirect_url !== slug) {
            throw redirect(301, `/${storyResponse.data.data.redirect_url}`);
        }
        if (storyResponse?.data?.data?.story?.[0]?.redirect_url && storyResponse.data.data.story[0].redirect_url !== slug && storyResponse.data.data.story[0].redirect_url !== `/${slug}`) {
            throw redirect(301, storyResponse.data.data.story[0].redirect_url);
        }

        let descriptionContent = [];
        let videoStoryDescription = [];
        if (isAmp) {
            const storyType = storyResponse?.data?.data?.story?.[0]?.story_type;
            const storyContent = storyResponse?.data?.data?.story?.[0];
            if (storyType === "DEEP-FOCUS") {
                descriptionContent = processDeepFocusAndLiveBlogStoryDescripton(storyContent?.deep_focus?.content || '', deviceType, locals.ENV_DETAILS, storyContent);
            } else if (storyType === "LIVE-BLOG") {
                descriptionContent = processDeepFocusAndLiveBlogStoryDescripton(storyContent?.live_blog_texts || '', deviceType, locals.ENV_DETAILS, storyContent);
            } else if (["VIDEO", "SHOW", "DEBATE"].includes(videoResponse?.data?.storyDetails?.[0]?.story_type)) {
                videoStoryDescription = processVideoShowsDebateStoryDescription(videoResponse?.data?.storyDetails?.[0]?.description || '');
            }
            else {
                descriptionContent = processRegularStoryDescription(storyContent?.description || '', storyContent);
            }
        }

        let canonicalUrl = `https://${requestHeader}${url.pathname}`;

        const sharePlatforms = [
            {
                platform: "Facebook",
                icon: facebook,
                url: SOCIAL_PLATFORM?.FACEBOOK?.createShareableLink(url?.href || ''),
            },
            {
                platform: "Twitter",
                icon: twitter,
                url: SOCIAL_PLATFORM?.TWITTER?.createShareableLink(url?.href || ''),
            },
            {
                platform: "WhatsApp",
                icon: whatsapp,
                url: SOCIAL_PLATFORM?.WHATSAPP_APP?.createShareableLink(url?.href || ''),
            },
        ];

        if (
            !shortsResponse?.data?.data?.stories?.length &&
            !webStoryResponse?.data &&
            !storyResponse?.data?.data &&
            !(videoResponse?.data?.storyDetails?.length > 0) &&
            !categoryResponse?.data
        ) {
            throw redirect(301, '/404');
        }

        let nextStoryUrl = ''

        if (isAmp && categoryResponse) {
            const currentPageNo = parseInt(url?.searchParams?.get('page'))
            const nextPageNo = (currentPageNo || 1) + 1

            nextStoryUrl = url?.origin + url?.pathname + `?page=${nextPageNo}`

            const gi = url?.searchParams?.get('gi') || 0
            const wi = url?.searchParams?.get('wi') || 0

            if (!(currentPageNo > 0)) {
                throw redirect(301, url?.origin + url?.pathname + `?page=1`);
            }

            let moreStories = [];
            if (currentPageNo > 1) {

                let endpoint = `${EnvironmentConfig.VITE_API_END_POINT}/v2/category/pagination-v2?completeSlug=${categorySlug}&page=${currentPageNo}&pageSize=10`;
                const config = {
                    method: "PUT",
                    headers: { lang: language, "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                };

                const response = await fetch(
                    endpoint,
                    config,
                );

                const data = await response.json();

                moreStories = data?.data?.data || [];
            }

            categoryResponse.data.data.widgetinfo[gi].story[wi].story = [...(categoryResponse?.data?.data?.widgetinfo?.[gi]?.story?.[wi]?.story ?? []), ...moreStories]
        }

        return {
            props: {
                descriptionContent,
                videoStoryDescription,
                canonicalUrl,
                story_details: storyResponse ? storyResponse.data.data : null,
                category_details: categoryResponse ? categoryResponse.data : null,
                video_story_details: videoResponse ? videoResponse.data : null,
                trending_stories: trendingResponse ? trendingResponse.data : null,
                latest_stories: latestResponse ? latestResponse.data : null,
                shorts_stories: shortsResponse ? shortsResponse.data : null,
                web_story_details: webStoryResponse ? webStoryResponse.data : null,
                rightSideBar: rightSideBar ? rightSideBar?.data?.data : null,
                device: deviceType,
                language: language,
                envDetails: locals.ENV_DETAILS,
                isAmp,
                pathname: url.pathname,
                sharePlatforms,
                nextStoryUrl,
                getParentCategory,
                livetv_video_id: livetv_video_id ? livetv_video_id : '',
                gainerAndLoosersData: gainerAndLoosers ? gainerAndLoosers?.data : null,
                marketData: market ? market?.data : null,
            }
        };
    } catch (error: any) {

        if (error?.location == "/404") {
            await logErrorTodb({
                url: props?.url?.href,
                deviceType,
                requestHeader,
                language,
            });
            throw serror(404, { message: "PAGE NOT FOUND" });
        }

        if (error?.status == 302 || error?.status == 301) {
            throw error;
        } else {
         
        }
    }
}

// Function to add CSS rule to disable ::marker
const disableMarkerStyle = () => {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = "li::marker { content: none !important; }";
    document.head.appendChild(styleSheet);
};


const cleanAttributes = (element: HTMLElement, allowedAttributes: string[]) => {
    element.removeAttribute('style');

    Array.from(element.attributes).forEach(attr => {
        if (!allowedAttributes.includes(attr.name) && !attr.name.startsWith('data-')) {
            element.removeAttribute(attr.name);
        }

        if (attr.value.includes('="text"')) {
            element.removeAttribute(attr.name);
        }
    });

    if (element.tagName === 'A') cleanHref(element);
    if (element?.nodeName === "FIGCAPTION") replaceWithFigcaptionText(element)
};

const nodeNameToAttributesMap: Record<string, string | undefined> = {
    SPAN: 'span',
    P: 'p',
    TABLE: 'table',
    TH: 'table',
    TD: 'table',
    COL: 'col',
    A: 'anchor',
    LI: 'li',
    UL: 'ul',
    OL: 'ol',
    BLOCKQUOTE: 'blockquote',
    'AMP-TWITTER': 'amp-twitter',
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    BUTTON: 'button',
    IMG: 'img',
    DIV: 'div',
    FIGCAPTION: 'figcaption'
};


// Utility function to recursively traverse and clean elements
const traverseAndClean = (node: ChildNode, allowedAttributesMap: Record<string, string[]>) => {
    if (node.nodeName === 'STYLE' || node.nodeName === 'NAIL' || node.nodeName === 'QUILLBOT-EXTENSION-PORTAL' || node.nodeName === 'DUALITY' || node.nodeName === 'OEMBED' || node.nodeName === 'AGE' || node.nodeName === 'SPACE' || node.nodeName === 'GENDER' || node.nodeName === 'EXPLETIVE' || node.nodeName === 'NO' || node.nodeName === 'PWA' || node.nodeName === 'EANWHILE,' || node.nodeName === 'THE' || node.nodeName === 'AD' || node.nodeName === 'TYPE' || node.nodeName === 'SPACE' || node.nodeName === 'GENDER' || node.nodeName === 'EXPLETIVE' || node.nodeName === 'NO' || node.nodeName === 'PWA' || node.nodeName === 'EANWHILE,' || node.nodeName === 'THE' || node.nodeName === 'AD' || node.nodeName === 'HELL' || node.nodeName === 'BLANK' || node.nodeName === 'ROLLNUMBER' || node.nodeName === 'MY') {
        node.remove();
        return;
    }

    // Process each element based on its tag name
    const attributesKey = nodeNameToAttributesMap[node.nodeName];
    if (attributesKey) {
        cleanAttributes(node as HTMLElement, allowedAttributesMap[attributesKey] || []);
    }

    // If the node has child nodes, recursively clean them
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(child => {
            traverseAndClean(child, allowedAttributesMap);
        });
    }
};

const processVideoShowsDebateStoryDescription = (description: string) => {
    let descTransformed = AmpSocialEmbeds(description); // Apply social embeds if necessary
    const dom = new JSDOM(descTransformed);
    const document = dom.window.document;

    // Define allowed attributes for different tags
    const allowedAttributesMap = {
        'span': ['class', 'id', 'data-*', 'title'],
        'table': ['class', 'id', 'data-*'],
        'col': ['class', 'id', 'data-*'],
        'p': ['class', 'id', 'data-*'],
        'h1': ['class', 'id', 'data-*'],
        'h2': ['class', 'id', 'data-*'],
        'h3': ['class', 'id', 'data-*'],
        'li': ['class', 'id', 'data-*'],
        'button': ['class', 'id', 'data-*', 'style'],
        'amp-twitter': ['height', 'width', 'layout', 'style', 'data-tweetid'],
        'ul': ['class', 'id', 'data-*'],
        'ol': ['class', 'id', 'data-*'],
        'div': ['class', 'id', 'style', 'data-*'],
        'blockquote': ['class', 'id', 'data-*'],
        'anchor': ['href', 'title', 'target', 'rel'],
        'img': ['src', 'alt', 'title', 'width', 'height', 'layout', 'class', 'id', 'data-*'],
    };

    // Clean the document
    traverseAndClean(document.body, allowedAttributesMap);
    descTransformed = document.body.innerHTML;

    let newContent: any = [];

    const root = document.body;

    root.childNodes.forEach((child: any) => {
        if (child.nodeName === 'P') {
            newContent.push(child.outerHTML);
        } else {
            newContent.push(child.outerHTML);
        }
    });

    return newContent;
};


// Function to process the description
const processRegularStoryDescription = (description: string, storyContent = null) => {
    let descTransformed = AmpSocialEmbeds(description, storyContent); // Apply social embeds if necessary

    // Parse the transformed HTML
    const dom = new JSDOM(descTransformed);
    const document = dom.window.document;

    // Define allowed attributes for different tags
    const allowedAttributesMap = {
        'span': ['class', 'id', 'data-*', 'title'],
        'table': ['class', 'id', 'data-*'],
        'col': ['class', 'id', 'data-*'],
        'p': ['class', 'id', 'data-*'],
        'h1': ['class', 'id', 'data-*'],
        'h2': ['class', 'id', 'data-*'],
        'h3': ['class', 'id', 'data-*'],
        'li': ['class', 'id', 'data-*'],
        'button': ['class', 'id', 'data-*', 'style'],
        'amp-twitter': ['height', 'width', 'layout', 'style', 'data-tweetid'],
        'ul': ['class', 'id', 'data-*'],
        'ol': ['class', 'id', 'data-*'],
        'div': ['class', 'id', 'style', 'data-*'],
        'blockquote': ['class', 'id', 'data-*'],
        'anchor': ['href', 'title', 'target', 'rel'],
        'img': ['src', 'alt', 'title', 'width', 'height', 'layout', 'class', 'id', 'data-*'],
    };

    // Clean the document
    traverseAndClean(document.body, allowedAttributesMap);

    // Get the cleaned HTML string
    descTransformed = document.body.innerHTML;

    let paragraphCount = 0;
    let adIndex = 2;
    let newContent: any = [];

    const root = document.body;

    root.childNodes.forEach((child: any) => {
        if (child.nodeName === 'P') {
            paragraphCount++;
            newContent.push({ type: 'element', element: child.outerHTML });

            // Insert ads every 2 paragraphs
            if (paragraphCount % 2 === 0 && adIndex <= 5) {
                newContent.push({ type: 'ad', adIndex });
                adIndex++;
            }
        } else {
            newContent.push({ type: 'element', element: child.outerHTML });
        }
    });

    return newContent;
};







const processDeepFocusAndLiveBlogStoryDescripton = (description: any, device: any, envDetails: any, story: any) => {
    if (!description) {
        return [];
    }

    const insertFrequency = 2;
    let adsSlotAndUsage = { adSlotIndex: 0, usageCount: 0 };
    let newContent: any = [];

    // Define the allowed attributes for different tags
    const allowedAttributesMap = {
        'span': ['class', 'id', 'data-*', 'title'],
        'table': ['class', 'id', 'data-*', 'width', 'cellspacing', 'cellpadding'],
        'col': ['class', 'id', 'data-*'],
        'li': ['class', 'id', 'data-*'],
        'ol': ['class', 'id', 'data-*'],
        'p': ['class', 'id', 'data-*'],
        'h1': ['class', 'id', 'data-*'],
        'h2': ['class', 'id', 'data-*'],
        'h3': ['class', 'id', 'data-*'],
        'div': ['class', 'id', 'style', 'data-*'],
        'img': ['class', 'src', 'id', 'data-*'],
        'button': ['class', 'id', 'data-*', 'style'],
        'amp-twitter': ['height', 'width', 'layout', 'style', 'data-tweetid'],
        'ul': ['class', 'id', 'data-*'],
        'blockquote': ['class', 'id', 'data-*'],
        'anchor': ['href', 'title', 'target', 'rel']
    };

    // Loop over each description and clean its text content
    description.forEach((desc: any, index: any) => {
        // Transform the description's text with AmpSocialEmbeds and clean the HTML content
        let descText = AmpSocialEmbeds(desc.text, story);

        // Parse the HTML content to clean it
        const dom = new JSDOM(descText);
        const document = dom.window.document;

        // Clean the body of the document (HTML tags inside the description text)
        traverseAndClean(document.body, allowedAttributesMap);

        // After cleaning, update the description with the cleaned HTML
        newContent.push({
            type: "text",
            content: {
                ...desc,
                text: document.body.innerHTML, // Use the cleaned HTML content
            },
        });

        // Insert ad slots at regular intervals
        if ((index + 1) % insertFrequency === 0) {
            adsSlotAndUsage.adSlotIndex = Math.min(adsSlotAndUsage.adSlotIndex + 1, 5);
            adsSlotAndUsage.usageCount++;
            let dynamicAdId;

            if (device === "desktop") {
                dynamicAdId = envDetails?.adsFile?.Desktop?.[`BTF${adsSlotAndUsage.adSlotIndex}`]?.AP;
            } else if (device === "mobile") {
                dynamicAdId = envDetails?.adsFile?.Mobile?.[`BTF${adsSlotAndUsage.adSlotIndex}`]?.AP;
            }

            newContent.push({
                type: "ad",
                adSlot: dynamicAdId,
                usageCount: adsSlotAndUsage.usageCount,
            });
        }
    });

    return newContent;
};



function AmpSocialEmbeds(content: any, story: any = null) {
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const root = document.body;

    const replaceEmbedsWithAMP = (node: any) => {
        if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            if (['iframe', 'blockquote', 'a'].includes(tag)) {
                if (tag === 'blockquote' && node.getAttribute('class') === 'twitter-tweet') {
                    Array.from(node.childNodes).forEach((child: any) => {
                        if (child.nodeType === dom.window.Node.TEXT_NODE || (child.nodeType === dom.window.Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'p')) {
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

                        if (story) {
                            let thumbnailUrl = `https://img.youtube.com/vi/${youtubeMatchId}/hqdefault.jpg`;
                            //  Add as per requirement by Manament team
                            let videoExtra = `            
                                {
                                "@context": "https://schema.org",
                                "@type": "VideoObject",
                                "name": ${JSON.stringify(node.getAttribute('title') || story?.long_heading || 'Republic World')},
                                "description": ${JSON.stringify(node.getAttribute('title') || story?.long_heading || 'Republic World')},
                                "thumbnailUrl": ${JSON.stringify(thumbnailUrl)},
                                "uploadDate": "${story?.createdAt}",
                                "embedUrl":  ${JSON.stringify(`https://www.youtube.com/embed/${youtubeMatchId}`)},
                                "contentUrl": ${JSON.stringify(`https://www.youtube.com/watch?v=${youtubeMatchId}`)},
                                "duration": "PT5M30S"
                                }                        
                           `;
                            const schemaElement = document.createElement('script');
                            schemaElement.setAttribute('type', 'application/ld+json');
                            schemaElement.textContent = '';
                            ampElement.insertAdjacentElement('afterend', schemaElement);
                        }


                    } else if (twitterMatchId) {
                        const ampElement = document.createElement('amp-twitter');
                        ampElement.setAttribute('width', '375');
                        ampElement.setAttribute('height', '472');
                        ampElement.setAttribute('layout', 'responsive');
                        ampElement.setAttribute('data-tweetid', twitterMatchId);
                        node.parentNode.replaceChild(ampElement, node);
                    } else if (instagramMatchId) {
                        const ampElement = document.createElement('amp-instagram');
                        ampElement.setAttribute('data-shortcode', instagramMatchId);
                        ampElement.setAttribute('width', '1');
                        ampElement.setAttribute('height', '1');
                        ampElement.setAttribute('layout', 'responsive');
                        node.parentNode.replaceChild(ampElement, node);
                    } else if (facebookMatchId) {
                        const ampElement = document.createElement('amp-facebook');
                        ampElement.setAttribute('width', '552');
                        ampElement.setAttribute('height', '303');
                        ampElement.setAttribute('layout', 'responsive');
                        ampElement.setAttribute('data-href', facebookMatchId);
                        node.parentNode.replaceChild(ampElement, node);
                    } else if (tag === 'iframe') {
                        const ampElement = document.createElement('amp-iframe');
                        ampElement.setAttribute('id', 'amp-iframe');
                        ampElement.setAttribute('width', '500');
                        ampElement.setAttribute('height', '281');
                        ampElement.setAttribute('layout', 'responsive');
                        ampElement.setAttribute('frameborder', '0');
                        ampElement.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
                        ampElement.setAttribute('allowfullscreen', '');
                        ampElement.setAttribute('src', src);
                        node.parentNode.replaceChild(ampElement, node);
                    }
                }
            } else if (tag === 'gdiv') {
                node.remove();
            } else if (['p', 'h1', 'h2', 'h3'].includes(tag)) {
                node.removeAttribute('paraeid');
                node.removeAttribute('paraid');
                node.removeAttribute('xml:lang');
            } else if (tag === 'img' && !node.getAttribute('src')) {
                node.remove();
            } else if (node.getAttribute('contenteditable')) {
                node.remove();
            }

        }

        const children = [...node.childNodes];
        children.forEach(replaceEmbedsWithAMP);
    };

    replaceEmbedsWithAMP(root);

    return unwrapBlockquotes(root.innerHTML)
}

function unwrapBlockquotes(htmlString: string) {
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;
    const blockquotes = document.querySelectorAll('blockquote');

    // Replace each blockquote with its content
    blockquotes.forEach(blockquote => {
        const parent = blockquote.parentNode;
        while (blockquote.firstChild) {
            if (parent) {
                parent.insertBefore(blockquote.firstChild, blockquote); // This line inserts the children before the blockquote
            }
        }
        if (parent) {
            parent.removeChild(blockquote); // Remove the blockquote element itself
        }
    });

    return document.body.innerHTML;
}