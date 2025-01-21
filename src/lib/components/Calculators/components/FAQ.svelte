<script lang="ts">
  export let faqs: any = "";
  export let envDetails:any;
  let FaqDataJson = [];
  if (faqs) {
    try {
      FaqDataJson = JSON.parse(faqs);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  let openIndex: number | null = null;

  function toggleFAQ(index: any) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<div class="mx-auto p-4 {envDetails?.language == "RB" ? 'transparent' :'bg-gray-50'} rounded-md">
  <h2 class="text-2xl font-bold mb-4">Frequently asked questions</h2>
  {#each FaqDataJson as faq, index}
    <div class="mb-4 border-b last:border-none">
      <button
        class="w-full text-left flex justify-between items-center py-2 font-semibold text-lg focus:outline-none"
        on:click={() => toggleFAQ(index)}
      >
        {faq.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 transition-transform duration-300"
          class:rotate-180={openIndex === index}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {#if openIndex === index}
        <p class="mt-2 text-gray-700 text-base">{faq.value}</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  button:focus {
    outline: none;
  }
</style>
