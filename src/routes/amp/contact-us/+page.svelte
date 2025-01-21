<script lang="ts">
  import ContactUs from "$lib/components/StaticComponents/ContactUs.svelte";

  export let data: any;

  const { envDetails,getParentCategory } = data?.props;
</script>

<ContactUs isAmp={true} {envDetails} siteNavigation={getParentCategory} />
