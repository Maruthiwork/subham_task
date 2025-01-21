<script lang="ts">
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import {
    FOOTER_LINKS,
    COPY_RIGHT_TEXT,
    REPUBLIC_APP_PLATFORM,
    SOCIAL_PLATFORM,
  } from "./Constants";
  import "$lib/assets/styles/footer.css";
  import update_clock_yellow from "$lib/assets/images/footer/update-clock-yellow.svg";
  import watch_later_white from "$lib/assets/images/footer/watch-later-white.svg";
  import rGIF from "$lib/assets/images/footer/R.gif";
  import play_yellow from "$lib/assets/images/footer/Play-yellow.svg";
  import play_circle_white from "$lib/assets/images/footer/play-circle-white.svg";
  import ThunderIcon from "$lib/assets/images/footer/ThunderIcon.svelte";
  import BusinessClockIcon from "$lib/assets/images/footer/BusinessClockIcon.svg";
  import BusinessClockIconSelected from "$lib/assets/images/footer/BusinessClockIconSelected.svg";
  import HamburgerIcon from "$lib/assets/images/footer/Hamburger.svg";
  import HamburgerSelected from "$lib/assets/images/footer/HamburgerSelected.svg";
  import MarketIcon from "$lib/assets/images/footer/Market.svg";
  import MarketSelected from "$lib/assets/images/footer/MarketSelected.svg";
  import Videos from "$lib/assets/images/footer/Videos.svg";
  import VideosSelected from "$lib/assets/images/footer/VideosSelected.svg";
  import { onMount } from "svelte";
  import AmpHamburgerModal from "../Header/AmpHamburgerModal.svelte";

  export let envDetails;
  export let nav_bar: any = [];
  export let searchSlug: string = "";
  export let trendingbarData: any = [];

  let pathname: string = ``;
  // Set pathname only on client-side
  onMount(() => {
    const fullRoute = window.location.pathname;
    pathname = "/" + fullRoute.split("/")?.[1];
  });
  let isOpen = false;

  let randomNewCount = generateRandomNumber(8, 20);

  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const menuItems = {
    E: [
      {
        href: "/amp",
        selectedIcon: update_clock_yellow,
        defaultIcon: watch_later_white,
        label: "Big Stories",
        badge: true,
      },
      {
        href: "/quick",
        component: ThunderIcon,
        componentProps: (pathname) => ({
          color: pathname === "/quick" ? "#FFD700" : "white",
        }),
        label: "Quick",
        isCustomComponent: true,
      },
      {
        href: "/amp/livetv",
        selectedIcon: rGIF,
        defaultIcon: rGIF,
        label: "Live TV",
      },
      {
        href: "/amp/videos",
        selectedIcon: play_yellow,
        defaultIcon: play_circle_white,
        label: "Video",
      },
    ],
    RB: [
      {
        href: "/amp",
        selectedIcon: BusinessClockIconSelected,
        defaultIcon: BusinessClockIcon,
        label: "Big Stories",
        badge: true,
      },
      {
        href: "/amp/market",
        selectedIcon: MarketSelected,
        defaultIcon: MarketIcon,
        label: "MARKET",
      },
      {
        href: "/amp/videos",
        selectedIcon: VideosSelected,
        defaultIcon: Videos,
        label: "VIDEOS",
      },
      {
        showHamburger: true,
        on: "tap:sidebar.toggle",
        selectedIcon: HamburgerSelected,
        defaultIcon: HamburgerIcon,
        label: "MORE",
      },
    ],
    H: [
      {
        href: "/amp",
        selectedIcon: update_clock_yellow,
        defaultIcon: watch_later_white,
        label: "Big Stories",
        badge: true,
      },
      {
        href: "/quick",
        component: ThunderIcon,
        componentProps: (pathname) => ({
          color: pathname === "/quick" ? "#FFD700" : "white",
        }),
        label: "Quick",
        isCustomComponent: true,
      },
      {
        href: "/amp/livetv",
        selectedIcon: rGIF,
        defaultIcon: rGIF,
        label: "Live TV",
      },
      {
        href: "/amp/videos",
        selectedIcon: play_yellow,
        defaultIcon: play_circle_white,
        label: "Video",
      },
    ],
    MH: [
      {
        href: "/amp",
        selectedIcon: update_clock_yellow,
        defaultIcon: watch_later_white,
        label: "Big Stories",
        badge: true,
      },
      {
        href: "/quick",
        component: ThunderIcon,
        componentProps: (pathname) => ({
          color: pathname === "/quick" ? "#FFD700" : "white",
        }),
        label: "Quick",
        isCustomComponent: true,
      },
      {
        href: "/amp/livetv",
        selectedIcon: rGIF,
        defaultIcon: rGIF,
        label: "Live TV",
      },
      {
        href: "/amp/videos",
        selectedIcon: play_yellow,
        defaultIcon: play_circle_white,
        label: "Video",
      },
    ],
  };
