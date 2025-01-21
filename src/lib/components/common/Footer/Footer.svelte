<script lang="ts">
  // @ts-nocheck
  import {
    COPY_RIGHT_TEXT,
    DOWNLOAD_THE_ALL_NEW_REPUBLIC_APP,
    FOLLOW_REPUBLIC_ON,
    LATEST_NEWS,
    MOST_FOLLOWED,
    MOST_SHARED,
    MOST_WATCHED,
    REPUBLIC_SHOW,
    SOCIAL_PLATFORM,
    TOP_CATEGORIES,
    TRENDING_TOPICS,
    FOOTER_LINKS,
  } from "./Constants";
  import type {
    SmallStoryData,
    RepublicShow,
    Story,
    Navigation,
  } from "./Types";
  import "$lib/assets/styles/footer.css";
  import update_clock_yellow from "$lib/assets/images/footer/update-clock-yellow.svg";
  import watch_later_white from "$lib/assets/images/footer/watch-later-white.svg";
  import rGIF from "$lib/assets/images/footer/R.gif";
  import play_yellow from "$lib/assets/images/footer/Play-yellow.svg";
  import play_circle_white from "$lib/assets/images/footer/play-circle-white.svg";
  import ThunderIcon from "$lib/assets/images/footer/ThunderIcon.svelte";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";

  import BusinessClockIcon from "$lib/assets/images/footer/BusinessClockIcon.svg";
  import BusinessClockIconSelected from "$lib/assets/images/footer/BusinessClockIconSelected.svg";
  import HamburgerIcon from "$lib/assets/images/footer/Hamburger.svg";
  import HamburgerSelected from "$lib/assets/images/footer/HamburgerSelected.svg";
  import MarketIcon from "$lib/assets/images/footer/Market.svg";
  import MarketSelected from "$lib/assets/images/footer/MarketSelected.svg";
  import Videos from "$lib/assets/images/footer/Videos.svg";
  import VideosSelected from "$lib/assets/images/footer/VideosSelected.svg";

  export let device = "Desktop";
  export let shows: RepublicShow[] = [];
  export let latestnews: Story[] = [];
  export let most_followed: SmallStoryData[] = [];
  export let mostshared: Story[] = [];
  export let mostwatched: Story[] = [];
  export let trendingtopics: SmallStoryData[] = [];
  export let navbar: Navigation[] = [];
  export let envDetails: any = {};
  export let language: string = "E";
  export let mega_menu: MEGA_MENU;
  export let seoFooterData:any 

  let pathname: any = ``;

  let isOpen = false;
  const setIsOpen = () => {
    isOpen = !isOpen;
  };

  let { topNavBar, bottomNavBar } = mega_menu;
  import { onMount } from "svelte";
  import HamburgerModal from "../Header/HamburgerModal.svelte";
  import type { MEGA_MENU } from "../Header/Types";
  import SeoFooter from "../SeoFooter/SeoFooter.svelte";
  import Divider from "../Republic-Common/Divider.svelte";

  let randomNewCount = generateRandomNumber(8, 20);

  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const mBottomNav = document.querySelector(".mBottomNav");

    if (mBottomNav) {
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down, hide the bottom menu and show the ad container
        mBottomNav.style.transform = "translateY(100%)";
      } else {
        // Scrolling up, show the bottom menu and hide the ad container
        mBottomNav.style.transform = "translateY(0)";
      }
    }

    lastScrollTop = currentScrollTop;
  };

  onMount(() => {
    const fullRoute = window.location.pathname;
    pathname = "/" + fullRoute.split("/")?.[1];

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const menuItems = {
    E: [
      {
        href: "/",
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
        href: "/livetv",
        selectedIcon: rGIF,
        defaultIcon: rGIF,
        label: "Live TV",
      },
      {
        href: "/videos",
        selectedIcon: play_yellow,
        defaultIcon: play_circle_white,
        label: "Video",
      },
    ],
    RB: [
      {
        href: "/",
        selectedIcon: BusinessClockIconSelected,
        defaultIcon: BusinessClockIcon,
        label: "Big Stories",
        badge: true,
      },
      {
        href: "/market",
        selectedIcon: MarketSelected,
        defaultIcon: MarketIcon,
        label: "MARKET",
      },
      {
        href: "/videos",
        selectedIcon: VideosSelected,
        defaultIcon: Videos,
        label: "VIDEOS",
      },
      {
        showHamburger: true,
        onClick: () => {
          //set open hamburger modal
          isOpen = !isOpen;
        },
        selectedIcon: HamburgerSelected,
        defaultIcon: HamburgerIcon,
        label: "MORE",
      },
    ],
    H: [
      {
        href: "/",
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
        href: "/livetv",
        selectedIcon: rGIF,
        defaultIcon: rGIF,
        label: "Live TV",
      },
      {
        href: "/videos",
        selectedIcon: play_yellow,
        defaultIcon: play_circle_white,
        label: "Video",
      },
    ],
    MH: [
      {
        href: "/",
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
        href: "/livetv",
        selectedIcon: rGIF,
        defaultIcon: rGIF,
        label: "Live TV",
      },
      {
        href: "/videos",
        selectedIcon: play_yellow,
        defaultIcon: play_circle_white,
        label: "Video",
      },
    ],
  };
</script>
  {#if seoFooterData?.length > 0}
  {#each seoFooterData as eachSeoFooter , index}
    <div style="background-color: {eachSeoFooter?.bgColor};">
      <div class="contentWrapper ftrflex" >
        <SeoFooter eachWidget={eachSeoFooter} seoTags={eachSeoFooter?.tags} />
          {#if index !== seoFooterData.length - 1}
          <Divider />
        {/if}
      </div> 
    </div>
  {/each}
  {/if}
<footer
  style={`background:${envDetails.footerBgColor ?? ""};color:${envDetails.footerTextColor ?? ""}`}
>
  <div class="contentWrapper ftrflex">
    <section class="footerCategoriesSection">
      {#if false}
        <div class="footerRow flexwrap">
          {#if navbar.length != 0}
            <div class="ftrCol2">
              <h4>{TOP_CATEGORIES}</h4>
              <div class=" flexwrap ftrColWrap">
                <ul class="footerlist">
                  {#each navbar?.slice(4, 8) as category}
                    <li>
                      <a
                        data-sveltekit-reload
                        href={"/" + category.completeSlug}
                        title={category.name}>{category.name}</a
                      >
                    </li>
                  {/each}
                </ul>
                <ul class="footerlist">
                  {#each navbar?.slice(8, 12) as category}
                    <li>
                      <a
                        data-sveltekit-reload
                        href={"/" + category.completeSlug}
                        title={category.name}>{category.name}</a
                      >
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
          {#if trendingtopics.length != 0}
            <div class="ftrCol7 isDesktop">
              <h4>{TRENDING_TOPICS}</h4>
              <div class="flexwrap ftrColWrap">
                <ul class="footerlist">
                  {#each trendingtopics.slice(0, 4) as topic}
                    <li>
                      <a
                        data-sveltekit-reload
                        href={"/topics/" + topic.slug}
                        title={topic.name}
                        class="text-black"
                        >{topic.name}
                      </a>
                    </li>
                  {/each}
                </ul>
                <ul class="footerlist">
                  {#each trendingtopics.slice(4, 8) as topic}
                    <li>
                      <a
                        data-sveltekit-reload
                        href={"/topics/" + topic.slug}
                        title={topic.name}
                        class="text-black"
                        >{topic.name}
                      </a>
                    </li>
                  {/each}
                </ul>
                <ul class="footerlist">
                  {#each trendingtopics.slice(8, 12) as topic}
                    <li>
                      <a
                        data-sveltekit-reload
                        href={"/topics/" + topic.slug}
                        title={topic.name}
                        class="text-black"
                        >{topic.name}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
          {#if most_followed.length != 0}
            <div class="ftrCol3 isDesktop">
              <h4>{MOST_FOLLOWED}</h4>
              <div class="ftrColWap flexwrap">
                <ul class="footerlist">
                  {#each most_followed.slice(0, 7) as person}
                    <li>
                      <a
                        data-sveltekit-reload
                        href={"/topics/" + person.slug}
                        title={person.name}>{person.name}</a
                      >
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </section>
    <section class="rshowsSection isDesktop">
      {#if shows.length != 0}
        <div class="footerRow flexwrap itemCenter justifyCenter">
          <h4>{REPUBLIC_SHOW}</h4>
          <ul>
            {#each shows as show}
              <li
                class="text-base leading-normal text-black py-1.5 px-3 border-r border-gray-300"
              >
                <a
                  class="!border-0"
                  data-sveltekit-reload
                  href={"/" + show.completeSlug}
                  title={show.show}>{show.show}</a
                >
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </section>
    <section class="ftrnewsSection">
      {#if false}
        <div class="footerRow">
          {#if latestnews.length != 0}
            <div class="ftrnewsCol borderRight pr30">
              <a
                data-sveltekit-reload
                href={"/latest-news"}
                title={LATEST_NEWS}
                style={`color:"#000",textDecoration:"none"`}
                ><h4>{LATEST_NEWS}</h4></a
              >
              <ul class="newslinks">
                {#each latestnews as news}
                  <li>
                    <a
                      data-sveltekit-reload
                      href={"/" + news.completeSlug}
                      title={news.long_heading}
                      class="py-3 border-b border-gray-300 relative text-base leading-relaxed inline-block"
                      >{news.long_heading}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          {#if mostshared.length != 0}
            <div class="ftrnewsCol borderRight pr30 isDesktop">
              <h4>{MOST_WATCHED}</h4>
              <ul class="newslinks">
                {#each mostshared as shared}
                  <li>
                    <a
                      data-sveltekit-reload
                      href={"/" + shared.completeSlug}
                      title={shared.long_heading}
                      class="py-3 border-b border-gray-300 relative text-base leading-relaxed inline-block"
                      >{shared.long_heading}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          {#if mostwatched.length != 0}
            <div class="ftrnewsCol isDesktop">
              <h4>{MOST_SHARED}</h4>
              <ul class="newslinks">
                {#each mostwatched as watched}
                  <li>
                    <a
                      data-sveltekit-reload
                      href={"/" + watched.completeSlug}
                      title={watched.long_heading}
                      class="py-3 border-b border-gray-300 relative text-base leading-relaxed inline-block"
                      >{watched.long_heading}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/if}
    </section>
    <section class="mainFooterSection">
      <div class="footerRow flexwrap">
        <div class="ftrCol borderRight">
          <ul class="links">
            {#if language === 'B' || language === 'KA'}
            {#each FOOTER_LINKS.filter(link => link.text !== 'Sitemap' && link.text !== 'RSS') as link}
              <li>
                <a
                  target="_self"
                  title={"/" + link?.text}
                  class="text-sm font-medium leading-relaxed text-black py-2 !px-0 inline-block desktop:font-semibold"
                  href={link?.url}>{link?.text}</a>
              </li>
            {/each}
          {:else}
            {#each FOOTER_LINKS as link}
              <li>
                <a
                  target="_self"
                  title={"/" + link.text}
                  class="text-sm font-medium leading-relaxed text-black py-2 !px-0 inline-block desktop:font-semibold"
                  href={link?.url}>{link?.text}</a>
              </li>
            {/each}
          {/if}
          
          </ul>
        </div>
        <div class="ftrCol textCenter borderRight">
          <div class="logosRow">
            <a
              href="https://www.republicworld.com/"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <img
                alt="Footer Img"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/republic-logo-eng.svg"
                decoding="async"
                loading="lazy"
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
              <img
                alt="Republic Bharat Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/republic-logo-bharat.svg"
                decoding="async"
                loading="lazy"
                height={28}
                width={115}
              />
            </a>
            <a
              href="https://www.republicbangla.co.in/"
              target="_blank"
              rel="noreferrer"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <img
                alt="Republic Bangla Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/republic-logo-bangla.svg"
                decoding="async"
                loading="lazy"
                height={28}
                width={97}
              />
            </a>
            <a
              href="https://www.republickannada.co.in/"
              target="_blank"
              rel="noreferrer"
              class="w-2/5 flex items-center justify-center desktop:w-[23%]"
            >
              <img
                alt="R Kannada Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/RKannada_logo.svg"
                decoding="async"
                loading="lazy"
                height={28}
                width={98}
              />
            </a>
          </div>
          <div
            class="w-full flex items-center justify-center py-5 border-b border-[#B10203] desktop:border-0"
          >
            <a href="https://www.republicbiz.com/" target="_blank" rel="noreferrer">
              <img
                alt="Republic Business Logo"
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/rbusiness-logo.svg"
                decoding="async"
                loading="lazy"
                height={70}
                width={60}
              />
            </a>
          </div>
          <div class="socialNav">
            <h5>{FOLLOW_REPUBLIC_ON}</h5>
            <ul class="flexwrap socialLinks">
              {#each (SOCIAL_PLATFORM?.[envDetails?.language] ?? SOCIAL_PLATFORM?.['E']) as platform}
                <li>
                  <a
                    target="_blank"
                    href={platform.url}
                    class="block size-9 mx-3"
                  >
                    <img
                      alt={platform.name + " Footer logo"}
                      src={platform.logo}
                      decoding="async"
                      class="w-full h-auto"
                      loading="lazy"
                      height={platform.height ?? ""}
                      width={platform.width ?? ""}
                    />
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="ftrCol downloadappBlock">
          <h5>{DOWNLOAD_THE_ALL_NEW_REPUBLIC_APP}</h5>
          <div class="downloadLogosRow">
            <a
              href="https://apps.apple.com/in/app/republic-tv/id1326556994"
              target="_blank"
              class="appleLogo"
            >
              <img
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/app-store.svg"
                alt="Republic Apple logo"
                class="w-auto h-auto"
                loading="lazy"
                height={"40px"}
                width={"116px"}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.republicworld&amp;hl=en"
              target="_blank"
              class="googleplayLogo"
            >
              <img
                src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/google-play.svg"
                alt="Republic Play store logo"
                class="w-auto h-auto"
                loading="lazy"
                height={"40px"}
                width={"116px"}
              />
            </a>
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
          <li class:selected={pathname === item.href}>
            {#if item.showHamburger}
                <a
                  href=""
                  class="flex flex-col h-full justify-between items-center"
                  on:click={item.onClick}
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
{#if isOpen}
  <HamburgerModal
    hamburgerData={bottomNavBar}
    language={envDetails?.language}
    {isOpen}
    {setIsOpen}
    {envDetails}
    {device}
  />
{/if}

<style>
  .bgBusiness {
    background: #ffe2c7;
  }

  .bgBusiness div div ul li a {
    color: black;
  }
</style>
