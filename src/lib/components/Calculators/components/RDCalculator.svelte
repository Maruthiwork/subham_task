<script>
    import { formatAmount } from "$lib/utils/common";

  // @ts-nocheck
  import SliderInput from "./SliderInput.svelte";
  import { DonutChart } from "@carbon/charts-svelte";
  import "@carbon/charts-svelte/styles.css";
  let monthlyDeposit = 5000;
  let interestRate = 6;
  let timePeriod = 5;
  let maturityAmount = 0;
  let totalInvestedAmount = 0;
  let returnsAmount = 0;
  export let imagePath = "";
  export let title = "Calculator Title";
  export let textColor = "#00000";

  function calculateRD() {
    const rate = interestRate / 100 / 4;
    const quarters = timePeriod * 4;

    maturityAmount =
      (monthlyDeposit * (Math.pow(1 + rate, quarters) - 1)) /
      (1 - Math.pow(1 + rate, -1 / 3));

    totalInvestedAmount = monthlyDeposit * 12 * timePeriod;
    returnsAmount = maturityAmount - totalInvestedAmount;
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
        label="Monthly Deposit"
        start={500}
        end={1000000}
        value={monthlyDeposit}
        type="amount"
        filledColor="#E87911"
        unfilledColor="#FFD6B1"
        sybol="₹"
        setValue={(val) => {
          monthlyDeposit = +val;
          calculateRD();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Interest Rate"
        start={1}
        end={15}
        step={0.1}
        sybol="%"
        value={interestRate}
        type="rate"
        filledColor="#E87911"
        unfilledColor="#FFD6B1"
        setValue={(val) => {
          interestRate = +val;
          calculateRD();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Time Period"
        start={1}
        end={20}
        value={timePeriod}
        type="time"
        filledColor="#E87911"
        unfilledColor="#FFD6B1"
        sybol="Y"
        setValue={(val) => {
          timePeriod = +val;
          calculateRD();
        }}
        backgroundColor={textColor}
      />
    </div>
  </div>

  {#if maturityAmount != 0}
    <div class="calculator-graph" style=" --text-color: {textColor};">
      <DonutChart
        data={[
          {
            group: "Invested Amount",
            value: totalInvestedAmount,
          },
          {
            group: "Interest Earned",
            value: returnsAmount,
          },
        ]}
        options={{
          donut: {
            center: {
              label: "", // Empty center label
            },
            width: 12,
          },
          height: "300px",
          resizable: true,
          color: {
            scale: {
              "Invested Amount": "#E35200",
              "Interest Earned": "#F7A252",
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
          <div class="value">₹ {formatAmount(totalInvestedAmount)}</div>
        </div>
        <div class="second-label">
          <div class="label">
            <div class="square earned"></div>
            Total Interest
          </div>
          <div class="value">₹ {formatAmount(returnsAmount)}</div>
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
    background-color: #E35200;
  }

  .label .earned {
    background-color: #F7A252;
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
    flex-wrap: wrap;
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
