<script>
    export let envDetails;
  </script>
  
  <div class="flex justify-center items-center mt-2 mb-2 channelWrap py-3">
    {#if envDetails?.allDomainList}
      {#each envDetails.allDomainList as { name, url }, index}
        <div
          style={`color: ${index === 0 ? "#D10014" : "#000"}`}
          class="mr-2 whitespace-nowrap {index !== envDetails.allDomainList.length - 1 ? 'border-r' : ''} border-solid border-black pr-2 text-xs font-normal cursor-pointer text-[#D10014]"
        >
          <a data-sveltekit-reload href={url}>
            {name}
          </a>
        </div>
      {/each}
    {/if}
  </div>