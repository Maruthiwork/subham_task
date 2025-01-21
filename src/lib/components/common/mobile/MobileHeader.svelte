<script lang="ts">
    import { EnvironmentConfig } from "../../utils/environmentConfig.js";
    import type { MEGA_MENU } from "../Header/Types.js";
    import "$lib/assets/styles/header.css";
    import "$lib/assets/styles/style.css";
    import { onDestroy, onMount } from "svelte";
    import RepublicAnchorTag from "../RepublicAnchorTag/RepublicAnchorTag.svelte";
    import { page } from "$app/stores";

    // ** Props
    export let mega_menu: MEGA_MENU;
    export let weatherData: any;
    export let language: string = "E";
    export let nav_bar: any = [];
    export let envDetails;
    export let device = "Desktop";
    let isVisibleNavMenu = $page.url.pathname.includes("/adsunits");
    let selectedChannelList: any = null;
    let HamburgerModal: any;
    let channeldropdownOpen = false;

    function toggleDropdownChannel(event: Event) {
        event.stopPropagation(); // Prevent the click from propagating to the window
        channeldropdownOpen = !channeldropdownOpen;
    }

    function selectChannelList(channel: any) {
        selectedChannelList = channel;
        channeldropdownOpen = false;
    }

    function handleClickOutside(event: Event) {
        const dropdownContent = document.querySelector(".dropdown-content");
        if (
            dropdownContent &&
            !dropdownContent.contains(event.target as Node)
        ) {
            channeldropdownOpen = false;
        }
    }

    let pathname = "";
    let { topNavBar, bottomNavBar } = mega_menu;
    /**
     * @type {string | any[]}
     */
    let isOpen = false;

    function vibrate() {
        if ("vibrate" in navigator) {
            if ("vibrate" in navigator) {
                console.log("Vibration API is supported.");
                let didVibrate = navigator.vibrate(100); // Vibrate for 100 milliseconds
                if (didVibrate) {
                    console.log("Vibration triggered.");
                } else {
                    console.log("Vibration failed.");
                }
            } else {
                console.log("Vibration API is not supported in this browser.");
            }
        }
    }

    function toggleMenu() {
        isOpen = !isOpen;
        vibrate();

        // Lazy load HamburgerModal only when the menu is opened
        if (isOpen && !HamburgerModal) {
            import("../Header/HamburgerModal.svelte").then(modal => {
                HamburgerModal = modal.default;
            });
        }
    }

    function setIsOpen() {
        isOpen = false;
    }
    let header: HTMLElement | null = null;
    let sticky: number;

    const getClassName = (completeSlug: string, pathname: string) => {
        if (completeSlug === pathname) {
            return "redColor";
        }
        return "w-fit contents";
    };

    function handleScroll() {
        const rlogo = document.getElementById("rlogo");

        if (window.pageYOffset > sticky) {
            header?.classList.add("stickyheader");
            rlogo?.classList.remove("rlogo-hide");
        } else {
            header?.classList.remove("stickyheader");
            rlogo?.classList.add("rlogo-hide");
        }
    }

    onMount(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            // const fullRoute = window.location.pathname.replace("/", "");
            // pathname = fullRoute.split("/")?.[0];

            const fullRoute = window.location.pathname;
            pathname = fullRoute.split("/")?.[1];

            // Set up the header element and sticky offset after the DOM is fully loaded
            setTimeout(() => {
                header = document.getElementById("fixedheader");
                if (header) {
                    sticky = header.offsetTop;
                }
            }, 0);

            window.addEventListener("scroll", handleScroll);
        }
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleClickOutside);
            window.removeEventListener("click", handleClickOutside);

            window.removeEventListener("click", handleClickOutside);
        }
    });

    function getLogoClass(language: string) {
        if (language === "E" || language === "H") {
            return "logo-eng-hin";
        } else if (language === "MH" || language === "GJ") {
            return "logo-marathi";
        } else {
            return "";
        }
    }
</script>

