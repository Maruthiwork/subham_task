


function checkAndLoadAds() {
    // Ensure googletag is initialized and cmd is an array.
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd = googletag.cmd || [];

    const slots = window.normalRequestAds || [];
    if (slots.length > 0) {

        slots.forEach(element => {
            // Check if the ad has already been initialized (avoid re-initializing)
            if (!element.initialized) {
                viewport(element.elementId, element.slot, element.size, element.refresh, element.onViewport, element.collapse, element.background, 'Advertisement');
                console.log(`Ad unit initialized: ${element.elementId}`);
                element.initialized = true; // Mark this ad as initialized
            }
        });
    } else {
        console.warn("No ads to request. Check window.normalRequestAds.");
    }
}

function loadAds(elementId, slot, size, refresh = true, background = false, collapse = true, adText = null) {
    // Ensure googletag is initialized and cmd is an array.
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd = window.googletag.cmd || [];
    const MAX_RETRIES = 3;
    const RETRY_INTERVAL = 5000;
    const REFRESH_INTERVAL = 5000;
    const utmParams = getAllUTMCookies();
    let backgroundApplied = false;

    window.googletag.cmd.push(() => {
        // Define the ad slot and set up services.
        const definedSlot = window.googletag.defineSlot(slot, size, elementId).addService(googletag.pubads());

        if (refresh == true) {
            // Add listener for slotRenderEnded to check if the ad filled
            let retryCount = 0;
            window.googletag.pubads().addEventListener('slotRenderEnded', function (event) {
                if (event.slot === definedSlot) {
                    const slotId = event.slot.getSlotElementId();
                    const slotSize = event.size;
                    console.log(`Ad unit ${slotId} rendered with size ${slotSize}`);
                    if (event.isEmpty && retryCount < MAX_RETRIES) {
                        retryCount++;
                        setTimeout(function () {
                            const currentTargeting = event.slot.getTargetingKeys();

                            const targetingData = {
                                refreshAd: "true"
                            };

                            for (const key in targetingData) {
                                if (
                                    !currentTargeting.includes(key) ||
                                    event.slot.getTargeting(key)[0] !== targetingData[key]
                                ) {
                                    event.slot.setTargeting(key, targetingData[key]);
                                }
                            }

                            window.googletag.pubads().refresh([definedSlot]);
                        }, RETRY_INTERVAL);
                    } else if (event.isEmpty) {
                        // console.log('Ad unit did not fill after max retries:', event.slot.getAdUnitPath());
                    } else if(!event.isEmpty) {
                        if (background && !backgroundApplied) {
                            // console.log('Ad unit filled:', event.slot.getAdUnitPath());
                            let adsTextElement = document.createElement("h6");
                            adsTextElement.textContent = adText ?? "Story continues below advertisement";
                            let element = document.getElementById(elementId).parentElement.parentElement;
                            if (element) {
                                element.parentElement.classList.add("ads-loaded");
                                // element.parentElement.style.width = slotSize[0] + "px";  // Set width
                                // element.parentElement.style.height = (slotSize[1]+ 15) + "px"; // Set height
                                if (element.parentElement.id !== "floatAd") {
                                    element.parentElement.classList.add("ads-loaded");
                                    element.parentElement.insertBefore(adsTextElement, element.parentElement.firstChild);
                                }
                        
                                let sib = element?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
                                if (sib && sib.nodeName.toLowerCase() === 'section') {
                                    if (sib.nextElementSibling) {
                                        sib.nextElementSibling.classList.remove("divider-disable")
                                    }
                                }

                            }
                            backgroundApplied = true;

                        }
                    }
                }

            });


            // Add listener for impressionViewable to trigger refresh after initial viewability
            window.googletag.pubads().addEventListener('impressionViewable', function (event) {
                if (event.slot === definedSlot) {
                    setTimeout(function () {

                        const currentTargeting = event.slot.getTargetingKeys();

                        // Define the key-value pairs to be set
                        const targetingData = {
                            refreshAd: "true"
                        };

                        for (const key in targetingData) {
                            if (
                                !currentTargeting.includes(key) ||
                                event.slot.getTargeting(key)[0] !== targetingData[key]
                            ) {
                                event.slot.setTargeting(key, targetingData[key]);
                            }
                        }
                        window.googletag.pubads().refresh([definedSlot]);
                        // console.log(`Ad unit refreshed after ${REFRESH_INTERVAL / 1000} seconds of viewability:`, event.slot.getAdUnitPath());
                    }, REFRESH_INTERVAL);
                }
            });
        }
        utmParams ? definedSlot.setTargeting('utm', utmParams) : ""

        if (window.AdsTarget) {
            definedSlot.setTargeting('category', window.AdsTarget);
        }

        if (collapse) {
            googletag.pubads().collapseEmptyDivs();
        } else {
            console.log("collapse is false", elementId)
        }

        window.googletag.enableServices();
        window.googletag.display(elementId);
    });
}

function viewport(elementId, slot, size, refresh = true, onViewport = true, collapse = false, background = false, adText = null) {
    const adSlot = document.getElementById(elementId);

    if (!adSlot) {
        console.warn(`Element with ID ${elementId} not found.`);
        return;
    }
    if (onViewport) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
                if (entry.isIntersecting) {
                    // console.log(`Ad unit in view: ${elementId}`);
                    // adSlot.style.backgroundColor = "lightgreen";
                    loadAds(elementId, slot, size, refresh, background, collapse, adText);
                    observer.unobserve(adSlot);
                }
            });
        }, {
            threshold: 0.4 // Adjust the threshold as needed for visibility
        });

        observer.observe(adSlot);
    } else {
        loadAds(elementId, slot, size, refresh);
    }

}


