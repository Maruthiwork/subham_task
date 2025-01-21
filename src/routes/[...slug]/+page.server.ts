// @ts-nocheck
import { extractFacebookPostID, extractInstagramID, extractTwitterID, extractYouTubeID, isValidSlug } from '$lib/components/utils/utils.js';
import { redirect, error as serror } from '@sveltejs/kit';
import { fetchAnchorAndAuthor, fetchCategory, fetchJwPlayerVideoData, fetchLatestStory, fetchPageType, fetchRightBarData, fetchShortsStory, fetchStory, fetchTrendingStories, fetchVedioStory, fetchWebStoryDetail } from '../api/fetchData.js';
import { JSDOM } from 'jsdom';
import { logErrorTodb } from '../api/postData.js';
import { EnvironmentConfig } from '$lib/components/utils/environmentConfig.js';
import { encodeImageName, filterRedirectUrls, getParentCategories } from '$lib/utils/common.js';
import { serverStore } from '$lib/stores/serverStore.js';



// Helper Functions
function cleanSlug(slug: string): string {
    return slug.replace(/\.news/g, '').replace(/\.html/g, '');
}


function validateAndRedirectAmp(paths: string[], isAmp: boolean, pathname: string) {
    if (!paths.includes('amp') && isAmp && !pathname.includes('web-stories')) {


        throw redirect(301, `/amp${pathname}`);
    }
}

function sanitizeHTMLContent(htmlContent: string, allowedAttributesMap: Record<string, string[]>): string {
    // Parse the HTML content with JSDOM
    const dom = new JSDOM(`<body>${htmlContent}</body>`);
    const { document } = dom.window;

    const traverseAndClean = (node: HTMLElement | ChildNode) => {
        if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const tagName = element.tagName.toLowerCase();
            const allowedAttributes = allowedAttributesMap[tagName] || [];

            // Remove attributes that are not allowed
            Array.from(element.attributes).forEach(attr => {
                if (!allowedAttributes.includes(attr.name) && !attr.name.startsWith('data-')) {
                    element.removeAttribute(attr.name);
                }
            });

            // If the tag itself is not allowed, remove it
            if (!allowedAttributesMap[tagName]) {
                element.remove();
                return;
            }
        }

        // Recursively process child nodes
        node.childNodes.forEach(child => traverseAndClean(child));
    };

    // Start cleaning the body content
    document.body.childNodes.forEach(child => traverseAndClean(child));

    // Return the sanitized HTML as a string
    return document.body.innerHTML;
}

function processWebStoryContent(webStoryResponse: any, deviceType: string, envDetails: any) {
    const allowedAttributesMap = {
        div: ['class', 'id', 'style'],
        p: ['class', 'id', 'style'],
        span: ['class', 'id', 'style'],
        img: ['src', 'alt', 'title', 'class', 'id', 'style'],
        a: ['href', 'target', 'rel', 'class', 'id'],
    };

    let web_story_media = webStoryResponse?.data?.data?.web_stories_media || [];

    web_story_media = web_story_media.map(media => {
        const sanitizedTitle = sanitizeHTMLContent(media.title || '', allowedAttributesMap);
        const sanitizedCaption = sanitizeHTMLContent(media.caption || '', allowedAttributesMap);

        return {
            ...media,
            title: sanitizedTitle,
            caption: sanitizedCaption,
        };
    });

    return web_story_media;
}


function processStoryContent(storyResponse: any, deviceType: string, envDetails: any) {
    const storyType = storyResponse?.data?.data?.story?.[0]?.story_type;
    const storyContent = storyResponse?.data?.data?.story?.[0];
    let descriptionContent = [];

    if (storyType === "DEEP-FOCUS") {
        descriptionContent = processDeepFocusAndLiveBlogStoryDescripton(storyContent?.deep_focus?.content || '', deviceType, envDetails, storyContent);
    } else if (storyType === "LIVE-BLOG") {
        descriptionContent = processDeepFocusAndLiveBlogStoryDescripton(storyContent?.live_blog_texts || '', deviceType, envDetails, storyContent);
    } else {
        descriptionContent = processRegularStoryDescription(storyContent?.description || '', true, storyContent, envDetails);
    }

    if (storyContent) {
        storyResponse.data.data.story[0].descriptionContent = descriptionContent;
    }

    return descriptionContent;
}

