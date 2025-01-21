<script>
    import { formatAmount } from "$lib/utils/common";

  // @ts-nocheck
  import SliderInput from "./SliderInput.svelte";
  import { DonutChart, AreaChart } from "@carbon/charts-svelte";
  import "@carbon/charts-svelte/styles.css";

  export let title = "Calculator Title";
  export let textColor = "#00000";
  export let imagePath = "";
  let monthlyContribution = 5000;
  let expectedReturnRate = 10;
  let timePeriod = 20;
  let totalInvestment = 0;
  let corpusAtRetirement = 0;
  let interestEarned = 0;
  let totalAmount = 0;
  let minAnnuityInvestment = 0;
  function calculateNPS() {
    const annualRate = expectedReturnRate / 100;
    const monthlyRate = annualRate / 12; // Convert to monthly rate
    const months = timePeriod * 12; // Convert years to months

    totalInvestment = monthlyContribution * months;

    // Future value of monthly contributions
    corpusAtRetirement =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    interestEarned = corpusAtRetirement - totalInvestment;
    totalAmount = totalInvestment + interestEarned;

    for (let year = 0; year <= timePeriod; year++) {
      let yearlyFutureValue =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate) *
        (1 + monthlyRate);

      let investedAmount = monthlyContribution * year * 12;
      let interestEarnedForYear = yearlyFutureValue - investedAmount;
      minAnnuityInvestment = corpusAtRetirement * 0.4;
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
        label="Monthly Contribution"
        start={500}
        end={50000}
        value={monthlyContribution}
        type="amount"
        unfilledColor="#9FCB26"
        sybol="₹"
        setValue={(val) => {
          monthlyContribution = +val;
          calculateNPS();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Expected Return Rate"
        start={8}
        end={15}
        step={0.1}
        sybol="%"
        value={expectedReturnRate}
        type="rate"
        unfilledColor="#9FCB26"
        setValue={(val) => {
          expectedReturnRate = +val;
          calculateNPS();
        }}
        backgroundColor={textColor}
      />
    </div>

    <div class="form-group">
      <SliderInput
        label="Time Period"
        start={18}
        end={50}
        value={timePeriod}
        unfilledColor="#9FCB26"
        sybol="Y"
        setValue={(val) => {
          timePeriod = +val;
          calculateNPS();
        }}
        backgroundColor={textColor}
      />
    </div>
  </div>
  {#if corpusAtRetirement != 0}
    <div class="calculator-graph">
      <div>
        <h1 class="result-header">Total Investment Breakup</h1>
      </div>
      <div class="investment-text">Total Investment</div>
      <div class="investment-amount">₹ {formatAmount(totalInvestment)}</div>
      <div class="investment-text">Interest Earned</div>
      <div class="investment-amount">₹ {formatAmount(interestEarned)}</div>
      <div class="investment-text">Maturity Amount</div>
      <div class="investment-amount">₹ {formatAmount(corpusAtRetirement)}</div>
      <div class="investment-text">Min. Annuity Investment</div>
      <div class="investment-amount">₹ {formatAmount(minAnnuityInvestment)}</div>
    </div>
  {/if}
</div>

<style>
  .result-header {
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 800;
    line-height: 24px;
    text-align: left;
    color: #496400;
    padding: 6px 0px 6px 0px;
  }

  .investment-amount {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 19.36px;
    text-align: left;
    padding-bottom: 20px;
    color: #496400;
  }

  .investment-text {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.36px;
    text-align: left;
    padding-bottom: 5px;
    color: #496400;
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