function getAllUTMCookies() {

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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}


function getMetaContent(name) {
    const meta = document.querySelector(`meta[name=${name}]`);
    return meta ? meta.content : null;
}

function checkAndLoadOutOfPageSlotAds() {
    const slots = window.outOfPageRequestAds || [];
    const utmParams = getAllUTMCookies();

    if (slots.length === 0) {
        console.warn("No ads to request. Check window.outOfPageRequestAds.");
        return;
    }

    // Loop through each slot in the outOfPageRequestAds array
    slots.forEach(element => {
        window.googletag = window.googletag || { cmd: [] };

        googletag.cmd.push(() => {
            // Define the interstitial slot
            let interstitialSlot = googletag.defineOutOfPageSlot(
                element.slot,
                googletag.enums.OutOfPageFormat.INTERSTITIAL
            );

            // Ensure the slot was created successfully
            if (interstitialSlot) {
                // Configure interstitial triggers and services
                interstitialSlot.addService(googletag.pubads()).setConfig({
                    interstitial: {
                        triggers: {
                            navBar: true,
                            unhideWindow: true,
                        },
                    },
                });

                // Set UTM targeting if available
                if (utmParams) {
                    interstitialSlot.setTargeting('utm', utmParams);
                }

                // Set category targeting if AdsTarget is available
                if (window.AdsTarget) {
                    interstitialSlot.setTargeting('category', window.AdsTarget);
                }
            }

            // Enable single request architecture (SRA) and activate services
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
    });
}

function onScrollLoadAds() {
    // Ensure googletag is initialized and cmd is an array.
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd = googletag.cmd || [];

    const slots = window.onScrollLoadAdsRequestAds || [];
    if (slots.length > 0) {

        slots.forEach(element => {
            // Check if the ad has already been initialized (avoid re-initializing)
            if (!element.initialized) {
                viewport(element.elementId, element.slot, element.size, element.refresh, element.onViewport);
                console.log(`Ad unit initialized: ${element.elementId}`);
                element.initialized = true; // Mark this ad as initialized
            }
        });
    } else {
        console.warn("No ads to request. Check window.normalRequestAds.");
    }
}


function onTopLoadAds() {
    // Ensure googletag is initialized and cmd is an array.
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd = googletag.cmd || [];

    const slots = window.onTopLoadAdsRequestAds || [];
    if (slots.length > 0) {

        slots.forEach(element => {
            // Check if the ad has already been initialized (avoid re-initializing)
            if (!element.initialized) {
                viewport(element.elementId, element.slot, element.size, element.refresh, element.onViewport);
                console.log(`Ad unit initialized: ${element.elementId}`);
                element.initialized = true; // Mark this ad as initialized
            }
        });
    } else {
        console.warn("No ads to request. Check window.normalRequestAds.");
    }
}

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.head.appendChild(script);
    });
};


const loadGAScript = (code) => {
    return new Promise((resolve, reject) => {
        // Check if the script is already present
        if (document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${code}"]`)) {
            resolve(); // Script is already loaded
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${code}`;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load GA script"));

        document.head.appendChild(script);
    });
};

function isMobileDevice() {
    return window.matchMedia("(max-width: 768px)").matches;
}


(() => {
    window.loadDirectAds = viewport;
    const urlParams = new URLSearchParams(window.location.search);
    const adsDisabled = urlParams.get('ads') === 'false';
    if (adsDisabled) return;

    let hasInteracted = false;
    let intervalId;

    const loadAdsScript = () => {
        // Check if the script is already present
        const existingScript = document.querySelector('script[src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"]');
        if (existingScript) {
            return Promise.resolve(); // Script already loaded
        }

        // If not present, load the script
        return loadScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js");
    };





    // Fire all default ads
    const onLoadinitializeAds = () => {
        const CHECK_INTERVAL = 2000;
        const MAX_DURATION = 40000; // 40 seconds
        const startTime = Date.now();
        console.log('Initializing ads... Start Call to Action');
        checkAndLoadOutOfPageSlotAds();
        checkAndLoadAds();
        intervalId = setInterval(() => {
            checkAndLoadAds();  // Assuming `checkAndLoadAds` is defined elsewhere
            if (Date.now() - startTime >= MAX_DURATION) {
                clearInterval(intervalId);
            }
        }, CHECK_INTERVAL);
    };


    const handleInteraction = () => {
        if (hasInteracted) return;
        hasInteracted = true;
        loadAdsScript()
            .then(() => {

                console.log('Ad script loaded. Ads will be initialized.')
                checkAndLoadOutOfPageSlotAds();
                onLoadinitializeAds()
            })
            .catch((error) => console.error(error));
        // Remove the interaction listeners after the first interaction
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keypress', handleInteraction);
        document.removeEventListener('scroll', handleInteraction);
        // Load the Google Analytics scrip

    };


    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('keypress', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });



    if (isMobileDevice()) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (!hasInteracted) {
                    handleInteraction();
                }
            }, 5000);

        });
    } else {
        handleInteraction()

    }



})();