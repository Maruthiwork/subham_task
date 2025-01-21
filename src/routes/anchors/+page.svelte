<script lang="ts">
  import AnchorsList from "$lib/components/AnchorsAuthors/AnchorsList.svelte";
  export let data: any;
  const {
    anchor_list,
    trending_stories,
    rightSideBar,
    device,
    language,
    envDetails,
    getParentCategory
  } = data?.props;
</script>

{#if anchor_list}
  <AnchorsList
    isAmp={false}
    anchorList={anchor_list.data}
    {trending_stories}
    {language}
    {device}
    {envDetails}
    {rightSideBar}
    siteNavigation={getParentCategory}
  />
{/if}
