<script lang="ts">
  // @ts-nocheck
  import type { AdSlotUsage, NewsStory } from "$lib/components/Story/Types";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import {
    formatDate,
    generateSlug,
    loadMgidScript,
    loadUnibotScript,
    transformSocialEmbeds,
    useIntersectionObserver,
    useIntersectionObserverforLiveBlogItems,
  } from "$lib/components/utils/utils";
  import { onDestroy, onMount } from "svelte";
  import Comments from "../Comments/Comments.svelte";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../HybridImage/Constants";
  import SharePopup from "../Republic-Common/SharePopup.svelte";
  import ShowTags from "../ShowTags/ShowTags.svelte";
  import { handleError } from "$lib/utils";
  import ContentRenderer from "../ContentRenderer.svelte";
  import FollowUs from "../SocialSharing/FollowUs.svelte";

  export let isAmp: boolean = false;
  export let story: NewsStory;
  export let story_comment: any[];
  export let adsSlotAndUsage: AdSlotUsage;
  export let device: string = "desktop";
  export let envDetails: any = {};

  const insertFrequency = 2;
  const SCROLL_THRESHOLD = 500; // Replace with the desired scroll height in pixels

  let descriptionWithAds = [];
  let playerScriptLoaded = false;
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
  function loadScript(src: string) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }

  // Handle insraection of live blog cards
  let showAllItems = false;
  let itemRefs = []; // Array to hold references to each item
  let intersectionIndexs = []; // To track intersected indexes
</script>

{#if story !== null}
  <div
    class="storyContent flex flex-col"
    style="font-family: {envDetails.tertiaryFont ?? ''};"
  >
    {#if story?.video && Object.values(story?.video).length}
      {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
        <LivetvPlayer.default
          key={story.video?.id}
          isMute={true}
          livetv_video_id={story.video?.id}
          {isAmp}
          player="https://content.jwplatform.com/libraries/uzU0TBR0.js"
          autoplay={true}
          can_float={true}
        />
      {/await}
      <div class="imgCredit" />
    {:else}
      <div class="storyImg">
        {#if isAmp}
          <amp-img
            src={generateAspectRatioImageURL(
              story?.images,
              ImageDimensions?.[device]?.bannerImage,
              IMAGE_ASPECT_RATIO["16_9"]?.key,
            )}
            alt={story?.images?.versions?.["16_9"].alt ?? story?.long_heading}
            width="16"
            height="9"
            layout="responsive"
          />
        {:else}
          <img
            src={generateAspectRatioImageURL(
              story.images,
              ImageDimensions?.[device]?.bannerImage,
              IMAGE_ASPECT_RATIO["16_9"]?.key,
            )}
            on:error={handleError}
            alt={story.images?.versions?.["16_9"].alt ?? story?.long_heading}
            decoding="async"
            data-nimg="fill"
            fetchpriority="high"
            loading="eager"
            width="100%"
          />
        {/if}
      </div>
    {/if}

    <div class="imgCredit pt-2">
      {story.images?.versions?.["16_9"]?.caption ?? story?.small_heading} | Image: {story.images
        ?.versions?.["16_9"]?.source ?? story?.small_heading}
    </div>

    {#if device === "mobile"}
      <FollowUs {story} {device} {envDetails} />
    {/if}
    {#if story?.live_blog_headline}
      <div class="my-3">
        <p>{@html story?.live_blog_headline}</p>
      </div>
    {/if}
    <div>
      <DisplayAd
        adslot={device === "desktop"
          ? envDetails.adsFile.Desktop?.BTF0?.AP
          : envDetails.adsFile.Mobile?.BTF0?.AP}
      />
    </div>
    {#if story?.live_blog_conclusion}
    <div style="display: flex;background-color: #D10014;color: white;padding: 8px;width: 100%;align-items: center;gap: 8px;">
      <div class="size-3 desktop:size-[14px]" style="background-color: #fff;border-radius: 50%;position: relative;top: 0;left: 0;">
      </div>
      <h4 class="text-base desktop:text-[22px]" style="font-weight: 700;text-transform: uppercase;">Live Blog</h4>
    </div>
      <div class="my-3">
        <p>{@html story?.live_blog_conclusion}</p>
      </div>
    {/if}
    {#if !envDetails?.domainName.includes("dev") && envDetails?.language === "E"}
      <div id="div-ub-republicworld1.com_1719637493308" />
    {/if}
    {#if envDetails?.language === "H"}
      <div id="div-ub-republicbharat.com_1719829339250"></div>
    {/if}
    {#each story?.descriptionContent as item, index}
      <hr />

      {#if item.type === "ad"}
        <div class="ad-container mt-4 mb-4">
          <DisplayAd adslot={item.adSlot} usageCount={item.usageCount} />
        </div>
      {:else if item.type === "HTML"}
        <div id={generateSlug(item.header)} class="overflow-hidden">
          <div class="pinned" id={`live-${index}`}>
            <div
              class={index !== story?.descriptionContent?.length - 1
                ? "border-b border-black border-opacity-[0.16]"
                : ""}
            >
              <h6
                class="newsTime desktop:text-lg text-[12px] font-semibold leading-[130%]"
                style="font-family: {envDetails.secondaryFont ?? ''};"
              >
                {formatDate(item.updatedAt ? item.updatedAt : item.createdAt)}
              </h6>

              <input type="checkbox" id={`chck${item._id}`} class="hidden" />
              <h2
                for={`chck${item._id}`}
                style={`font-family:${envDetails?.primaryFont}`}
                class="liveContent flex justify-between items-center py-2 bg-transparent font-extrabold leading-[120%] tracking-[-0.52px] cursor-pointer text-black live-blog-header"
              >
                {item.header}
                <span
                  class="block w-7 h-7 bg-cover bg-center transition-all duration-400 transform rotate-0"
                />
              </h2>
              <div class="live-blog-text text-black bg-transparent">
                <ContentRenderer html={item.content} {device} {envDetails} />
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/each}

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
  <ShowTags
    tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]}
  />
{:else}
  <div />
{/if}

<style>
  .newsTime {
    letter-spacing: -0.5px;
    font-weight: 600;
    color: #d10014;
    position: relative;
    padding-left: 18px;
    margin-top: 8px;
  }

  .live-blog-header {
    font-size: 26px !important;
  }
  .live-blog-text p span {
    background: transparent !important;
    border: #d10014 solid 2px !important;

    /* Other styles as needed */
  }

  .newsTime:before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    background-color: var(--darkred);
  }
  .liveContent {
    padding-bottom: 16px;
  }
  @media (max-width: 768px) {
    .liveContent {
      padding-top: 7px;
      padding-bottom: 15px;
    }

    .live-blog-header {
      font-size: 20px !important;
    }
  }
</style>
