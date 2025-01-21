<script lang="ts">
    import BreakingNews from "$lib/components/BreakingNews/BreakingNews.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
    export let data: any;
    const {
      breakingNewsData,
      trending_stories,
      device,
      language,
      envDetails,
      canonicalUrl,
      isAmp,
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
  {#if breakingNewsData !== null && breakingNewsData !== undefined}
  <BreakingNews breakingNewsData={breakingNewsData} trending_stories={trending_stories}  sideBarData={trending_stories} {device} {language} {envDetails} {canonicalUrl} {isAmp} siteNavigation={getParentCategory}/>
  {/if}

  