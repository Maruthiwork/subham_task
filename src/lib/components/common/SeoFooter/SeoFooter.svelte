<script>
  // @ts-nocheck

  // Props for the widget
  export let eachWidget = {};

  export let seoTags = [];
</script>

{#if seoTags?.length > 0}
  <div
    class="flex items-center"
    
  >
    <div class="footerRow flexwrap itemCenter w-full" style="background-color: {eachWidget?.cardBgColor}; color: {eachWidget?.primaryColor};">
      <div>
        <h4>{eachWidget?.title}</h4>
        <div
          class="p-2"
        >
          {#each seoTags as tag, index}
            <a
              class="text-base leading-normal py-1.5 px-3 border-r border-gray-300 hover:text-blue-700"
              href={tag.url}
            >
              {tag.title}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}