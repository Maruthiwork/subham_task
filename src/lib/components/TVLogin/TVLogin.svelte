<script lang="ts">
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import OTPInput from "./OTPInput.svelte";
    import { post } from "../../../routes/api/fetchData";
    import { onMount } from "svelte";

    let inputType = "email";
    let email = "";
    let otpSent = false;
    let otp = "";
    let showSuccessScreen = false;
    let roomId: any = "";
    let signUpMode = false;
    let emailError = "";
    let otpError = "";
    let resendTimer = 30;  // Timer for resend OTP
    let canResendOTP = false; // To disable/enable resend button

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        roomId = urlParams.get("roomId");
    });

    function startResendTimer() {
        resendTimer = 30;  // Reset timer to 30 seconds
        canResendOTP = false;

        const interval = setInterval(() => {
            if (resendTimer > 0) {
                resendTimer--;
            } else {
                canResendOTP = true;
                clearInterval(interval);
            }
        }, 1000);
    }

    function toggleEmail() {
        inputType = "email";
        email=''
    }

    function toggleMobile() {
        inputType = "tel";
        email=''
    }

    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    async function signUp() {
        if (!validateEmail() && inputType === "email") {
            emailError = "Please enter a valid email address.";
            return;
        } else {
            emailError = "";
        }

        const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/user/create`;
        const formData = { email, type: "EMAIL" };

        const result = await post(apiUrl, "en", formData);
        if (result.status) {
            otpSent = true;
            signUpMode = false;
            startResendTimer();
        } else {
            console.error("Sign-Up Error:", result.data.error);
        }
    }

    async function requestOTP() {
        if (!validateEmail() && inputType === "email") {
            emailError = "Please enter a valid email address.";
            return;
        } else {
            emailError = "";
        }

        const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/user/login-otp`;
        const formData = { email, type: "EMAIL", roomId };

        const result = await post(apiUrl, "en", formData);
        if (result.status) {
            otpSent = true;
            startResendTimer();
        } else {
            console.error("OTP Request Error:", result.data.error);
        }
    }

    async function verifyOTP() {
        const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/user/login-otp-verify`;
        const formData = { email, otp, roomId };

        const result = await post(apiUrl, "en", formData);
        if (result.status) {
            showSuccessScreen = true;
            otpError = ''
        } else {
            otpError = 'Ops ! OTP incorrect'
        }
    }

    function handleOTPChange(event: { detail: string }) {
        otp = event.detail;
        if (otp?.length === 6) {
            verifyOTP();
        }
    }

    async function resendOTP() {
        if (canResendOTP) {
            await requestOTP();  // Request OTP again
        }
    }
</script>

<div class="login-container">
    <div class="flex flex-col items-center gap-10">
        <div class="logo flex justify-center">
            <img
                src="http://img.republicworld.com/icons/icons/R.logo.svg"
                alt="R Digital"
            />
        </div>
        <div class="sign-in-form w-full desktop:w-[50%]">
            {#if signUpMode}
                <h1 class="mb-2">Sign Up</h1>
                <p>Create an account to get started.</p>
                <div class="input-field">
                    {#if inputType === "email"}
                        <input
                            type="email"
                            placeholder="Enter your Email ID"
                            bind:value={email}
                            required
                        />
                    {:else}
                        <input
                            type="tel"
                            placeholder="Enter your Mobile Number"
                            bind:value={email}
                            required
                        />
                    {/if}
                    {#if emailError}
                        <p class="error-message">{emailError}</p>
                    {/if}
                </div>
                <button class="submit-button" on:click={signUp}>Sign Up</button>
                <p class="mt-2">
                    Already have an account?{" "}
                    <a
                        href="#"
                        on:click|preventDefault={() => {
                            signUpMode = false;
                        }}
                        class="text-[#D10014]"
                    >
                        Sign In
                    </a>
                </p>
            {:else if !otpSent}
                <h1 class="mb-2">Sign In</h1>
                <p>Please sign in to your account to continue.</p>
                <!-- <div class="input-group flex justify-center items-center">
                    <button
                        class:active={inputType === "email"}
                        class="toggle-button rounded-l-[20px]"
                        on:click={toggleEmail}
                    >
                        EMAIL
                    </button>
                    <button
                        class:active={inputType === "tel"}
                        class="toggle-button rounded-r-[20px]"
                        on:click={toggleMobile}
                    >
                        MOBILE
                    </button>
                </div> -->

                <div class="input-field">
                    {#if inputType === "email"}
                        <input
                            type="email"
                            placeholder="Enter your Email ID"
                            bind:value={email}
                            required
                        />
                    {:else}
                        <input
                            type="tel"
                            placeholder="Enter your Mobile Number"
                            bind:value={email}
                            required
                        />
                    {/if}
                    {#if emailError}
                        <p class="error-message">{emailError}</p>
                    {/if}
                </div>
                <button class="submit-button" on:click={requestOTP}>Send OTP</button>
                <!-- Show Sign up link -->
                <p class="mt-2">
                    Don't have an account?{" "}
                    <a
                        href="#"
                        on:click|preventDefault={() => {
                            signUpMode = true;
                        }}
                        class="text-[#D10014]"
                    >
                        Sign Up
                    </a>
                </p>
            {:else if !showSuccessScreen}
                <div class="input-field">
                    <OTPInput on:otpChange={handleOTPChange}/>
                </div>
                {#if otpError?.length > 0}
                        <p class="error-message">{otpError}</p>
                {/if}

                <button class="submit-button" on:click={verifyOTP}
                    >Verify OTP</button
                >
                <!-- Resend OTP section -->
                {#if  otpSent && canResendOTP}
                    <p class="mt-2">
                        Didn't receive the OTP? 
                        <a href="#" on:click|preventDefault={resendOTP} class="text-[#D10014]">Resend OTP</a>
                    </p>
                {:else}
                    <p class="mt-2">
                        Resend OTP in {resendTimer} seconds.
                    </p>
                {/if}
            {/if}
            {#if showSuccessScreen}
                <div class="flex flex-col justify-center items-center gap-2">
                    <h2 class="successful">Login Successful</h2>
                    <img
                        width="150px"
                        src="http://img.republicworld.com/all_images/frame1000005523-1723047764768-file.svg"
                        alt="Success"
                    />
                    <h3>You Are All Set!</h3>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .error-message {
        color: #ff0000;
        font-size: 12px;
        margin-bottom: 10px;
        text-align: left;
    }
    .login-container {
        height: 100vh;
        padding: 15px;
        background: linear-gradient(
            180deg,
            #5c004d 0%,
            #070053 33%,
            #3b025e 67%,
            #02042b 100%
        );
        overflow: auto;
    }

    .login-successful {
        color: #fefefe;
        text-align: center;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 120%; /* 21.6px */
        letter-spacing: 0.299px;
    }

    .logo {
        margin-top: 40px;
    }

    .logo img {
        width: 160px;
    }

    .sign-in-form {
        border-radius: 8px;
        color: white;
        text-align: center;
    }

    .sign-in-form h1 {
        color: #fefefe;
        font-family: Roboto;
        font-size: 26px;
        font-weight: 800;
        letter-spacing: 0.299px;
    }

    .sign-in-form p {
        font-size: 14px;
        font-weight: 400;
        line-height: 120%;
        letter-spacing: 0.299px;
    }

    .input-group {
        margin: 20px 0;
        border-radius: 40px;
    }

    .toggle-button {
        background: rgba(213, 213, 213, 0.4);
        padding: 6px;
        width: 50%;
        height: 40px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .toggle-button.active {
        background-color: #d10014;
    }

    .input-field input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
        background: transparent;
        border: 0.986px solid #fefefe;
    }

    .submit-button {
        width: 100%;
        padding: 10px;
        background-color: #dc143c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
