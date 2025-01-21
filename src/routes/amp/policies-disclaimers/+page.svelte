<script lang="ts">
  import PoliciesAndDisclaimers from "$lib/components/StaticComponents/policiesAndDisclaimers.svelte";

  export let data: any;

  const { envDetails,getParentCategory } = data?.props;
</script>

<PoliciesAndDisclaimers isAmp={true} {envDetails} siteNavigation={getParentCategory} />
