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

  export let marketData;

  const allowedIndices = Object.values(MARKET_INDICES).map((el) =>
    el.value.toLowerCase(),
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
</script>

<div id="marketSwiperTrigger"></div>
{#if marketData}
  <div class="marketIndicator flex flex-col gap-2">
    <CardHeader textStyle={"font-size: 24px;"}>Markets</CardHeader>
    <div class="cardftr">
      <span>
        {getTimeAndDateSeperatedFromDate(marketData?.updated_at).timeFormatted}
      </span>
      <span>
        {getTimeAndDateSeperatedFromDate(marketData?.updated_at).dateFormatted}
      </span>
    </div>
    <div class="indices-carousel-container fiveColAutoWidth marketIndiMain">
      <amp-base-carousel
        width={16}
        height={8}
        visible-count={2}
        layout="responsive"
        style="width:100%;height:100%;"
      >
        {#each marketData?.["api-data"] as item, i}
          {#if allowedIndices.includes(item["Index Name"].toLowerCase())}
            <div
              style={`background-color: ${
                item["Percentage Change"] > 0 ? "#DDF7DD" : "#FFDADA"
              }; display: flex; flex-direction: column; gap: 0.25rem;`}
              class="mx-1 swiper-slide marketDetail"
            >
              <div class="companyName">
                {item?.["Index Name"]}
              </div>
              <div class="marketValue flexwrap spaceBetween">
                <h3>{item["Current Value"]}</h3>
              </div>

              <div class="percentValue">
                <p style="gap: 10px;" class="flexwrap itemCenter">
                  {#if item["Percentage Change"] > 0}
                    <span class="lowhighArrow">
                      <img src={GreenIcon} alt="Green Up Arrow icon" />
                    </span>
                    {calculateCurrentChange(
                      item["Previous Close"],
                      item["Current Value"],
                    )}
                  {:else}
                    <span class="lowhighArrow">
                      <img src={RedIcon} alt="Red Down Arrow icon" />
                    </span>
                    <span class="redtxt">
                      {calculateCurrentChange(
                        item["Previous Close"],
                        item["Current Value"],
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
      </amp-base-carousel>
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
