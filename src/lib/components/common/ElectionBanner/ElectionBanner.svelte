<script lang="ts">
    //@ts-nocheck
    import vimalLogo from "$lib/assets/images/Vimal_Logo.png";
    import hintLogo from "$lib/assets/images/hintLogo.jpeg";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    const calculateTimeLeft = () => {
  const targetDate = new Date("2024-11-20T00:00:00Z"); // Ensure UTC timezone
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};


  const timeLeft = writable(calculateTimeLeft());

  onMount(() => {
    const timer = setInterval(() => {
      timeLeft.set(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  });
</script>

<div class="electionBanner">
    <div class="textOnbanner flex justify-between">
        <div class="flex flex-col gap-1 desktop:gap-3 rlogo">
            <img
                src="https://img.republicworld.com/logo/english/RepublicTvLogo.svg"
                alt="republic-logo"
                height="30px"
                width="144px"
            />
            <h4
                class="text-white text-[11px] font-extrabold desktop:text-[32px]"
            >
                Maharashtra
            </h4>
            <h3
                class="text-[#FFD600] text-sm font-extrabold desktop:text-[44px]"
            >
                ELECTIONS 2024
            </h3>
            <div class="counterWrapper">
                <div class="timeContainer">
                    <div class="counterTime">
                        <div class="counterBtn">{$timeLeft.days ?? 0} </div>
                    </div>
                    <div class="timerText">Days</div>
                </div>
                <div class="timeContainer">
                    <div class="counterTime">
                        <div class="counterBtn">{$timeLeft.hours ?? 0}</div>
                    </div>
                    <div class="timerText">HRS</div>
                </div>
                <div class="timeContainer">
                    <div class="counterTime">
                        <div class="counterBtn">{$timeLeft.minutes ?? 0}</div>
                    </div>
                    <div class="timerText">MINS</div>
                </div>
                <div class="timeContainer">
                    <div class="counterTime">
                        <div class="counterBtn">{$timeLeft.seconds ?? 0} </div>
                    </div>
                    <div class="timerText">SECS</div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2 items-center desktop:gap-[22px]">
            <span class="text-[6px] text-white font-medium desktop:text-base"
                >Powered By</span
            >
            <div class="client-logo">
                <img
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}logo/english/natrajlogo.png`}
                    alt="hint-logo"
                    height="52px"
                    width="108px"
                />
            </div>
        </div>
    </div>
</div>

<style>
    .electionBanner {
        background-image: url("https://img.republicworld.com/logo/english/Webbanner.svg");
        position: relative;
        width: 100%;
        height: 240px;
        margin-top: 24px;
    }
    .textOnbanner {
        position: absolute;
        left: 30%;
        padding-left: 22px;
        padding-right: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
        width: 70%;
        height: -webkit-fill-available;
        align-items: center;
    }
    .counterWrapper {
        display: flex;
        gap: 20px;
        padding-top: 8px;
    }
    .timeContainer {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .counterTime {
        display: flex;
        gap: 10px;
    }
    .counterBtn {
        background: #1d1d1d;
        color: #fff;
        text-align: center;
        font-size: 40px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 4px 8px;
        border-radius: 4px;
        line-height: 120%;
        display: flex;
        align-items: center;
    }
    .timerText {
        color: #fff;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
    }

    @media (max-width: 680px) {
        .electionBanner {
            background-image: url("https://img.republicworld.com/logo/english/Mwebbanner.svg");
            position: relative;
            width: 100%;
            height: 100px;
            margin-top: 24px;
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .textOnBanner {
            left: 26%;
            padding-top: 8px;
            padding-bottom: 4px;
            padding-left: 8px;
        }
        .client-logo img {
            width: 38px;
            height: 20px;
        }
        .counterWrapper {
            padding-top: 3px;
            gap: 6px;
        }
        .timeContainer {
            flex-direction: column;
            display: flex;
            gap: 2px;
        }
        .counterTime {
            display: flex;
            gap: 2px;
        }
        .counterBtn {
            color: #fff;
            text-align: center;
            font-size: 10px;
            font-weight: 700;
            line-height: normal;
            text-transform: uppercase;
            padding: 3px;
        }
        .rlogo img {
            width: 44px;
            height: 9px;
        }
        .timerText {
            color: #fff;
            font-size: 5px;
            font-weight: 600;
            text-transform: uppercase;
        }
    }
</style>
