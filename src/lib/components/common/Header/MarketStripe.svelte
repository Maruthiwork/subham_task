<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import UpIcon from "$lib/assets/images/Call made.svg";
    import DownIcon from "$lib/assets/images/Call received.svg";
    import { fetchMarketIndices } from "../../../../routes/api/fetchData";
    import { MARKET_INDICES_TICKER } from "$lib/components/utils/utils";

    export let language;

    let data = [];
    const allowedIndices = Object.values(MARKET_INDICES_TICKER).map((el) =>
        el.value.toLowerCase(),
    );

    function calculateCurrentChange(previousClose, currentPrice) {
        try {
            const refactoredPrevClose = parseFloat(
                previousClose.replace(",", ""),
            );
            const refactoredCurrPrice = parseFloat(
                currentPrice.replace(",", ""),
            );
            return (refactoredCurrPrice - refactoredPrevClose).toFixed(2);
        } catch (e) {
            return currentPrice;
        }
    }

    onMount(async () => {
        const response = await fetchMarketIndices(language);
        data = response?.data?.["api-data"] || [];
    });
</script>

    <div class="scroll-container">
        {#if data.length}
            <div class="scrolling-content">
                {#each data as item, i}
                    {#if allowedIndices.includes(item["Index Name"].toLowerCase())}
                        <div class="dow-jones">
                            <span class="index-name company-name">{item?.["Index Name"]}</span>
                            <span class="index-value current-price">{item["Current Value"]}</span>
                            <span
                                class={item["Percentage Change"] > 0
                                    ? "bg-[#6FD7A7] index-change"
                                    : "bg-[#FF6861] index-change"}
                            >
                                {#if item["Percentage Change"] > 0}
                                    <span class="arrow">
                                        <img src={UpIcon} alt="up stock" />
                                    </span>
                                {:else}
                                    <span class="arrow">
                                        <img src={DownIcon} alt="Down stock" />
                                    </span>
                                {/if}
                                <span class="change-value pr-1">
                                    {calculateCurrentChange(
                                        item["Previous Close"],
                                        item["Current Value"],
                                    )}
                                </span>
                                <span class="font-medium">({item["Percentage Change"]}%)</span>
                            </span>
                            <div class="seperatorWrapper">
                                <div class="seperator"></div>
                            </div>
                        </div>
                    {/if}
                {/each}
                {#each data as item, i}
                    {#if allowedIndices.includes(item["Index Name"].toLowerCase())}
                        <div class="dow-jones">
                            <span class="index-name company-name">{item?.["Index Name"]}</span>
                            <span class="index-value current-price">{item["Current Value"]}</span>
                            <span
                                class={item["Percentage Change"] > 0
                                    ? "bg-[#6FD7A7] index-change"
                                    : "bg-[#FF6861] index-change"}
                            >
                                {#if item["Percentage Change"] > 0}
                                    <span class="arrow">
                                        <img src={UpIcon} alt="up stock" />
                                    </span>
                                {:else}
                                    <span class="arrow">
                                        <img src={DownIcon} alt="Down stock" />
                                    </span>
                                {/if}
                                <span class="change-value pr-1">
                                    {calculateCurrentChange(
                                        item["Previous Close"],
                                        item["Current Value"],
                                    )}
                                </span>
                                <span class="font-medium">({item["Percentage Change"]}%)</span>
                            </span>
                            <div class="seperatorWrapper">
                                <div class="seperator"></div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>

<style>
    .scroll-container {
        overflow: hidden;
        white-space: nowrap;
        min-height: 45px;
        height: 45px;
        position: relative;
    }

    .scrolling-content {
        display: inline-flex;
        animation: scroll-left 150s linear infinite;
    }

    .dow-jones {
        display: inline-flex;
        align-items: center;
        background-color: #fff5f0;
        padding: 10px;
        white-space: nowrap;
    }

    @keyframes scroll-left {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .index-name {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-right: 3px;
    }

    .seperatorWrapper {
        display: flex;
        padding: 3px 0px 3px 20px;
        justify-content: flex-end;
        align-items: center;
        gap: 22px;
    }

    .seperator {
        width: 1px;
        height: 20px;
        background: rgba(0, 0, 0, 0.5);
    }

    .company-name {
        color: var(--Black, #000);
    }

    .current-price {
        color: #505050;
    }

    .index-value {
        font-size: 16px;
        margin-right: 10px;
    }

    .index-change {
        display: flex;
        align-items: center;
        padding: 5px;
    }

    .arrow {
        margin-right: 5px;
    }

    .change-value {
        font-size: 16px;
    }
</style>
