<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  export let adslot: any = {};
  import { v4 as uuid } from "uuid";
  import { parseSizeString } from "$lib/components/utils/utils";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";

  export let usageCount: any = 0;
  export let height: string = "";
  export let width: string = "";
  export let isAmp: boolean = false;
  export let dataSlot: any = "";
  export let directload: number = 0;
  export let type: string | null = null;
  export let background: boolean = false;

  const getAdId = () => {
    return usageCount >= 1 ? adslot?.id?.slice(0, -1) + uuid() : adslot?.id;
  };
  let adId = getAdId();

  onMount(() => {
    if (window) {
      if (directload) {
        if (window.loadDirectAds) {
          window.loadDirectAds(
            adId,
            adslot.slot,
            parseSizeString(adslot.size),
            adslot.refresh == "false" ||
              adslot.refresh == false ||
              adslot.refresh == 0
              ? false
              : true,
            adslot.onViewport == "false" ||
              adslot.onViewport == false ||
              adslot.onViewport == 0
              ? false
              : true,
            true,
            background ? true : false,
          );
        }
      } else if (type == "TOP") {
        window.onTopLoadAdsRequestAds = window.onTopLoadAdsRequestAds || [];

        adslot = {
          ...adslot,
          size: parseSizeString(adslot.size),
          elementId: adId,
          refresh:
            adslot.refresh == "false" ||
            adslot.refresh == false ||
            adslot.refresh == 0
              ? false
              : true,
          onViewport:
            adslot.onViewport == "false" ||
            adslot.onViewport == false ||
            adslot.onViewport == 0
              ? false
              : true,
        };
        window.onTopLoadAdsRequestAds.push(adslot);
      } else if (type == "SCROLL") {
        window.onScrollLoadAdsRequestAds =
          window.onScrollLoadAdsRequestAds || [];

        adslot = {
          ...adslot,
          size: parseSizeString(adslot.size),
          elementId: adId,
          refresh:
            adslot.refresh == "false" ||
            adslot.refresh == false ||
            adslot.refresh == 0
              ? false
              : true,
          onViewport:
            adslot.onViewport == "false" ||
            adslot.onViewport == false ||
            adslot.onViewport == 0
              ? false
              : true,
        };
        window.onScrollLoadAdsRequestAds.push(adslot);
      } else {
        window.normalRequestAds = window.normalRequestAds || [];

        adslot = {
          ...adslot,
          size: parseSizeString(adslot.size),
          elementId: adId,
          refresh:
            adslot.refresh == "false" ||
            adslot.refresh == false ||
            adslot.refresh == 0
              ? false
              : true,
          onViewport:
            adslot.onViewport == "false" ||
            adslot.onViewport == false ||
            adslot.onViewport == 0
              ? false
              : true,
          collapse: true,
          background : true,
        };
        window.normalRequestAds.push(adslot);
      }
    }
  });
</script>

<div class="adWrap">
  {#if isAmp}
    <amp-ad
      width={dataSlot?.width}
      height={dataSlot?.height}
      type="doubleclick"
      data-slot={dataSlot?.slot}
      data-multi-size={EnvironmentConfig.VITE_ENVIRONMENT == "qa" ? (dataSlot?.dataMultiSizes || dataSlot?.width+"x"+dataSlot?.height) : dataSlot?.width+"x"+dataSlot?.height}
      data-enable-refresh="32" 
      data-loading-strategy="prefer-viewability-over-views"
    >
      <div placeholder />
      <div fallback />
    </amp-ad>
  {:else}
    <div id={adId} />
  {/if}
</div>
