<script>
    // @ts-nocheck

    import { createEventDispatcher } from "svelte";
    
    let inputs = Array(6).fill("");
    const dispatch = createEventDispatcher();

    // Function to move the focus forward or backward based on user input
    function handleInput(event, index) {
        const digit = event.target.value[event.target.value.length - 1]; // Get the last character
        if (digit && index < 5) {
            inputs[index] = digit; // Set the digit in the array
            event.target.nextElementSibling.focus(); // Move focus to next input
        } else {
            inputs[index] = digit || ""; // Update the current input
        }
        updateOTP();
    }

    function handleBackspace(event, index) {
        if (event.key === "Backspace" && !event.target.value && index > 0) {
            inputs[index] = ""; // Clear current
            event.target.previousElementSibling.focus(); // Move focus to previous input
        }
        updateOTP();
    }

    // Emit the complete OTP
    function updateOTP() {
        const otp = inputs.join("");
        dispatch("otpChange", otp); // Emit the OTP to the parent component
    }
</script>

<div>
    <h1 class="otp-label">Enter 6 Digit Code</h1>
</div>
<div class="otp-inputs py-3 desktop:justify-center">
    {#each inputs as _, index (index)}
        <input
            type="number"
            maxlength="1"
            on:input={(event) => handleInput(event, index)}
            on:keydown={(event) => handleBackspace(event, index)}
            bind:value={inputs[index]}
            class="otp-box"
            autocomplete="one-time-code"
        />
    {/each}
</div>

<style>
    .otp-label {
        color: #fefefe;
        text-align: center;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 120%; /* 19.2px */
        letter-spacing: 0.5px;
    }
    .otp-inputs {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }
    .otp-box {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        border: 1px solid #fefefe;
        text-align: center;
        background-color: transparent;
    }

    .otp-box:last-child {
        margin-right: 0;
    }
</style>
