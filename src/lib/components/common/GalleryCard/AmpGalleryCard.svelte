<script lang="ts">
    import { formatDate } from "$lib/components/utils/utils";
    import DisplayAd from "../DisplayAd/DisplayAd.svelte";
    import {
        IMAGE_ASPECT_RATIO,
        ImageDimensions,
        generateAspectRatioImageURL,
    } from "../HybridImage/Constants";
    import ShowTags from "../ShowTags/ShowTags.svelte";
    import type { NewsStory } from "../StoryCard/Types";
    import zoomImage from "$lib/assets/images/zoom-image.svg";

    // ** Props
    export let device: string = "desktop";
    export let story: NewsStory;
    export let envDetails: any = {};
    export let adsSlotAndUsage;
    export let sharePlatforms: any = [];

    // ** Variables
    let j = 1;
    let repeatIndex = 5;
    let lightboxOpen = false;
    let currentSlide = 0;
    const insertFrequency = 2;

    // ** Methods
    const toggleLightbox = (index: number) => {
        currentSlide = index;
        lightboxOpen = true;
    };

    const closeLightbox = () => {
        lightboxOpen = false;
    };
</script>

<div
    class="storyContent flex flex-col items-center"
    style="font-family: {envDetails?.tertiaryFont ?? ''};"
>
{#if envDetails?.domainName.includes("dev")}    
    <amp-ima-video 
    id="republicworldAmpPlayer" 
    width="640" 
    height="360" 
    layout="responsive" 
    data-tag="https://pubads.g.doubleclick.net/gampad/ads?iu=/21928950349/amp_video_test&description_url=[placeholder]&tfcd=0&npa=0&sz=640x360&gdfp_req=1&unviewed_position_start=1&output=vmap&env=vp&impl=s&ad_rule=1&correlator=&vid_d=12000" 
    data-poster="https://unibots.b-cdn.net/player/amp/republicworld.png"
    autoplay
    >
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
    </amp-ima-video>
{/if}
    <div class="image-wrapper">
        {#each story.gallery_pictures as item, i}
            <div class="relative">
                <amp-img
                    src={zoomImage}
                    class="zoomImage"
                    alt="Expand image icon"
                    width="30"
                    height="30"
                    layout="fixed"
                    on:click={() => toggleLightbox(i)}
                />

                <amp-img
                    src={generateAspectRatioImageURL(
                        item,
                        ImageDimensions?.[device]?.bannerImage,
                        IMAGE_ASPECT_RATIO["16_9"]?.key
                    ) || IMAGE_ASPECT_RATIO["16_9"]?.defaultImage}
                    alt="Description of the image"
                    width="16"
                    height="9"
                    layout="responsive"
                />
            </div>
            <p class="mb48">
                <span class="redtxt"
                    >{i + 1}/{story.gallery_pictures.length}:</span
                >{" "}
                {@html item?.caption?.replace(/!important/g, '').replace(/<font[^>]*>|<\/font>/gi, '')}
                <span class="graytxt">/ Image: {item?.source}</span>
            </p>

            {#if (i + 1) % insertFrequency === 0 && i !== story.gallery_pictures.length - 1}
                <div class="ad-container">
                    <DisplayAd
                        adslot={adsSlotAndUsage.adSlot}
                        usageCount={adsSlotAndUsage.usageCount}
                        isAmp={true}
                        dataSlot={(() => {
                            let dataSlot;
                            if (j <= repeatIndex) {
                                dataSlot = envDetails.adsFile.Mobile?.[`BTF${j}`]?.ampAP;
                                j++;  // Increment only after using
                            } else {
                                dataSlot = envDetails.adsFile.Mobile?.[`BTF${repeatIndex}`]?.ampAP;
                            }
                            return dataSlot;
                        })()}
                    />
                </div>
            {/if}
        {/each}
    </div>

    {#if story.disclaimer && story.disclaimer.length > 0}
        {#each story.disclaimer as item, index}
            <div>{@html item?.footer_content}</div>
        {/each}
    {/if}
</div>

<div class="published">
    <p> {`${envDetails?.language === "H" ? "अपडेटेड" : "Updated"} ${formatDate(story?.updatedAt)}`}</p>
</div>
<div id="migid-container" />
<ShowTags isAmp={true} tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]} />

<!-- Lightbox -->
{#if lightboxOpen}
    <div class="lightbox">
        <button
            aria-label="Gallery Previous Button"
            class="arrow-btn prev-btn"
            on:click={() =>
                (currentSlide =
                    (currentSlide - 1 + story.gallery_pictures.length) %
                    story.gallery_pictures.length)}
        >
            &lt;
        </button>
        <button
            aria-label="Gallery Next Button"
            class="arrow-btn next-btn"
            on:click={() =>
                (currentSlide =
                    (currentSlide + 1) % story.gallery_pictures.length)}
        >
            &gt;
        </button>
        <div class="lightbox-content">
            <span class="close-btn" on:click={closeLightbox}>&times;</span>
            <img
                src={generateAspectRatioImageURL(
                    story.gallery_pictures[currentSlide],
                    ImageDimensions?.[device]?.bannerImage,
                    IMAGE_ASPECT_RATIO["16_9"]?.key
                ) || IMAGE_ASPECT_RATIO["16_9"]?.defaultImage}
                alt="Description of the image"
                loading="lazy"
                class="imageContainer"
            />
            <p class="caption">
                {story.gallery_pictures[currentSlide]?.caption}
            </p>
        </div>
    </div>
{/if}
