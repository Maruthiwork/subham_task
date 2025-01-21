<script lang="ts">
    import { EnvironmentConfig } from "../utils/environmentConfig";
    import type { AdSlotUsage, StoryDetails } from "./Types";
    import {
        getHomeTextFromLanguage,
        getTemplate,
        getTemplateType,
        timeToRead,
    } from "../utils/utils";
    import DisplayAd from "../common/DisplayAd/DisplayAd.svelte";
    import Card from "../common/Republic-Common/Card.svelte";
    import TopSection from "../common/TopSection/TopSection.svelte";
    import SocialSharing from "../common/SocialSharing/SocialSharing.svelte";
    import AmpRegularStory from "../common/StoryCard/AmpRegularStory.svelte";
    import AmpGalleryCard from "../common/GalleryCard/AmpGalleryCard.svelte";
    import AmpDeepFocusCard from "../common/DeepFocusCard/AmpDeepFocusCard.svelte";
    import AmpLiveBlogCard from "../common/LiveBlogCard/AmpLiveBlogCard.svelte";
    import SEO from "$lib/components/SEO/index.svelte";
    import { onMount } from "svelte";
    import "../../../story.css";
    import FloatAd from "../common/FloatAd/FloatAd.svelte";
    import Sidebar from "../common/Sidebar/Sidebar.svelte";
    import CardHeader from "../common/Republic-Common/CardHeader.svelte";
    import { TEMPLATE } from "../common/StoryCard/Constants";
    import LivetvPlayer from "../common/LiveTvPlayer/LivetvPlayer.svelte";

    // ** Props
    export let storyDetails: StoryDetails;
    export let device: "desktop" | "mobile" = "desktop";
    export let language: string = "E";
    export let envDetails: any = {};
    export let descriptionContent;
    export let canonicalUrl: string = "";
    export let pathname: string = "";
    export let isAmp: boolean = true;
    export let sharePlatforms: any = [];
    export let siteNavigation: any = [];
    export let rightSideBar: any = {};
    export let sideBarData: any;
    let storyNotIncludes = ['VIDEO', 'SHOW', 'DEBATE'];

    // ** Variables
    const sectionWidth: any = {
        desktop: {
            1: `width: 33.33%`,
            2: `width: 65.66%`,
            3: `width: 100%`,
        },
        mobile: {
            1: `width: 100%`,
        },
    };

    let socialElement: HTMLElement;
    let adsSlotAndUsage: AdSlotUsage = { adSlotIndex: 0, usageCount: 0 };
    let {
        story: [storyData],
    } = storyDetails;
    let storyId = storyData?._id;

    const breadcrumbs: any[] = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name: storyData?.mid_heading,
            slug: storyData?.completeSlug,
        },
    ];

    onMount(async () => {
        if (isAmp) {
            // Dynamically import the CSS file only for AMP pages
            await import("../../../story.css");
        }
    });
</script>

<SEO
    lang={language}
    {canonicalUrl}
    pageType={"Story"}
    {breadcrumbs}
    slug={storyData?.completeSlug}
    title={storyData?.meta_title}
    {storyData}
    datePublished={storyData?.publish_at}
    lastUpdated={storyData?.updatedAt}
    metadescription={storyData?.meta_description}
    keywords={storyData?.keywords}
    timeToRead={timeToRead(storyData?.word_count)}
    ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    site_details={envDetails}
    dateCreated={storyData?.createdAt ?? storyData?.updatedAt}
    isAmp={true}
    {pathname}
    {siteNavigation}
/>

