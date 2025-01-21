<script lang="ts">
    import HomePageLayout from "../HomePageLayout/HomePageLayout.svelte";
    export let homepage:any;
    export let device:string = 'desktop';
    export let language:string = 'E';
    export let envDetails:any = {};
    export let siteNavigation:any = [];

</script>

<div class="mainWrapper mt-6">
      <HomePageLayout homepage={homepage} {device} {language} {envDetails} {siteNavigation}/>
</div>