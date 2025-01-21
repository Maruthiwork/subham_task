<script lang="ts">
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
