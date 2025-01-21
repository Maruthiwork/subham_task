<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  export let adslot: any;
  import { v4 as uuid } from "uuid";
  import { parseSizeString } from "$lib/components/utils/utils";

  export let usageCount: any = 0;
  export let height: any = 0;
  export let width: any = 0;
  export let isAmp: boolean = false;
  export let dataSlot: any = "";

  const getAdId = () => {
    return usageCount >= 1 ? adslot?.id.slice(0, -1) + uuid() : adslot?.id;
  };
  let adId = getAdId();

  onMount(() => {
    if (window) {
      window.singleRequestAds = window.singleRequestAds || [];

      adslot = {
        ...adslot,
        size: parseSizeString(adslot.size),
        elementId: adId,
      };
      window.singleRequestAds.push(adslot);
      googletag.cmd.push(() => {
        const slot = googletag.defineSlot(
          adslot.slot,
          adslot.size,
          adslot.elementId
        );
        slot.addService(googletag.pubads());
       
      })
    }
  });
</script>

{#if isAmp}
  <amp-ad
    width={dataSlot?.width}
    height={dataSlot?.height}
    type="doubleclick"
    data-slot={dataSlot?.slot}
    data-multi-size="300x250"
  >
    <div placeholder />
    <div fallback />
  </amp-ad>
{:else}
  <div class="adWidget">
    <h6>Advertisement</h6>
    <div class="adWrap">
      <div id={adId} />
    </div>
  </div>
{/if}

<style>
  /* Add your CSS styles here */
  .adWidget {
    max-width: 980px;
    margin: 0 auto;
    padding: 12px 0px 12px 0px;
    text-align: center;
  }
  .adWidget h6 {
    font-size: 12px;
    line-height: 1;
    font-weight: 400;
    text-align: center;
  }
  .adWrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
