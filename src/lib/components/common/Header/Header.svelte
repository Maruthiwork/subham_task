<script lang="ts">
  import MenuBar from "./MenuBar.svelte";
  import type { MEGA_MENU } from "./Types";
  import { interpretAQI } from "$lib/components/utils/utils";
  import WeatherModal from "../WeatherModal/WeatherModal.svelte";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";
  import HamburgerModal from "./HamburgerModal.svelte";
  import Channels from "../Republic-Common/Channels.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { rssLink } from "$lib/utils/common";

  export let mega_menu: MEGA_MENU;
  export let weatherData: any = null;
  export let nav_bar: any = [];
  export let language: string = "E";
  export let device: string = "desktop";
  export let envDetails: any = "";

  let weatherInfo: any;
  let openWeatherModal: boolean = false;

  $: {
    if (weatherData) {
      weatherInfo = { ...weatherData };
    }
  }

  let isVisible = $page.url.pathname.includes("/adsunits");

  let isOpen = false;

  const setIsOpen = () => {
    isOpen = !isOpen;
  };

  async function toggleMenu() {
    isOpen = !isOpen;
    if (isOpen && !HamburgerModal) {
      document.body.classList.add("modal-open");
    }
  }

  const handleWeatherModal = () => {
    openWeatherModal = !openWeatherModal;
  };

  let { topNavBar, bottomNavBar } = mega_menu;

  let hamburgerIcon: any;
  let sticky2: any;
  function handleScroll() {
    if (window.pageYOffset > sticky2) {
      hamburgerIcon.classList.add("fixedMenu");
    } else {
      hamburgerIcon?.classList.remove("fixedMenu");
    }
  }

  onMount(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Set up the header element and sticky offset after the DOM is fully loaded
      setTimeout(() => {
        hamburgerIcon = document.getElementById("fixedRightMenu");
        if (hamburgerIcon) {
          sticky2 = hamburgerIcon.offsetTop;
        }
      }, 0);

      window.addEventListener("scroll", handleScroll);
    }
  });
</script>

<header style="min-height: 120px;">
  <!-- <TopNavBar {topNavBar} /> -->
  <div
    style="border-top: 1px solid var(--Strock, rgba(0, 0, 0, 0.16));border-bottom: 1px solid var(--Strock, rgba(0, 0, 0, 0.16));background: #F8F8F8;"
  >
    {#if device == "desktop" && !isVisible}
    <div class="min-h-[271px] flex justify-center items-center">
      <DisplayAd
        adslot={envDetails.adsFile?.Desktop?.ATF?.home}
        height={"271"}
        width={"728"}
      />
    </div>
    {/if}
    {#if isVisible}
      <DisplayAd
        adslot={envDetails.adsFile?.Desktop?.ATF?.ads_page}
        height={"271"}
        width={"728"}
      />
    {/if}
  </div>
  <Channels {envDetails} />

  <div class="topHeader min-h-[90px] {isVisible ? 'border-b border-gray-300' : ''}">
    <div class="grid contentWrapper justify-between items-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="weatherBlock flex flex-col items-start"
        style="color: #2C3A47;{envDetails?.language === 'MH' ||
        envDetails?.language === 'H'
          ? `font-family:${envDetails?.secondaryFont};font-size: 13px;`
          : `font-family-${envDetails?.primaryFont}`}"
        on:click={() => handleWeatherModal()}
      >
        {#if weatherInfo}
          <div class="weatherStyle">
            {weatherInfo?.todaydate}
          </div>
          <div class="weatherContainer">
            <div class="weatherName">{weatherInfo?.name}</div>
            <div class="weatherImage">
              <img
                src={weatherInfo?.image}
                alt="Weather Icon"
                width="20"
                height="20"
                loading="lazy"
              />
            </div>
            <div class="weatherTemp">{weatherInfo?.temp}°C</div>
          </div>
          <div class="weatherStyle">
            AQI: {weatherInfo?.aqi}
            <span
              class="wedot {interpretAQI(weatherInfo?.data?.aqi).colorClass}"
            />
            {interpretAQI(weatherInfo?.aqi).text}
          </div>
        {/if}
      </div>

      <div>
        <a data-sveltekit-reload href={`/`}>
          <div
            class="logo"
            style="height:{envDetails.logoHeight ??
              ''};width:{envDetails.logoWidth ?? ''};"
          >
            <img
              alt="Republic TV Logo"
              src={envDetails.siteLogo}
              loading="lazy"
              height={envDetails.logoHeight}
              width={envDetails.logoWidth}
            />
          </div>
        </a>
      </div>
      {#if envDetails?.language !== "B" && envDetails?.language !== "KA"}
        <div
          class="loginBlock flex items-center justify-end headLeftSec"
          id="fixedRightMenu"
        >
          <button aria-label="Menu" on:click={toggleMenu}>
            <div class="menuLinkblock">
              <span id="menuToggleicon" class="menuToggleicon" />
            </div>
          </button>
          {#if isOpen && HamburgerModal}
            <svelte:component
              this={HamburgerModal}
              {setIsOpen}
              hamburgerData={bottomNavBar}
              {language}
              {device}
              {envDetails}
            />
          {/if}
        </div>
      {/if}
    </div>
  </div>
  {#if openWeatherModal}
    <WeatherModal
      open={openWeatherModal}
      handleClose={handleWeatherModal}
      {weatherInfo}
      {language}
    />
  {/if}
  {#if !isVisible}
    <MenuBar {nav_bar} {envDetails} />
  {/if}

  {#if isOpen}
    <HamburgerModal
      {isOpen}
      {setIsOpen}
      hamburgerData={bottomNavBar}
      {language}
      {envDetails}
    />
  {/if}

  {#if $page?.route?.id?.length == 1 }
  {#each nav_bar.filter((item) => item?.is_category === true) as heroCategory}
    {#each rssLink(heroCategory?.completeSlug, false) as rssUrl}
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${$page?.url}${rssUrl}`}
      />
    {/each}
  {/each}
{/if}
</header>

<style>
  .weatherStyle {
    font-size: 13px;
    font-family: var(--fmulish);
    font-weight: 400;
    line-height: 16.32px;
    padding-bottom: 4px;
  }

  @media screen and (max-width: 1480px) {
    .fixedMenu {
      position: fixed;
      transition: all 0.2s;
      z-index: 10000;
      top: 10px;
      float: right;
      right: 10px;
    }
  }
  .weatherIcon {
    width: 40px;
    line-height: 0;
  }
  .weatherIcon img {
    width: 100%;
  }
  .blackPollNum {
    color: black;
  }

  .whitePollNum {
    color: white;
  }
  .date {
    width: 100%;
    height: 16px;
  }

  .weatherContainer {
    display: flex;
    align-items: center; /* Optional: Align items vertically */
  }

  .weatherName,
  .weatherTemp {
    margin-right: 10px; /* Adjust as needed for spacing between elements */
    font-size: 13px;
    font-family: var(--fmulish);
    font-weight: 400;
    line-height: 16.32px;
    padding-bottom: 4px;
  }

  .good {
    background-color: #29b25a;
  }
  

  .satisfactory {
    background-color: #93cb5f;
  }

  .moderate {
    background-color: #efd713;
  }

  .poor {
    background-color: #f58229;
  }

  .veryPoor {
    background-color: #e72628;
  }

  .severe {
    background-color: #a71c1f;
  }
</style>
