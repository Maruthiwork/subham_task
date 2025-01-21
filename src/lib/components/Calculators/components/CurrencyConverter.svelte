<script>
    // @ts-nocheck
    import { forexExchange } from "../../../../routes/api/fetchData";
    import SwapIcon from "../../../assets/images/swap-icon.svg";
    import { onMount } from "svelte";
    import { CURRENCIES } from "../utils/constants";
    import Divider from "$lib/components/common/Republic-Common/Divider.svelte";
    import SliderInput from "./SliderInput.svelte";

    export let language = "E";
    export let title = "Calculator Title";
    export let textColor = "#00000";
    export let tabs = [];
    export let imagePath = "";

    let activeTab = tabs[0]?.value || "";
    let activeComponent = null;
    let amountFrom = 1;
    let amountTo = 1;
    let currencyFrom = "USD";
    let currencyTo = "INR";
    let exchangeRate;

    const fetchExchangeRate = async (currencyTo, currencyFrom) => {
        const response = await forexExchange(language, currencyTo, currencyFrom);
        if (response?.data) {
            exchangeRate = response.data.conversionRate;
        }
    };

    // Recalculate amountTo whenever amountFrom or exchangeRate changes
    $: amountTo = (amountFrom * exchangeRate).toFixed(2);

    $: currencyFrom, currencyTo, fetchExchangeRate(currencyTo, currencyFrom);

    const swapCurrencies = () => {
        [currencyFrom, currencyTo] = [currencyTo, currencyFrom];
        [selectedCurrencyFrom, selectedCurrencyTo] = [selectedCurrencyTo, selectedCurrencyFrom];
    };

    // Fetch the exchange rate on mount
    onMount(() => {
        fetchExchangeRate(currencyTo, currencyFrom);
    });

    let dropdownOpenFrom = false;
    let dropdownOpenTo = false;

    // Store both the currency code and name when selected
    let selectedCurrencyFrom = { code: currencyFrom, name: CURRENCIES[currencyFrom] };
    let selectedCurrencyTo = { code: currencyTo, name: CURRENCIES[currencyTo] };

    const selectCurrencyFrom = (currency) => {
        selectedCurrencyFrom = { code: currency, name: CURRENCIES[currency] };
        currencyFrom = currency;
        dropdownOpenFrom = false;
    };

    const selectCurrencyTo = (currency) => {
        selectedCurrencyTo = { code: currency, name: CURRENCIES[currency] };
        currencyTo = currency;
        dropdownOpenTo = false;
    };
</script>


