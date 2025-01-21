<script>
    // @ts-nocheck
    import {
        TEMPLATE,
        TEMPLATE_PROPERTIES,
    } from "../common/StoryCard/Constants";
    import SEO from "$lib/components/SEO/index.svelte";
    import RFrame from "$lib/assets/images/R-frame.svg";
    import {
        getHomeTextFromLanguage,
        getViewMoreLabel,
        loadMgidScript,
        useIntersectionObserver,
    } from "../utils/utils";
    import CategorySection from "./CategorySection.svelte";
    import Arrow from "$lib/assets/svg/arrow.svelte";
    import Divider from "../common/Republic-Common/Divider.svelte";
    import AmpCategorySection from "./AmpCategorySection.svelte";
    import { EnvironmentConfig } from "../utils/environmentConfig";
    import MenuList from "../common/MenuListing/MenuList.svelte";
    import StoryCard from "../common/Republic-Common/StoryCard.svelte";
    import {
        generateAspectRatioImageURL,
        IMAGE_ASPECT_RATIO,
    } from "../common/HybridImage/Constants";

    // ** Props
    export let categoryDetails;
    export let device = "desktop";
    export let language = "E";
    export let envDetails = {};
    export let canonicalUrl = "";
    export let isAmp = false;
    export let pathname = "";
    export let nextStoryUrl = "";
    export let getParentCategory = [];
    export let gainerAndLoosersData = null;
    export let marketData = null;

    let allStories = [];
    $: pagination = { pageNo: 1, pageSize: 10, isLastPage: false };

    $: categoryMenu = [
        {
            _id: "",
            name: "All",
            parentId: "",
            level: 2,
            frontend_name: "All",
            color_code: "#D10014",
            font_color: "#ffffff",
            slug: `${categoryDetails?.category?.slug}`,
            completeSlug: `${categoryDetails?.category?.completeSlug}`,
        },
        ...categoryDetails?.menu,
    ];

    $: categoryInfo = categoryDetails?.category;
    $: categoryGrids = categoryDetails?.widgetinfo ?? [];
    $: breadcrumbList = categoryDetails?.breadcrumb ?? [];

    $: categoryPageWidgets =
    language == 'RB' && isAmp
        ? categoryGrids
        : categoryGrids?.length >= 5
        ? [categoryGrids?.[0], categoryGrids?.[1]]
        : categoryGrids;


    const breadcrumbs = [
        {
            name: "Home",
            slug: `${isAmp ? "/amp" : ""}/`,
        },
        {
            name:
                categoryDetails?.category?.frontend_name ||
                categoryDetails?.category?.name,
            slug: categoryDetails?.category?.completeSlug,
        },
    ];

    const now = new Date();

const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();

const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();




    let breadcrumbSegments = [
        {
            name:
                categoryDetails?.category?.frontend_name ??
                categoryDetails?.category?.name,
            slug: categoryDetails?.category?.completeSlug,
        },
    ];

    // Check if storyData.completeSlug exists and split it
 
    const viewmorebtnaction = () => {
        categoryPageWidgets = [...categoryGrids];
    };

  
    useIntersectionObserver("viewmorebtn", 0.1, viewmorebtnaction);

    $: {
        allStories = categoryPageWidgets
            .map((section) =>
                section?.story?.map((storyItem) => storyItem?.story).flat(),
            )
            .flat()
            .slice(0, 30);
    }

    const addStories = (oldStories, newStories, gridIndex, widgetIndex) => {
        categoryPageWidgets[gridIndex].story[widgetIndex].story = [
            ...oldStories,
            ...newStories,
        ];

        pagination = {
            ...pagination,
            pageNo: pagination?.pageNo + 1,
        };
    };

    // ** Scroll Event Listener to Load MGID Script
    const SCROLL_THRESHOLD = 500; // Replace with the desired scroll height in pixels
    let mgidScriptLoaded = false;

    function handleScroll() {
        if (!mgidScriptLoaded && window.scrollY > SCROLL_THRESHOLD) {
            loadMgidScript(envDetails?.language);
            mgidScriptLoaded = true;
            window.removeEventListener("scroll", handleScroll);
        }
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
    }

    const HybridCategorySection = isAmp ? AmpCategorySection : CategorySection;

</script>

<SEO
    lang={language}
    {canonicalUrl}
    pageType={"Category"}
    {breadcrumbs}
    slug={categoryDetails?.category?.completeSlug}
    title={categoryDetails?.category?.meta_title}
    datePublished={startOfDay}
    lastUpdated={endOfDay}
    keywords={categoryDetails?.category?.meta_keywords}
    metadescription={categoryDetails?.category?.meta_description}
    timeToRead={""}
    featuredImage={envDetails?.siteLogo}
    ogImage={envDetails?.siteLogo}
    ogSquareImage={envDetails?.siteLogo}
    twitterImage={envDetails?.siteLogo}
    ogSquareImageSrc={envDetails?.siteLogo}
    ogImageSrc={envDetails?.siteLogo}
    twitterImageSrc={envDetails?.siteLogo}
    featuredImageSrc={envDetails?.siteLogo}
    site_details={envDetails}
    dateCreated={startOfDay}
    story_type={""}
    category={categoryDetails?.category}
    categoryStories={allStories}
    {isAmp}
    {pathname}
    siteNavigation={getParentCategory}
/>

