<script>
  export let videoId = null;
  export let isOpen = false;
  export let closeModal;

  let iframeSrc = '';

  $: if (videoId) {
    iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
    <div class="bg-black rounded-lg overflow-hidden shadow-lg w-full max-w-3xl relative">
      <div class="flex justify-end p-2 bg-black">
        <button on:click={closeModal} class="text-white hover:text-white text-5xl">&times;</button>
      </div>
      <div class="relative" style="padding-bottom: 56.25%;"> <!-- 16:9 aspect ratio -->
        <iframe
          class="absolute inset-0 w-full h-full"
          src={iframeSrc}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
{/if}
