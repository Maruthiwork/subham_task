<script lang="ts">
    // @ts-nocheck
    import { writable } from "svelte/store";
    import Sidebar from "../common/Sidebar/Sidebar.svelte";
    import SEO from "$lib/components/SEO/index.svelte";
    import { fetchBreakingNewsStories } from "../../../routes/api/fetchData";
    import {
        IMAGE_ASPECT_RATIO,
        ImageDimensions,
        generateAspectRatioImageURL,
    } from "../common/HybridImage/Constants";
    import StoryCard from "../common/Republic-Common/StoryCard.svelte";
    import { getHomeTextFromLanguage, getLoadMoreLabel } from "../utils/utils";
    import { TEMPLATE_PROPERTIES } from "../common/StoryCard/Constants";
    import Arrow from "$lib/assets/svg/arrow.svelte";

    // ** Props
    export let breakingNewsData;
    export let trending_stories;
    export let sideBarData;
    export let siteNavigation = [];
    export let device = "desktop";
    export let envDetails;
    export let isAmp = false;
    export let canonicalUrl = '';
    export let language: string = "E";

    // ** Variables
    const aspectRatio = IMAGE_ASPECT_RATIO?.["16_9"]?.key;
    let allStories = [];
    let page = writable(1);
    let { isLastPage, currentPage, data, totalPages, totalData } =
        breakingNewsData;
    let breakingNewsStories = data?.data;
    let pagination = writable(breakingNewsData?.data);

    const handleBreakingPagination = () => {
        page.update((n) => n + 1);
        fetchData(page);
    };
   
    async function fetchData(page: any) {
        try {
            const response = await fetchBreakingNewsStories(language, $page);
            const nextStories = response?.data?.data || [];
            pagination.set(response.data);
            breakingNewsStories = [...breakingNewsStories, ...nextStories];
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
   
    

    const currentDate = new Date().toISOString();

    $: {
        allStories = breakingNewsStories
            .flat()
            .slice(0, 30);
    }

    const breadcrumbs = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name: breakingNewsData?.data?.seoData?.name,
            slug: breakingNewsData?.data?.seoData?.completeSlug,
        },
    ];


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->

<SEO
    lang={language}
    {canonicalUrl}
    pageType={"Category"}
    {breadcrumbs}
    slug={breakingNewsData?.data?.seoData?.completeSlug}
    pathname={'/breaking-news'}
    title={breakingNewsData?.data?.seoData?.meta_title}
    datePublished={currentDate}
    lastUpdated={currentDate}
    keywords={breakingNewsData?.data?.seoData?.meta_keywords}
    metadescription={breakingNewsData?.data?.seoData?.meta_description}
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
    dateCreated={currentDate}
    {siteNavigation}
    story_type={breakingNewsStories?.flat()
    ?.slice(0, 30)}
    
