<script lang="ts">
  // @ts-nocheck
  import { DonutChart } from "@carbon/charts-svelte";
  import "@carbon/charts-svelte/styles.css";
  import SliderInput from "./SliderInput.svelte";
    import { formatAmount } from "$lib/utils/common";

  let loanAmount = 500000;
  let interestRate = 8;
  let loanTenure = 20;
  let emiAmount = 0;
  let totalAmount = 0;
  let totalInterest = 0;
  export let textColor = "#00000";
  export let title = "Calculator Title";
  export let imagePath = "";

  // Function to calculate EMI
  function calculateEMI() {
    const rate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    emiAmount =
      loanAmount *
      rate *
      (Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1));
    totalAmount = emiAmount * months;
    totalInterest = totalAmount - loanAmount;
  }
</script>

<div class="calculator-widgets">
  <div class="calculator-form">
    <div class="calculator-heading">
      <img src={imagePath} alt="Calculator Image" class="heading-image" />
      <h1 style="color: {textColor};">{title}</h1>
    </div>

    <div class="form-group">
      <SliderInput
        label="Loan Amount"
        start={10000}
        end={10000000}
        value={loanAmount}
        type="amount"
        unfilledColor="#FF6CC4"
        sybol="₹"
        setValue={(val) => {
          loanAmount = +val;
          calculateEMI();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Interest Rate"
        start={1}
        end={24}
        step={0.1}
        sybol="%"
        value={interestRate}
        type="rate"
        unfilledColor="#FF6CC4"
        setValue={(val) => {
          interestRate = +val;
          calculateEMI();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Loan Tenure"
        start={1}
        end={30}
        value={loanTenure}
        type="time"
        unfilledColor="#FF6CC4"
        sybol="Y"
        setValue={(val) => {
          loanTenure = +val;
          calculateEMI();
        }}
        backgroundColor={textColor}
      />
    </div>

    {#if emiAmount}
      <div>
        <h1 class="result-header">Monthly EMI</h1>
        <h2 class="result">₹ {formatAmount(emiAmount)}</h2>
      </div>
    {/if}
  </div>

  {#if emiAmount}
    <div class="calculator-graph" style=" --text-color: {textColor};">
      <DonutChart
        data={[
          {
            group: "Principal Amount",
            value: loanAmount,
          },
          {
            group: "Interest Amount",
            value: Math.ceil(totalInterest),
          },
        ]}
        options={{
          donut: {
            center: {
              label: "Total",
            },
            width: 12,
          },
          height: "300px",
          resizable: true,
          color: {
            scale: {
              "Principal Amount": "#720446",
              "Interest Amount": "#FF6CC4",
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
          <div class="value">₹{formatAmount(loanAmount)}</div>
      </div>
      <div class="second-label">
          <div class="label">
              <div class="square earned"></div>
              Total Interest
          </div>
          <div class="value">₹{formatAmount(totalInterest)}</div>
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
        background-color: #720446;
    }

    .label .earned {
        background-color: #FF6CC4;
    }

  .result-header {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.36px;
    text-align: center;
  }

  .result {
    font-family: "Inter", sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 48.41px;
    text-align: center;
    color: #720446;
  }

  /* For tablet view (e.g. max-width: 1024px) */
  @media screen and (max-width: 1024px) {
    .result-header {
      font-family: "Inter", sans-serif;
      font-size: 24px;
      font-weight: 500;
      line-height: 29.05px;
      text-align: center;
    }
    .result {
      font-family: "Inter", sans-serif;
      font-size: 65px;
      font-weight: 700;
      line-height: 78.66px;
      text-align: center;
      color: #720446;
    }
  }

  /* For mobile devices (e.g. max-width: 680px) */
  @media screen and (max-width: 680px) {
    .result-header {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 16.94px;
      text-align: center;
    }
    .result {
      font-family: "Inter", sans-serif;
      font-size: 40px;
      font-weight: 700;
      line-height: 48.41px;
      text-align: center;
      color: #720446;
    }
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
