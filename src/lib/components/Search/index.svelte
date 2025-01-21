<script lang="ts">
    //@ts-nocheck
    import { onMount } from "svelte";
    import { fetchSearchList } from "../../../routes/api/fetchData";
    import {
        IMAGE_ASPECT_RATIO,
        generateAspectRatioImageURL,
        imageDimensionProperty,
    } from "../common/HybridImage/Constants";
    import Divider from "../common/Republic-Common/Divider.svelte";
    import StoryCard from "../common/Republic-Common/StoryCard.svelte";
    import Sidebar from "../common/Sidebar/Sidebar.svelte";
    import { EnvironmentConfig } from "../utils/environmentConfig";
    import SpeechRecognition, {
        useSpeechRecognition,
    } from "svelte-speech-recognition/SpeechRecognition";
    import {
        getHomeTextFromLanguage,
        getViewMoreLabel,
        loadMgidScript,
        useIntersectionObserver,
    } from "../utils/utils";
    import { TEMPLATE_PROPERTIES } from "../common/StoryCard/Constants";
    import SEO from "$lib/components/SEO/index.svelte";
    import Arrow from "$lib/assets/svg/arrow.svelte";

    export let search_bar_data: any; // Use a prop to make the variable reactive
    export let sideBarData: any;
    export let device = "desktop";
    export let language = "E";
    export let envDetails;
    export let siteNavigation = [];
    export let searchSlug: string = "";

    let selectedCategory = "all";
    let search_stories_list: any = [];
    let searchMenu = search_bar_data?.menu || [];
    let searchParam: string = "";
    let isListeing = false;
    let seoData = search_bar_data?.seoData;
    let allStories = search_bar_data?.data?.data;
    let isLastPage = search_bar_data?.data?.data?.isLastPage  || false;
    let page =  search_bar_data?.data?.data?.page || 1;
    let pageSize = search_bar_data?.data?.data?.pageSize || 10;
    $: loading = false;


    let isSearchOpen = false;
    let searchQuery = "";
    $: search_stories_list = search_bar_data?.data?.data;
    const handleWidgetClick = async (slug: any) => {
        selectedCategory = slug;
        await fetchData();
    };

    let { resetTranscript, transcriptStore } = useSpeechRecognition({
        lang: "en-US",
    });

    onMount(fetchData); // Fetch data when component mounts

    async function fetchData(page = 1, pageSize = 10) {
        const params = new URLSearchParams(window.location.search);
        searchParam = params.get("query") || "";
        if (searchParam) {
            try {
                const response = await fetchSearchList(
                    language,
                    searchParam,
                    page,
                    pageSize,
                    selectedCategory.toUpperCase(),
                );
                // Update the search results reactively
                search_stories_list = response?.data?.data?.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }

    const loadMore = async () => {
        loading = true;
        page = page + 1;
        const response = await fetchSearchList(
            language,
            searchParam,
            page,
            pageSize,
            selectedCategory.toUpperCase(),
        );
        loading = false;
        return response?.data?.data;
    };


    const aspectRatio = IMAGE_ASPECT_RATIO?.["16_9"]?.key;
    const currentDate = new Date().toISOString();
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
        }
    }

    const onVoiceClick = () => {
        if (isListeing) {
            SpeechRecognition.stopListening();
            isListeing = false;
        } else {
            isListeing = true;
            SpeechRecognition.startListening({ continuous: false });
            searchParam = $transcriptStore.finalTranscript;
            isSearchOpen = !isSearchOpen;
        }
    };


    const onKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value) { 
        searchQuery = e.target.value; 
        isSearchOpen = true; 
        isListeing = false; 

        // Update the query parameter in the URL
        const url = new URL(window.location.href);
        url.searchParams.set("query", searchQuery);
        window.history.replaceState(null, "", url);

        // Fetch data dynamically based on the new query
        fetchData();
    }
};
function performSearch() {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/search?query=${encodeURIComponent(searchQuery)}`;
  }

    const breadcrumbs = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name:"Search",
            slug: '/search',
        },
    ];

    useIntersectionObserver("migid-container", 0.1, () => loadMgidScript(envDetails?.language));
    
</script>


  <SEO
  lang={language}
  pageType={"Category"}
  {breadcrumbs}
  pathname={`/search/?query=${searchSlug}`}
  title={seoData?.meta_title ?? 'Republic Search Page'}
  metadescription={seoData?.meta_description ?? 'Republic Search Page'}
  keywords={seoData?.meta_keywords ?? 'Republic Search Page'}
  site_details={envDetails}
  featuredImage={envDetails?.siteLogo}
  ogImage={envDetails?.siteLogo}
  ogSquareImage={envDetails?.siteLogo}
  twitterImage={envDetails?.siteLogo}
  ogSquareImageSrc={envDetails?.siteLogo}
  ogImageSrc={envDetails?.siteLogo}
  twitterImageSrc={envDetails?.siteLogo}
  featuredImageSrc={envDetails?.siteLogo}
  datePublished={currentDate}
  lastUpdated={currentDate}
  dateCreated={currentDate}
  {siteNavigation}
/>
<div class="contentWrapper">
    <div class="flex flex-wrap gap-5">
        <div
            class="mainArticle"
            style={device === "mobile" ? "width:100%;" : "width:64.66%"}
        >
            <div class="innerLeftBlock">
                <div class="breadcrumb my-3">
                    <ul>
                        <li>
                            <a href="/">
                                {getHomeTextFromLanguage(language)} /
                            </a>
                        </li>
                        <li>Search</li>
                        <li>
                            <!-- <p>{details?.[0]?.name}</p> -->
                        </li>
                    </ul>
                </div>
                <div class="desktop:p-3 border-gray-300 mb-8 h-max desktop:border ">
                    <div class="searchField mb-4">
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
                                name=""
                                class={isListeing
                                    ? "closeIcon searchInput"
                                    : "voiceIcon searchInput"}
                                placeholder="Search"
                                value={searchParam}
                                on:input={handleSearchInputChange}
                                on:keypress={onKeyPress}
                            />
                            <div
                                class="searchIconOverlay"
                                on:click={onVoiceClick}
                            ></div>
                        </div>
                    </div>
                    <div class="topresult">
                        <p>
                            Top Result For: <span class="text-black"
                                >{searchParam}</span
                            >
                        </p>
                    </div>
                    <div class="videosCategoriesList flex overflow-auto mb-5 gap-4">
                        {#each searchMenu as item}
                            <button
                                aria-label="Button Click"
                                on:click={() => handleWidgetClick(item.slug)}
                            >
                                <p
                                    class="font-normal rounded-[18px] px-4 py-3 text-base h-9 w-auto flex justify-center items-center"
                                    style="background-color: {selectedCategory ===
                                    item?.slug
                                        ? '#D10014'
                                        : '#E4E4E4'} ;color: {selectedCategory ===
                                    item?.slug
                                        ? '#FFFFFF'
                                        : '#000000'}"
                                >
                                    {item.name}
                                </p>
                            </button>
                        {/each}
                    </div>
    
                    {#if search_stories_list?.length > 0}
                        <div
                            class="grid gap-4 desktop:gap-6"
                            style="--columns: {2};column-gap:0;"
                        >
                            {#each search_stories_list as story, index}
                                <StoryCard
                                    title={story.long_heading}
                                    imageUrl={generateAspectRatioImageURL(
                                        story?.images,
                                        imageDimensionProperty?.[device]
                                            ?.aspectVideo?.xsImage,
                                        IMAGE_ASPECT_RATIO[aspectRatio]?.key ??
                                            aspectRatio,
                                    )}
                                    columns={"1"}
                                    cardBgColor={device === "desktop" &&
                                    language !== "RB"
                                        ? "#fff"
                                        : ""}
                                    template={TEMPLATE_PROPERTIES.STORY_CARD.key}
                                    template_type={TEMPLATE_PROPERTIES.STORY_CARD
                                        .type.DEFAULT}
                                    cardStyle={device === "desktop"
                                        ? language !== "RB"
                                            ? "border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: #FCFCFC;padding:16px;"
                                            : "border-radius: 4px;padding:16px;"
                                        : ""}
                                    bigfontStyle={"font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;"}
                                    mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
                                    {envDetails}
                                    video={story?.video}
                                    storyType={story?.story_type}
                                    stickerData={story?.stickerData}
                                    alt={story?.images?.versions?.["16_9"]?.alt ||
                                        "story_img"}
                                    category={story.categoryData ||
                                        story.categoryDetails ||
                                        story.category_id ||
                                        ""}
                                    time={story.updatedAt}
                                    link={story.completeSlug}
                                    fontStyle={"font-size: 18px;font-weight: 600;line-height: 140%;"}
                                />
    
                                {#if (device === "mobile" || device === "desktop") && language === 'RB' && (index + 1) % 1 === 0 && index !== search_stories_list.length - 1}
                                    <Divider style="grid-column: 1 / -1;" />
                                {/if}
                            {/each}
                        </div>
                        {#if !isLastPage}
                        <div class="w-full flex items-center justify-center my-5">
                          <button
                            aria-label="Load More"
                            disabled={loading}
                            class={`flex items-center gap-2 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] ${loading ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer"}`}
                            on:click={async () => {
                            const searchData = await loadMore();
                            console.log("searchData", searchData);
                            search_stories_list = [
                                ...search_stories_list,
                                ...searchData?.data,
                            ]; 
                            }}
                          >
                            {#if loading}
                              ...
                            {:else}
                              <div class="flex items-center justify-center gap-2">
                                {getViewMoreLabel(language)}
                                <Arrow />
                              </div>
                            {/if}
                          </button>
                        </div>
                      {/if}
                    {:else}
                    <div class="text-center text-2xl font-semibold py-8">Result Not Found</div>
                    {/if}
                </div>
            </div>
        </div>
        {#if device === "mobile"}
            <Divider classes={"my-1"} />
        {/if}
        <div style={device === "mobile" ? "width:100%;" : "width:31.33%"}>
            {#if sideBarData}
                <Sidebar
                    {envDetails}
                    {sideBarData}
                    sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
                    sidebar1={envDetails.adsFile.Desktop.SIDEBAR1.category}
                    {device}
                    {language}
                />
            {/if}
        </div>
    </div>
  
    {#if device === "mobile"}
        <Divider classes={"my-3"} />
    {/if}
    <div id="migid-container" />
</div>

<style>
    .breadcrumb ul {
        display: flex;
        gap: 4px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: 400;
    }

    .articleHead.mainPagehead {
        margin-bottom: 20px;
        padding: 0;
    }

    .articleHead,
    .articleHead h2 {
        display: flex;
        align-items: center;
    }

    .articleHead {
        justify-content: space-between;
        margin-bottom: 16px;
        width: 100%;
    }
    .searchInput {
        background-color: #fff;
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
    }

    .voiceIcon {
        background-image: url("$lib/assets/images/voice-icon.svg");
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
    }
    .searchField .voiceLink img {
        margin-left: 12px;
        margin-top: 12px;
    }
    .searchField {
        width: 100%;
    }
    .topresult p {
        padding-bottom: 20px;
        color: #888;
        font-size: 18px;
    }

    .searchInputBox {
        position: relative;
    }
    .searchIconOverlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
        background: transparent;
        margin-left: 93%;
    }
    @media screen and (max-width: 680px) {
        .breadcrumb ul li {
            font-size: 12px;
        }
    }
</style>
