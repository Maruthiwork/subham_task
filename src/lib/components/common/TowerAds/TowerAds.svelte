<script>
// @ts-nocheck

    import SingleRequestAd from '../adsComponent/SingleRequestAd.svelte';
    import DisplayAd from '../DisplayAd/DisplayAd.svelte';
    export let adslotLHS;
    export let adslotRHS
</script>

<div class="relative towerWrapper">
<div class="leftVerticleAd left-0 fixed">
  <div class="adBlock" id="left">
    <DisplayAd adslot={adslotLHS} />
  </div>
</div>
<div class="rightVerticleAd right-0 fixed">
  <div class="adBlock" id="right">
    <DisplayAd adslot={adslotRHS} />
  </div>
</div>
</div>

<style>
    .towerWrapper{
        margin: 0 auto;
        position: sticky;
        top:46px;
        z-index:9;
        display:block;
        max-width: 1022px;
    }
    .towerWrapper>div:first-child{
	position: absolute;
	left: 0px;
	transform: translateX(-100%);
  padding-right: 24px;
	}
	.towerWrapper>div:last-child{
	position: absolute; 
	right: 0px;
	transform: translateX(100%);
  padding-left: 12px;
	}
</style>