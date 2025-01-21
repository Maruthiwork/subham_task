<script lang="ts">
  import { page } from "$app/stores";
  import HomePage from "$lib/components/HomePage/HomePage.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import TowerAds from "$lib/components/common/TowerAds/TowerAds.svelte";

  export let data: any;
  const { homepage, device, language, envDetails,getParentCategory } = data?.props;

  let isVisible = $page.url.pathname.includes("/adsunits");
</script>

{#if device === "desktop"}
  <TowerAds
    adslotLHS={envDetails.adsFile?.Desktop?.LHS?.home}
    adslotRHS={envDetails.adsFile?.Desktop?.RHS?.home}
  />
{/if}
{#if device === "mobile" && !isVisible}
  <div class="min-h-[290px] flex justify-center items-center">
  <DisplayAd
    adslot={envDetails.adsFile?.Mobile.ATF?.home}
    height={"100"}
    width={"300"}
  />
  </div>
{/if}
<HomePage {homepage} {device} {language} {envDetails} siteNavigation={getParentCategory} />
