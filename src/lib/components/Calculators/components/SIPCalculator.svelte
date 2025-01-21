<script>
    import { formatAmount } from "$lib/utils/common";

  // @ts-nocheck
  import SliderInput from "./SliderInput.svelte"; // Import the SliderInput component
  import { DonutChart, AreaChart } from "@carbon/charts-svelte";
  import "@carbon/charts-svelte/styles.css";
  export let tabs = [];
  export let title = "Calculator Title";
  export let textColor = "#00000";
  export let imagePath = "";

  let monthlyInvestment = 10000;
  let expectedReturnRate = 12;
  let timePeriod = 20;
  let futureValue = 0;
  let interestEarned = 0;
  let totalInvestedAmount = 0;
  let chartData = [];

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

  function calculateSIP() {
    const rate = expectedReturnRate / 100 / 12;
    const n = timePeriod * 12;
    futureValue =
      monthlyInvestment * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate);
    interestEarned = futureValue - monthlyInvestment * n;
    totalInvestedAmount = monthlyInvestment * n;

    // Generate data for each year for the AreaChart
    chartData = [];
    for (let year = 0; year <= timePeriod; year++) {
      let yearlyFutureValue =
        monthlyInvestment *
        ((Math.pow(1 + rate, year * 12) - 1) / rate) *
        (1 + rate);
      let yearlyInvestedAmount = monthlyInvestment * 12 * year;
      chartData.push(
        {
          group: "Amount Invested",
          year: year,
          value: yearlyInvestedAmount,
        },
        {
          group: "Interest Earned",
          year: year,
          value: yearlyFutureValue - yearlyInvestedAmount,
        },
      );
    }
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
        label="Monthly Investment"
        start={1000}
        end={100000}
        value={monthlyInvestment}
        type="amount"
        unfilledColor="#904CFF"
        sybol="₹"
        setValue={(val) => {
          monthlyInvestment = +val;
          calculateSIP();
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
        unfilledColor="#904CFF"
        setValue={(val) => {
          expectedReturnRate = +val;
          calculateSIP();
        }}
        backgroundColor={textColor}
      />
    </div>
    <div class="form-group">
      <SliderInput
        label="Time Period"
        start={1}
        end={50}
        value={timePeriod}
        type="time"
        unfilledColor="#904CFF"
        sybol="Y"
        setValue={(val) => {
          timePeriod = +val;
          calculateSIP();
        }}
        backgroundColor={textColor}
      />
    </div>
  </div>

  {#if futureValue !== 0}
    <div class="calculator-graph" style=" --text-color: {textColor};">
      <DonutChart
        data={[
          {
            group: "Invested Amount",
            value: totalInvestedAmount,
          },
          {
            group: "Interest Earned",
            value: interestEarned,
          },
        ]}
        options={{
          donut: {
            center: {
              label: "Breakdown",
            },
          },
          height: "300px",
          color: {
            scale: {
              "Invested Amount": "#51158F",
              "Interest Earned": "#904CFF",
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
          <div class="value">₹ {formatAmount(totalInvestedAmount)}</div>
        </div>
        <div class="second-label">
          <div class="label">
            <div class="square earned"></div>
            Est. Returns
          </div>
          <div class="value">₹ {formatAmount(interestEarned)}</div>
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
    background-color: #51158F;
  }

  .label .earned {
    background-color: #904CFF;
  }

  .calculator-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 12px;
  }

  .calculator-heading h1 {
    font-size: 24px;
    font-weight: 900;
    line-height: 28.8px;
    letter-spacing: -0.01em;
    text-align: left;
  }

  .heading-image {
    width: 40px;
    height: auto;
  }

  .calculator-widgets {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .calculator-form {
    width: 45%;
  }
  .calculator-graph {
    width: 50%;
    padding-left: 60px;
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
    font-size: 22px;
    font-weight: 700;
    line-height: 26.4px;
    color: #807777;
    border-bottom: 2px solid transparent;
    transition: color 0.3s ease;
  }

  .tab.active {
    border-bottom: 2px solid #51158f;
    color: #51158f;
  }

  .tab:hover {
    color: #51158f;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .calculate-btn {
    background-color: #51158f;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
