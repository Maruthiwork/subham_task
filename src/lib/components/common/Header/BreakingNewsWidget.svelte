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

  let intervalId = null;

  let breakingNewsData = [];
  let pathName;
  async function fetchData() {
    const response = await fetchBreakingNewsWidget(language);
    pathName = window.location.pathname;
    const fullRoute = window.location.pathname.replace("/", "");
    const level1Route = fullRoute.split("/")?.[0];

    breakingNewsData =
      level1Route === "world-news"
        ? response?.data?.data?.globalNews
        : response?.data?.data?.breakingNews;

    if (breakingNewsData?.length) {
      initializeBreakingSwiper();
    }
  }

  // Fetch data on mount
  onMount(async () => {
    try {
      await fetchData();
      initializeBreakingSwiper();
    } catch (error) {
      console.error("Error fetching breaking news data:", error);
    }

    intervalId = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  });

  let breakingswiper; // Declare swiper variable

  async function loadSwiperScript() {
    return new Promise((resolve, reject) => {
      if (
        document.querySelector(
          `script[src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"]`
        )
      ) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
        script.onload = resolve;
        script.defer = true;
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }

  async function initializeBreakingSwiper() {
    if (!breakingNewsData?.length) return; // Exit if no data

    await loadSwiperScript();
    const breakingswiperContainer = document.getElementById("breakingdata");

    if (breakingswiperContainer) {
      breakingswiper = new Swiper(breakingswiperContainer, {
        slidesPerView: 1,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".breaking-swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next-breaking-normal",
          prevEl: ".swiper-button-prev-breaking-normal",
        },
      });
    }
  }

  onDestroy(() => {
    if (breakingswiper) {
      breakingswiper.destroy(true, true);
      breakingswiper = null;
    }
  });
</script>

<svelte:head>
  {#if breakingNewsData?.length}
    <link
      rel="preload"
      href="/swiper-bundle.min.css"
      as="style"
      on:load={() => {
        const link = document.querySelector('link[rel="preload"][as="style"]');
        if (link instanceof HTMLLinkElement) {
          link.rel = "stylesheet";
        }
      }}
    />
  {/if}
</svelte:head>

{#if breakingNewsData?.length}
  {#if type === BREAKING_NEWS_BAR_TYPE.DEFAULT && device === "desktop"}
    <div class="breakingWidget-wrapper">
      <div class="cardsRowfull breakingWidget">
        <div class="BNWcontentWrapper contentWrapper">
          <div
            class="flex items-center justify-start breakingwgthorrow desktop:justify-center"
          >
            <div class="swiperLeft">
         
              <span>BREAKING:</span>
            </div>
            <div class="swiperRight">
              <div>
                <div class="breaking-carousel-container" id="breakingdata">
                  <div class="swiper-wrapper">
                    {#each breakingNewsData?.slice(0, 3) as item, i}
                      <div class="swiper-slide">
                        <div
                          class="breakingwedgt flex gap-1 items-center justify-between"
                          key={i}
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
                  </div>
                </div>
              </div>
            </div>
         
            {#if device === "desktop"}
              <div class="swiperNav">
                <div class="pageWrapper flex gap-2 items-center justify-center">
                  <div
                    class="swiper-button-prev swiper-button-prev-breaking-normal"
                  ></div>
                  <div class="breaking-swiper-pagination"></div>
                  <div
                    class="swiper-button-next swiper-button-next-breaking-normal"
                  ></div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if type === BREAKING_NEWS_BAR_TYPE.BIG && device === "mobile" && language !== "RB"}
    <div class="parent w-full bg-[#B10203]">
      <div class="flex gap-4 items-center text-white font-black text-[22px]">
        <span class="rlogo"
          ><img
            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/R.logo.svg`}
            alt="Republic Logo icon"
          /></span
        >
        <span>BREAKING </span>
      </div>

      <div class="swiperRight">
        <div class="breaking-carousel-container" id="breakingdata">
          <div class="swiper-wrapper">
            {#each breakingNewsData?.slice(0, 3) as item, i}
              <div class="swiper-slide">
                <div
                  class="text-wrapper flex gap-3 flex-col {language === 'H'
                    ? '!leading-[40px] !text-[20px]'
                    : ''}"
                  key={i}
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
          </div>
        </div>
      </div>

      <div class="h-[30px]">
        <div class="swiperNav">
          <div class="pageWrapper flex gap-2 items-center justify-center">
            <div
              class="swiper-button-prev swiper-button-prev-breaking-normal"
            ></div>
            <div class="breaking-swiper-pagination"></div>
            <div
              class="swiper-button-next swiper-button-next-breaking-normal"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="contentWrapper">
      <Divider classes={"my-4"} />
    </div>
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
{/if}
