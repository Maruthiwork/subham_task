<script lang="ts">
   // @ts-nocheck
  import { onMount } from "svelte";
  import BannerAd from "$lib/components/common/BannerAd/BannerAd.svelte";
  import { page } from '$app/stores';
  
  export let adslot: any = {};
  export let dataSlot: any = {};
  export let isAmp: boolean = false;

  let floatAd: HTMLElement | null = null;
  let hasAdBeenShown = false; // Tracks if the ad has already been shown
  
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    floatAd = document.getElementById("floatAd");

    if (floatAd) {
      if (!hasAdBeenShown) {
        // Scrolling down, show the ad container and mark it as visible only once
        floatAd.style.bottom = "0";
        hasAdBeenShown = true; // Ensure the ad is only shown once
      } else if (currentScrollTop <= lastScrollTop) {
        // Scrolling up, hide the ad container but don't reset hasAdBeenShown
        floatAd.style.bottom = "59px";
      }
      else if(currentScrollTop > lastScrollTop){
        floatAd.style.bottom = "0";
      }
    }

    lastScrollTop = currentScrollTop;
  };


  onMount(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<style>
  .floatAd {
    user-select: none;
    background: #FFF;
    pointer-events: none;
    text-align: center;
    min-height: 50px;
    z-index: 1;
    justify-content: center;
    bottom: 59px;
    left: 0px;
    right: 0px;
    visibility: visible;
    display: block;
    position: fixed;
    z-index: 99;
  }
  .stickyAd {
    font-size: 0px;
    min-height: 50px;
    margin: 0px auto;
    padding: 0px;
    min-width: 320px;
    pointer-events: all;
  }
</style>
<div>
{#if isAmp}
<amp-sticky-ad layout="nodisplay" style="height: 100px;padding-top: 40px;">
  <amp-ad data-enable-refresh="32" data-loading-strategy="prefer-viewability-over-views" width="320" height="50" type="doubleclick" data-slot={dataSlot?.slot} style="bottom: 47px;z-index: 999;">
</amp-ad>
</amp-sticky-ad>
{:else}
<div class="floatAd" id="floatAd">
    <div class="stickyAd">
        <BannerAd adslot={adslot} {dataSlot} {isAmp} />
  </div>
</div>
{/if}
</div>