<script lang="ts">
  //@ts-nocheck
  import type { NewsStory } from "$lib/components/Story/Types";
  import {
    formatDate,
    loadMgidScript,
    loadUnibotScript,
    useIntersectionObserver,
  } from "$lib/components/utils/utils";
  import ShowTags from "../ShowTags/ShowTags.svelte";
  import zoomImage from "$lib/assets/images/zoom-image.svg";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../HybridImage/Constants";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";
  import BannerAd from "../BannerAd/BannerAd.svelte";
  import { HindiAds } from "$lib/ads/HindiAds/Ads";
    import { lazyLoad } from "../LazyLoading/LazyLoading";

  export let device: string = "desktop";
  export let story: NewsStory;
  export let story_comment: any[];
  export let envDetails = {};
  export let adsSlotAndUsage;
  let playerScriptLoaded = false;
  let lightboxOpen = false;
  let currentSlide = 0;

  const toggleLightbox = (index: number) => {
    currentSlide = index;
    lightboxOpen = true;
  };

  const closeLightbox = () => {
    lightboxOpen = false;
  };

  const insertFrequency = 2;

  // ** Scroll Event Listener to Load MGID Script
  const SCROLL_THRESHOLD = 500; // Replace with the desired scroll height in pixels
  let mgidScriptLoaded = false;

  function handleScroll() {
    if (!mgidScriptLoaded && window.scrollY > SCROLL_THRESHOLD) {
      loadMgidScript(envDetails?.language);
      mgidScriptLoaded = true;
      window.removeEventListener("scroll", handleScroll);
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  useIntersectionObserver(
    envDetails?.language === 'H' ?  "div-ub-republicbharat.com_1719829339250" : "div-ub-republicworld1.com_1719637493308",
    0.1,
    () => {
      if (!playerScriptLoaded) {
        loadUnibotScript(envDetails?.language, () => {
          playerScriptLoaded = true;
        });
      }
    }
  );

  function loadScript(src: string) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }
</script>

<div
  class="storyContent flex flex-col items-center"
  style="font-family: {envDetails.tertiaryFont ?? ''};"
>
  {#if !envDetails?.domainName.includes("dev") && envDetails?.language === "E"}
    <div id="div-ub-republicworld1.com_1719637493308" />
  {/if}
  <!-- {#if envDetails?.domainName.includes("dev") || envDetails?.language === "H" || envDetails?.language === "RB"}
    <BannerAd adslot={envDetails?.adsFile?.Desktop?.Outstream?.AP} />
  {/if} -->
  {#if envDetails?.language === "H"}
      <div id="div-ub-republicbharat.com_1719829339250"></div>
    {/if}
  <div class="image-wrapper">
    {#each story.gallery_pictures as item, i}
      <div class="relative">
        <img
          src={zoomImage}
          class="zoomImage"
          alt="Expand image icon"
          on:click={() => toggleLightbox(i)}
        />
        <img
          on:click={() => toggleLightbox(i)}
          use:lazyLoad={generateAspectRatioImageURL(
            item,
            ImageDimensions?.[device]?.bannerImage,
            IMAGE_ASPECT_RATIO["16_9"]?.key,
          )}
          src={IMAGE_ASPECT_RATIO["16_9"]?.defaultImage}
          alt="Description of the image"
          height="396px"
          width="704px"
          loading="lazy"
        />
      </div>
      <p class="mb48">
        <span class="redtxt">{i + 1}/{story.gallery_pictures.length}:</span
        >{" "}
        {@html item?.caption ?? story?.small_heading}
        <span class="graytxt">/ Image: {item?.source ?? story?.small_heading}</span>
      </p>

      {#if (i + 1) % insertFrequency === 0 && i !== story.gallery_pictures.length - 1}
        <div class="ad-container">
          <DisplayAd
            adslot={adsSlotAndUsage.adSlot}
            usageCount={adsSlotAndUsage.usageCount}
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
<ShowTags tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]} />

<!-- <Comments
    ref_id={story._id}
    story_comment={story.story_comment}
    allow_comment={story.allow_comment}
/> -->

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
        (currentSlide = (currentSlide + 1) % story.gallery_pictures.length)}
    >
      &gt;
    </button>
    <div class="lightbox-content">
      <span class="close-btn" on:click={closeLightbox}>&times;</span>
      <img
        src={generateAspectRatioImageURL(
          story.gallery_pictures[currentSlide],
          ImageDimensions?.[device]?.bannerImage,
          IMAGE_ASPECT_RATIO["16_9"]?.key,
        )}
        alt="Description of the image"
        loading="lazy"
        class="imageContainer"
      />
      <p class="caption">
        {@html story.gallery_pictures[currentSlide]?.caption ?? story?.small_heading}
        <span class="graytxt">/ Image: {story.gallery_pictures[currentSlide]?.source ?? story?.small_heading}</span>
      </p>
    </div>
  </div>
{/if}

<style>
  .image-wrapper {
    position: relative;
    display: inline-block;
  }

  .relative {
    position: relative;
  }

  .zoomImage {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1;
  }

  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lightbox-content {
    position: relative;
    text-align: center;
    color: #fff;
    max-width: 704px;
    max-height: 396px;
    width: 100%;
  }

  .imageContainer {
    max-width: 704px;
    max-height: 396px;
    width: 100%;
    height: auto;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

  .caption {
    margin-top: 10px;
  }

  .arrow-btn {
    background-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 24px;
  }

  .prev-btn {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }

  .next-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
</style>
