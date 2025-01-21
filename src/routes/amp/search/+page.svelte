<script lang="ts">
    import AMPSearch from "$lib/components/AMPSearch/index.svelte"
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
    
    export let data: any;
    const {
      search_bar,
      trending_stories,
      device,
      language,
      envDetails,
      searchSlug,
      siteNavigation
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
  {#if search_bar !== null && search_bar !== undefined}
  <AMPSearch search_bar_data={search_bar} sideBarData={trending_stories} {device} {language} {envDetails} {searchSlug} siteNavigation={siteNavigation}/>
  {/if}
  