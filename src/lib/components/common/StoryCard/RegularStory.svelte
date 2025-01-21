<script lang="ts">
  import type { NewsStory } from "./Types";
  import {
    formatDate,
    loadMgidScript,
    loadUnibotScript,
    useIntersectionObserver,
  } from "$lib/components/utils/utils";
  import DescriptionWithAds from "$lib/components/common/DescriptionWithAds/DescriptionWithAds.svelte";

  import ShowTags from "../ShowTags/ShowTags.svelte";
  import type { AdSlotUsage } from "$lib/components/Story/Types";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../HybridImage/Constants";
  import { handleError } from "$lib/utils";
  import FollowUs from "../SocialSharing/FollowUs.svelte";

  export let story: NewsStory;
  export let device: string = "desktop";
  export let envDetails: any = {};
  export let story_comment: any[];
  export let adsSlotAndUsage: AdSlotUsage;

  let playerScriptLoaded = false;

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



  const imageVersion = story?.images?.versions?.["16_9"];

</script>

{#if story !== null}
  <div
    class="storyContent flex flex-col"
    style="font-family: {envDetails.tertiaryFont ?? ''};"
  >
    <div class="storyImg">
      {#if story?.story_type === "VIDEO" || (story?.video && Object.values(story?.video).length)}
        <div style="min-height: 185px;">
          {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
            <LivetvPlayer.default
              key={story?.video?.id}
              isMute={true}
              livetv_video_id={story?.video?.id}
              player="https://content.jwplatform.com/libraries/uzU0TBR0.js"
              autoplay={true}
              can_float={true}
            />
          {/await}
        </div>
        {#if story?.story_type === "VIDEO"}
          <div class="imgCredit text-xs text-[#474747] pt-2" />
        {/if}
      {:else}
        <div style="min-height: 185px;">
          <img
            src={generateAspectRatioImageURL(
              story?.images,
              ImageDimensions?.[device]?.bannerImage,
              IMAGE_ASPECT_RATIO["16_9"]?.key,
            )}
            on:error={handleError}
            alt={imageVersion?.alt ?? story?.long_heading}
            {...ImageDimensions?.[device]?.bannerImage}
            fetchpriority="high"
            loading="eager"
          />
        </div>
      
        {#if story?.story_type === "REGULAR" || story?.story_type === "OPINION"}
          <div class="imgCredit text-xs text-[#474747] pt-2">
            {imageVersion?.caption ?? story?.small_heading} | Image:
            {imageVersion?.source ?? story?.small_heading}
          </div>
        {:else}
          <div class="imgCredit text-xs text-[#474747] pt-2">
            {imageVersion?.caption ?? story?.small_heading} | Image:
            {imageVersion?.source ?? story?.small_heading}
          </div>
        {/if}
      {/if}
    </div>
    {#if device === "mobile"}
      <FollowUs {story} {device} {envDetails} />
    {/if}
 
    {#if envDetails?.language === "H"}
      <div id="div-ub-republicbharat.com_1719829339250"></div>
    {/if}
    <div id="descwithads">
      <DescriptionWithAds
        description={story?.descriptionContent}
        {device}
        {envDetails}
      />
    </div>
    {#if story?.disclaimer?.length > 0}
      {#each story?.disclaimer as item}
        <div>{@html item?.footer_content}</div>
      {/each}
    {/if}
  </div>

  <div class="published">
      <p
        class="{envDetails?.language === 'MH' || envDetails?.language === 'H'
          ? 'text-[14px]'
          : 'text-[12px]'} mb-2 desktop:text-sm text-black desktop:mb-0 font-medium"
        style="font-display: optional;"
      >
        {`${envDetails?.language === "H" ? "अपडेटेड" : "Updated"} ${formatDate(story?.updatedAt)}`}
      </p>
  </div>

  <div id="migid-container" />
  <ShowTags
    tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]}
  />
{/if}
