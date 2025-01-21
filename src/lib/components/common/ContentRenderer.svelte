<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import DisplayAd from "./DisplayAd/DisplayAd.svelte";
    import PinCode from "$lib/components/PinCode/PinCode.svelte";
    import { IMAGE_ASPECT_RATIO } from "./HybridImage/Constants";
    import { lazyLoad } from "./LazyLoading/LazyLoading";
    import { stripHtmlAndEscape } from "../utils/utils";

    export let html = [];
    export let device = "desktop"; // or 'mobile'
    export let envDetails = {};
</script>

{#each html as item, index}
    {#if item.type === "ad"}
        {#if device === "desktop"}
            {#if envDetails.adsFile?.Desktop?.[`BTF${item.adIndex}`]?.AP}
                <DisplayAd
                    adslot={envDetails.adsFile.Desktop[`BTF${item.adIndex}`].AP}
                    usageCount={item.adIndex}
                    directload="1"
                    background="1"
                />
            {/if}
        {:else if envDetails.adsFile?.Mobile?.[`BTF${item.adIndex}`]?.AP}
            <div class="py-6">
                <DisplayAd
                    adslot={envDetails.adsFile.Mobile[`BTF${item.adIndex}`].AP}
                    usageCount={item.adIndex}
                    directload="1"
                    background="1"
                />
            </div>
        {/if}
    {:else if item.type === "pincode"}
        {#await import("$lib/components/PinCode/PinCode.svelte") then PinCode}
            <div class="py-3.5">
                <PinCode language={envDetails.language} />
            </div>
        {/await}
    {:else if item.type === "iframe-placeholder"}
        <div
            class="iframe-placeholder"
            data-src={item?.src}
            data-width={item?.width}
            data-height={item?.height}
        >
  
        </div>
    {:else if item.type === "figure"}
        <figure class="image">
            <img
                use:lazyLoad={item?.src}
                src={IMAGE_ASPECT_RATIO["16_9"]?.defaultImage}
                width={item?.width}
                alt={item?.alt}
                loading="lazy"
            />
            <figcaption>
                {@html stripHtmlAndEscape(item?.figcaption)}
            </figcaption>
        </figure>
    {:else}
        <div
            class={`px-1 storyContent flex flex-col ${envDetails.language === "RB" ? "InterFont" : ""}`}
            style={envDetails?.language === "MH" || envDetails?.language === "H"
                ? `font-family:${envDetails?.secondaryFont}; overflow-x: auto;`
                : `font-family:${envDetails?.tertiaryFont}; overflow-x: auto;`}
        >
            {@html item?.html ?? ""}
        </div>
    {/if}
{/each}
