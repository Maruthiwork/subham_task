<script lang="ts">
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import { ConvertDateFormat } from "$lib/components/utils/utils";
  import { fetchBreakingNewsWidget } from "../../../../routes/api/fetchData";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import { BREAKING_NEWS_BAR_TYPE } from "./Constants";
  import Divider from "../Republic-Common/Divider.svelte";

  export let language = "E";
  export let device;
  export let type;
  export let breakingNewsData = [];

  let intervalId = null;
  let pathName;
  let breakingswiper; // Declare swiper variable
</script>

{#if breakingNewsData?.length}
  {#if type === BREAKING_NEWS_BAR_TYPE.BIG && device === "mobile" && language !== "RB"}
    <div style="background-color: #B10203;" class="parent w-full bg-[#B10203]">
      <div class="flex gap-4 items-center text-white font-black text-[22px]">
        <span class="rlogo"
          ><img
            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/R.logo.svg`}
            alt="Republic Logo icon"
          /></span
        >
        <span>BREAKING </span>
      </div>

      <amp-base-carousel
        width={16}
        height={5}
        visible-count={1}
        layout="responsive"
        style="width:100%;height:100%;"
        id="carousel-1"
      >
        {#each breakingNewsData?.slice(0, 3) as item, i}
          <div class="swiper-slide">
            <div
              class="text-wrapper flex gap-3 flex-col {language === 'H'
                ? '!leading-[40px] !text-[20px]'
                : ''}"
            >
              <div class="contents">
                {#if item.url !== ""}
                  <a href={item.url}>
                    {item.contentType === "STORY"
                      ? item?.pinnedStory?.mid_heading
                      : item?.subTitle}
                  </a>
                {:else if item?.pinnedStory?.completeSlug}
                  <a href={`${item?.pinnedStory?.completeSlug}`}>
                    {item.contentType === "STORY"
                      ? item?.pinnedStory?.mid_heading
                      : item?.subTitle}
                  </a>
                {:else}
                  <span>
                    {item.contentType === "STORY"
                      ? item?.pinnedStory?.mid_heading
                      : item?.subTitle}
                  </span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </amp-base-carousel>
    </div>
    <div class="contentWrapper">
      <Divider classes={"my-4"} />
    </div>
  {/if}
  {#if type === BREAKING_NEWS_BAR_TYPE.BIG && device === "desktop"}
    <div class="breakingWidget-wrapper">
      <div class="cardsRowfull breakingWidget">
        <div class="BNWcontentWrapper">
          <div
            class="flex items-center justify-start breakingwgthorrow desktop:justify-center contentWrapper"
          >
            <div class="swiperLeft">
              <span>BREAKING:</span>
            </div>

            <amp-base-carousel
              height="50px"
              visible-count={1}
              style="width:100%;height:100%; padding:0px"
            >
              {#each breakingNewsData?.slice(0, 3) as item, i}
                <div class="swiper-slide" style="padding-top: 20px;">
                  <div
                    class="breakingwedgt flex gap-1 items-center justify-between"
                  >
                    {#if item.url !== ""}
                      <a href={item.url}>
                        {item.contentType === "STORY"
                          ? item?.pinnedStory?.mid_heading
                          : item?.subTitle}
                      </a>
                    {:else if item?.pinnedStory?.completeSlug}
                      <a href={`${item?.pinnedStory?.completeSlug}`}>
                        {item.contentType === "STORY"
                          ? item?.pinnedStory?.mid_heading
                          : item?.subTitle}
                      </a>
                    {:else}
                      <span>
                        {item.contentType === "STORY"
                          ? item?.pinnedStory?.mid_heading
                          : item?.subTitle}
                      </span>
                    {/if}
                  </div>
                </div>
              {/each}
            </amp-base-carousel>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
  @media screen and (min-width: 1537px) {
    .BNWcontentWrapper {
      max-width: 100%;
    }
  }
  .swiperNav {
    position: relative;
    top: 6px;
  }

  .breaking-carousel-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    overflow: clip;
    list-style: none;
    padding: 0;
    z-index: 1;
    display: block;
  }

  .breakingWidget-wrapper {
    border-top: 1px solid rgba(0, 0, 0, 0.16);
  }

  .breakingwedgt span:first-child,
  .breakingwedgt a {
    font-size: 18px;
    line-height: 1;
    font-weight: 800;
    color: var(--white);
    text-align: left;
    width: 85%;
    overflow: hidden;
    padding: 12px 0;
    white-space: nowrap;
  }

  .headBreakingWgt .breakingWidget-wrapper {
    margin: 0;
    border-top: 0;
    padding-top: 0;
  }

  .breakingWidget {
    background-color: var(--breakingwidget);
    margin-bottom: 0;
    position: relative;
  }
  .itemCenter {
    align-items: center;
  }

  .breakingWidget .swiperLeft {
    display: flex;
    font-weight: 700;
    align-items: center;
    padding: 8px 0;
  }

  .breakingwgthorrow .swiperRight {
    width: 45%;
  }

  .swiperLeft span {
    font-size: var(--font18);
    line-height: 1;
    font-weight: 800;
    color: var(--white);
    margin-right: 10px;
  }

  .beakingNewsTime {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    white-space: nowrap;
    font-weight: 400;
  }
  .textWhite,
  .whitetxt {
    color: var(--white);
  }

  .solidBtn {
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    padding: 8px 28px 8px 16px;
    display: inline-block;
    transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
    font-size: var(--font16);
    line-height: 1;
    font-weight: 600;
    position: relative;
    white-space: nowrap;
  }
  .dot {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.5);
    width: 8px;
    height: 8px;
  }
  .selected {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.7);
    width: 16px;
    height: 8px;
  }
  .swiper-button-prev-breaking-normal::after {
    background-image: url($lib/assets/images/leftArrow.svg) !important;
  }
  .swiper-button-next-breaking-normal::after {
    background-image: url($lib/assets/images/rightArrow.svg) !important;
  }

  @media (max-width: 680px) {
    .breakingwgthorrow .swiperRight {
      width: 100%;
    }

    .breakingwedgt a {
      font-size: 18px;
      line-height: 1;
      font-weight: 800;
      color: var(--white);
      text-align: left;
      width: 70%;
      overflow: hidden;
      padding: 12px 0;
      white-space: inherit;
    }

    .parent {
      display: flex;
      padding: 8px 16px 12px 16px;
      flex-direction: column;
      gap: 10px;
    }

    .text-wrapper {
      color: #fff;
      font-family: "Noto Sans,serif";
      font-size: 28px;
      font-style: normal;
      font-weight: 900;
      line-height: 115%;
      letter-spacing: -1.12px;
    }

    .time-stamp {
      color: rgba(255, 255, 255, 0.7);
      font-family: Mulish;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .swiperNav {
      position: relative;
      top: 16px;
    }

    .breaking-swiper-pagination {
      bottom: -5px !important;
    }
  }
</style>
