

(() => {
    window.addEventListener('load', function () {
        setTimeout(() => {
            const iframePlaceholders = document.querySelectorAll('.iframe-placeholder');
            const blockCodePlaceholders = document.querySelectorAll('.blockCode-placeholder');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const placeholder = entry.target;
                        if (placeholder.classList.contains('iframe-placeholder')) {
                            const encodedSrc = placeholder.getAttribute('data-src');
                            const iframeSrc = atob(encodedSrc);
                            const iframeWidth = placeholder.getAttribute('data-width');
                            const iframeHeight = placeholder.getAttribute('data-height');
                            placeholder.innerHTML = `<iframe src="${iframeSrc}" width="${iframeWidth}" height="${iframeHeight}" frameborder="0" allowfullscreen></iframe>`;
                        }
                        if (placeholder.classList.contains('blockCode-placeholder')) {
                            const encodedContent = placeholder.getAttribute('data-blockcode');
                            if (encodedContent) {
                                placeholder.innerHTML = transformSocialEmbeds(decodeURIComponent(encodedContent));
                                placeholder.removeAttribute('data-blockcode');
                            }
                        }
                        observer.unobserve(placeholder);
                    }
                });
            });

            iframePlaceholders.forEach(placeholder => observer.observe(placeholder));
            blockCodePlaceholders.forEach(placeholder => observer.observe(placeholder));

        }, 500);
    });

})();




function extractInstagramID(url) {
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

function extractFacebookPostID(url) {
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

function extractYouTubeID(url) {
    if (!url) {
        return null;
    }
    const regExp =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    return match ? match[1] : null;
}

function extractTwitterID(url) {
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

function transformSocialEmbeds(content) {
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

