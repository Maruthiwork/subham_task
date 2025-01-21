<script lang="ts">
  import AnchorAuthorsDetails from "$lib/components/AnchorsAuthors/AnchorAuthorsDetails.svelte";
  export let data: any;
  const {
    anchor_author_data,
    trending_stories,
    rightSideBar,
    device,
    language,
    envDetails,
    getParentCategory
  } = data?.props;
</script>

{#if anchor_author_data}
  <AnchorAuthorsDetails
    isAmp={false}
    anchor_author_details={anchor_author_data.data}
    {trending_stories}
    {device}
    {language}
    {envDetails}
    {rightSideBar}
    siteNavigation={getParentCategory}
  />
{/if}
