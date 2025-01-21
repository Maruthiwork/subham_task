<script lang="ts">
    import { onMount } from "svelte";
    import { fetchGainersLoosets } from "../../../../routes/api/fetchData";
    import CardHeader from "../Republic-Common/CardHeader.svelte";
    import { getTimeAndDateSeperatedFromDate } from "$lib/components/utils/utils";
    import GreenIcon from "$lib/assets/images/GreenIcon.svg";
    import RedIcon from "$lib/assets/images/RedIcon.svg";

    export let language: string = "E";
    const DROPDOWN_VALUE = [
        { value: "NIFTY 50", display: "NIFTY 50" },
        { value: "ALL SECURITIES", display: "ALL SECURITIES" },
    ];

    let selectedExchange = DROPDOWN_VALUE[0].value;
    let gainersLosersResponse: any;

    const getMarketResponse = async () => {
        try {
            const limit = 5;
            const response = await fetchGainersLoosets(language, limit);
            gainersLosersResponse = response?.data;
        } catch (e) {
            gainersLosersResponse = undefined;
        }
    };

    onMount(() => {
        getMarketResponse();
    });

    let selectedExchangeValue = selectedExchange;

    $: selectedExchangeValue = selectedExchange;
</script>

{#if gainersLosersResponse?.ALL_SECURITIES_DATA?.length > 0}
    <div class="gainerLoserSec w-full">
        <div
            class="smThumbContainer border0"
            style="background-color: #FFF7EF;"
        >
            <CardHeader textStyle={"font-size: 24px;"}>Gainers &amp; Losers</CardHeader>
            <div class="cardftr lightCardftr">
                <span
                    >{getTimeAndDateSeperatedFromDate(
                        gainersLosersResponse?.updated_at,
                    ).timeFormatted}</span
                >
                <span
                    >{getTimeAndDateSeperatedFromDate(
                        gainersLosersResponse?.updated_at,
                    ).dateFormatted}</span
                >
            </div>
            <div class="switch-field">
                {#each DROPDOWN_VALUE as item}
                    <input
                        type="radio"
                        id="radio-{item.value}"
                        name="switch-one"
                        value={item.value}
                        checked={selectedExchange === item.value}
                        on:change={() => (selectedExchange = item.value)}
                    />
                    <label for="radio-{item.value}">{item.value}</label>
                {/each}
            </div>
            <div class="tableChart">
                <table
                    class="table gainlosersTableChart"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                >
                    <thead>
                        <tr>
                            <th>SYMB.</th>
                            <th>LTP</th>
                            <th>OPEN PRICE</th>
                            <th>CHANGE %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each gainersLosersResponse?.[selectedExchangeValue === DROPDOWN_VALUE[0].value ? "NSE_GAINERS_LOSERS" : "ALL_SECURITIES_DATA"] as symbolRow, i}
                            <tr class:darkBg={i % 2 === 1 ? "darkBg" : ""}>
                                <td class="flex gap-1">
                                    {#if symbolRow.net_price >= 0}
                                        <img src={GreenIcon} alt="Gainer" />
                                    {:else}
                                        <img src={RedIcon} alt="Looser" />
                                    {/if}
                                    <span class="ellipsis">
                                        {symbolRow.symbol}
                                    </span>
                                </td>
                                <td>{symbolRow.ltp}</td>
                                <td>{symbolRow.open_price}</td>
                                <td
                                    class={symbolRow.net_price > 0
                                        ? "positive"
                                        : "negative"}>{symbolRow.net_price}</td
                                >
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{/if}

<style>
    .table {
        width: 100%;
    }

    .ellipsis {
        display: inline-block;
        max-width: 14ch;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .smThumbContainer{
        padding: 12px 8px 12px 8px;
    }

    .darkBg {
        background: #ffe4cb;
    }

    .positive {
        color: #05c46b;
    }

    .negative {
        color: #ff6861;
    }
    .tableChart table,
    th,
    td {
        border: none;
    }

    table tr td {
        font-size: 14px;
        line-height: 1;
        font-weight: 400;
        color: #626262;
        padding: 10px 5px;
    }

    table tr th {
        font-size: 11px;
        line-height: 1;
        font-weight: 400;
        padding: 10px 5px;
    }

    .gainlosersTableChart tr td {
        font-weight: 700;
        text-align: center;
        font-size: 12px;
    }

    .gainlosersTableChart tr th {
        font-weight: 400;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.16);
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        padding: 5px 5px;
    }

    .gainlosersTableChart tr td:first-child,
    .gainlosersTableChart tr th:first-child {
        text-align: left;
    }

    .thead {
        border-top: 1px solid rgba(0, 0, 0, 0.16);
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    }

    .gainers,
    .losers {
        padding: 0px 2px;
        color: #fff7ef;
        display: inline-block;
        font-size: var(--font12);
        font-weight: 600;
    }

    .gainers {
        background-color: #25974e;
    }

    .losers {
        background-color: rgba(209, 0, 20, 0.75);
    }

    .gainerLoserSec .cardftr {
        color: #626262;
        font-weight: 500;
        font-size: var(--font11);
        font-family: var(--body-font);
        margin-top: 4px;
    }

    .gainerLoserSec .articleHead h2 {
        text-transform: uppercase;
        font-family: var(--fmulish);
        font-size: var(--font20);
        letter-spacing: 0.8px;
        line-height: normal;
    }

    .gainlosersTableChart tr th {
        padding: 5px;
        color: #626262;
    }

    .gainlosersTableChart tr td {
        line-height: normal;
        padding: 9px 0;
    }

    .switch-field {
        display: flex;
        background-color: var(--white);
        margin: 8px 0;
        border-radius: 16px;
        width: fit-content;
        overflow: hidden;
    }

    .switch-field input {
        position: absolute !important;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        border: 0;
        overflow: hidden;
    }

    .switch-field label {
        font-family: var(--fmulish);
        background-color: var(--white);
        padding: 6px 10px;
        color: #25974e;
        font-weight: 600;
        letter-spacing: 0.46px;
        text-transform: uppercase;
        text-align: center;
        transition: all 0.1s ease-in-out;
    }

    .switch-field label:hover {
        cursor: pointer;
    }

    .switch-field input:checked + label {
        background-color: #25974e;
        color: #fff7ef;
        font-weight: 700;
        box-shadow: none;
    }

    .switch-field label:first-of-type {
        border-radius: 20px 0 0 20px;
    }

    .switch-field label:last-of-type {
        border-radius: 0 20px 20px 0;
    }
</style>
