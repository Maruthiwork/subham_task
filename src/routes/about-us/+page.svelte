<script lang="ts">
    
    import AboutUs from "$lib/components/StaticComponents/AboutUs.svelte";
    export let data:any;
    const {
      device,
      language,
      envDetails,
      getParentCategory
    } = data?.props;
</script>


<AboutUs {language} {envDetails} siteNavigation={getParentCategory}/>