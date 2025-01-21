<script lang="ts">
  import BannerAd from "$lib/components/common/BannerAd/BannerAd.svelte";

  export let adslot: any = {};
  export let width: string = "";
  export let height: string = "";
  export let usageCount: any = 0;
  export let isAmp: boolean = false;
  export let dataSlot: any = "";
  export let directload: any = false;
  export let background: boolean = true;
  export let type: string | null = null;
</script>

<div
  class="adWidget"
>
  {#if background == false}
    <h6>Advertisement</h6>
  {/if}

  <div class="adWrap">
    <BannerAd
      {adslot}
      {usageCount}
      {isAmp}
      {dataSlot}
      {directload}
      {type}
      {background}
    />
  </div>
</div>

<style>
  /* Add your CSS styles here */
  .adWidget {
    max-width: 980px;
    margin: 0 auto;
    padding: 12px 0px 12px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
