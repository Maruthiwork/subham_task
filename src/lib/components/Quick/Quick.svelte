<script lang="ts">
  //@ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import SEO from "$lib/components/SEO/index.svelte";
  import { timeToRead } from "../utils/utils";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import closeIcon from "../../assets/images/feed-close-black.svg";
  import { useIntersectionObserver } from "../utils/utils";

  // ** Props
  export let quicks_list;
  export let envDetails = {};
  export let language = "E";
  export let canonicalUrl = "";
  export let device = "desktop";
  export let pathname = "";

  // ** Variables
  let swiper;
  let activeIndex = 0;
  let prevIndex = 0;
  let tempIndex = 0;
  let isVisible = false;
  // ** Methods
  const updateHeight = () => {
    if (typeof window !== "undefined") {
      const height = window.innerHeight;
      const svVertical2 = document.querySelector(".qFeedContentWrapper");
      if (svVertical2) {
        svVertical2.style.height = height + "px";
      }
    }
  };

  async function loadSwiperScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  const initializeSwiper = async () => {
    await loadSwiperScript();
    if (typeof Swiper !== "undefined") {
      swiper = new Swiper(".swiper-container", {
        direction: "vertical",
        autoHeight: true,
        mousewheel: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: () => {
            prevIndex = activeIndex;
            activeIndex = swiper.activeIndex;
            updateURLPath();
          },
        },
      });
    }
  };

  const updateURLPath = (customIndex = undefined) => {
    const index = customIndex !== undefined ? customIndex : activeIndex;
    const newSlug = quicks_list?.[index]?.completeSlug;

    let newUrl = `${window.location.origin}/${newSlug}`;

    if (window.location.pathname.includes("quick")) {
      newUrl = `${window.location.origin}/quick/${newSlug}`;
    }

    window.history.replaceState(null, "", newUrl);
  };

  // ** Lifecycle
  useIntersectionObserver("sslide", 0.1, () => {
    isVisible = true;
    initializeSwiper();
    updateHeight();
    window.addEventListener("resize", updateHeight);
  });

  onDestroy(() => {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", updateHeight);
    }
  });


  onMount(() => {
    tempIndex = activeIndex;
    updateURLPath(0);
  });

  const breadcrumbs: any[] = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: quicks_list?.[activeIndex]?.long_heading,
      slug: quicks_list?.[activeIndex]?.completeSlug,
    },
  ];
</script>

<svelte:head>
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
</svelte:head>

<SEO
  lang={language}
  {canonicalUrl}
  pageType={"Story"}
  {breadcrumbs}
  slug={quicks_list?.[activeIndex]?.completeSlug}
  title={quicks_list?.[activeIndex]?.long_heading}
  storyData={quicks_list?.[activeIndex]}
  datePublished={quicks_list?.[activeIndex]?.publish_at}
  lastUpdated={quicks_list?.[activeIndex]?.updatedAt}
  metadescription={quicks_list?.[activeIndex]?.description ??
    quicks_list?.[activeIndex]?.meta_description}
  keywords={quicks_list?.[activeIndex]?.keywords}
  timeToRead={timeToRead(quicks_list?.[activeIndex]?.word_count)}
  featuredImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogSquareImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  twitterImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    quicks_list?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  site_details={envDetails}
  dateCreated={quicks_list?.[activeIndex]?.createdAt ??
    quicks_list?.[activeIndex]?.updatedAt}
  {pathname}
/>
<div class="wrapper">
  <div class="qFeedWrapper">
    <div class="qFeedContentWrapper">
      <div class="qFeedClose">
        <a data-sveltekit-reload href={`/`}>
          <img
            src={closeIcon}
            alt="Feed Close icon"
            width={32}
            height={32}
            style="object-fit: contain;"
          />
        </a>
      </div>
      <div class="swiper-container swiper quickFeedSwiper qFeedContainer">
        <div class="swiper-wrapper">
          {#each quicks_list as value, index (value)}
            <div id="sslide" class="swiper-slide">
              {#if isVisible}
                {#await import("$lib/components/Quick/Slide.svelte") then Slide}
                  <Slide.default
                    {device}
                    {value}
                    {index}
                    {activeIndex}
                    {prevIndex}
                  />
                {/await}
              {/if}
            </div>
          {/each}
        </div>
        <div class="qFeedSwiperNav" id="qfeednav">
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .qFeedWrapper {
    background: rgba(0, 0, 0, 0.88);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qFeedContentWrapper {
    max-height: 680px;
    width: 100%;
    max-width: 490px;
    position: relative;
  }
  .swiper.qFeedContainer {
    height: 100%;
    overflow-x: inherit;
  }
  .qFeedSwiperNav .swiper-button-next:after,
  .qFeedSwiperNav .swiper-button-prev:after {
    font-size: 15px;
    color: var(--black);
  }
  .qFeedSwiperNav .swiper-button-next,
  .qFeedSwiperNav .swiper-button-prev {
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 40px;
    transform: rotate(180deg);
  }
  .qFeedSwiperNav .swiper-button-next.swiper-button-disabled,
  .qFeedSwiperNav .swiper-button-prev.swiper-button-disabled {
    opacity: 0.55;
  }
  .qFeedSwiperNav {
    position: absolute;
    right: 35px !important;
    top: 60px;
    transform: rotate(270deg);
    z-index: 1;
  }
  .qFeedClose,
  .qFeedVol {
    position: absolute;
    top: 20px;
  }
  .qFeedClose {
    left: 16px;
    z-index: 9;
  }
  .qFeedClose a img,
  .qFeedVol a img {
    width: 32px;
    height: 32px;
    display: block;
  }
  @media screen and (max-width: 680px) {
    .qFeedContentWrapper {
      max-height: 100%;
      width: 100%;
      max-width: 100%;
    }
    .qFeedWrapper {
      align-items: self-start;
      padding: 0;
    }
    .qFeedSwiperNav {
      right: 22px;
      top: 110px;
      display: none !important;
    }
    .qFeedClose a img,
    .qFeedVol a img {
      width: 28px;
      height: 28px;
    }
  }
</style>
