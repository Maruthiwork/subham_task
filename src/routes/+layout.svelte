<script context="module" lang="ts">
  import { onDestroy, onMount } from "svelte";
  import "../app.css";
  import "../amp-header.css";
</script>

<script lang="ts">
  import {
    fetchFooterList,
    fetchFooterShows,
    fetchWeatherData,
  } from "./api/fetchData";
  import Header from "$lib/components/common/Header/Header.svelte";
  import MobileHeader from "$lib/components/common/mobile/MobileHeader.svelte";
  import Mgid from "$lib/components/MGID/Mgid.svelte";
  import TrendingBar from "$lib/components/common/Header/TrendingBar.svelte";
  import BreakingNewsWidget from "../lib/components/common/Header/BreakingNewsWidget.svelte";
  import MarketStripe from "$lib/components/common/Header/MarketStripe.svelte";

  import Notification from "$lib/components/Notification/Notification.svelte";
  import { BREAKING_NEWS_BAR_TYPE } from "$lib/components/common/Header/Constants";
  import BannerAd from "$lib/components/common/BannerAd/BannerAd.svelte";
  import AmpHeader from "$lib/components/common/Header/AMPHeader.svelte";
  import AMPFooter from "$lib/components/common/Footer/AMPFooter.svelte";
  import Footer from "$lib/components/common/Footer/Footer.svelte";
  import Ampmgid from "$lib/components/MGID/AMPMGID.svelte";
  import { setUTMParatemerToCookies } from "$lib/components/utils/utils";
  import CookieConsent from "$lib/components/common/CookieConsent/CookieConsent.svelte";
  import { page } from "$app/stores";
  import AmpMarketStripe from "$lib/components/common/Header/AmpMarketStripe.svelte";
  import { getLocation } from "./api/geoLocation";

  export const csr = false;

  // ** Props
  export let data: any;

  let isVisible = $page.url.pathname.includes("/adsunits");

  const {
    mega_menu,
    trending,
    analytics_stories,
    device,
    language,
    showFooterHeader,
    envDetails,
    isAmp,
    url,
    seoFooterData,
    taboolaPage,
    searchSlug,
    marketData,
  } = data?.props;

  let nav_bar = data.props.nav_bar ?? [];
  let weatherData: any = {};
  let footerListData: any = {};
  let footerShowsData: any = {};
  let bodyColor = envDetails.bgColor;
  let fontColor = envDetails.textColor;
  let footerVisible = false;
  let popUpVisible = false;
  let showPetalsShower = false;
  let interstitialAdSlot =
    device === "desktop"
      ? envDetails?.OutOfPageSlotWeb
      : envDetails?.OutOfPageSlotMWeb;

  const fetchWeatherDataHandler = async () => {
    try {
      const data = await fetchWeatherData(device);
      const storedData = {
        weatherData: data,
        timestamp: new Date().getTime(), // Store the current timestamp
      };
      localStorage.setItem("weatherData", JSON.stringify(storedData));
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchFooterData = async () => {
    try {
      [footerListData, footerShowsData] = await Promise.all([
        fetchFooterList(language),
        fetchFooterShows(language),
      ]);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };

  const handleMouseOut = (event: any) => {
    if (event.clientY <= 0 && !popUpVisible) {
      popUpVisible = true;
    }
  };

  const popUpModal = () => {
    popUpVisible = true;
  };

  onMount(async () => {
    // Add the interstitial ad script dynamically
    if (typeof document !== "undefined") {
      setUTMParatemerToCookies();
    }
    if (typeof document !== "undefined" && !isVisible) {
      if (window) {
        // Ads changes
        // @ts-ignore
        window.outOfPageRequestAds = window.outOfPageRequestAds || [];
        // Create a unique identifier for the ad slot
        const newAd = {
          slot: interstitialAdSlot,
        };
        // Check for duplicates based on a unique property, e.g., `slot`
        // @ts-ignore
        const exists = window.outOfPageRequestAds.some(
          (ad: any) => ad.slot === interstitialAdSlot,
        );
        if (!exists) {
          // If it doesn't exist, push the new ad
          // @ts-ignore
          window.outOfPageRequestAds.push(newAd);
        }
      }
    }
    if (showFooterHeader) {
      const storedData = localStorage.getItem("weatherData");
      const storedLocation : any = JSON.parse(localStorage.getItem("locationForWeather") || "{}");
      const location : any = await getLocation();

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const currentDate: any = new Date();

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const storedDate: any = new Date(parsedData.timestamp);
        if (
          currentDate?.getDate() === storedDate?.getDate() &&
          currentDate - storedDate < oneDayInMilliseconds && 
          storedLocation?.latitude === location?.latitude && storedLocation?.longitude === location?.longitude
        ) {
          weatherData = parsedData.weatherData;
        } else {
          weatherData = await fetchWeatherDataHandler();
        }
      } else {
        weatherData = await fetchWeatherDataHandler();
      }

      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !footerVisible) {
            footerVisible = true;
            fetchFooterData();
          }
        });
      });

      const footerElement = document.getElementById("call-footer");
      if (footerElement) {
        footerObserver.observe(footerElement);
      }
    }
    // const currentPath = window.location.pathname;
        
    // showPetalsShower = currentPath.includes("mahakumbh") || currentPath.includes("kumbh");
  });

  onMount(() => {
    if (
      typeof document !== "undefined" &&
      device === "desktop" &&
      analytics_stories?.data?.length > 0
    ) {
      //reset text to speech if playing
      const synth = window?.speechSynthesis;
      synth?.cancel();

      const deviceID = localStorage.getItem("deviceId");
      if (!deviceID) {
        return; // Exit if deviceId is null
      }
      const now = new Date().getTime();
      const expirationTime = new Date().getTime() - 4 * 60 * 60 * 1000; // 12 hours

      let deviceInfoArray = JSON.parse(
        localStorage.getItem("deviceInfoArray") || "[]",
      );

      const existingDeviceInfo = deviceInfoArray.find(
        (info: any) => info.deviceId === deviceID,
      );

      if (
        !existingDeviceInfo ||
        existingDeviceInfo.timestamp < now - expirationTime
      ) {
        // Show popup modal only if device ID doesn't exist or if it's expired
        document.addEventListener("mouseout", handleMouseOut);

        // Update deviceInfoArray with current device ID and timestamp
        const newDeviceInfo = { deviceId: deviceID, timestamp: now };
        deviceInfoArray = [
          ...deviceInfoArray.filter((info: any) => info.deviceId !== deviceID),
          newDeviceInfo,
        ];

        // Store updated deviceInfoArray in local storage
        localStorage.setItem(
          "deviceInfoArray",
          JSON.stringify(deviceInfoArray),
        );
      } else if (deviceInfoArray.length === 0) {
        // If deviceInfoArray is empty, add a new device info entry
        const newDeviceInfo = { deviceId: deviceID, timestamp: now };
        deviceInfoArray.push(newDeviceInfo);

        // Store updated deviceInfoArray in local storage
        localStorage.setItem(
          "deviceInfoArray",
          JSON.stringify(deviceInfoArray),
        );
      }

      // Clean up the event listener when component unmounts
      return () => {
        if (typeof document !== "undefined") {
          document.removeEventListener("mouseout", handleMouseOut);
        }
      };
    }
    // For mobile devices switching the tab
    if (
      typeof document !== "undefined" &&
      (device == "mobile" || device == "tablet") &&
      analytics_stories?.data?.length > 0
    ) {
      document.addEventListener("visibilitychange", popUpModal);

      return () => {
        document.removeEventListener("visibilitychange", popUpModal);
      };
    }

    // Pop up modal after 10 seconds in mobile when scrolling
    if (typeof window !== "undefined" && analytics_stories?.data?.length > 0) {
      let timeoutId: any = "";
      const deviceID = localStorage.getItem("deviceId");
      const now = new Date().getTime();
      const expirationTime = 900000; // 1 hour in milliseconds

      const storedDeviceInfo = localStorage.getItem("deviceInfoArray");
      const deviceInfoArray = storedDeviceInfo
        ? JSON.parse(storedDeviceInfo)
        : [];

      const existingDeviceInfo = deviceInfoArray.find(
        (info: any) => info.deviceId === deviceID,
      );

      const handleMouseMove = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          popUpVisible = true;
        }, 10000); // after 10sec
      };

      window.addEventListener("mousemove", handleMouseMove);

      if (
        !existingDeviceInfo ||
        now - existingDeviceInfo.timestamp > expirationTime
      ) {
        // Update deviceInfoArray with current device ID and timestamp
        const newDeviceInfo = { deviceId: deviceID, timestamp: now };
        const updatedDeviceInfoArray = [
          ...deviceInfoArray.filter((info: any) => info.deviceId !== deviceID),
          newDeviceInfo,
        ];

        // Store updated deviceInfoArray in local storage
        localStorage.setItem(
          "deviceInfoArray",
          JSON.stringify(updatedDeviceInfoArray),
        );
      }

      onDestroy(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        clearTimeout(timeoutId);
      });
    }
  });

  const gtmScript = `
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "${envDetails?.gtmCode}");
  `;
