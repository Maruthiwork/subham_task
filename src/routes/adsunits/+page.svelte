<script lang="ts">
    import AdsUnits from "$lib/components/AdsUnits/AdsUnits.svelte";
    import FloatAd from "$lib/components/common/FloatAd/FloatAd.svelte";
    import TowerAds from "$lib/components/common/TowerAds/TowerAds.svelte";

    export let data: any;
    const { trending_stories, device, language, envDetails } = data?.props;

</script>

<svelte:head>
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=1">
</svelte:head>

{#if device === "desktop"}
<TowerAds adslotLHS={envDetails.adsFile?.Desktop?.LHS?.ads_page}  adslotRHS={envDetails.adsFile?.Desktop?.RHS?.ads_page}/>
{/if}
<AdsUnits trending_stories={trending_stories} {device} {language} {envDetails}/>
{#if device === "mobile"}
<FloatAd  adslot={envDetails?.adsFile?.Mobile?.FLOATAD?.ads_page} />
{/if}