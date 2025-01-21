<script>
    // @ts-nocheck
    import Divider from "$lib/components/common/Republic-Common/Divider.svelte";
    import { formatAmount } from "$lib/utils/common";
    import SliderInput from "./SliderInput.svelte";
    import { DonutChart } from "@carbon/charts-svelte";
    import "@carbon/charts-svelte/styles.css";

    export let tabs = [];
    export let language = "E";
    export let title = "Calculator Title";
    export let textColor = "#00000";
    export let imagePath = "";

    let activeTab = tabs[0]?.value || "";
    let activeComponent = null;

    const loadComponent = async (tabValue) => {
        const tab = tabs.find((t) => t.value === tabValue);
        if (tab) {
            activeTab = tabValue;
            activeComponent = await tab.component();
        }
    };

    $: loadComponent(activeTab);

    // Calculator logic
    let totalInvestment = 10000;
    let expectedReturnRate = 12;
    let timePeriod = 20;
    let futureValue = 0;
    let interestEarned = 0;

    function calculateLumpsum() {
        const rate = expectedReturnRate / 100;
        futureValue = Math.round(
            totalInvestment * Math.pow(1 + rate, timePeriod),
        );
        interestEarned = futureValue - totalInvestment;
    }

</script>

<div class="calculator-widgets">
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
                label="Total Investment"
                end={1000000}
                value={totalInvestment}
                type="amount"
                unfilledColor="#FF8792"
                sybol="₹"
                setValue={(val) => {
                    totalInvestment = +val;
                    calculateLumpsum();
                }}
                backgroundColor={textColor}
            />
        </div>
        <div class="form-group">
            <SliderInput
                label="Expected Return Rate"
                start={0}
                end={50}
                step={0.1}
                sybol="%"
                value={expectedReturnRate}
                type="rate"
                unfilledColor="#FF8792"
                setValue={(val) => {
                    expectedReturnRate = +val;
                    calculateLumpsum();
                }}
                symbolBackgroundColor="#E49595"
                symbolBorderColor="#E49595"
            />
        </div>
        <div class="form-group">
            <SliderInput
                label="Time Period"
                start={1}
                end={50}
                value={timePeriod}
                type="time"
                unfilledColor="#FF8792"
                sybol="Y"
                setValue={(val) => {
                    timePeriod = +val;
                    calculateLumpsum();
                }}
                symbolBackgroundColor="#E49595"
                symbolBorderColor="#E49595"
            />
        </div>
    </div>

    {#if futureValue != 0}
        <div class="calculator-graph" style=" --text-color: {textColor};">
            <DonutChart
                data={[
                    {
                        group: "Invested Amount",
                        value: totalInvestment,
                    },
                    {
                        group: "Interest Earned",
                        value: interestEarned,
                    },
                ]}
                options={{
                    donut: {
                        center: {
                            label: "Total Value",
                        },

                        width: 12,
                    },
                    height: "300px",
                    resizable: true,
                    color: {
                        scale: {
                            "Invested Amount": "#CA000B",
                            "Interest Earned": "#FF8792",
                        },
                    },
                    legend: {
                        enabled: false,
                    },
                }}
            />
            <div class="investment-breakdown">
                <h1 style="color: {textColor};">Total Investment Breakup</h1>
            </div>
            <div class="label-container">
                <div class="first-label">
                    <div class="label">
                        <div class="square invested"></div>
                        Invested Amount
                    </div>
                    <div class="value">₹{formatAmount(totalInvestment)}</div>
                </div>
                <div class="second-label">
                    <div class="label">
                        <div class="square earned"></div>
                        Interest Earned
                    </div>
                    <div class="value">₹{formatAmount(interestEarned)}</div>
                </div>
            </div>
        </div>
    {/if}
</div>


<style>
    .first-label {
        margin-bottom: 16px;
    }

    .second-label {
        margin-bottom: 16px;
    }

    .investment-breakdown h1 {
        font-size: 24px;
        font-weight: 900;
        line-height: 28.8px;
        letter-spacing: -0.01em;
        text-align: left;
    }
    .value {
        padding-left: 30px;
        color: var(--text-color);
        font-size: 16px;
        font-weight: 600;
        line-height: 19.36px;
        text-align: left;
    }

    .label-container {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        align-items: flex-start;
    }

    .label {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.36px;
        text-align: left;
        color: var(--text-color);
    }

    .label .square {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .label .invested {
        background-color: #ca000b;
    }

    .label .earned {
        background-color: #ff8792;
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

    .calculator-heading h1 {
        font-size: 24px;
        font-weight: 900;
        line-height: 28.8px;
        letter-spacing: -0.01em;
        text-align: left;
    }
    .calculator-widgets {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .calculator-form {
        width: 45%;
        order: 1;
    }

    .calculator-graph {
        width: 50%;
        padding-left: 35px;
        order: 2;
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
        border-bottom: 2px solid #d10014;
        color: #d10014;
    }

    .tab:hover {
        color: #d10014;
    }

    .form-group {
        margin-bottom: 1rem;
    }
    @media (max-width: 768px) {
    .calculator-form {
      width: 100%;
    }

    .calculator-graph {
      width: 100%;
      padding-left: 0;
    }
  }
</style>
