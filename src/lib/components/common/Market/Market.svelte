<script lang="ts">
  // @ts-nocheck
  import {
    MARKET_INDICES,
    getTimeAndDateSeperatedFromDate,
    useIntersectionObserver,
  } from "$lib/components/utils/utils";
  import { onMount, onDestroy } from "svelte";
  import GreenIcon from "$lib/assets/images/GreenIcon.svg";
  import RedIcon from "$lib/assets/images/RedIcon.svg";
  import CardHeader from "../Republic-Common/CardHeader.svelte";
  import { fetchMarketIndices } from "../../../../routes/api/fetchData";

  export let language: string;
  let data;
  const allowedIndices = Object.values(MARKET_INDICES).map((el) =>
    el.value.toLowerCase()
  );

  function calculateCurrentChange(previousClose, currentPrice) {
    try {
      const refactoredPrevClose = parseFloat(previousClose.replace(",", ""));
      const refactoredCurrPrice = parseFloat(currentPrice.replace(",", ""));
      return (refactoredCurrPrice - refactoredPrevClose).toFixed(2);
    } catch (e) {
      return currentPrice;
    }
  }

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

  let marketSwiper; // Declare swiper variable

  async function initializeMarketSwiper() {
    const marketswiperContainer = document.getElementById("marketSwiper");

    if (marketswiperContainer) {
      marketSwiper = new Swiper(marketswiperContainer, {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }

  async function setupMarketSwiper() {
    await loadSwiperScript();
    await initializeMarketSwiper();
  }

  onMount(async () => {
    const response = await fetchMarketIndices(language);
    data = response?.data;
    setupMarketSwiper();
  });

  onDestroy(() => {
    if (marketSwiper) {
      marketSwiper.destroy(true, true);
      marketSwiper = null;
    }
  });

  useIntersectionObserver("marketSwiperTrigger", 0.1, setupMarketSwiper);
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
<div id="marketSwiperTrigger"></div>
{#if data}
  <div class="marketIndicator flex flex-col gap-2">
    <CardHeader textStyle={"font-size: 24px;"}>Markets</CardHeader>
    <div class="cardftr">
      <span>
        {getTimeAndDateSeperatedFromDate(data?.updated_at).timeFormatted}
      </span>
      <span>
        {getTimeAndDateSeperatedFromDate(data?.updated_at).dateFormatted}
      </span>
    </div>
    <div
      class="indices-carousel-container fiveColAutoWidth marketIndiMain"
      id="marketSwiper"
    >
      <div class="swiper-wrapper !h-3/4">
        {#each data?.["api-data"] as item, i}
          {#if allowedIndices.includes(item["Index Name"].toLowerCase())}
            <div
              class={item["Percentage Change"] > 0
                ? "bg-[#DDF7DD] swiper-slide marketDetail flex flex-col gap-1"
                : "bg-[#FFDADA] swiper-slide marketDetail flex flex-col gap-1"}
            >
              <div class="companyName">
                {item?.["Index Name"]}
              </div>
              <div class="marketValue flexwrap spaceBetween">
                <h3>{item["Current Value"]}</h3>
              </div>

              <div class="percentValue">
                <p class="flexwrap itemCenter">
                  {#if item["Percentage Change"] > 0}
                    <span class="lowhighArrow">
                      <img src={GreenIcon} alt="Green Up Arrow icon" />
                    </span>
                    {calculateCurrentChange(
                      item["Previous Close"],
                      item["Current Value"]
                    )}
                  {:else}
                    <span class="lowhighArrow">
                      <img src={RedIcon} alt="Red Down Arrow icon" />
                    </span>
                    <span class="redtxt">
                      {calculateCurrentChange(
                        item["Previous Close"],
                        item["Current Value"]
                      )}
                    </span>
                  {/if}
                  {#if item["Percentage Change"] < 0}
                    <span class="redtxt"
                      >({item["Percentage Change"] + " %"})</span
                    >
                  {:else}
                    <span>({item["Percentage Change"] + " %"})</span>
                  {/if}
                </p>
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div class="swiperNav h-14">
        <div class="pageWrapper flex gap-2 items-center justify-center">
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .cardftr {
    color: #626262;
    font-weight: 500;
    font-size: var(--font11);
    font-family: var(--body-font);
  }
  .indices-carousel-container {
    margin-left: auto;
    width: 100%;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    overflow: clip;
    list-style: none;
    padding: 0;
    z-index: 1;
    display: block;
  }
  .marketIndicator .marketDetail {
    padding: 8px;
    width: 50%;
    border-radius: 2px;
    min-height: 110px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
  }

  .marketIndicator .marketDetail:hover {
    background: #f8f8f8;
  }

  .marketIndicator {
    padding: 12px 16px 20px 12px;
    background: #fff7ef;
    width: 100%;
  }

  .marketIndicator .marketHead h6 {
    color: var(--lightGreen);
    font-weight: 800;
    font-size: var(--font14);
    padding-bottom: 8px;
  }

  .marketIndicator .marketValue {
    gap: 10px;
    align-items: center;
  }

  .marketIndicator .marketValue h3 {
    color: var(--black);
    letter-spacing: -1px;
    line-height: 1.4;
    font-size: 20px;
    font-weight: 700;
  }

  .marketIndicator .companyName {
    font-size: var(--font12);
    font-weight: 700;
    color: var(--black);
    text-transform: uppercase;
  }

  .marketIndicator .percentValue p {
    font-size: var(--font14);
    font-weight: 600;
    color: var(--lightGreen);
    gap: 3px;
  }

  .marketTime .cardftr span {
    border-right: 1px solid #626262;
    color: #626262;
    font-size: var(--font11);
    font-weight: 500;
    line-height: 1;
  }

  .marketTime .cardftr span:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    .marketIndicator {
      padding: 12px 16px 12px 16px;
    }
  }
</style>
