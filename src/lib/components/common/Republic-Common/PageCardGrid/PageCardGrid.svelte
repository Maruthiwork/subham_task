<script lang="ts">
  import Arrow from "$lib/assets/svg/arrow.svelte";
    import { getLoadMoreLabel } from "$lib/components/utils/utils";
  import { GET_TAGS_AND_TOPICS } from "../../../../../routes/api/fetchData";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../../HybridImage/Constants";
  import { TEMPLATE_PROPERTIES } from "../../StoryCard/Constants";
    import Divider from "../Divider.svelte";
  import PageCards from "../PageCards.svelte";

  export let title: string = "";
  export let cardStyle: string = "";
  export let imgStyle: string = "";
  export let footerStyles: string = "";
  export let columns: any = "1";
  export let limit: number = 15;
  export let templateType: any = TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT;
  export let anchor_author_list: any = [];
  export let pageRoute: string = "";
  export let device = "desktop";
  export let language: string = "E";
  export let isLinkDisabled = false;
  export let showDesignation = true;
  export let classProperties = "";
  export let showLoadMoreButton: boolean = false;
  export let isAmp: boolean = false;
  export let isList: boolean = false;
  export let envDetails:any = "";

  $: loading = false;
  $: pagination = { pageNo: 2, pageSize: 10 };
  let tagsTopicResponse: any;

  let regularStories =
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG
      ? anchor_author_list.slice(1, limit)
      : anchor_author_list;

  const aspectRatio = IMAGE_ASPECT_RATIO?.["1_1"]?.key;
  const sectionWidth: any = {
    desktop: {
      1: `100%`,
      2: `50%`,
      3: `33.33%`,
    },
    mobile: {
      1: `width: 100%`,
    },
  };

  // Methods
  async function loadMore() {
    loading = true;
    const config = {
      method: "GET",
      headers: { lang: language },
    };

    const response = await fetch(
      GET_TAGS_AND_TOPICS(pagination?.pageNo, pagination?.pageSize),
      config,
    );
    const data = await response.json();

    if (
      data?.status &&
      data?.statusCode === 200 &&
      data.data.data.data.length
    ) {
      loading = false;
      pagination = {
        ...pagination,
        pageNo: pagination?.pageNo + 1,
      };
      return data?.data?.data;
    } else {
      loading = false;
      return {};
    }
  }
</script>

{#if regularStories?.length > 0}
  <div
    class={`grid ${regularStories?.length > 1 ? "grid-col-2" : ""}`}
    style="--columns: {columns};row-gap:0;column-gap:0;grid-template-columns:repeat({columns},{sectionWidth?.[
      device
    ]?.[columns]})"
  >
    {#each regularStories as story, index}
    <div>
       <PageCards
         {isAmp}
         {envDetails}
         title={story?.firstName && story?.lastName
           ? story?.firstName + " " + story?.lastName
           : story?.name}
         designation={language == "RB" ? "" : story?.designation}
         discription={story?.description}
         imageUrl={generateAspectRatioImageURL(
           story?.image,
           ImageDimensions?.[device]?.squareImages,
           IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio,
         )}
         {showDesignation}
         alt={story?.images?.versions?.["16_9"]?.alt}
         link_text={isLinkDisabled ? "" : language === "RB" ? "Read More" : story?.category?.name ?? "View More"}
         link={`${pageRoute}/${story.slug}`}
         template_type={templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG
           ? TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT
           : templateType}
         borderStyle={columns === "2" && index % 2 === 0
           ? "padding-right:12px;"
           : columns === "2" && index % 2 === 1
             ? "border-left: 1px solid rgba(0, 0, 0, 0.16);padding-left:12px;"
             : ""}
         {cardStyle}
         {imgStyle}
         {footerStyles}
         {classProperties}
         categoryLabel={language === "RB" ? "#0026D1" : ""}
       />
     {#if language === 'RB' && isList}
     <Divider classes={"my-5"} />
     {/if}      
      </div>
     {/each}

    {#if showLoadMoreButton && !tagsTopicResponse?.pagination?.isLastPage}
      <div class="w-full flex items-center justify-center my-5">
        <button
          aria-label="Load More"
          disabled={loading}
          class={`flex items-center gap-2 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] ${loading ? "cursor-not-allowed  opacity-50 pointer-events-none" : "cursor-pointer"}`}
          on:click={async () => {
            tagsTopicResponse = await loadMore();
            regularStories = [...regularStories, ...tagsTopicResponse?.data];
          }}
        >
          {#if loading}
            ...
          {:else}
            {getLoadMoreLabel(
              language,
              ""
           )}
            <Arrow />
          {/if}
        </button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .grid {
    display: grid;
    gap: 1rem;
  }

  .cell {
    padding: 1rem;
    background-color: lightgray;
    border-radius: 0.5rem;
    text-align: center;
  }

  @media (max-width: 640px) {
    .grid-col-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
