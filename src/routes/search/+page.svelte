<script lang="ts">
    import Search from "$lib/components/Search/index.svelte"
    
    export let data: any;
    const {
      search_bar,
      trending_stories,
      device,
      language,
      envDetails,
      searchSlug,
      getParentCategory
    } = data?.props;

  
</script>


  {#if search_bar !== null && search_bar !== undefined}
  <Search search_bar_data={search_bar} sideBarData={trending_stories} {device} {language} {envDetails} {searchSlug} siteNavigation={getParentCategory} />
  {/if}
  