/>
<div class="contentWrapper">
    <div class="flex flex-wrap gap-3">
        <div class="mainArticle w-full desktop:w-[64.66%]">
            <div class="innerLeftBlock">
              
                <div
                    class="text-[#00000080] breadcrumb flex pt-2 pb-5 desktop:pb-0"
                >
                    <a href={`/`}>{getHomeTextFromLanguage(language)}</a>

                    <span class="text-[#00000080] cursor-pointer"
                        >/ Breaking News</span
                    >
                </div>
                <div
                    class="articleHead blackArticleHead debateHead pl-0 pr-0 mb-0 mt-4"
                >
                    <h2 class="cursor-pointer desktop:py-3 {envDetails?.language ==
                    'RB'
                        ? 'text-[22px] tracking-[-0.66px] desktop:text-2xl desktop:tracking-[-0.72px]'
                        : 'text-lg tracking-[-0.36px] desktop:text-xl desktop:tracking-[-0.4px]'}"
                    style="line-height: 120%;{envDetails?.language === "MH" || envDetails?.language === "H" ? "letter-spacing: 0;font-weight: 800;" : "font-weight: 600;"}">Breaking News</h2>
                </div>
                {#if breakingNewsStories?.length > 0}
                    <div
                        class="grid"
                        style="--columns: {2};row-gap:24px;column-gap:0"
                    >
                        {#each breakingNewsStories as story, index}
                            <StoryCard
                                title={story.long_heading}
                                imageUrl={generateAspectRatioImageURL(
                                    story?.images,
                                    ImageDimensions?.[device]?.smallThumbnail,
                                    IMAGE_ASPECT_RATIO[aspectRatio]?.key ??
                                        aspectRatio,
                                )}
                                {envDetails}
                                video={story?.video}
                                storyType={story?.story_type}
                                stickerData={story?.stickerData}
                                alt={story?.images?.versions?.["16_9"]?.alt}
                                category={story.categoryData || ""}
                                time={story.updatedAt}
                                link={story.completeSlug}
                                columns={"1"}
                                cardBgColor={"white"}
                                template={TEMPLATE_PROPERTIES.STORY_CARD.key}
                                template_type={TEMPLATE_PROPERTIES.STORY_CARD
                                    .type.DEFAULT}
                                cardStyle={device === "desktop"
                                    ? "border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: #FCFCFC;padding:16px;"
                                    : ""}
                                bigfontStyle={"font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;"}
                                mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
                                fontStyle="font-size: 18px;font-weight: 600;line-height: 140%;"
                                {isAmp}
                            />
                        {/each}
                    </div>
                {/if}
                {#if !$pagination?.isLastPage}
                    <div class="listingBtns flexwrap justifyCenter">
                        <button
                            class="cursor-pointer solidBtn warmRed"
                            style="display: flex; align-items: center; gap: 10px;"
                            on:click={handleBreakingPagination}
                        >
                            {getLoadMoreLabel(language)}
                            <Arrow />
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        <div class="w-full desktop:w-1/3">
            {#if trending_stories && !isAmp}
                <Sidebar
                    sideBarData={trending_stories}
                    sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.category}
                    sidebar1={envDetails.adsFile.Desktop.SIDEBAR1.category}
                />
            {/if}
        </div>
    </div>
</div>

<style>
    .breadcrumb ul {
        display: flex;
        gap: 4px;
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

    .solidBtn {
        border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        -ms-border-radius: 4px;
        -o-border-radius: 4px;
        padding: 8px 28px 8px 16px;
        display: inline-block;
        transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
        font-size: var(--font16);
        line-height: 1;
        font-weight: 600;
        position: relative;
    }
    .solidBtn span {
        margin-left: 4px;
        position: relative;
        right: 0;
        transition: all 0.4s ease;
        top: 1px;
        -webkit-animation: forwordsArrow 3s infinite;
        animation: forwordsArrow 3s infinite;
        opacity: 0;
    }
    .solidBtn:hover span {
        right: -3px;
    }
    .solidBtn span img {
        display: inline-block;
    }
    .warmRed {
        color: var(--white);
        background: var(--darkred);
        border-top: 1px solid var(--darkshadow);
        border-right: 3.5px solid var(--darkshadow);
        border-bottom: 3.5px solid var(--darkshadow);
        border-left: 1px solid var(--darkshadow);
    }
    .solidBtn:hover {
        opacity: 0.7;
    }
    .shareBtn button {
        border: none;
        background: none;
        line-height: 1;
    }
    .solidBtn,
    .cardHorizontalContent {
        position: relative;
    }
    .solidBtn:after {
        position: absolute;
        content: "";
        right: 10px;
        width: 9px;
        height: 13px;
        top: 54%;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 2;
        transform: translateY(-50%);
        transition: all 0.4s ease;
        animation: forwordsArrow 3s infinite;
        opacity: 0;
    }
    @media screen and (max-width: 680px) {
    .breadcrumb ul li {
      font-size: 12px;
    }
  }
</style>
