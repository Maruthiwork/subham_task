<script>
    import { formatAmount } from "$lib/utils/common";

  // @ts-nocheck
  import SliderInput from "./SliderInput.svelte";
  import { DonutChart } from "@carbon/charts-svelte";
  import "@carbon/charts-svelte/styles.css";
  let principalAmount = 10000;
  let interestRate = 8;
  let timePeriod = 10;
  let futureValue = 0;
  let interestEarned = 0;
  let totalInvestedAmount = 0;
  export let title = "Calculator Title";
  export let textColor = "#00000";
  export let imagePath = "";


  function calculateCompoundInterest() {
    const rate = interestRate / 100;
    futureValue = principalAmount * Math.pow(1 + rate, timePeriod);
    interestEarned = futureValue - principalAmount;
    totalInvestedAmount = principalAmount;

    // Generate data for each year for the AreaChart
    let chartData = [];
    for (let year = 0; year <= timePeriod; year++) {
      let yearlyFutureValue = principalAmount * Math.pow(1 + rate, year);
      chartData.push(
        {
          group: "Amount Invested",
          year: year,
          value: principalAmount,
        },
        {
          group: "Interest Earned",
          year: year,
          value: yearlyFutureValue - principalAmount,
        },
      );
    }
  }
</script>

<!-- UI structure -->
<div class="calculator-widgets">
  <div class="calculator-form">
    <div class="calculator-heading">
      <img src={imagePath} alt="Calculator Image" class="heading-image" />
      <h1 style="color: {textColor};">{title}</h1>
    </div>
    <div class="form-group">
      <SliderInput
        label="Principal Amount"
        start={1000}
        end={1000000}
        value={principalAmount}
        type="amount"
        unfilledColor="#3B9AF0"
        sybol="₹"
        setValue={(val) => {
          principalAmount = +val;
          calculateCompoundInterest();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Interest Rate"
        start={1}
        end={20}
        step={0.1}
        sybol="%"
        value={interestRate}
        type="rate"
        unfilledColor="#3B9AF0"
        setValue={(val) => {
          interestRate = +val;
          calculateCompoundInterest();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Time Period"
        start={1}
        end={40}
        value={timePeriod}
        unfilledColor="#3B9AF0"
        sybol="Y"
        setValue={(val) => {
          timePeriod = +val;
          calculateCompoundInterest();
        }}
        backgroundColor={textColor}
      />
    </div>
  </div>
  {#if futureValue}
    <div class="calculator-graph" style=" --text-color: {textColor};">
      <DonutChart
        data={[
          {
            group: "Invested Amount",
            value: principalAmount,
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
              "Invested Amount": "#034582",
              "Interest Earned": "#3B9AF0",
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
            Principal Amount
          </div>
          <div class="value">₹{formatAmount(principalAmount)}</div>
        </div>
        <div class="second-label">
          <div class="label">
            <div class="square earned"></div>
            Total Interest
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
    background-color: #034582;
  }

  .label .earned {
    background-color: #3B9AF0;
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
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;
  }

  .calculator-form {
    width: 45%;
    order: 1; /* Ensures the form is on the left */
  }

  .calculator-graph {
    width: 50%;
    padding-left: 60px;
    order: 2; /* Ensures the graph is on the right */
  }

  .form-group {
    margin-bottom: 1rem;
  }
</style>
