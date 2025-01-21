<script>
  import { generateSlug } from "$lib/components/utils/utils";

  /**
   * @type {string | any[]}
   */
  export let live_blog_texts;
</script>

<div class={`bg-[#FFDADA] p-4 flex flex-col gap-4 mt-4 mb-8`} style="background: #FFDADA;">
  <label class="font-bold text-[15px] desktop:text-2xl leading-[130%]">Latest Updates:</label>
  <div class="blogTextWrapper">
    {#each live_blog_texts.slice(0, 3) as item}
      <a href={"#" + generateSlug(item.header)} title={item.header}>
        <div class="flex items-baseline gap-2">
          <span class="w-2 h-2 bg-red-700 rounded-full"></span>
          <div
            class="text-black font-medium text-base desktop:text-[20px] text-[15px] leading-[140%] cursor-pointer underline underline-offset-4 decoration-[#b102034d]"
          >
            {item.header}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
