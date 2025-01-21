<svelte:head>
  <link
    rel="preload"
    href="/swiper-bundle.min.css"
    as="style"
    on:load={() => {
      const link = document.querySelector('link[rel="preload"][as="style"]');
      if (link instanceof HTMLLinkElement) {
        link.rel = "stylesheet";
      }
    }}
  />
</svelte:head>
<script lang="ts">
  import type { NewsStory } from "$lib/components/Story/Types";
  import {
    formatDate,
    loadMgidScript,
    useIntersectionObserver,
    loadUnibotScript,
  } from "$lib/components/utils/utils";
  import RFrame from "$lib/assets/images/R-frame.svg";
  import ShowTags from "../ShowTags/ShowTags.svelte";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
    imageDimensionProperty,
  } from "../HybridImage/Constants";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";
  import ContentRenderer from "../ContentRenderer.svelte";
  import FollowUs from "../SocialSharing/FollowUs.svelte";
    import { onMount } from "svelte";

  export let story: NewsStory;
  export let story_comment: any[];
  export let device: "desktop" | "mobile" = "desktop";
  export let language = "E";
  export let envDetails: any = "";

  const insertFrequency = 2;
  let descriptionWithAds = [];
  let playerScriptLoaded = false;

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
    envDetails?.language === "H"
      ? "div-ub-republicbharat.com_1719829339250"
      : "div-ub-republicworld1.com_1719637493308",
    0.1,
    () => {
      if (!playerScriptLoaded) {
        loadUnibotScript(envDetails?.language, () => {
          playerScriptLoaded = true;
        });
      }
    },
  );


  if (story && story.deep_focus && story.deep_focus.content) {
    let adsSlotAndUsage = { adSlotIndex: 0, usageCount: 0 };

    for (let i = 0; i < story.deep_focus.content.length; i++) {
      descriptionWithAds.push({
        type: "text",
        content: story.deep_focus.content[i],
      });

      if ((i + 1) % insertFrequency === 0) {
        if (adsSlotAndUsage.adSlotIndex >= 5) {
          adsSlotAndUsage.adSlotIndex = 5;
        } else {
          ++adsSlotAndUsage.adSlotIndex;
        }

        adsSlotAndUsage.usageCount++;
        let dynamicAdId;

        if (device === "desktop") {
          dynamicAdId =
            envDetails?.adsFile?.Desktop?.[`BTF${adsSlotAndUsage?.adSlotIndex}`]
              ?.AP;
        } else if (device === "mobile") {
          dynamicAdId =
            envDetails?.adsFile?.Mobile?.[`BTF${adsSlotAndUsage?.adSlotIndex}`]
              ?.AP;
        }

        descriptionWithAds.push({
          type: "ad",
          adSlot: dynamicAdId,
          usageCount: adsSlotAndUsage.usageCount,
        });
      }
    }
  }

  let swiper;

async function loadSwiperScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.onload = resolve;
    script.onerror = reject;
    script.defer = true;
    document.head.appendChild(script);
  });
}

async function initializeSwiper() {
  await loadSwiperScript();
  const swiperContainer = document.getElementById('deep-dive');
  if (swiperContainer) {
    swiper = new Swiper(swiperContainer, {
      slidesPerView: 2,
      spaceBetween: 8,
      lazy: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    });
  }
}

