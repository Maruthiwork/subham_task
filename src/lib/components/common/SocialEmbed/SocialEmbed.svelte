<script lang="ts">
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import CardHeader from "../Republic-Common/CardHeader.svelte";
  import { transformSocialEmbeds } from "$lib/components/utils/utils";
  export let widgetData;

  let socialEmbedSwiper: any; // Declare swiper variable

  async function loadSwiperScript() {
    return new Promise((resolve, reject) => {
    
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function initializeBreakingSwiper() {
    await loadSwiperScript();
    const socialEmbedContainer = document.getElementById("socialEmbedID");

    if (socialEmbedContainer) {
      socialEmbedSwiper = new Swiper(socialEmbedContainer, {
        slidesPerView: 1,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false,
        // },
        pagination: {
          el: ".social-swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next-social-normal",
          prevEl: ".swiper-button-prev-social-normal",
        },
      });
    }
  }

  onDestroy(() => {
    if (socialEmbedSwiper) {
      socialEmbedSwiper.destroy(true, true);
      socialEmbedSwiper = null;
    }
  });

  onMount(() => {
    initializeBreakingSwiper();
  });
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

<div>
  {#if widgetData}
    <CardHeader>
      {widgetData.title}
    </CardHeader>
    <div class="swiper CustomSwiper webStoriesSwiper" id="socialEmbedID">
      <div class="swiper-wrapper">
        {#each widgetData.info as socialCardHTML}
          <div class="swiper-slide">
            <div class="twitterCard">
              {#if socialCardHTML.embedded_code}
                <!-- {@html socialCardHTML.embedded_code} -->
                {@html transformSocialEmbeds(socialCardHTML.embedded_code)}
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <div class="swiperNav">
        <div class="swiper-button-prev swiper-button-prev-social-normal"></div>
        <div class="social-swiper-pagination"></div>
        <div class="swiper-button-next swiper-button-next-social-normal"></div>
      </div>
    </div>
  {/if}
</div>

<style>
  .twitterCard {
    max-width: 352px !important;
  }
  .webStoriesSwiper {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    overflow: clip;
    list-style: none;
    padding: 0;
    z-index: 1;
    display: block;
    height: 100%;
  }
  .webStoriesSwiper .cardHorizontalHead h4 {
    font-size: 17px;
    font-weight: 700;
  }
  .webStoriesSwiper .flexCardCol {
    margin-bottom: 0;
    height: 100%;
  }
</style>