</script>

<svelte:head>
  <!-- Adding service worker -->
  <!-- <script>
    const urlParams = new URLSearchParams(window.location.search);
    const serviceWorkerDisabled = urlParams.get('serviceWorker') === 'false';
    if ("serviceWorker" in navigator && !serviceWorkerDisabled) {
      navigator.serviceWorker
        .register("/service-worker-ads.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
          // fallbackToTraditionalAdLoading(); // Use traditional ad loading if registration fails
        });
    } else {
      console.error("Service Worker not supported. Ads will be loaded traditionally.");
    }
  </script> -->

  <!-- Google Tag Manager -->
  {@html `<script>${gtmScript}</script>`}
  <!-- End Google Tag Manager -->

  <script
   defer
    src="https://www.googletagmanager.com/gtag/js?id={envDetails?.gaCode}"
  ></script>
  <script>
    let gaCode = document.querySelector(`meta[name=gaCode]`).content;
    const linkerDomains = [window.location.hostname];
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", gaCode, {
      linker: {
        domains: linkerDomains,
      },
    });
  </script>

  <link
    rel="preload"
    href="/content.css"
    as="style"
    on:load={() => {
      const link = document.querySelector('link[rel="preload"][as="style"]');
      if (link instanceof HTMLLinkElement) {
        link.rel = "stylesheet";
      }
    }}
  />

  {#if isAmp}
    <link rel="stylesheet" href="/swiper-bundle.min.css" />
  {:else}
    <noscript>
      <link rel="stylesheet" href="/swiper-bundle.min.css" />
    </noscript>
  {/if}

  <!-- Begin Comscore Tag -->
  <script defer>
    var _comscore = _comscore || [];
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    }
    let cs_ucfr = "";
    if (
      (getCookie("consentcookies_status") && getCookie("cs_ucfr")) ||
      getCookie("FCCDCF")
    ) {
      cs_ucfr = "1";
    } else if (getCookie("consentcookies_status")) {
      cs_ucfr = "0";
    }
    _comscore.push({
      c1: "2",
      c2: "24610012",
      cs_ucfr: cs_ucfr,
      options: {
        enableFirstPartyCookie: true,
      },
    });

    (function () {
      var s = document.createElement("script"),
        el = document.getElementsByTagName("script")[0];
      s.async = true;
      s.src = "https://sb.scorecardresearch.com/cs/24610012/beacon.js";
      el.parentNode.insertBefore(s, el);
    })();
  </script>
  {#if !isAmp}
    <noscript>
      <img
        src="https://sb.scorecardresearch.com/p?c1=2&c2=24610012&cv=4.4.0&cj=1"
        alt="sb.scorecardresearch"
      />
    </noscript>
  {/if}
  <!-- End Comscore Tag -->

  {#if !isAmp}
    <noscript>
      <img
        src="https://sb.scorecardresearch.com/p?c1=2&c2=24610012&cv=4.4.0&cj=1"
        alt="sb.scorecardresearch"
      />
    </noscript>
    <noscript>
      <img
        src="https://b.scorecardresearch.com/p?c1=2&c2=24610012&cv=2.0&cj=1"
        alt="score-card"
      />
    </noscript>
  {/if}
</svelte:head>

{#if url?.split("/")?.pop()?.split("?")?.[0] === "tv-login"}
  <slot />
{:else}
  {#if !isAmp && !$page.url.pathname.includes("/privacy-policy-app") && !$page.url.pathname.includes("/policies-disclaimers-app")}
    <Notification {envDetails} {language} />
  {/if}
  {#if isAmp && !showFooterHeader}
    <!-- Web stories -->
    <slot />
  {:else}
    <div
      style="padding:1px;background-color: {bodyColor ??
        ''};color: {fontColor ??
        ''};font-family: {`${envDetails?.primaryFont ?? ''}`}"
    >
      {#if isAmp}
        {#if !taboolaPage}
          <AmpHeader
            {nav_bar}
            {envDetails}
            {searchSlug}
            trendingbarData={trending}
          />
          {#if language === "RB"}
            <AmpMarketStripe {marketData} />
          {/if}
        {/if}
        {#if envDetails?.domainName.includes("dev")}
          <BannerAd
            dataSlot={envDetails?.adsFile?.Mobile?.INTERSTITIAL?.ampHome}
            isAmp={true}
          />
        {/if}
      {:else if showFooterHeader}
        {#if !taboolaPage}
          {#if device === "desktop"}
            <Header
              {mega_menu}
              weatherData={weatherData?.data?.data}
              {language}
              {nav_bar}
              {envDetails}
              {device}
            />
          {:else}
            <MobileHeader
              {mega_menu}
              weatherData={weatherData?.data?.data}
              {language}
              {nav_bar}
              {envDetails}
              {device}
            />
          {/if}
        {/if}

        {#if language === "RB"}
          <MarketStripe {language} />
        {/if}
        {#if !isVisible}
          {#if !taboolaPage}
            <TrendingBar {language} {trending} />
          {/if}
        {/if}
        <BreakingNewsWidget
          {language}
          {device}
          type={BREAKING_NEWS_BAR_TYPE.DEFAULT}
        />
        {#if device === "desktop" && showFooterHeader && !isVisible}
          <BannerAd adslot={envDetails?.adsFile?.Desktop?.INTERSTITIAL?.home} />
        {/if}
        {#if device === "mobile" && showFooterHeader && !isVisible}
          <BannerAd adslot={envDetails?.adsFile?.Mobile?.INTERSTITIAL?.home} />
        {/if}
        <!-- {#if showPetalsShower}
            <PetalsShower />
        {/if} -->
      {/if}
      <main>
        <slot />
        {#if showFooterHeader}
          <Mgid widgetId={envDetails?.mgWidgetId} />
        {/if}
      </main>
    </div>

    {#if isAmp}
      <div style={`background-color:${envDetails?.bgColor}`}>
        <Ampmgid {envDetails} />
      </div>
      {#if !taboolaPage}
        <AMPFooter
          {envDetails}
          {nav_bar}
          {searchSlug}
          trendingbarData={trending}
        />
      {/if}
    {:else if showFooterHeader}
      {#if !taboolaPage}
        <div class="call-footer" id="call-footer" />
        <Footer
          {seoFooterData}
          shows={footerShowsData?.data?.republic_shows ?? []}
          latestnews={footerListData?.data?.data?.latestnews?.story ?? []}
          most_followed={footerListData?.data?.data?.most_followed
            ?.most_followed ?? []}
          mostshared={footerListData?.data?.data?.mostshared?.story ?? []}
          mostwatched={footerListData?.data?.data?.mostwatched?.story ?? []}
          trendingtopics={footerListData?.data?.data?.trendingtopics
            ?.trendingtopics ?? []}
          navbar={nav_bar}
          {envDetails}
          {device}
          {mega_menu}
          {language}
        />

        <CookieConsent />
      {/if}
    {/if}
  {/if}
{/if}

{#if !isAmp}
  <script async src={`/ads.js?v=1.04`}></script>
  <script async src={`/helper.js?v=1.08`}></script>
{/if}

<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id={envDetails?.gtmCode}"
    height="0"
    width="0"
    title="gtm"
    style="display:none;visibility:hidden"
  ></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->