function redirectIfContainsSuffix(pathname: string) {
    if (pathname?.endsWith('.news') || pathname?.endsWith('.html')) {
        const cleanPath = pathname?.replace(/(\.news|\.html)$/, '');
        throw redirect(302, cleanPath);
    }
}

function checkRedirects(responses: any, slug: string) {
    const redirectChecks = [
        responses.webStory?.data?.data?.redirect_url,
        responses.video?.data?.redirect_url,
        responses.shorts?.data?.data?.redirect_url,
        responses.story?.data?.data?.redirect_url,
        responses.story?.data?.data?.story?.[0]?.redirect_url
    ];

    redirectChecks.forEach(url => {
        if (url && url !== slug) {
            throw redirect(301, url);
        }
    });
}

// Main Exported Function
export async function load(props) {
    const { params, locals, url }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const preview = url.searchParams.get('preview');
    const { deviceType, language } = locals;
    let slug = cleanSlug(params.slug);
    const categorySlug = slug.split('/')[0];
    const paths = url.pathname.split('/').filter((eachPath: any) => eachPath);
    const isAmp = locals.isAmp
    const langBasedLivTvID: any = {
        E: "ADe4psmE",
        H: "jBWcDH3F",
        RB: "ADe4psmE",
    };
    
    let livetv_video_id = '';

    // redirection for .news and .html
    redirectIfContainsSuffix(url?.pathname);

    validateAndRedirectAmp(paths, isAmp, url.pathname);

    if (!isValidSlug(slug)) {
        throw redirect(301, '/404');
    }

    try {
        const { data } = await fetchPageType(language, slug) ?? {};
        const pageType = data?.data?.pageType;
        const promises: any = {
            story: null,
            category: null,
            video: null,
            trending: null,
            latest: null,
            shorts: null,
            webStory: null,
            rightSideBar: null,
            anchorAuthor: null,
        };


        if (categorySlug == 'anchors-and-authors' && slug && slug.split('/').length == 2) {
            promises.anchorAuthor = fetchAnchorAndAuthor(language, slug?.split('/')[1]);
        }

        if (pageType === 'Category') {
            promises.category = fetchCategory(language, slug);
        } else if (pageType === 'Story') {
            if (['the-debate', 'shows', 'videos'].includes(categorySlug)) {
                promises.video = fetchVedioStory(language, slug, preview);
                promises.latest = fetchLatestStory(language, categorySlug);
            } else if (categorySlug === 'web-stories') {
                promises.webStory = fetchWebStoryDetail(language, slug, preview);
            } else if (categorySlug === 'shorts') {
                promises.shorts = fetchShortsStory(language, slug, preview);
            } else {
                promises.story = fetchStory(language, slug, preview);
            }

            if (!['web-stories', 'shorts'].includes(categorySlug)) {
                promises.rightSideBar = fetchRightBarData(language);
                promises.trending = fetchTrendingStories(language);
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
            anchorAuthorResponse
        ] = await Promise.all(Object.values(promises).map(p => p || Promise.resolve(null)))
        let getParentCategory = getParentCategories(language)


        if (
            !shortsResponse?.data?.data?.stories?.length &&
            !webStoryResponse?.data &&
            !storyResponse?.data?.data &&
            !(videoResponse?.data?.storyDetails?.length > 0) &&
            !categoryResponse?.data &&
            !anchorAuthorResponse?.data?.data
        ) {
            throw redirect(301, '/404')
        }

        if (videoResponse?.data?.storyDetails?.[0]?.video) {
            try {
                const response = await fetch(
                    `https://content.jwplatform.com/v2/media/${videoResponse?.data?.storyDetails?.[0]?.video?.id}`,
                );

                if (response.status == 200) {
                    livetv_video_id = videoResponse?.data?.storyDetails?.[0]?.video?.id;
                }else{
                    livetv_video_id = langBasedLivTvID[language];
                }

            } catch (error) {
                console.error("Error validating video ID:", error);
                livetv_video_id = langBasedLivTvID[language];
            }

        }
        

        if (anchorAuthorResponse?.data?.data) {
            let typeUrl = anchorAuthorResponse?.data?.data?.type === "AUTHOR" ? "authors" : "anchors";
            throw redirect(301, `/${typeUrl}/${slug?.split('/')[1]}`);
        }

        if (webStoryResponse?.data?.data?.redirect_url && webStoryResponse.data.data.redirect_url !== `/${slug}`) {
            throw redirect(301,filterRedirectUrls(webStoryResponse.data.data.redirect_url));
        }
        if (videoResponse?.data?.redirect_url && videoResponse?.data?.redirect_url !== `/${slug}`) {
            throw redirect(301, filterRedirectUrls(videoResponse.data.redirect_url));
        }
        if (shortsResponse?.data?.data?.redirect_url && shortsResponse?.data?.data?.redirect_url !== `/${slug}`) {
            throw redirect(301, filterRedirectUrls(shortsResponse.data.data.redirect_url));
        }
        if (storyResponse?.data?.data?.redirect_url && storyResponse.data.data.redirect_url !== slug) {
            throw redirect(301, filterRedirectUrls(storyResponse.data.data.redirect_url));
        }

         if (storyResponse?.data?.data?.story?.[0]?.redirect_url && storyResponse.data.data.story[0].redirect_url !== slug && storyResponse.data.data.story[0].redirect_url !== `/${slug}`) {
            throw redirect(301, filterRedirectUrls(storyResponse?.data?.data?.story?.[0]?.redirect_url));
        }

        processStoryContent(storyResponse, deviceType, locals.ENV_DETAILS);

        let web_story_media = processWebStoryContent(webStoryResponse, deviceType, locals.ENV_DETAILS);

        let descriptionContent = "";



        let canonicalUrl = `https://${requestHeader}${url.pathname}`

        return {
            props: {
                descriptionContent,
                web_story_media,
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
                pageType: locals.pageType,
                getParentCategory,
                livetv_video_id : livetv_video_id ? livetv_video_id : ''
            }
        };
    } catch (error: any) {
        console.log('Main Error:', error);

        await handleErrors(error, slug, deviceType, language, isAmp, requestHeader, url?.href);
    }
}

// Error Handling
async function handleErrors(error: any, slug: string, deviceType: string, language: string, isAmp: boolean, requestHeader: any, url: string) {
    if (error?.location == "/404") {
        await logErrorTodb({
            url,
            deviceType,
            requestHeader,
            language,
        });
        throw serror(404, { message: "PAGE NOT FOUND" });
    }
    if ([301, 302].includes(error?.status)) {
        throw error;
    } else {
        throw redirect(isAmp ? 301 : 302, `/500${isAmp ? '?amp=1' : ''}`);
    }
}

const processRegularStoryDescription = (description: string, adsAdd = true, story: any = null, envDetails: null = null) => {
    // disable typescript for this function
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
    const document = dom.window.document;
    const tempDiv = document.createElement("div");

    // description may have iframe.

    tempDiv.innerHTML = description;
    let content = [];
    let paragraphCount = 0;
    let adIndex = 1;
    const totalLength = tempDiv.childNodes.length - 1;
    for (let child of tempDiv.childNodes) {

        if (child.nodeType !== dom.window.Node.ELEMENT_NODE || child.textContent.trim() === "") {
            const hasInvalidAttribute = Array.from(child.attributes || []).some(attr =>
                attr.name === "data-card-created" && attr.value.includes(`""`)
            );
            if (hasInvalidAttribute) {
                continue; // Skip this element
            }
        }


        if (child.nodeName === "FIGURE") {
            const img = child.querySelector("img");
            if (img) {
                // Structure figure element data
                const newFigure = {
                    type: "figure",
                    src: img.src,
                    width: img.width,
                    alt: img.alt || "",
                    figcaption: child.querySelector("figcaption")?.innerHTML || ""
                };
                content.push(newFigure);
                continue; // Skip further processing for this child
            }
        }
        if (child.nodeName === "DIV" && child.classList.contains("raw-html-embed")) {
            let iframe = child.querySelector("iframe");
   
            if (iframe) {
                const youtubeMatchId = extractYouTubeID(iframe?.src);
                let embedUrl = btoa(unescape(`https://www.youtube.com/embed/${youtubeMatchId}`))
                content.push({
                    type: "iframe-placeholder",
                    src: embedUrl,
                    width: iframe.width,
                    height: iframe.height,
                    title: iframe.title,
                    frameborder:"0",
                    allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowfullscreen:"true"
                });
           

                if (youtubeMatchId && story) {
                    let thumbnailUrl = `https://img.youtube.com/vi/${youtubeMatchId}/hqdefault.jpg`;
                    //  Add as per requirement by Manament team
                    let contentUrl = `https://www.youtube.com/watch?v=${youtubeMatchId}`
                    let embedUrl = `https://www.youtube.com/embed/${youtubeMatchId}`
                    iframe.title = iframe?.title || story?.long_heading || "";
                //     let videoExtra = `
                //     <script type="application/ld+json">
                //         {
                //         "@context": "https://schema.org",
                //         "@type": "VideoObject",
                //         "name": ${JSON.stringify(iframe?.title)},
                //         "description": ${JSON.stringify(iframe?.title)},
                //         "thumbnailUrl": ${JSON.stringify(thumbnailUrl || "")},
                //         "uploadDate": "${story?.createdAt ? new Date(story.createdAt).toISOString() : ""}",
                //         "embedUrl": ${JSON.stringify(embedUrl || "")},
                //         "contentUrl": ${JSON.stringify(contentUrl || "")},
                //         "duration": "PT5M30S",
                //         "publisher": {
                //             "@type": "Organization",
                //             "name": "${envDetails?.siteName}",
                //             "logo": {
                //                     "@type": "ImageObject",
                //                     "url": "${envDetails?.siteLogo ?? ""}",
                //                     "width": 600,
                //                     "height": 60
                //                 }
                //             }                          
                //         }
                //     </script>               
                // `;
                //     content.push({ type: "element", html: videoExtra });


                }

                continue;
            } else {
                const encodedOuterHTML = encodeURIComponent(child.outerHTML);
                content.push({
                    type: "element",
                    html: `<div class="blockCode-placeholder" data-blockCode=${encodedOuterHTML}> </div>`
                });
                continue;
            }
        }
        // Handle P elements with specific checks
        if (child.nodeName === "P") {
            const textContent = child.textContent;

            // Skip empty paragraphs or those with only whitespace
            if (textContent.trim() === "" && !child.querySelector("img")) {
                continue;
            }

            // Check for shortcodes
            if (textContent.includes('[shortcode="pincode"]')) {
                content.push({ type: "pincode" });
                continue;
            }

            // Add paragraph to content
            paragraphCount++;
            content.push({ type: "paragraph", html: child.outerHTML });

            if (paragraphCount === 1) {
                content.push({ type: "ad", adIndex:0 });
                if (!envDetails?.domainName.includes("dev") && envDetails?.language === "E") {
                  content.push({
                    type: "element",
                    html: `<div id="div-ub-republicworld1.com_1719637493308"></div>`,
                  });
                }
              }

            if (adsAdd) {
                // Inject ads after every two paragraphs
                if (paragraphCount % 2 === 0 || paragraphCount === totalLength) {
                    content.push({ type: "ad", adIndex });
                    adIndex = adIndex >= 5 ? 1 : adIndex + 1;
                }
            }
            continue;
        }
        if (child.nodeName === "DIV" && child.hasAttribute("data-oembed-url")) {
            const oembedUrl = child.getAttribute("data-oembed-url");
            const youtubeMatchId = extractYouTubeID(oembedUrl);
            if (youtubeMatchId) {
                let thumbnailUrl = `https://img.youtube.com/vi/${youtubeMatchId}/hqdefault.jpg`;
                let contentUrl = `https://www.youtube.com/watch?v=${youtubeMatchId}`
                let embedUrl = `https://www.youtube.com/embed/${youtubeMatchId}`

                // let videoExtra = `
                // <script type="application/ld+json">
                //     {
                //     "@context": "https://schema.org",
                //     "@type": "VideoObject",
                //     "name": ${JSON.stringify(story?.long_heading)},
                //     "description": ${JSON.stringify(story?.long_heading)},
                //     "thumbnailUrl": ${JSON.stringify(thumbnailUrl)},
                //     "uploadDate":"${story?.createdAt}", 
                //     "embedUrl": ${JSON.stringify(embedUrl)},
                //     "contentUrl": ${JSON.stringify(contentUrl)},
                //     "duration": "PT5M30S",
                //     "publisher": {
                //             "@type": "Organization",
                //             "name": "${envDetails?.siteName}",
                //             "logo": {
                //                 "@type": "ImageObject",
                //                 "url": "${envDetails?.siteLogo ?? ""}",
                //                 "width": 600,
                //                 "height": 60
                //             }
                //         }
                //     }
                // </script>               
                //   `;
                // content.push({ type: "element", html: videoExtra });
                content.push({
                    type: "iframe-placeholder",
                    src: btoa(unescape(`https://www.youtube.com/embed/${youtubeMatchId}`)),
                    width: "100%",
                    height: "315",    
                    frameborder:"0",
                    allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowfullscreen:"true"
                });
                continue;
             
            }
        }
    
        // Handle other non-paragraph elements as standard content
        content.push({ type: "element", html: child.outerHTML });
        
    }
    return content;
};

const processDeepFocusAndLiveBlogStoryDescripton = (description: any, device: any, envDetails: any, story: any = null) => {
    if (!description) {
        return [];
    }
    const insertFrequency = 2;
    let adsSlotAndUsage = { adSlotIndex: 0, usageCount: 0 };
    let newContent: any = [];

    description.forEach((desc: any, index: any) => {
        newContent.push({
            type: "HTML",
            ...desc,
            content: processRegularStoryDescription(desc.text, false, story, envDetails),
        });

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
}




function BlockSocialEmbeds(content: string): string {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
    const document = dom.window.document;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    let htmlOutput = ""; // Initialize an empty string for the final HTML output

    for (let child of tempDiv.childNodes) {
        if (child.nodeName === "DIV" && (child as HTMLElement).classList.contains("raw-html-embed")) {
            const iframe = (child as HTMLElement).querySelector("iframe");
            if (iframe) {
                htmlOutput += `<div class="iframe-placeholder" data-src="${iframe.src}" data-width="${iframe.width}" data-height="${iframe.height}" data-title="${iframe.title}"></div>`;
                continue;
            } else {
                const encodedOuterHTML = encodeURIComponent((child as HTMLElement).outerHTML);
                htmlOutput += `<div class="blockCode-placeholder" data-blockCode=${encodedOuterHTML}> </div>`;
            }
        } else {
            htmlOutput += (child as HTMLElement).outerHTML; // Append HTML of each child element directly to the output string
        }
    }

    return htmlOutput; // Return the complete HTML as a single string
}