</script>

<AmpHamburgerModal {nav_bar} {envDetails} {searchSlug} {trendingbarData} />

<footer
  style={`background:${envDetails.footerBgColor ?? ""};color:${envDetails.footerTextColor ?? ""}`}
>
  <div class="contentWrapper ftrflex">
    <section class="mainFooterSection">
      <div class="footerRow flexwrap">
        <div class="ftrCol borderRight">
          <ul class="links">
            {#each Object.values(FOOTER_LINKS) as eachItem}
              <li>
                <a href={eachItem?.url} class={eachItem.CLASSNAME}>
                  {eachItem?.text}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        <div class="ftrCol textCenter borderRight">
          <div class="flex flex-wrap gap-3 pt-2 desktop:pt-0 justify-center">
            <a
              href="https://www.republicworld.com/"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <amp-img
                alt="Footer Img"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/republic-logo-eng.svg"
                height={28}
                width={144}
              />
            </a>
            <a
              data-sveltekit-reload
              href={EnvironmentConfig.VITE_REPUBLIC_URL_HINDI}
              target="_blank"
              rel="noreferrer"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <amp-img
                alt="Republic Bharat Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/republic-logo-bharat.svg"
                height={28}
                width={115}
              />
            </a>
            <a
              href="https://bangla.republicworld.com/livetv.html"
              target="_blank"
              rel="noreferrer"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <amp-img
                alt="Republic Bangla Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/republic-logo-bangla.svg"
                height={28}
                width={97}
              />
            </a>
            <a
              href="https://kannada.republicworld.com/livetv.html"
              target="_blank"
              rel="noreferrer"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <amp-img
                alt="R Kannada Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/RKannada_logo.svg"
                height={28}
                width={98}
              />
            </a>
          </div>
          <div
            class="w-full flex items-center justify-center py-5 border-b border-[#B10203] desktop:border-0"
          >
            <a
              href="https://www.republicbiz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <amp-img
                alt="Republic Business Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/rbusiness-logo.svg"
                height={70}
                width={60}
              />
            </a>
          </div>
          <div class="logosRow flex flex-col items-center justify-center mt-3">
            <h5>Follow Republic on:</h5>
            <div class="flex flex-wrap gap-3">
              {#if SOCIAL_PLATFORM?.[envDetails?.language ?? "E"]?.length > 0}
                {#each SOCIAL_PLATFORM?.[envDetails?.language ?? "E"] as platform}
                  <a href={platform?.url} target="_blank" rel="noreferrer">
                    <amp-img
                      src={platform?.logo}
                      alt={platform.name + " Footer logo"}
                      height={platform.height ?? ""}
                      width={platform.width ?? ""}
                    >
                    </amp-img>
                  </a>
                {/each}
              {/if}
            </div>
          </div>
          <!-- <div class="socialNav">
                        <ul class="flexwrap socialLinks">
                            {#each SOCIAL_PLATFORM?.[envDetails?.language ?? "E"] as platform}
                                <amp-social-share 
                                    type="{platform?.type}" 
                                    width="26" 
                                    height="26" 
                                    aria-label="{platform?.label}" 
                                    data-share-endpoint="{platform?.url}" 
                                    data-param-app_id="{platform?.APP_ID}" 
                                    data-param-media="{platform?.logo}">
                                </amp-social-share>
                            {/each}
                        </ul>
                    </div> -->
        </div>
        <div class="ftrCol downloadappBlock">
          <h5>Download the all-new Republic app:</h5>
          <div class="downloadLogosRow">
            {#each Object.values(REPUBLIC_APP_PLATFORM) as eachItem}
              <a href={eachItem?.LINK}>
                <amp-img
                  src={eachItem?.MEDIA}
                  width="144px"
                  height="90px"
                  alt="AMP"
                ></amp-img>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </section>
    <section class="textCenter copyrightSection">
      <p class="copyright">{@html COPY_RIGHT_TEXT}</p>
    </section>
  </div>
  <div
    class={envDetails?.language === "RB"
      ? "bgBusiness mBottomNav "
      : "mBottomNav"}
  >
    <div class="contentWrapper">
      <div class="card">
        <ul>
          {#if menuItems?.[envDetails?.language]?.length > 0}
            {#each menuItems?.[envDetails?.language] as item}
              <li
                class:selected={pathname === item.href}
                style="padding-bottom: 2px;"
              >
                {#if item.showHamburger}
                  {#if item.on}
                    <button
                      class="flex flex-col h-full justify-between items-center"
                      on={item.on}
                    >
                      <img
                        src={isOpen ? item.selectedIcon : item.defaultIcon}
                        alt={item.label + " icon"}
                        width="24"
                        height="24"
                        style="object-fit: contain; margin: 4px auto 6px;"
                      />
                      <p
                        style="font-size: 11px;"
                        class={envDetails?.language === "RB"
                          ? "text-black textUppercase "
                          : "text-white textUppercase"}
                      >
                        {item.label}
                      </p>
                    </button>
                  {:else}
                    <a
                      href=""
                      class="flex flex-col h-full justify-between items-center"
                      on={item.on}
                    >
                      <img
                        src={isOpen ? item.selectedIcon : item.defaultIcon}
                        alt={item.label + " icon"}
                        width="24"
                        height="24"
                        style="object-fit: contain;"
                      />
                      <p
                        class={envDetails?.language === "RB"
                          ? "text-black textUppercase "
                          : "text-white textUppercase"}
                      >
                        {item.label}
                      </p>
                    </a>
                  {/if}
                {:else}
                  <a
                    data-sveltekit-reload
                    href={item.href}
                    class="flex flex-col h-full justify-between items-center"
                  >
                    {#if item.isCustomComponent}
                      <svelte:component
                        this={item.component}
                        {...item.componentProps(pathname)}
                      />
                    {:else if item.icon}
                      <img
                        src={item.icon}
                        alt={item.label + " icon"}
                        width="22"
                        height="22"
                        style="object-fit: contain;"
                      />
                    {:else}
                      <img
                        src={pathname === item.href
                          ? item.selectedIcon
                          : item.defaultIcon}
                        alt={item.label + " icon"}
                        width="22"
                        height="22"
                        style="object-fit: contain;"
                      />
                    {/if}
                    <p
                      class={envDetails?.language === "RB"
                        ? "text-black textUppercase "
                        : "text-white textUppercase"}
                    >
                      {item.label}
                    </p>
                    {#if item.badge}
                      <span
                        class={envDetails?.language === "RB"
                          ? "badge-bg-red badge textUppercase"
                          : " badge-bg-yellow badge textUppercase"}
                        >{randomNewCount} New</span
                      >
                    {/if}
                  </a>
                {/if}
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    </div>
  </div>
</footer>

<style>
  .bgBusiness {
    background: #ffe2c7;
  }

  .bgBusiness div div ul li a {
    color: black;
  }
</style>
