<script lang="ts">
    //@ts-nocheck
    import {
        IMAGE_ASPECT_RATIO,
        generateAspectRatioImageURL,
        imageDimensionProperty,
    } from "../common/HybridImage/Constants";
    import Divider from "../common/Republic-Common/Divider.svelte";
    import StoryCard from "../common/Republic-Common/StoryCard.svelte";
    import Sidebar from "../common/Sidebar/Sidebar.svelte";
    import { EnvironmentConfig } from "../utils/environmentConfig";
    import {
        getHomeTextFromLanguage,
        loadMgidScript,
        useIntersectionObserver,
    } from "../utils/utils";
    import { TEMPLATE_PROPERTIES } from "../common/StoryCard/Constants";
    import SEO from "$lib/components/SEO/index.svelte";

    export let search_bar_data: any; // Use a prop to make the variable reactive
    export let sideBarData: any;
    export let device = "desktop";
    export let language = "E";
    export let envDetails;
    export let searchSlug: string = "";
    export let siteNavigation: any = [];

    let searchInput = searchSlug;
    let selectedCategory = "all";
    let search_stories_list: any = [];
    let searchMenu = search_bar_data?.menu || [];
    let searchParam: string = "";
    let isListeing = false;
    let seoData = search_bar_data?.seoData;
    let allStories = search_bar_data?.data?.data;

    let isSearchOpen = false;
    let searchQuery = "";
    $: search_stories_list = search_bar_data?.data?.data;
   
    const aspectRatio = IMAGE_ASPECT_RATIO?.["16_9"]?.key;
    const currentDate = new Date().toISOString();
   
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
                        <a class="voiceLink" href="#"
                            ><img
                                alt="Search icon"
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/search.svg`}
                                decoding="async"
                            /></a
                        >
                        <div class="searchInputBox">
                        <form data-initialize-from-url method="get" action="/amp/search" target="_top">
                            <input
                                type="text"
                                name="query"
                                bind:value={searchInput}
                                placeholder="Search..."
                                class="searchInput"
                                required
                                data-allow-initialization
                            />
                        </form>
                    </div>
                    </div>
                    <div class="topresult">
                        <p>
                            Top Result For: <span class="text-black"
                                >{searchSlug}</span
                            >
                        </p>
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
                                    isAmp={true}
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
                    isAmp={true}
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