<div id="mainHeader">
    <div>
        <div class="isTabletMobile">
            <div
                class="topMainHead"
                id="tophead"
                style={isVisibleNavMenu
                    ? "border-bottom:1px solid rgba(0, 0, 0, 0.16)"
                    : ""}
            >
                <div class="contentWrapper">
                    <div class="topHeader">
                        <div class="headerLogoWrapper">
                            <div class="dropdown-container">
                                <div class="flex items-center gap-3">
                                    <div class="logo {getLogoClass(language)}">
                                        <a data-sveltekit-reload href={`/`}>
                                            <img
                                                alt="Republic Logo"
                                                src={envDetails.siteLogo}
                                                decoding="async"
                                                loading="lazy"
                                                height={envDetails.logoHeight}
                                                width={envDetails.logoWidth}
                                            />
                                        </a>
                                    </div>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div
                                        class="dropdown-button"
                                        on:click={toggleDropdownChannel}
                                    ></div>
                                </div>
                                {#if channeldropdownOpen}
                                    <div
                                        class="dropdown-content"
                                        style="display: {channeldropdownOpen
                                            ? 'block'
                                            : 'none'};background:{envDetails?.bgColor}"
                                    >
                                        {#each envDetails.allDomainList as { name, url }, index}
                                            <a data-sveltekit-reload href={url}>
                                                <div
                                                    style={`color: ${index === 0 ? "#D10014" : "#000"}`}
                                                    class:selected={name ===
                                                        selectedChannelList}
                                                    on:click={() =>
                                                        selectChannelList(name)}
                                                >
                                                    {name}
                                                </div>
                                            </a>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                            <select bind:value={selectedChannelList}>
                                {#each envDetails.allDomainList as { name, url }}
                                    <option value={name}>{name}</option>
                                {/each}
                            </select>
                        </div>
                        {#if envDetails?.language !== "B" && envDetails?.language !== "KA"}
                        <div
                            class="loginBlock flex itemCenter headLeftSec"
                            id="fixedRightMenu"
                        >
                            <button aria-label="Menu" on:click={toggleMenu}>
                                <div class="menuLinkblock">
                                    <span
                                        id="menuToggleicon"
                                        class="menuToggleicon"
                                    ></span>
                                </div>
                            </button>
                            {#if isOpen}
                            {#if HamburgerModal}
                                <HamburgerModal
                                    {setIsOpen}
                                    hamburgerData={bottomNavBar}
                                    {language}
                                    {isOpen}
                                    {envDetails}
                                    {device}
                                />
                            {/if}
                            {/if}
                        </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        {#if !isVisibleNavMenu}
            <div class="isTabletMobile">
                <div
                    style="background-color: {envDetails.navBarBgColor ?? ''};"
                    class="categoriesHeader flexwrap {envDetails?.language !==
                    'RB'
                        ? 'border-t border-gray-300 border-b'
                        : ''}"
                    id="fixedheader"
                >
                    <div class="contentWrapper catNavwrapper flex items-center">
                        <!-- <div class="isMobile">
                            <div class="rlogo">
                                <img
                                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/R.logo.svg`}
                                    loading="lazy"
                                    alt="Republic Logo"
                                />
                            </div>
                        </div> -->
                        {#if nav_bar?.length > 1}
                            <div id="rlogo" class="rlogo rlogo-hide">
                                <img
                                    alt="Republic Logo icon"
                                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/R.logo.svg`}
                                />
                            </div>
                            <div
                                class="flex items-center pb-1 gap-4 overflow-x-auto whitespace-nowrap catNavList"
                            >
                                {#each [...nav_bar] as category}
                                    <div
                                        style={pathname === "" &&
                                    category?.completeSlug === "/"
                                            ? "color: #d10014; font-weight: 600;"
                                            : ""}
                                    >
                                        <div class="flex">
                                            <div
                                                class="flex justify-center items-center"
                                            >
                                                {#if category?.icon?.length > 0}
                                                    <img
                                                        class="playicon"
                                                        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.icon}`}
                                                        alt="play-icon"
                                                        width={16}
                                                        height={16}
                                                    />
                                                {/if}
                                                <RepublicAnchorTag
                                                    completeSlug={category?.completeSlug}
                                                    title={category?.frontend_name}
                                                    classes={`${category?.completeSlug === pathname ? "font-semibold text-[#D10014]" : ""}`}
                                                    style={envDetails?.language ===
                                                        "MH" ||
                                                    envDetails?.language === "H"
                                                        ? `font-family:${envDetails?.secondaryFont};font-size: 16px;font-weight:600`
                                                        : `font-family-${envDetails?.primaryFont}`}
                                                >
                                                    {category?.frontend_name}
                                                </RepublicAnchorTag>
                                                {#if category?.badge?.length > 0}
                                                    <sup>
                                                        <img
                                                            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.badge}`}
                                                            class="playicon pl-1"
                                                            alt="new-icon"
                                                            height="15px"
                                                            width="30px"
                                                        />
                                                    </sup>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    sup {
        top: 0px;
    }
    @media (max-width: 767px) {
        #fixedheader .isMobile {
            display: none;
        }

        .rlogo-hide {
            display: none;
        }

        .rlogo {
            position: relative;
            aspect-ratio: 1/1;
            width: 170px;
            margin-right: 8px;
        }

        .rlogo img {
            position: relative !important;
        }
        .dropdown-button {
            content: "";
            background: url($lib/assets/images/arrow-down.svg) no-repeat 50%;
            width: 16px;
            height: 16px;
            transition: all 0.2s linear;
            transform: rotate(0);
        }
        .dropdown-content {
            position: absolute;
            min-width: max-content;
            z-index: 9;
            border-radius: 2px;
            border: 1px solid var(--Strock, rgba(0, 0, 0, 0.16));
            right: 20%;
            padding: 12px;
        }
        .dropdown-content div.selected {
            color: #d10014;
        }
        .dropdown-content a:first-child div {
            padding-top: 0px;
        }
        .dropdown-content a:last-child div {
            border-bottom: none;
            padding-bottom: 0px;
        }
        .dropdown-content div {
            padding: 10px 0px;
            cursor: pointer;
            border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        }

        .dropdown-content div:hover {
            background-color: #f1f1f1;
        }

        /* Hide the native select tag */
        select {
            display: none;
        }
    }

    @media (max-width: 767px) {
        #fixedheader.fixedcathead .isMobile {
            display: block;
        }
    }
    .active {
        order: -1 !important;
    }

    .redColor {
        color: #d10014;
        font-weight: 600;
    }

    .veryFirst {
        order: -2 !important;
    }

    #hb-notify {
        display: grid;
        grid-template-columns: 1fr 4fr 3fr;
        column-gap: 8px;
        align-items: center;
        justify-items: center;
        align-self: center;
        height: 36px;
        margin: 0 auto;
    }

    @media screen and (max-width: 767px) {
        .catNavList {
            font-size: 16px;
            font-weight: 500;
        }
        .playicon {
            margin-right: 4px;
            max-width: fit-content;
        }
    }
</style>
