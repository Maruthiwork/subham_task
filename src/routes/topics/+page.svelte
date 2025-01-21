<script lang="ts">
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
