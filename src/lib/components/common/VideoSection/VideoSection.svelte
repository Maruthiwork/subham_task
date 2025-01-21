<script lang="ts">
  import StoryCard from "./../Republic-Common/StoryCard.svelte";
  import { TEMPLATE_TYPE } from "$lib/components/enums/story";
  import {
    IMAGE_ASPECT_RATIO,
    generateAspectRatioImageURL,
    imageDimensionProperty,
  } from "../HybridImage/Constants";
  import { TEMPLATE, TEMPLATE_PROPERTIES } from "../StoryCard/Constants";
  import Divider from "../Republic-Common/Divider.svelte";

  export let debateData: any = {};
  export let device: "desktop" | "mobile" = "desktop";
  export let envDetails = {};
  export let grid: any = "";
  let selectedDebate: any;
  let selectedStories;

  let selectedCard = 0;
  let selectedWidgetIndex = 0;
  let selectedWidget: any;
  let selectedStory: any;

  let aspectRatio =
    debateData?.widget?.templateType ||
    TEMPLATE_PROPERTIES.VIDEO_CENTER.type.DEFAULT;

  $: {
    selectedDebate = debateData?.widget;
    selectedStories = debateData?.story;
    selectedWidget = selectedStories?.[selectedWidgetIndex];
    selectedStory = selectedWidget?.story?.[selectedCard];
  }

  let imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.lgImage;
  if (aspectRatio === TEMPLATE_PROPERTIES.VIDEO_CENTER.type?.["4_3"]) {
    imageDimension = imageDimensionProperty?.[device]?.aspect4_3?.lgImage;
  }

  const getCustomImageDimension = () => {
    if (aspectRatio === TEMPLATE_PROPERTIES.VIDEO_CENTER.type?.["4_3"]) {
      return imageDimensionProperty?.[device]?.aspect4_3?.xsImage;
    }

    return imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
  };

  const handleWidgetClick = (index: any) => {
    selectedWidgetIndex = index;
  };

  const handleCardClick = (index: number) => {
    selectedCard = index;
  };

</script>

