<script lang="ts">
  import Category from "$lib/components/Category/Category.svelte";
  import WebStoriesDetails from "$lib/components/WebStoriesDetail/index.svelte";
  import AmpStory from "$lib/components/Story/AmpStory.svelte";
  import AmpVideoStoryPage from "$lib/components/common/VideoStoryPage/AmpVideoStoryPage.svelte";
  import AmpQuik from "$lib/components/Quick/AMPQuik.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";

  export let data: any;

  const {
    story_details,
    category_details,
    video_story_details,
    latest_stories,
    videoStoryDescription,
    trending_stories,
    shorts_stories,
    web_story_details,
    rightSideBar,
    device,
    language,
    envDetails,
    isAmp,
    descriptionContent,
    canonicalUrl,
    pathname,
    sharePlatforms,
    nextStoryUrl,
    getParentCategory,
    livetv_video_id,
    gainerAndLoosersData,
    marketData
  } = data.props;
</script>

{#if shorts_stories?.data?.stories && Array.isArray(shorts_stories?.data?.stories) && shorts_stories?.data?.stories.length > 0}
  <AmpQuik
    {device}
    reels={shorts_stories?.data?.stories}
    {language}
    {canonicalUrl}
    {envDetails}
    {pathname}
  />
{:else if web_story_details !== null && web_story_details !== undefined}
  <WebStoriesDetails
    webstoryDetail={web_story_details}
    {envDetails}
    {language}
    {canonicalUrl}
    {pathname}
  />
{:else if story_details}
  {#if device === "desktop"}
    {#await import("$lib/components/common/TowerAds/TowerAds.svelte") then TowerAds}
      <TowerAds.default
        adslotLHS={envDetails.adsFile?.Desktop?.LHS?.AP}
        adslotRHS={envDetails.adsFile?.Desktop?.RHS?.AP}
      />
    {/await}
  {/if}
  <AmpStory
    storyDetails={story_details}
    sideBarData={trending_stories}
    {device}
    {language}
    {envDetails}
    {descriptionContent}
    {canonicalUrl}
    {rightSideBar}
    {pathname}
    {sharePlatforms}
    siteNavigation={getParentCategory}
  />
{:else if video_story_details && video_story_details?.storyDetails.length > 0}
  {#if device === "desktop"}
    {#await import("$lib/components/common/TowerAds/TowerAds.svelte") then TowerAds}
      <TowerAds.default
        adslotLHS={envDetails.adsFile?.Desktop?.LHS?.AP}
        adslotRHS={envDetails.adsFile?.Desktop?.RHS?.AP}
      />
    {/await}
  {/if}
  <AmpVideoStoryPage
    {videoStoryDescription}
    {video_story_details}
    {latest_stories}
    {rightSideBar}
    {device}
    {envDetails}
    {language}
    {canonicalUrl}
    {pathname}
    {sharePlatforms}
    siteNavigation={getParentCategory}
    {livetv_video_id}
  />
{:else if category_details !== null && category_details !== undefined}
  {#if device === "desktop"}
    {#await import("$lib/components/common/TowerAds/TowerAds.svelte") then TowerAds}
      <TowerAds.default
        adslotLHS={envDetails.adsFile?.Desktop?.LHS?.category}
        adslotRHS={envDetails.adsFile?.Desktop?.RHS?.category}
      />
    {/await}
  {/if}
  {#if device === "mobile"}
    <DisplayAd
      adslot={envDetails.adsFile?.Mobile.ATF?.category}
      height={"50"}
      width={"300"}
      {isAmp}
      dataSlot={envDetails.adsFile?.Mobile.ATF?.ampCat}
    />
    <FloatAd dataSlot={envDetails.adsFile?.Mobile?.FLOATAD?.ampCat} {isAmp} />
  {/if}
  <Category
    {isAmp}
    categoryDetails={category_details.data}
    {device}
    {language}
    {envDetails}
    {canonicalUrl}
    {pathname}
    {nextStoryUrl}
    {getParentCategory}
    {gainerAndLoosersData}
    {marketData}
  />
{/if}
