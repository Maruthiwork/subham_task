<!-- ExampleComponent.svelte -->
<script lang="ts">
    import DisplayAd from "../DisplayAd/DisplayAd.svelte";

    // Props
    export let envDetails: any;
    export let descriptionContent: any;
    export let device: string | "desktop" | "mobile" = "desktop"; // Default to desktop
</script>

<div>
    {#if device === "desktop"}
        {#if envDetails.adsFile && envDetails.adsFile.Desktop && envDetails.adsFile.Desktop[`BTF1`] && envDetails.adsFile.Desktop[`BTF1`].AP}
            <div class="py-6">
                <DisplayAd
                    adslot={envDetails.adsFile.Desktop[`BTF1`].AP}
                    isAmp={true}
                    dataSlot={envDetails.adsFile.Mobile[`BTF1`].ampAP}
                />
            </div>
        {/if}
    {:else if device === "mobile"}
        {#if envDetails.adsFile && envDetails.adsFile.Mobile && envDetails.adsFile.Mobile[`BTF1`] && envDetails.adsFile.Mobile[`BTF1`].AP}
            <div class="py-6">
                <DisplayAd
                    adslot={envDetails.adsFile.Mobile[`BTF1`].AP}
                    isAmp={true}
                    dataSlot={envDetails.adsFile.Mobile[`BTF1`].ampAP}
                />
            </div>
        {/if}
    {/if}
    {#if envDetails?.domainName.includes("dev")}    
    <amp-ima-video 
        id="republicworldAmpPlayer" 
        width="640" 
        height="360" 
        layout="responsive" 
        data-tag="https://pubads.g.doubleclick.net/gampad/ads?iu=/21928950349/amp_video_test&description_url=[placeholder]&tfcd=0&npa=0&sz=640x360&gdfp_req=1&unviewed_position_start=1&output=vmap&env=vp&impl=s&ad_rule=1&correlator=&vid_d=12000" 
        data-poster="https://unibots.b-cdn.net/player/amp/republicworld.png"
        autoplay
        >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
    </amp-ima-video>
    {/if}
    {#each descriptionContent as item}
        {#if item.type === "ad"}
            {#if device === "desktop"}
                {#if envDetails.adsFile && envDetails.adsFile.Desktop && envDetails.adsFile.Desktop[`BTF${item.adIndex}`] && envDetails.adsFile.Desktop[`BTF${item.adIndex}`].AP}
                    <div class="py-6">
                        <DisplayAd
                            adslot={envDetails.adsFile.Desktop[
                                `BTF${item.adIndex}`
                            ].AP}
                            isAmp={true}
                            dataSlot={envDetails.adsFile.Mobile[
                                `BTF${item.adIndex}`
                            ].ampAP}
                        />
                    </div>
                {/if}
            {:else if device === "mobile"}
                {#if envDetails.adsFile && envDetails.adsFile.Mobile && envDetails.adsFile.Mobile[`BTF${item.adIndex}`] && envDetails.adsFile.Mobile[`BTF${item.adIndex}`].AP}
                    <div class="py-6">
                        <DisplayAd
                            adslot={envDetails.adsFile.Mobile[
                                `BTF${item.adIndex}`
                            ].AP}
                            isAmp={true}
                            dataSlot={envDetails.adsFile.Mobile[
                                `BTF${item.adIndex}`
                            ].ampAP}
                        />
                    </div>
                {/if}
            {/if}
        {:else}
            <div
                class="storyContent flex flex-col {envDetails.language === 'RB'
                    ? 'InterFont'
                    : ''}"
                style="font-family: {envDetails.tertiaryFont ?? ''};"
            >
                {#if item?.element?.includes("<thead")}
                    {@html item?.element}
                {:else}
                    {@html item?.element?.replace(
                        /<meta[^>]*>|<font[^>]*>|<\/font>|!important|ms";"|trebuchet|click/gi,
                        "",
                    ) ?? ""}
                {/if}
            </div>
        {/if}
    {/each}
</div>