<section class="videosScrollingList whiteVideosScrollingList">
  <div class="articleHead whiteArticleHead darkRedStrip !mb-4">
    <h2
      class={`text-[22px] font-black ${envDetails?.language === 'MH' || envDetails?.language === 'H' ? 'tracking-normal leading-[150%]' :'tracking-[-1.12px]' }   text-black desktop:text-[28px] desktop:font-black mb-4 ${debateData?.widget?.headerBgColor ? "p-2" : ""}`}
      style="color: {debateData?.widget?.headerColor ??
        ''}; background-color: {debateData?.widget?.headerBgColor ?? ''};"
    >
      {debateData?.widget?.title}
    </h2>
  </div>
  <div
    class={`videosListWrap ${debateData?.story?.[0]?.widget?.cardBgColor ? "p-4" : ""}`}
    style="background-color: {debateData?.story?.[0]?.widget?.cardBgColor ??
      ''};"
  >
    {#if selectedDebate.groupPin.length > 1}
      <div class="videosCategoriesList flex gap-4 mb-5">
        {#each selectedDebate.groupPin as item, index}
          {#if item?.title}
            <button
              aria-label="Click Story"
              on:click={() => handleWidgetClick(index)}
            >
              <a href={item?.completeSlug}>
                <p
                  class="font-normal rounded-[18px] px-4 py-3 text-base h-9 w-auto flex justify-center items-center whitespace-nowrap"
                  style="padding-top:{envDetails?.language === "MH" || envDetails?.language === "MH" ? '16px' : '12px'};line-height:{envDetails?.language === "MH" || envDetails?.language === "MH" ? '140%' : 'normal' };background-color: {selectedWidgetIndex === index
                    ? '#FFF'
                    : '#7b000c'} ;color: {selectedWidgetIndex === index
                    ? '#7b000c'
                    : '#FFF'}"
                >
                  {item.title}
                </p>
              </a>
            </button>
          {/if}
        {/each}
      </div>
    {/if}
    <div class="flex flex-wrap desktop:gap-6 desktop:flex-nowrap">
      <div class="videosLeftBlock">
        <div class="videoFrame">
          <StoryCard
            lazyLoading={selectedDebate.groupPin.length < 2}
            title={selectedStory?.mid_heading}
            imageUrl={generateAspectRatioImageURL(
              selectedStory?.images,
              imageDimension,
              IMAGE_ASPECT_RATIO[aspectRatio]?.key,
            )}
            {device}
            {envDetails}
            template={TEMPLATE.STORY_CARD}
            customImageDimension={imageDimension}
            video={selectedStory?.video}
            storyType={selectedStory?.story_type}
            stickerData={selectedStory?.stickerData}
            alt={selectedStory?.images?.versions?.[aspectRatio]?.alt ||
              "video_story_img"}
            category={selectedStory?.categoryData || ""}
            time={selectedStory?.updatedAt}
            link={selectedStory?.completeSlug}
            gridTemplate={debateData?.widget?.template}
            template_type={TEMPLATE_TYPE.BIG}
            primaryColor={selectedDebate?.primaryColor}
            secondaryColor={selectedDebate?.secondaryColor}
            fontColor={"#FFF"}
            categoryLabel="#FFF"
            columns={1}
            {grid}
          />
        </div>
        {#if device === "mobile" && selectedWidget?.story?.length}
          <Divider classes={`my-0 ${debateData?.widget?.bgColor === "#B10203" ? "bg-[#e5e7eb]":  ""} `} />
        {/if}
      </div>
      <div class="videosRightBlock">
        <ul>
          {#each selectedWidget?.story.slice(1, 5) as item, i}
            <li class={`border-b ${ debateData?.widget?.bgColor === "#B10203" ?"border-b-[#e5e7eb]/50" : "border-b-[#c2b1a0]"}`} class:active={i === selectedCard}>
              <button style="width: 100%;" on:click={() => handleCardClick(i)}>
                <StoryCard
                  lazyLoading={selectedDebate.groupPin.length < 2}
                  title={item?.mid_heading}
                  imageUrl={generateAspectRatioImageURL(
                    item?.images,
                    getCustomImageDimension(),
                    IMAGE_ASPECT_RATIO[aspectRatio]?.key,
                  )}
                  {envDetails}
                  customImageDimension={getCustomImageDimension()}
                  video={item?.video}
                  storyType={item?.story_type}
                  stickerData={item?.stickerData}
                  alt={item.images?.versions?.[aspectRatio]?.alt ||
                    "video_story_img"}
                  category={item?.categoryData || ""}
                  time={item?.updatedAt}
                  link={item?.completeSlug}
                  template={TEMPLATE.STORY_CARD}
                  gridTemplate={debateData?.widget?.template}
                  template_type={TEMPLATE_TYPE.FLIP}
                  primaryColor={selectedDebate?.primaryColor}
                  secondaryColor={selectedDebate?.secondaryColor}
                  columns={1}
                  {grid}
                  {device}
                />
              </button>
            </li>
          {/each}
        </ul>
        <div class="space25" />
        {#if selectedWidget?.widget?.moreUrl}
          <div class="textCenter"></div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .p-0 p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
    margin: 0;
    padding: 6px;
    font-size: 16px;
    line-height: 1.5;
    text-align-last: center;
    cursor: pointer;
  }
  .max-w-sm {
    width: 134px;
  }

  .videosScrollingList {
    width: 100%;
    /* margin-bottom: 25px;
    margin-top: 24px; */
  }

  .videosScrollingList .articleHead {
    margin-bottom: 20px;
  }

  .liveTvLeftblock .videosScrollingList .videosLeftBlock {
    width: 49.6%;
  }

  .videosScrollingList .videosLeftBlock {
    width: 63.4%;
  }

  .videoFrame video {
    margin-right: 10px;

    width: 100%;
  }

  .liveTvLeftblock .videosScrollingList .videosRightBlock {
    width: 48.7%;
  }

  .videosScrollingList .videosRightBlock {
    width: 35.7%;
  }

  .videosRightBlock ul {
    display: flex;
    flex-wrap: wrap;
    transition: all 0.4s ease;
  }

  .videosRightBlock ul li.active {
    order: -1;
  }

  .liveTvLeftblock .videosRightBlock .customHeightScroll {
    height: 405px;
  }

  .videosRightBlock .customHeightScroll {
    max-height: 554px;
    overflow-y: auto;
  }

  .videosRightBlock ul li {
    /* border-bottom: 1px solid rgba(255, 255, 255, 0.50);
    border-bottom: 1px solid rgba(0, 0, 0, 0.24); */
    margin-right: 10px;
    transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
    display: block;
    width: 100%;
    margin-bottom: 12px;
    padding-bottom: 12px;
  }

  /* .videosRightBlock ul li.active, .videosRightBlock ul li:hover { background-color: none; } */

  .videosScrollingList .videosRightBlock .hrcards {
    padding: 16px;
  }

  .videosScrollingList .videosLeftBlock .cardLabel a,
  .videosScrollingList .videosRightBlock .cardLabel a {
    color: #ffd700;
  }

  .videosRightBlock ul li:last-child {
    border-bottom: 0;
  }
  .videosRightBlock .horicardRight {
    margin-left: 0;
  }

  .videosRightBlock ul li.hrcards::before {
    border-bottom: 0;
  }

  /*--------- Purple Video List ----------*/
  .purpleVideoList .sectionNavigation .swiper-slide a {
    background: #6d297d;
    color: #fff;
  }

  .purpleVideoList .sectionNavigation .swiper-slide a.active,
  .purpleVideoList .sectionNavigation .swiper-slide a:hover {
    background: #fff;
    color: #893e9c;
  }

  .purpleVideoList .videosRightBlock ul li.active,
  .purpleVideoList .videosRightBlock ul li:hover {
    background: #6d297d;
  }

  @media screen and (min-width: 681px) and (max-width: 1024px) {
    .liveTvLeftblock .videosScrollingList .videosRightBlock {
      width: 100%;
    }

    .videosScrollingList .videosRightBlock {
      width: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    .liveTvLeftblock .videosScrollingList .videosLeftBlock {
      width: 100%;
      margin-right: 0;
    }

    .videosScrollingList .videosLeftBlock {
      width: 100%;
      margin-right: 0;
    }

    .videosScrollingList .customHeightScroll {
      height: 300px;
    }

    .liveTvLeftblock .videosScrollingList .videosLeftBlock {
      margin-bottom: 16px;
    }

    .videosScrollingList .videosLeftBlock {
      margin-bottom: 16px;
    }

    .threeColumnBlock .verticalListingCol::before {
      display: none;
    }
  }

  @media screen and (max-width: 680px) {
    .horizontalVideoCard.pd16 {
      padding: 16px 0;
    }

    .videosRightBlock .solidBtn {
      margin-top: 20px;
    }

    .videosScrollingList {
      padding-bottom: 16px;
    }

    .videosLeftBlock .cardTitle h2 {
      font-size: 16px;
      letter-spacing: normal;
    }

    .videosScrollingList .videosLeftBlock .cardTitle h2,
    .imgCardWithPlayicon .cardTitle h2 {
      font-size: 22px;
      font-weight: 700;
      line-height: normal;
    }

    .newsColList .lstnewsList li::before {
      font-size: 24px;
      left: 0;
    }

    .videoFrame {
      margin-bottom: 12px;
    }

    .liveTvLeftblock .videosScrollingList .videosLeftBlock,
    .liveTvLeftblock .videosScrollingList .videosRightBlock {
      width: 100%;
      margin-right: 0;
    }

    .videosScrollingList .videosLeftBlock,
    .videosScrollingList .videosRightBlock {
      width: 100%;
      margin-right: 0;
    }

    .videosScrollingList .videosRightBlock .space25 {
      display: none;
    }

    .videosScrollingList .videosRightBlock .hrcards {
      padding: 12px;
    }

    .videosRightBlock .horicardLeft137 {
      margin-left: 10px;
    }

    .cardColContent h2 {
      font-size: 24px;
    }

    .liveTvLeftblock .videosScrollingList .videosLeftBlock,
    .liveTvLeftblock .videosScrollingList .videosRightBlock {
      width: 100%;
      padding-right: 0;
    }

    .videosScrollingList .videosLeftBlock,
    .videosScrollingList .videosRightBlock {
      width: 100%;
      padding-right: 0;
    }

    .videosRightBlock ul li {
      margin-right: 0;
    }
  }
</style>