useIntersectionObserver(
    "story-image",
    0.1,
    () => initializeSwiper()
  );

  onMount(()=>{
    initializeSwiper()
  })
  </script>

  <div
    class="storyContent flex flex-col items-center"
    id="story-image"
    style="font-family: {envDetails.tertiaryFont ?? ''};"
  >
    {#if story?.video && story?.video?.id?.length}
      {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
        <LivetvPlayer.default
          isMute={true}
          livetv_video_id={story.video?.id}
          isAmp={false}
          className={device === "mobile"
          ? "min-h-[185px] w-full h-full"
          : "min-h-[368px] w-full h-full"}
          player="https://content.jwplatform.com/libraries/uzU0TBR0.js"
          autoplay={true}
        />
      {/await}
    {:else}
      <div class="storyImg mb-4 w-full">
        <img
          style="width:100%; aspect-ratio: {language === 'RB'
            ? IMAGE_ASPECT_RATIO['4_3']?.value
            : IMAGE_ASPECT_RATIO['16_9']?.value};"
          src={generateAspectRatioImageURL(
            story.images,
            language === "RB"
              ? imageDimensionProperty?.[device]?.aspect4_3?.lgImage
              : imageDimensionProperty?.[device]?.aspectVideo?.lgImage,
            language === "RB"
              ? IMAGE_ASPECT_RATIO["4_3"]?.key
              : IMAGE_ASPECT_RATIO["16_9"]?.key,
          )}
          alt={language === "RB"
            ? story.images?.versions?.["4_3"]?.alt
            : story.images?.versions?.["16_9"]?.alt || "deepfocus_story_img"}
          fetchpriority="high"
          loading="eager"
        />
      </div>
    {/if}
    <div class="imgCredit pt-2" >
      {story.images?.versions?.["16_9"]?.caption ?? story?.small_heading} | Image: {story.images
        ?.versions?.["16_9"]?.source ?? story?.small_heading}
    </div>
    {#if device === "mobile"}
      <FollowUs {story} {device} {envDetails} />
    {/if}
    <div id="v-republicworld-v9" />
    {#if !envDetails?.domainName.includes("dev") && envDetails?.language === "E"}
      <div id="div-ub-republicworld1.com_1719637493308" />
    {/if}
    {#if envDetails?.language === "H"}
      <div id="div-ub-republicbharat.com_1719829339250"></div>
    {/if}

    {#if story?.deep_focus?.media_items?.length > 0}
      <div style="width: 100%;" class="my-4 bg-red-100 px-2">
      <div
      class="articleHead blackArticleHead debateHead pl-0 pr-0 mb-0"
    >
      <h2 class="pb-0 flex gap-2 px-3">
        <span class="rlogo">
          <img
            src={RFrame}
            alt="Republic Logo Frame icon"
            width="40"
            height="36"
            loading="lazy"
          />
        </span>
        Big Data
      </h2>
    </div>
      <div style="width: 100%;" class="swiper CustomSwiper webStoriesSwiper" id={'deep-dive'}>
        <div class="swiper-wrapper">
          {#each story?.deep_focus?.media_items as item}
            <div style="height:auto;margin-right:12px!important" class="swiper-slide">
              <div class="bigDataCard" style="height: 250px;">
                <div class="bigDataHead">
                  <h4 class="overflow-hidden text-ellipsis line-clamp-2">{item?.title}</h4>
                </div>
                <div
                  class="bigDataImage"
                  style="height: 100%; object-fit: cover;"
                >
                  <img
                    src={generateAspectRatioImageURL(
                      item?.image,
                      ImageDimensions?.[device]?.mediumThumbnail,
                      IMAGE_ASPECT_RATIO["16_9"]?.key,
                      50
                    )}
                    alt={item?.title}
                  />
                </div>
              </div>
            </div>
          {/each}
        </div>
        <div class="customNav">
          <div class="pageWrapper flex gap-2 items-center justify-center">
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
      </div>
    {/if}
    {#if story.deep_focus && descriptionWithAds.length > 0}
      {#each story?.descriptionContent as item, index}
        {#if item.type === "ad"}
          <div class="ad-container mt-4 mb-4">
            <DisplayAd adslot={item.adSlot} usageCount={item.usageCount} />
          </div>
        {:else if item.type === "HTML"}
        
          <h2 class="mb-2">{item?.header}</h2>
          <ContentRenderer html={item.content} {device} {envDetails} />
        {/if}
      {/each}
    {/if}
    {#if story?.disclaimer && story.disclaimer?.length > 0}
      {#each story.disclaimer as item, index}
        <div>{@html item?.footer_content}</div>
      {/each}
    {/if}
  </div>
  <div class="published">
    <p> {`${envDetails?.language === "H" ? "अपडेटेड" : "Updated"} ${formatDate(story?.updatedAt)}`}</p>
  </div>
  <div id="migid-container" />
  <ShowTags
    tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]}
  />

