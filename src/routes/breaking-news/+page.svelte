<script lang="ts">
    import BreakingNews from "$lib/components/BreakingNews/BreakingNews.svelte";
    export let data: any;
    const {
      breakingNewsData,
      trending_stories,
      device,
      language,
      envDetails,
      canonicalUrl,
      getParentCategory
    } = data?.props;

  
  </script>

  {#if breakingNewsData !== null && breakingNewsData !== undefined}
  <BreakingNews breakingNewsData={breakingNewsData} trending_stories={trending_stories}  sideBarData={trending_stories} {device} {language} {envDetails} {canonicalUrl} siteNavigation={getParentCategory} />
  {/if}

  