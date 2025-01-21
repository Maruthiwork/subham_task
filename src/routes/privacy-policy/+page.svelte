<script lang="ts">
    import PrivacyPolicy from "$lib/components/StaticComponents/PrivacyPolicy.svelte";
    export let data:any;
    const {
      envDetails,
      getParentCategory
    } = data?.props;
</script>

<PrivacyPolicy {envDetails} siteNavigation={getParentCategory} />