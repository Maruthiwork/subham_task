<script lang="ts">
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
  import TagsAndTopicsDetails from "$lib/components/TagsAndTopics/TagsAndTopicsDetails.svelte";

  export let data: any;
  const {
    tag_and_topics_data,
    trending_stories,
    rightSideBar,
    device,
    language,
    envDetails,
    isAmp,
    canonicalUrl,
    getParentCategory
  } = data?.props;
</script>

<DisplayAd
  adslot={envDetails.adsFile?.Mobile.ATF?.category}
  height={"50"}
  width={"300"}
  isAmp={true}
  dataSlot={envDetails.adsFile?.Mobile.ATF?.ampCat}
/>
{#if device === "mobile"}
<FloatAd dataSlot={envDetails.adsFile?.Mobile?.FLOATAD?.ampCat} isAmp={true} />
{/if}
{#if tag_and_topics_data !== null && tag_and_topics_data !== undefined}
  <TagsAndTopicsDetails
    {canonicalUrl}
    {isAmp}
    {tag_and_topics_data}
    sideBarData={trending_stories}
    {device}
    {language}
    {envDetails}
    {rightSideBar}
    siteNavigation={getParentCategory}
  />
{/if}
