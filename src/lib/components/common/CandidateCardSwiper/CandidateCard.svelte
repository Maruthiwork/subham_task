<script>
  //@ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import CardHeader from "../Republic-Common/CardHeader.svelte";
  import { lazyLoad } from "../LazyLoading/LazyLoading";

  export let dataCols;
  export let keyCandidates;
  export let widgetId;
  export let title;
  let swiper;

  async function loadSwiperScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.onload = resolve;
      script.onerror = reject;
      script.defer = true;
      document.head.appendChild(script);

    });
  }

  async function initializeSwiper() {
    await loadSwiperScript();
    const swiperContainer = document.getElementById(widgetId);
    if (swiperContainer && dataCols) {
      swiper = new Swiper(swiperContainer, {
        slidesPerView: 2,
        spaceBetween: 12,
        lazy: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
      });
    }
  }

  onMount(() => {
    initializeSwiper(); // Initialize Swiper on component mount
  });
  onDestroy(() => {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
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

<CardHeader>{title}</CardHeader>
<div class="swiper CustomSwiper webStoriesSwiper" id={widgetId}>
  <div class="swiper-wrapper">
    {#each keyCandidates as keyCandidate}
      <div style="height:auto;margin-right:12px!important" class="swiper-slide">
        <div class="flexCardCol borderLight radius4 w-auto relative">
          <a
            href={`/search/?query=${keyCandidate.name}&title=${keyCandidate.name}`}
          >
            <div
              class={keyCandidate?.bjp
                ? "cardHorizontalImg cardsHover partyIcon bjpIcon"
                : "cardHorizontalImg cardsHover partyIcon congressIcon"}
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                class="lazy-loading-img"
                use:lazyLoad={keyCandidate.imageUrl}
                decoding="async"
                data-nimg="fill"
                loading="lazy"
                style="width:100%;aspect-ratio:1/1;object-fit:cover;"
                alt="Candidate Image"
              />
            </div>
            <div class="cardHorizontalContent lightCardTitle p-3">
              <a class="cardHorizontalHead" target="_blank" rel="noreferrer">
                <h4 class="pb8">
                  {keyCandidate.name}
                </h4>
                <p>Constituency</p>
                <div class="overIcon"></div>
                <h4>{keyCandidate.Constituency}</h4>
              </a>
              {#if keyCandidate.result !== null}
                <div
                  style="background-color: {keyCandidate.result
                    ? '#00A424'
                    : '#D10014'}; padding: 5px; display: flex; align-self: center; justify-content: center;width:fit-content"
                >
                  <label
                    style="padding: 0; font-weight: 700; color: white;"
                    class="pl0 border0"
                  >
                    {keyCandidate.result ? "2019 WON" : "2019 LOST"}
                  </label>
                </div>
              {/if}
            </div>
          </a>
        </div>
      </div>
    {/each}
  </div>
  <div class="customNav">
    <div class="pageWrapper flex gap-2 items-center justify-center">
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</div>

<style>
  .partyIcon:after {
    position: absolute;
    content: "";
    background-repeat: no-repeat;
    background-size: cover;
    height: 30px;
    width: 30px;
    top: 4px;
    right: 3px;
    display: block;
    border-radius: 50%;
  }

  .congressIcon:after {
    background-image: url("https://storage.googleapis.com/vision-prod/Elections_2024/congress%20icon.svg");
  }

  .bjpIcon:after {
    background-image: url("https://storage.googleapis.com/vision-prod/Elections_2024/bjp%20icon.jpg");
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
