<script lang="ts">
  import { page } from "$app/stores";
  import AmpHomepage from "$lib/components/HomePage/AMPHomepage.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";

  export let data: any;

  const {
    homepage,
    device,
    language,
    envDetails,
    breakingNewsData,
    gainerAndLoosersData,
    marketData,
    getParentCategory,
  } = data?.props;

  let isVisible = $page.url.pathname.includes("/adsunits");
</script>

{#if device === "mobile" && !isVisible}
  <DisplayAd
    isAmp={true}
    adslot={envDetails.adsFile?.Mobile.ATF?.home}
    height={"100"}
    width={"300"}
    dataSlot={envDetails.adsFile.Mobile?.ATF?.ampHome}
  />
  <FloatAd
    dataSlot={envDetails.adsFile?.Mobile?.FLOATAD?.ampHome}
    isAmp={true}
  />
{/if}
<AmpHomepage
  {homepage}
  {device}
  {language}
  {envDetails}
  {breakingNewsData}
  {gainerAndLoosersData}
  {marketData}
  siteNavigation={getParentCategory}
/>
