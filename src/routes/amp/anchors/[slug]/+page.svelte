<script lang="ts">
  import AnchorAuthorsDetails from "$lib/components/AnchorsAuthors/AnchorAuthorsDetails.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
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
{#if anchor_author_data}
  <AnchorAuthorsDetails
    isAmp={true}
    anchor_author_details={anchor_author_data.data}
    {trending_stories}
    {device}
    {language}
    {envDetails}
    {rightSideBar}
    siteNavigation = {getParentCategory}
  />
{/if}
