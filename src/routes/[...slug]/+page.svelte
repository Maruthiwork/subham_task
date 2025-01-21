<script lang="ts">
  import Category from "$lib/components/Category/Category.svelte";
  import Story from "$lib/components/Story/Story.svelte";
  import VideoStoryPage from "$lib/components/common/VideoStoryPage/VideoStoryPage.svelte";
  import WebStoriesDetails from "$lib/components/WebStoriesDetail/index.svelte";
  import Quick from "$lib/components/Quick/Quick.svelte";
  import { onMount } from "svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
  export let data: any;

  const {
    story_details,
    category_details,
    video_story_details,
    latest_stories,
    trending_stories,
    shorts_stories,
    web_story_details,
    rightSideBar,
    device,
    language,
    envDetails,
    isAmp,
    descriptionContent,
    web_story_media,
    canonicalUrl,
    pathname,
    pageType,
    getParentCategory,
    livetv_video_id
  } = data.props;

  onMount(() => {
    if (typeof document !== "undefined") {
      window.AdsTarget =
        window.location.pathname.split("/").filter(Boolean)[0] || "sports";
    }
  });
</script>

{#if shorts_stories?.data?.stories && Array.isArray(shorts_stories?.data?.stories) && shorts_stories?.data?.stories.length > 0}
  <svelte:component
    this={Quick}
    {device}
    quicks_list={shorts_stories?.data?.stories}
    {language}
    {envDetails}
    {pathname}
  />
{:else if web_story_details !== null && web_story_details !== undefined}
  <WebStoriesDetails
    webstoryDetail={web_story_details}
    {web_story_media}
    {envDetails}
    {language}
    {canonicalUrl}
    {pathname}
  />
{:else if story_details}
  {#if device === "desktop"}
    {#await import("$lib/components/common/TowerAds/TowerAds.svelte") then TowerAds}
      <svelte:component
        this={TowerAds.default}
        adslotLHS={envDetails.adsFile?.Desktop?.LHS?.AP}
        adslotRHS={envDetails.adsFile?.Desktop?.RHS?.AP}
      />
    {/await}
  {/if}

  <svelte:component
    this={Story}
    storyDetails={story_details}
    sideBarData={trending_stories}
    {device}
    {language}
    {envDetails}
    {rightSideBar}
    {canonicalUrl}
    {pathname}
    {getParentCategory}
  />
{:else if video_story_details && video_story_details?.storyDetails.length > 0}
  {#if device === "desktop"}
    {#await import("$lib/components/common/TowerAds/TowerAds.svelte") then TowerAds}
      <svelte:component
        this={TowerAds.default}
        adslotLHS={envDetails.adsFile?.Desktop?.LHS?.AP}
        adslotRHS={envDetails.adsFile?.Desktop?.RHS?.AP}
      />
    {/await}
  {/if}

  <svelte:component
    this={VideoStoryPage}
    {video_story_details}
    sideBarData={trending_stories}
    {latest_stories}
    {rightSideBar}
    {device}
    {envDetails}
    {language}
    {canonicalUrl}
    {pathname}
    {getParentCategory}
    {livetv_video_id}
  />
{:else if category_details !== null && category_details !== undefined}
  {#if device === "desktop"}
    {#await import("$lib/components/common/TowerAds/TowerAds.svelte") then TowerAds}
      <svelte:component
        this={TowerAds.default}
        adslotLHS={envDetails.adsFile?.Desktop?.LHS?.category}
        adslotRHS={envDetails.adsFile?.Desktop?.RHS?.category}
      />
    {/await}
  {/if}
  {#if device === "mobile"}
    {#await import("$lib/components/common/DisplayAd/DisplayAd.svelte") then DisplayAd}
      <svelte:component
        this={DisplayAd.default}
        adslot={envDetails.adsFile?.Mobile.ATF?.category}
        height={"50"}
        width={"300"}
      />
      <FloatAd adslot={envDetails.adsFile?.Mobile?.FLOATAD?.category} />
    {/await}
  {/if}
  <svelte:component
    this={Category}
    {isAmp}
    categoryDetails={category_details.data}
    {device}
    {language}
    {envDetails}
    {canonicalUrl}
    {pathname}
    {getParentCategory}
  />
{/if}
