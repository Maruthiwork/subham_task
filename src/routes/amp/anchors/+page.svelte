<script lang="ts">
  import AnchorsList from "$lib/components/AnchorsAuthors/AnchorsList.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
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
{#if anchor_list}
  <AnchorsList
    isAmp={true}
    anchorList={anchor_list.data}
    {trending_stories}
    {language}
    {device}
    {envDetails}
    {rightSideBar}
    siteNavigation={getParentCategory}
  />
{/if}
