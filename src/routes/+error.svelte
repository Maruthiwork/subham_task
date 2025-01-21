<script lang="ts">
    import TowerAds from "$lib/components/common/TowerAds/TowerAds.svelte";
    import vimalLogo from "$lib/assets/images/404.png";
    import { page } from "$app/stores";

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
<div style="border-bottom: 1px solid #d6d6d6;"></div>
<div>
    <center class="pagenotfoundContent">
        <div style="font-size: 20px; color: rgba(0,0,0,.64);">
            Oops... Something went Wrong!
        </div>
        <h4>{$page?.error?.message}</h4>
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
            src={vimalLogo}
            width={200}
            height={150}
            style="object-fit: contain;"
            alt="404 Image"
        />
    </center>
    <div class="contentWrapper" style="border-bottom: 1px solid #d6d6d6;"></div>
    <div class="latestNewsData contentWrapper fourColFlex flexwrap gap16 pt16">
        <!-- Add your content here -->
    </div>
    <div class="contentWrapper">
        <div id="migid-container" />
    </div>
</div>
