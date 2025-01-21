<script lang="ts">
    import PoliciesAndDisclaimers from "$lib/components/StaticComponents/policiesAndDisclaimers.svelte";
    export let data:any;
    const {
      envDetails
    } = data?.props;
</script>

<div class="appPolicies py-16">
    <PoliciesAndDisclaimers {envDetails}/>
</div>
