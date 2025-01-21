<script lang="ts">
  import AmpQuik from "$lib/components/Quick/AMPQuik.svelte";
  import Quick from "$lib/components/Quick/Quick.svelte";
  export let data: any;

  const { quicks_list, device, language, envDetails, isAmp, canonicalUrl } =
    data?.props;
</script>

{#if quicks_list !== null && quicks_list !== undefined}
  {#if isAmp}
    <AmpQuik
      {device}
      reels={quicks_list}
      {language}
      {envDetails}
      {canonicalUrl}
    />
  {:else}
    <Quick {device} {quicks_list} {language} {envDetails} />
  {/if}
{/if}
