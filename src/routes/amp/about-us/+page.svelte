<script lang="ts">
  import AboutUs from "$lib/components/StaticComponents/AboutUs.svelte";

  export let data: any;

  const { language, envDetails,getParentCategory } = data?.props;
</script>

<AboutUs isAmp={true} {language} {envDetails} siteNavigation={getParentCategory} />