<div class="mainWrapper mt-0">
    <div class="contentWrapper max-w-7xl mx-auto">
        <!-- <TrendingNews {trendingBar} /> -->
        {#if device === "mobile"}
            <div style="min-height: 250px;">
                <DisplayAd
                    adslot={envDetails.adsFile?.Mobile?.ATF?.AP}
                    height={"250"}
                    width={"300"}
                    isAmp={true}
                    dataSlot={envDetails?.adsFile?.Mobile?.ATF?.ampAP}
                />
            </div>
            <FloatAd dataSlot={envDetails?.adsFile?.Mobile?.FLOATAD?.ampAP} isAmp={true} />
        {/if}
        <div class="breadcrumb storyBreadcrumb" style="min-height: 20px;">
            <ul class="w-full flex overflow-auto">
                <li>
                    <a href={`/amp`}>{getHomeTextFromLanguage(language)} / </a>
                </li>
                {#if storyData?.categoryDetail}
                    <li>
                        <a
                            data-sveltekit-reload
                            href={`/amp/${storyData?.categoryDetail?.slug}`}
                        >
                            {storyData?.categoryDetail?.frontend_name
                                ?.charAt(0)
                                .toUpperCase() +
                                storyData?.categoryDetail?.frontend_name?.slice(
                                    1,
                                )} /
                        </a>
                    </li>
                {/if}
                {#if storyData?.subCategoryDetail}
                    <li class="">
                        <!-- Adjust margin as needed -->
                        <a
                            data-sveltekit-reload
                            href={`/amp/${storyData?.subCategoryDetail?.completeSlug}`}
                        >
                            {storyData?.subCategoryDetail?.frontend_name
                                ?.charAt(0)
                                .toUpperCase() +
                                storyData?.subCategoryDetail?.frontend_name?.slice(
                                    1,
                                )} /
                        </a>
                    </li>
                {/if}
                {#if storyData?.l3categoryData}
                    <li class="">
                        <!-- Adjust margin as needed -->
                        <a
                            data-sveltekit-reload
                            href={`/amp/${storyData?.l3categoryData?.completeSlug}`}
                        >
                            {storyData?.l3categoryData?.frontend_name
                                ?.charAt(0)
                                .toUpperCase() +
                                storyData?.l3categoryData?.frontend_name?.slice(
                                    1,
                                )} /
                        </a>
                    </li>
                {/if}
                {#if storyData?.l4categoryData}
                    <li class="">
                        <!-- Adjust margin as needed -->
                        <a
                            data-sveltekit-reload
                            href={`/amp/${storyData?.l4categoryData?.completeSlug}`}
                        >
                            {storyData?.l4categoryData?.frontend_name
                                ?.charAt(0)
                                .toUpperCase() +
                                storyData?.l4categoryData?.frontend_name?.slice(
                                    1,
                                )} /
                        </a>
                    </li>
                {/if}
                {#if storyData?.long_heading}
                    <li>
                        <!-- svelte-ignore a11y-missing-attribute -->
                        {storyData?.long_heading}
                    </li>
                {/if}
                <!-- Add more breadcrumb items as needed -->
            </ul>
        </div>

        <div class="contentMainWrap">
            <!-- Main Article Section -->
            <Card>
                <div class="mainArticle storySection">
                    <!-- Inner Left Block -->
                    <div
                        class="text-center flex flex-col"
                        style="min-height: 300px;"
                    >
                        <!-- Top Section Component -->
                        <TopSection
                            isAmp={true}
                            long_heading={storyData?.long_heading}
                            updatedAt={storyData?.updatedAt}
                            publish_at={storyData?.publish_at}
                            summary={storyData?.summary}
                            short_description={storyData?.short_description}
                            story_type={storyData?.story_type}
                            image={storyData?.images}
                            prefix={storyData?.prefixData}
                            stickerdata={storyData?.stickerData}
                            {envDetails}
                        />

                        <!-- Social Sharing Component -->
                        <div bind:this={socialElement}>
                            <SocialSharing
                                {device}
                                {isAmp}
                                storyId={storyData?._id}
                                {storyData}
                                complete_slug={storyData?.completeSlug}
                                {envDetails}
                                {sharePlatforms}
                            />
                        </div>
                    </div>

                    <!-- Render Story Content -->
                    {#if storyData?.story_type === "REGULAR" || storyData?.story_type === "OPINION" || storyData?.story_type === "AGENCY"}
                        <AmpRegularStory
                            {descriptionContent}
                            story={storyData}
                            {device}
                            {envDetails}
                            {sharePlatforms}
                        />
                    {:else if storyData?.story_type === "GALLERY"}
                        <AmpGalleryCard
                            story={storyData}
                            {adsSlotAndUsage}
                            {device}
                            {envDetails}
                            {sharePlatforms}
                        />
                    {:else if storyData?.story_type === "DEEP-FOCUS"}
                        <AmpDeepFocusCard
                            {descriptionContent}
                            story={storyData}
                            {device}
                            {envDetails}
                            {sharePlatforms}
                        />
                    {:else if storyData?.story_type === "LIVE-BLOG"}
                        <AmpLiveBlogCard
                            {descriptionContent}
                            story={storyData}
                            {device}
                            {envDetails}
                            {sharePlatforms}
                        />
                    {/if}
                </div>
            </Card>
        </div>
        {#if sideBarData}
            <div>
                {#if device === "mobile"}
                    <Sidebar
                        {isAmp}
                        {storyNotIncludes}
                        {sideBarData}
                        {storyId}
                        {device}
                        {envDetails}
                        {rightSideBar}
                        {language}
                    />
                {:else}
                    <Sidebar
                        {isAmp}
                        {sideBarData}
                        {storyNotIncludes}
                        {storyId}
                        sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
                        {device}
                        {envDetails}
                        {rightSideBar}
                        {language}
                    />
                {/if}

                {#each Object.keys(rightSideBar || {}) as key}
                    {#if rightSideBar[key]?.story}
                        {#each rightSideBar[key].story as eachStory, i}
                            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                                {#if getTemplateType(device, eachStory?.widget) !== TEMPLATE.HIDDEN}
                                    <div
                                        class={eachStory?.dGrid == "1"
                                            ? "sticky top-[50px]"
                                            : ""}
                                        style={`${
                                            sectionWidth?.[
                                                device?.toLowerCase() ||
                                                    "desktop"
                                            ]?.[
                                                eachStory?.widget?.[
                                                    device === "mobile"
                                                        ? "mGrid"
                                                        : "dGrid"
                                                ]
                                            ] ?? "width : 100%"
                                        }`}
                                    >
                                        <div class="cardsRow">
                                            <CardHeader
                                                textStyle={"font-size:28px;color:#D10014"}
                                                classes={"text-[#D10014] pb-4"}
                                                >{eachStory?.widget
                                                    ?.title}</CardHeader
                                            >
                                            <div class={`asideThumb`}>
                                                <LivetvPlayer
                                                    isMute={true}
                                                    livetv_video_id={eachStory
                                                        ?.widget
                                                        ?.liveTVInfo?.[0]
                                                        ?.videoId}
                                                    isAmp={true}
                                                    player={eachStory?.widget
                                                        ?.liveTVInfo?.[0]
                                                        ?.player}
                                                    autoplay={true}
                                                />
                                            </div>
                                            <div>
                                                <h2
                                                    class="text-black text-base font-bold leading-[150%] py-3"
                                                >
                                                    {eachStory?.widget
                                                        ?.liveTVInfo?.[0]
                                                        ?.videoDescription}
                                                </h2>
                                                {#if eachStory?.widget?.liveTVInfo?.[0]?.moreUrl}
                                                    <a
                                                        data-sveltekit-reload
                                                        href={eachStory?.widget
                                                            ?.liveTVInfo?.[0]
                                                            ?.moreUrl}
                                                        title="More Live TV"
                                                        style="color: #d10014;"
                                                        class="flex justify-end text-center font-semibold text-base leading-none relative max-w-max ml-auto pr-5"
                                                    >
                                                        More Live TV
                                                    </a>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            {/if}
                        {/each}
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .storyBreadcrumb {
        margin-bottom: 16px;
    }
    .breadcrumb ul {
        display: flex;
        gap: 4px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-wrap: nowrap;
    }

    .breadcrumb ul li {
        font-size: 14px;
        font-weight: 400;
    }

    .breadcrumb a {
        color: #000;
        transition: 0.4s;
    }

    .contentMainWrap {
        width: 100%;
        max-width: 1200px;
        display: grid;
        grid-template-columns: calc(100%) calc(0%);
        grid-column-gap: 0px;
    }
    @media screen and (max-width: 680px) {
        .storyBreadcrumb {
            padding: 0;
        }
        .breadcrumb ul li {
            font-size: 12px;
        }
        .contentWrapper {
            width: calc(100% - 32px);
        }
        .contentMainWrap {
            display: block;
        }
        .mainWrapper {
            width: calc(100% - 0px);
            margin: 0 auto;
        }
        .contentMainWrap {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .storyHead .author {
        width: max-content;
        margin: 0 auto;
    }

    .storyHead .storyImg img {
        width: 100%;
    }
</style>