<div class="flex flex-col gap-3">
    <div class="contentWrapper desktop:px-[12px] desktop:py-[8px]">
        {#if categoryInfo?.bannerImage && Object.values(categoryInfo?.bannerImage).length}
            {#if device === "desktop"}
                <img
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + categoryInfo?.bannerImage?.filePath}`}
                    alt={categoryInfo?.bannerImage?.alt}
                    class="my-4"
                    height="100%"
                    width="100%"
                />
            {:else}
                <img
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + categoryInfo?.mobBannerImage?.filePath}`}
                    alt={categoryInfo?.mobBannerImage?.alt}
                    class="my-4"
                    height="100%"
                    width="100%"
                />
            {/if}
        {/if}
        <div class="breadcrumb flex pt-2 pb-5 desktop:pb-0 desktop:px-3">
            <a href={`${isAmp ? "/amp" : ""}/`}
                >{getHomeTextFromLanguage(language)}</a
            >
            <div class="flex">
                {#each breadcrumbList as segment}
                    <span>
                        {#if segment?.completeSlug}
                            <a
                                data-sveltekit-reload
                                href={isAmp
                                    ? "/amp/" + segment?.completeSlug
                                    : "/" + segment?.completeSlug}
                            >
                                {` / ${segment?.frontend_name}`}
                            </a>
                        {:else}
                            <span>{segment?.frontend_name}</span>
                        {/if}
                    </span>
                {/each}
            </div>
        </div>
        <div class="h-full flex flex-col gap-4 desktop:gap-1">
            {#if categoryInfo?.image && Object.values(categoryInfo?.image).length}
                <div class="py-0 desktop:py-4 w-40 desktop:w-44 desktop:px-3">
                    <img
                        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + categoryInfo?.image?.filePath}`}
                        alt="Defence-logo"
                        width="100%"
                        height="100%"
                    />
                </div>
            {:else if categoryInfo?.completeSlug !== "livetv"}
                <h1
                    class="cursor-pointer desktop:p-3 {envDetails?.language ==
                    'RB'
                        ? 'text-[22px] tracking-[-0.66px] desktop:text-2xl desktop:tracking-[-0.72px]'
                        : 'text-lg tracking-[-0.36px] desktop:text-xl desktop:tracking-[-0.4px]'}"
                    style="line-height: 120%;{envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? 'letter-spacing: 0;font-weight: 800;'
                        : 'font-weight: 600;'}"
                >
                    {categoryInfo?.frontend_name}
                </h1>
            {/if}
            <MenuList
                menuList={categoryDetails?.menu}
                {envDetails}
                {categoryMenu}
                {isAmp}
            />
        </div>
    </div>

    {#key categoryPageWidgets}
        <div class="flex flex-wrap">
            {#each categoryPageWidgets as eachWidget, gridIndex}
                {#if eachWidget?.story?.[0]?.story?.length >= 0 || eachWidget?.story?.[0]?.widget?.widgetType === "PIN-EMBED" || eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD || eachWidget?.story?.[0]?.widget?.template === TEMPLATE.LIVE_TV || eachWidget?.template === TEMPLATE.SEO_FOOTER}
                    {#if eachWidget?.bgColor}
                        <section
                            class="w-full"
                            style="background-color:{eachWidget?.bgColor ?? ''}"
                        >
                            <HybridCategorySection
                                {eachWidget}
                                {device}
                                {language}
                                {gridIndex}
                                {envDetails}
                                {categoryInfo}
                                {categoryDetails}
                                {addStories}
                                {pagination}
                                {categoryPageWidgets}
                                {nextStoryUrl}
                                {gainerAndLoosersData}
                                {marketData}
                            />
                        </section>
                    {:else if eachWidget?.dGrid == 3}
                        <section class="w-full">
                            <HybridCategorySection
                                {eachWidget}
                                {device}
                                {language}
                                {gridIndex}
                                {envDetails}
                                {categoryInfo}
                                {categoryDetails}
                                {addStories}
                                {pagination}
                                {categoryPageWidgets}
                                {nextStoryUrl}
                                {gainerAndLoosersData}
                                {marketData}
                            />
                        </section>
                    {:else}
                        <HybridCategorySection
                            {eachWidget}
                            {device}
                            {language}
                            {gridIndex}
                            {envDetails}
                            {categoryInfo}
                            {categoryDetails}
                            {addStories}
                            {pagination}
                            {categoryPageWidgets}
                            {nextStoryUrl}
                            {gainerAndLoosersData}
                            {marketData}
                        />
                    {/if}
                    {#if (device === "desktop" ? eachWidget.dGrid == "3" || gridIndex == 1 : true) && gridIndex !== Object.keys(categoryPageWidgets).length - 1}
                        {#if Divider && eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD ? (eachWidget?.story?.[0]?.widget?.[device === "desktop" ? "webAds" : "mAds"]?.[device === "desktop" ? "webAdId" : "mAdId"] ?? "")?.length > 0 : true}
                            <div class="w-full my-4 {eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD ? "divider-disable" : ""}">
                                <Divider classes={"contentWrapper"} />
                            </div>
                        {/if}
                    {/if}
                {/if}
            {/each}
            {#if !(categoryGrids?.length === Object.keys(categoryPageWidgets)?.length)}
                <div
                    class="w-full flex self-center items-center justify-center"
                >
                    <button
                        id="viewmorebtn"
                        aria-label="Read More"
                        data-sveltekit-reload
                        class="flex items-center gap-2 my-5 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] cursor-pointer"
                        on:click={viewmorebtnaction}
                    >
                        <div class="flex items-center justify-center gap-2">
                            {getViewMoreLabel(language)}
                            <Arrow />
                        </div>
                    </button>
                </div>
            {/if}
        </div>
    {/key}
    <div id="migid-container" />
</div>

<style>
    .breadcrumb a {
        display: flex;
        gap: 4px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: 400;
    }
</style>
