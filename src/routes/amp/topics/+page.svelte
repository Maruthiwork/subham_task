<script lang="ts">
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
  import TagsAndTopicsList from "$lib/components/TagsAndTopics/TagsAndTopicsList.svelte";
  export let data: any;
  const {
    tag_and_topics_list,
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
{#if tag_and_topics_list !== null && tag_and_topics_list !== undefined}
  <TagsAndTopicsList
    {canonicalUrl}
    {isAmp}
    {tag_and_topics_list}
    {trending_stories}
    {envDetails}
    {language}
    {device}
    {rightSideBar}
    siteNavigation={getParentCategory}
  />
{/if}
