<script lang="ts">
    import "@carbon/charts-svelte/styles.css";
    import SliderInput from "./SliderInput.svelte";
    import { formatAmount } from "$lib/utils/common";

    export let title = "Calculator Title";
    export let textColor = "#000000";
    export let imagePath = "";

    let salary = 15000;
    let currentAge = 25;
    let retirementAge = 60;
    let epfBalance = 0;
    let annualIncrease = 5;
    let interestRate = 8.25;
    let employeeContribution = 12;
    let employerContribution = 3.67;

    // Variables to store the results
    let estimatedEPF = 0;
    let totalInterestEarned = 0;
    let totalContributions = 0;

    // Function to calculate EPF balance at retirement
    function calculateEPF() {
        const yearsToRetirement = retirementAge - currentAge; // Calculate years left for retirement
        let currentSalary = salary; // Starting salary
        let totalEPF = epfBalance; // Starting EPF balance
        let contributions = epfBalance; // Track total contributions
        let interestEarned = 0; // Track total interest earned

        // Loop through each year until retirement
        for (let year = 0; year < yearsToRetirement; year++) {
            // Calculate contributions and interest monthly
            for (let month = 0; month < 12; month++) {
                // Employee and employer contributions based on the current salary
                const monthlyEmployeeContribution =
                    (currentSalary * employeeContribution) / 100;
                const monthlyEmployerContribution =
                    (currentSalary * employerContribution) / 100;
                const monthlyContribution =
                    monthlyEmployeeContribution + monthlyEmployerContribution;

                // Update total contributions and EPF balance
                contributions += monthlyContribution;
                totalEPF += monthlyContribution;

                // Calculate monthly interest (interestRate is annual, so divide by 12)
                const monthlyInterest = (totalEPF * (interestRate / 100)) / 12;
                interestEarned += monthlyInterest;
                totalEPF += monthlyInterest;
            }

            // Apply annual salary increase
            currentSalary += (currentSalary * annualIncrease) / 100;
        }

        // Round off the results and convert to string
        estimatedEPF = Math.round(totalEPF);
        totalInterestEarned = Math.round(interestEarned);
        totalContributions = Math.round(contributions);
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
                label="Monthly Salary (Basic + DA)"
                start={15000}
                end={10000000}
                value={salary}
                type="amount"
                unfilledColor="#02C369"
                sybol="₹"
                setValue={(val) => {
                    salary = +val;
                    calculateEPF();
                }}
                backgroundColor={textColor}
            />
        </div>

        <div class="form-group">
            <SliderInput
                label="Age (In Years)"
                start={15} 
                end={80}
                value={currentAge}
                type="amount"
                unfilledColor="#02C369"
                sybol="Y"
                setValue={(val) => {
                    if (+val >= 15) {
                        currentAge = +val;
                        calculateEPF();
                    } 
                }}
                backgroundColor={textColor}
            />
        </div>

        <div class="form-group">
            <SliderInput
                label="Your Contribution to EPF (%)"
                start={12}
                end={80}
                value={employeeContribution}
                type="amount"
                unfilledColor="#02C369"
                sybol="%"
                setValue={(val) => {
                    employeeContribution = +val;
                    calculateEPF();
                }}
                backgroundColor={textColor}
            />
        </div>

        <div class="form-group">
            <SliderInput
                label="Annual Salary Increase (%)"
                start={0}
                end={50}
                step={0.1}
                sybol="%"
                value={annualIncrease}
                type="rate"
                unfilledColor="#02C369"
                setValue={(val) => {
                    annualIncrease = +val;
                    calculateEPF();
                }}
                backgroundColor={textColor}
            />
        </div>

        <div class="form-group">
            <SliderInput
                label="Rate of Interest (%)"
                start={0}
                end={50}
                sybol="%"
                value={interestRate}
                type="rate"
                unfilledColor="#02C369"
                setValue={(val) => {
                    interestRate = +val;
                    calculateEPF();
                }}
                isSliderVisible={false}
                backgroundColor={textColor}
            />
        </div>
    </div>

    <!-- Display Results --> 
    {#if currentAge >= 60 || estimatedEPF}
    <h3 class="upper-heading">You will have accumulated</h3>
    <p class="epf-value">
      {currentAge >= 60 ? 'Retirement Age Is 60' : `₹ ${formatAmount(estimatedEPF)}`}
    </p>
    <p class="lower-heading">by the time you retire</p>
  {/if}
  
</div>

<style>
    .upper-heading {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.36px;
        text-align: center;
    }

    .epf-value {
        font-family: "Inter", sans-serif;
        font-size: 50px;
        font-weight: 700;
        line-height: 60.51px;
        text-align: center;
        color: #04542f;
    }

    .lower-heading {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.36px;
        text-align: center;
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

    .calculate-btn {
        width: 118px;
        height: 38px;
        padding: 8px 14px 10px 14px;
        gap: 6px;
        border-radius: 4px;
        border: 3.5px solid #04542f;
        opacity: 1;
        background-color: #04542f;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    .calculate-btn:hover {
        background-color: #04542f;
    }
    .epf-calculator {
        border: 2px dashed #ddd;
        padding: 20px;
        width: 100%;
        background-color: #f7e7df;
        font-family: Arial, sans-serif;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    label {
        font-size: 14px;
        margin-bottom: 5px;
        display: block;
    }

    input[type="number"],
    input[type="range"] {
        width: 100%;
        margin-top: 5px;
        border: 1px solid #ccc;
        background-color: #f7e7df;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 14px;
    }

    input[readonly] {
        background-color: #f5f5f5;
        color: #888;
    }

    .slider-group {
        display: flex;
        align-items: center;
    }

    .slider-group label {
        flex: 1;
    }

    .slider-group span {
        margin-left: 10px;
        font-size: 14px;
    }

    .result {
        margin-top: 20px;
        padding: 10px;
        background-color: #fff5f0;
        border: 1px solid #d10014;
        border-radius: 4px;
    }

    .result h3 {
        font-size: 18px;
        margin-bottom: 5px;
    }

    .result p {
        font-size: 16px;
        font-weight: bold;
        color: #d10014;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.25rem;
    }

    .form-group input {
        width: calc(100% - 3rem);
        padding: 0.5rem;
    }

    .form-group span {
        padding: 0.5rem;
        background-color: #f5f5f5;
        border-radius: 5px;
        margin-left: 0.5rem;
    }
</style>