<div class="calculator-wrapper">
    <div class="calculator-form">
        <div class="calculator-heading">
            <img src={imagePath} alt="Calculator Image" class="heading-image" />
            <h1 style="color: {textColor};">{title}</h1>
        </div>
        {#if tabs.length > 1}
            <div class="tabs">
                {#each tabs as tab}
                    <div
                        class="tab"
                        class:active={activeTab === tab.value}
                        on:click={() => loadComponent(tab.value)}
                    >
                        {tab.name}
                    </div>
                {/each}
            </div>
        {/if}
        <div class="form-group">
            <SliderInput
                start={0}
                label="Amount"
                end={1000000}
                value={amountFrom}
                type="amount"
                unfilledColor="#4264FD"
                sybol=""
                setValue={(val) => {
                    amountFrom = +val;
                }}
                backgroundColor={textColor}
            />

            {#if exchangeRate}
                <span class="currency-info">
                    1 {currencyFrom} = {(1 / exchangeRate).toFixed(2)}
                    {currencyTo}
                </span>
                <span class="currency-info">
                    1 {currencyTo} = {exchangeRate}
                    {currencyFrom}
                </span>
            {/if}
        </div>
    </div>

    <div class="calculator-graph">
        <!-- First Dropdown: From Currency -->
        <div class="dropdown">
            <label class="from-label" for="currencyFrom">From</label>
            <div
                class="dropdown-button"
                on:click={() => (dropdownOpenFrom = !dropdownOpenFrom)}
            >
            <span>{selectedCurrencyFrom.code}</span>
            <span>{selectedCurrencyFrom.name}</span>
                <span class="arrow">˅</span>
            </div>

            {#if dropdownOpenFrom}
                <div class="dropdown-menu">
                    {#each Object.keys(CURRENCIES) as currency}
                        <div
                            class="dropdown-item"
                            on:click={() => selectCurrencyFrom(currency)}
                        >
                            <span>{currency}</span>
                            <span>{CURRENCIES[currency]}</span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="curved-container">{amountFrom}</div>

        <!-- Swap Button -->
        <div class="to-and-swap-container">
            <label for="currencyTo" class="to-label">To</label>
            <button class="button swap-button" on:click={swapCurrencies}>
                <img src={SwapIcon} class="icon" alt="Swap" />
            </button>
        </div>

        <div class="second-curved-container">
            {(amountFrom / exchangeRate).toFixed(4)}
        </div>

        <!-- Second Dropdown: To Currency -->
        <div class="dropdown">
            <div
                class="dropdown-button-two"
                on:click={() => (dropdownOpenTo = !dropdownOpenTo)}
            >
            <!-- add space between the code and name -->

            <span>{selectedCurrencyTo.code} </span>
            <span>{selectedCurrencyTo.name}</span>

                <span class="arrow">˅</span>
            </div>

            {#if dropdownOpenTo}
                <div class="dropdown-menu">
                    {#each Object.keys(CURRENCIES) as currency}
                        <div
                            class="dropdown-item"
                            on:click={() => selectCurrencyTo(currency)}
                        >
                            <span>{currency} </span>
                            <span>{CURRENCIES[currency]}</span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .dropdown {
        position: relative;
        width: 100%;
        max-width: 300px;
    }

    .dropdown-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 8px 8px 0px 0px;
        background-color: white;
        cursor: pointer;
    }

    .dropdown-button-two {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 0px 0px 8px 8px;
        background-color: white;
        cursor: pointer;
    }

    .arrow {
        font-size: 20px;
        font-weight: bolder;
        color: #060606;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        border: 1px solid #ccc;
        background-color: white;
        border-radius: 8px;
        margin-top: 5px;
        z-index: 10;
    }

    .dropdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-item:hover {
        background-color: #f0f0f0;
    }

    .calculator-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        width: 100%;
    }

    .calculator-form {
        width: 56%;
        order: 1;
        display: flex;
        flex-direction: column;
    }

    .calculator-graph {
        width: 50%;
        padding-left: 35px;
        order: 2;
        display: flex;
        flex-direction: column;
    }

    .second-curved-container {
        position: relative;
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 8px 8px 0px 0px;
        overflow: hidden;
    }

    .curved-container {
        position: relative;
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 0px 0px 8px 8px;
        overflow: hidden;
    }

    .curved-container::after {
        content: "";
        position: absolute;
        bottom: -30px;
        left: 80%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        background-color: #dedffc;
        border-radius: 50%;
        border: 1px solid #ddd;
    }

    .second-curved-container::after {
        content: "";
        position: absolute;
        bottom: -30px;
        left: 72.5%;
        top: 32px;
        transform: translateY(-154%);
        width: 40px;
        height: 40px;
        background-color: #dedffc;
        border-radius: 50%;
        border: 1px solid #ddd;
    }

    .curved-container::after {
        left: 80%;
    }

    .second-curved-container::after {
        left: 72.5%;
    }

    .to-and-swap-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10.2rem;
    }

    .swap-button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        background-color: #ffffff;
    }

    .swap-button:hover {
        background-color: #f0f0f0;
    }

    .tabs {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .tab {
        width: 50%;
        cursor: pointer;
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        line-height: 21.78px;
        color: #807777;
        border-bottom: 2px solid #807777;
        transition: color 0.3s ease;
    }

    .tab.active {
        border-bottom: 2px solid #0006a1;
        color: #0006a1;
    }

    .tab:hover {
        color: #0006a1;
    }

    .calculator-heading h1 {
        font-size: 24px;
        font-weight: 900;
        line-height: 28.8px;
        letter-spacing: -0.01em;
        text-align: left;
    }

    .calculator-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 12px;
    }

    .heading-image {
        width: 40px;
        height: auto;
    }

    .currency-info {
        font-size: 16px;
        font-weight: 500;
        line-height: 19.36px;
        text-align: left;
        display: block;
        padding: 10px;
        color: #0006a1;
    }

    .from-label,
    .to-label {
        font-size: 16px;
        font-weight: 600;
        line-height: 19.36px;
        text-align: left;
        color: #0006a1;
    }

    .curved-container,
    .second-curved-container {
        font-family: Inter;
        font-size: 22px;
        font-weight: 600;
        line-height: 26.63px;
        text-align: left;
        color: #0006a1;
    }
</style>
