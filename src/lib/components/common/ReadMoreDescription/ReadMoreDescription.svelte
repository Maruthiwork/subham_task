<script>
  // import { createEventDispatcher } from "svelte";

  export let htmlContent = "";
  export let isAmp = false;
  export let envDetails;

  // const dispatch = createEventDispatcher();
  let showMore = true;
  let containsMultiplePTags = htmlContent.length > 290;
  let truncatedContent = htmlContent;

  $: {
    containsMultiplePTags = htmlContent.length > 290;
    truncatedContent =
      containsMultiplePTags && showMore
        ? htmlContent.slice(0, 290).replace(/&nbsp;|<br>/g, "")
        : htmlContent.replace(/&nbsp;|<br>/g, "");
  }

  function removeInlineStyleFromHtmlContent() {
    return htmlContent.replace(/style=".*?"/g, "");
  }
  // function toggleShowMore() {
  //   showMore = !showMore;
  // }

  // function handleShowLess() {
  //   showMore = true;
  //   dispatch("showLess");
  // }

  // $: toggleShowMoreLabel = showMore ? "..More" : "Less";
</script>

<div>
  <div
    class="readmoredesc font-libre text-base font-medium desktop:text-[22px] tracking-[-0.02em] leading-[145%] {showMore
      ? ' line-clamp-3'
      : 'line-clamp-0'}"
  >
    {#if isAmp}
      <div class="storyContent" style="background: none;">
        {@html removeInlineStyleFromHtmlContent().replace("!important", "")}
      </div>
    {:else}
      <div
        class={`px-1 storyContent flex flex-col ${envDetails.language === "RB" ? "InterFont" : ""}`}
        style={envDetails?.language === "MH" || envDetails?.language === "H"
          ? `font-family:${envDetails?.secondaryFont}; overflow-x: auto;`
          : `font-family:${envDetails?.tertiaryFont}; overflow-x: auto;`}
      >
        {@html htmlContent ?? ""}
      </div>

      <!-- {#if containsMultiplePTags && htmlContent && htmlContent.length > truncatedContent.length}
      <span
        class="font-semibold text-base cursor-pointer desktop:text-[22px]"
        on:click={toggleShowMore}
        role="button"
        tabindex="0"
      >
        {toggleShowMoreLabel}
      </span>
    {/if}
    {#if truncatedContent === htmlContent && !showMore}
      <span
        class="font-semibold text-base cursor-pointer desktop:text-[22px]"
        on:click={handleShowLess}
        role="button"
        tabindex="0"
      >
        {toggleShowMoreLabel}
      </span>
    {/if} -->
    {/if}
  </div>
</div>

<style>
  .readmoredesc {
    display: inline;
  }
  .readmoredesc span {
    background-color: transparent !important;
  }

  :global(.storyContent ul li) {
    list-style-type: initial;
    margin-left: 20px !important;
    font-size: 22px !important;
  }

  :global(.storyContent ol li) {
    list-style: auto;
    margin-left: 20px;
    font-size: 22px;
  }
</style>
