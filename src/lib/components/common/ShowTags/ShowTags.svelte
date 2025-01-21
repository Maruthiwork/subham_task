<!-- ShowTags.svelte -->
<script lang="ts">
  export let isAmp: boolean = false;
  export let tagsData: any[];
</script>

<div class="flex-wrap storyTags mt-3">
  {#if tagsData && tagsData.length > 0}
    {#each tagsData as item}
      {#if item?.url}
        <a
          data-sveltekit-reload
          href={item?.url}
          class="font-semibold text-white bg-blue-500 rounded-md px-4 py-2 mr-2 mb-2 inline-block"
          aria-label={`Topic: ${item.name}`}
        >
          {item.title ?? item?.name}
        </a>
      {:else}
        <a
          data-sveltekit-reload
          href={`${isAmp ? "/amp/" : "/"}topics/${item.slug}`}
          class="font-semibold text-white bg-blue-500 rounded-md px-4 py-2 mr-2 mb-2 inline-block"
          aria-label={`Topic: ${item.name}`}
        >
          {item.name}
        </a>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .storyTags {
    gap: 0.75rem;
  }

  .lightCardTitle a {
    color: #000;
  }

  .cardsHover:hover .lightCardTitle a {
    color: #8b0000; /* Dark red color */
  }
</style>
