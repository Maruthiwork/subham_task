<script lang="ts">
  import AmpHomePageLayout from "../AMPHomePageLayout/AMPHomePageLayout.svelte";

  export let homepage: any;
  export let device: string = "desktop";
  export let language: string = "E";
  export let envDetails: any = {};
  export let siteNavigation: any = [];
  export let breakingNewsData: any = [];
  export let gainerAndLoosersData: any;
  export let marketData: any;
</script>

<div class="mainWrapper mt-6">
  <AmpHomePageLayout
    isAmp={true}
    {homepage}
    {device}
    {language}
    {envDetails}
    {breakingNewsData}
    {gainerAndLoosersData}
    {marketData}
    {siteNavigation}
  />
</div>
