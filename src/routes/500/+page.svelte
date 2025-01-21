<script lang="ts">
  import Page500 from "$lib/components/500/Component500.svelte";
  import TowerAds from "$lib/components/common/TowerAds/TowerAds.svelte";

  export let data: any;

  const { nav_bar, device, language, envDetails, isAmp, canonicalUrl } =
    data.props;
</script>

{#if device === "desktop"}
  <TowerAds
    adslotLHS={envDetails.adsFile?.Desktop?.LHS?.home}
    adslotRHS={envDetails.adsFile?.Desktop?.RHS?.home}
  />
{/if}

<Page500 {isAmp} {canonicalUrl} {envDetails} {language} {nav_bar} />
