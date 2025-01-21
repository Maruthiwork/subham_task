<script lang="ts">
    //@ts-nocheck
    import { scale } from "svelte/transition";
    import { quadOut } from "svelte/easing";
    import closeIcon from "$lib/assets/images/close.svg";
    import SearchModal from "./SearchModal.svelte";
    import SpeechRecognition, {
        useSpeechRecognition,
    } from "svelte-speech-recognition/SpeechRecognition";
    import { onMount } from "svelte";
    import { fetchTrendingBar } from "../../../../routes/api/fetchData";
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import {
        DOWNLOAD_THE_ALL_NEW_REPUBLIC_APP,
        FOOTER_LINKS,
    } from "../../../components/common/Footer/Constants";
    import ChannelDropDown from "../Republic-Common/ChannelDropDown.svelte";
    import Divider from "../Republic-Common/Divider.svelte";

    // ** Props
    export let isOpen = true; // Set initial state of the modal
    export let hamburgerData;
    export let language = "E";
    export let setIsOpen: any;
    export let envDetails = {};
    export let device = "desktop";

    let trendingbarData: any = [];
    let activeIndex = null;
    let isSearchOpen = false;
    let searchQuery = ""; // Variable to store the value of the search input field
    let isListeing = false;


    onMount(() => {
        fetchData();
        if (isOpen) {
            document.body.classList.add("modal-open");
        }
    });

    async function fetchData() {
        try {
            const pageType = "PAGE";
            const response = await fetchTrendingBar(language, pageType, "");
            // Update search_stories_list reactively using the reactive assignment operator '='
            trendingbarData = response?.data?.data?.trendingbar;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function handleClose() {
        isOpen = false; // Update isOpen to close the modal
        document.body.classList.remove("modal-open");
        if (setIsOpen) {
            setIsOpen();
        }
    }

    function handleAccordionClick(index) {
        if (activeIndex === index) {
            activeIndex = null;
        } else {
            activeIndex = index;
        }
    }

    let { resetTranscript, transcriptStore } = useSpeechRecognition({
        lang: "en-US",
    });

    function handleChildItemClick() {
        // Close the dropdown when a child item is clicked
        activeIndex = null;
    }

    function handleSearchInputChange(event) {
        resetTranscript();
        searchQuery = event.target.value;
        isSearchOpen = true;
    }

    $: {
        if ($transcriptStore.finalTranscript?.length > 0) {
            searchQuery = $transcriptStore.finalTranscript;
            isSearchOpen = true;
            isListeing = false;
            performSearch();
        }
    }

    const onVoiceClick = () => {
        if (isListeing) {
            SpeechRecognition.stopListening();
            isListeing = false;
            isSearchOpen = true;
        } else {
            isListeing = true;
            SpeechRecognition.startListening({ continuous: false });
            isSearchOpen = true;
        }
    };

    const onKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value) {
        searchQuery = e.target.value;
        isSearchOpen = true;
        isListeing = false;

        performSearch();
    }
};

    function performSearch() {
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/search?query=${encodeURIComponent(searchQuery)}`;
    }

</script>

<div
    class={`hamburgerLayout cursor-pointer ${isOpen ? "" : "hidden"}`}
>
    <div
        class="menuBox px-6 py-4"
        style="background-color: {envDetails?.bgColor ?? ''};"
    >
        <div class="px-5 py-1 mb-4 flex justify-end" on:click={handleClose}>
            <img
                src={closeIcon}
                height="28px"
                width="28px"
                alt="close-button"
            />
        </div>
        <div>
            {#if device === "mobile"}
                <ChannelDropDown {envDetails} />
            {/if}
            <div class="pb-2">
                <span class="text-base font-semibold">Search</span>
            </div>
            <div class="searchField">
                <a class="voiceLink" href="javascript:void(0)" on:click={performSearch}
                    ><img
                        alt="Search icon"
                        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/search.svg`}
                        decoding="async"
                    /></a
                >
                <div class="searchInputBox">
                    <input
                        type="text"
                        class={isListeing
                            ? "closeIcon searchInput"
                            : "voiceIcon searchInput"}
                        placeholder="Search"
                        value={searchQuery}
                        on:input={handleSearchInputChange}
                        on:keypress={onKeyPress}
                    />
                    <div
                        class="searchIconOverlay"
                        on:click={onVoiceClick}
                    ></div>
                </div>
                {#if isSearchOpen}
                    <SearchModal {searchQuery} {isSearchOpen} {language} />
                {/if}
            </div>
        </div>
        <Divider classes={"my-5"} />
        {#if trendingbarData?.length > 0}
            <div class="menuTrendingblock">
                <h5 class="text-base font-semibold text-[#D10014] mb-3">
                    Trending
                </h5>
                <ul class="menuTrendingList flex flex-wrap pb-1">
                    {#each trendingbarData as trendingkeyWord}
                        <li>
                            <a
                                data-sveltekit-reload
                                href={trendingkeyWord?.url}
                                class="flex items-center h-8 ellipsisHB trendingkeyword"
                                >{trendingkeyWord?.keyword}</a
                            >
                        </li>
                    {/each}
                </ul>
            </div>
            <Divider classes={"my-5"} />
        {/if}

        <div class="menuBlock">
            {#each hamburgerData as menuItem, index}
                <div
                    class="menuBlockitem {menuItem.child?.category.length !== 0
                        ? 'dropdownmenu'
                        : ''}"
                >
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <h5
                        class:active={activeIndex === index}
                        on:click={() => handleAccordionClick(index)}
                    >
                        <a
                            style={envDetails?.language === "MH" ||
                            envDetails?.language === "H"
                                ? "align-items:flex-start"
                                : "align-items:center"}
                            class="capitalize flex flex-row items-center gap-2"
                            data-sveltekit-reload
                            href={`/${menuItem?.l1?.completeSlug}`}
                        >
                            {menuItem?.l1?.name}
                            {#if menuItem?.l1?.completeSlug === "livetv"}
                                <span class="w-4"
                                    ><img
                                        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/live_tv.svg`}
                                        alt="play-icon"
                                        width={16}
                                        height={16}
                                    /></span
                                >
                            {:else if menuItem?.l1?.completeSlug === "videos"}
                                <span class="w-4"
                                    ><img
                                        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/Play.svg`}
                                        alt="play-icon"
                                        width={16}
                                        height={16}
                                    /></span
                                >
                            {:else if menuItem?.l1?.completeSlug === "shorts"}
                                <span class="w-4"
                                    ><img
                                        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/shorts.svg`}
                                        alt="play-icon"
                                        width={16}
                                        height={16}
                                    /></span
                                >
                            {/if}
                        </a>
                    </h5>
                    {#if activeIndex === index && menuItem.child?.category.length > 0}
                        <ul class="navList">
                            {#if menuItem.child.category?.length > 0}
                                {#each menuItem.child.category.slice(0, 6) as item, i}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                    <li on:click={handleChildItemClick}>
                                        <a
                                            class="capitalize"
                                            data-sveltekit-reload
                                            href={`/${item.completeSlug}`}
                                            >{item.name}</a
                                        >
                                    </li>
                                {/each}
                            {/if}
                            <li>
                                <a
                                    data-sveltekit-reload
                                    style="color: #D10014;font-size:14px;font-weight:600;text-decoration:underline;"
                                    href={`/${menuItem.l1.completeSlug}`}
                                >
                                    More
                                </a>
                            </li>
                        </ul>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="ftrCol">
            <ul class="links">
                {#if language === "B" || language === "KA"}
                    {#each FOOTER_LINKS.filter((link) => link.text !== "Sitemap" && link.text !== "RSS") as link}
                        <li>
                            <a
                                target="_self"
                                title={"/" + link.text}
                                class="text-sm font-medium leading-relaxed text-black py-2 !px-0 inline-block desktop:font-semibold"
                                href={link.url}>{link.text}</a
                            >
                        </li>
                    {/each}
                {:else}
                    {#each FOOTER_LINKS as link}
                        <li>
                            <a
                                target="_self"
                                title={"/" + link.text}
                                class="text-sm font-medium leading-relaxed text-black py-2 !px-0 inline-block desktop:font-semibold"
                                href={link.url}>{link.text}</a
                            >
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
        <div class="ftrCol flex flex-col justify-center items-center m-2">
            <h5>{DOWNLOAD_THE_ALL_NEW_REPUBLIC_APP}</h5>
            <div class="flex">
                <a
                    href="https://apps.apple.com/in/app/republic-tv/id1326556994"
                    target="_blank"
                    class=""
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
</div>

<hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />

<style>
    .ellipsisHB {
        display: inline-block;
        max-width: 30ch; /* Limits the width to 30 characters */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .hamburgerLayout {
        background: rgba(0, 0, 0, 0.35);
        width: 100%;
        height: 100%;
        z-index: 999999;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.8s ease-in-out 0s;
        display: inline-block;
        transform: translate(-50%, -50%);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        max-height: 100vh;
    }

    .menuBox {
        z-index: 999999;
        position: relative;
        right: 0;
        top: 0;
        transition: all 0.8s ease-in-out 0s;
        display: inline-block;
        width: 360px;
        float: right;
    }
    .menuBox .ftrCol {
        border-bottom: none;
    }
    p {
        cursor: pointer;
        width: max-content;
        margin: 1rem auto;
    }
    p:hover {
        text-decoration: underline;
    }
    .searchInput {
        background-color: inherit;
        background-position: right 11px center;
        background-repeat: no-repeat;
        border: 1px solid rgba(0, 0, 0, 0.16);
        height: 40px;
        line-height: 1;
        padding: 6px 50px;
        border-radius: 24px;
        outline: none;
        box-shadow: none;
        font-size: var(--font14);
        letter-spacing: 0.25px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        width: 100%;
        margin-bottom: 12px;
    }

    .voiceIcon {
        background-image: url("$lib/assets/images/voice-icon.svg");
        background-size: 15px;
    }
    .closeIcon {
        background-image: url("$lib/assets/images/close.svg");
    }
    .searchField .voiceLink {
        position: absolute;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 2;
        margin: 6px 8px 8px 8px;
    }
    .searchField {
        width: 100%;
    }
    .menuTrendingList li a {
        background-color: #ffdbdb;
        border-radius: 18px;
        font-size: 16px;
        line-height: 1;
        font-weight: 400;
        color: var(--black);
        padding: 6px 12px;
        display: flex;
        align-items: center;
        vertical-align: top;
        transition: all 0.4s ease;
        white-space: nowrap;
    }
    .menuTrendingList li {
        margin: 5px 12px 5px 0;
    }
    .menuBlock .menuBlockitem {
        width: 100%;
    }
    .menuBlock h5 {
        line-height: 20px;
        padding: 14px 0;
        position: relative;
        border-bottom: 1px solid #e5e5e5;
    }
    .dropdownmenu h5:before {
        content: "";
        background: url("$lib/assets/images/arrow-down.svg") no-repeat 50%;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 19px;
        right: 8px;
        transition: all 0.2s linear;
        transform: rotate(0);
    }

    .searchInputBox {
        position: relative;
    }
    .searchIconOverlay {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
        background: transparent;
        margin-left: 85%;
    }
</style>
