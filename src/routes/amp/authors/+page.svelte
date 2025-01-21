<script lang="ts">
  import AuthorsList from "$lib/components/AnchorsAuthors/AuthorsList.svelte";
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
  export let data: any;
  const {
    author_list,
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
{#if author_list}
  <AuthorsList
    isAmp={true}
    authorList={author_list.data}
    {trending_stories}
    {language}
    {device}
    {envDetails}
    {rightSideBar}
    siteNavigation={getParentCategory}
  />
{/if}
