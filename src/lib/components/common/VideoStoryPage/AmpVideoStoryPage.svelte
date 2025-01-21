<script lang="ts">
    import {
        getHomeTextFromLanguage,
        getTemplate,
        getTemplateType,
        timeToRead,
    } from "$lib/components/utils/utils";
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import DisplayAd from "../DisplayAd/DisplayAd.svelte";
    import VideoStoryCard from "../VideoStoryCard/VideoStoryCard.svelte";
    import SEO from "$lib/components/SEO/index.svelte";
    import { TEMPLATE } from "../StoryCard/Constants";
    import CardHeader from "../Republic-Common/CardHeader.svelte";
    import LivetvPlayer from "../LiveTvPlayer/LivetvPlayer.svelte";
    import FloatAd from "../FloatAd/FloatAd.svelte";

    // ** Props
    export let video_story_details;
    export let videoStoryDescription:any = [];
    export let siteNavigation:any = [];
    export let latest_stories: any = [];
    export let device: "desktop" | "mobile" = "desktop";
    export let language: string = "E";
    export let envDetails: any = {};
    export let canonicalUrl: string = "";
    export let livetv_video_id: string = "";
    export let pathname: string = "";
    export let rightSideBar: any = {};
    export let sharePlatforms: any = [];

    // ** Variables
    let storyData = video_story_details?.storyDetails?.[0];
    let ampAnalyticsConfig: any;

    const breadcrumbs: any[] = [
        {
            name: "Home",
            slug: "/amp",
        },
        {
            name: storyData?.long_heading,
            slug: storyData?.completeSlug,
        },
    ];

    $: ampAnalyticsConfig = JSON.stringify({
        vars: {
            gtag_id: envDetails?.gaCode,
            config: {
                [envDetails?.gaCode]: { groups: "default" },
            },
        },
        linkers: {
            enabled: true,
        },
    });
</script>

<SEO
    lang={language}
    {canonicalUrl}
    pageType={"Story"}
    {breadcrumbs}
    slug={storyData?.completeSlug}
    title={storyData?.long_heading}
    {storyData}
    datePublished={storyData?.publish_at}
    lastUpdated={storyData?.updatedAt}
    metadescription={storyData?.meta_description}
    keywords={storyData?.keywords}
    timeToRead={timeToRead(storyData?.word_count)}
    featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
        storyData?.images?.versions?.["16_9"].filePath}
    site_details={envDetails}
    dateCreated={storyData?.createdAt ?? storyData?.updatedAt}
    isAmp={true}
    {pathname}
    latest_stories={latest_stories?.data}
    {siteNavigation}
/>
<amp-analytics type="gtag" data-credentials="include">
    <script id="amp-analytics-script" type="application/json"></script>
</amp-analytics>

<div class="mainWrapper mt-6">
    <div class="contentWrapper max-w-7xl mx-auto">
            <div style="min-height: 250px;">
                <DisplayAd
                    adslot={envDetails.adsFile?.Mobile?.ATF?.AP}
                    height={"250"}
                    width={"300"}
                    isAmp={true}
                    dataSlot={envDetails?.adsFile?.Mobile?.ATF?.ampAP}
                />
            </div>
            {#if device === "mobile"}
                <FloatAd dataSlot={envDetails?.adsFile?.Mobile?.FLOATAD?.ampAP} isAmp={true} />
            {/if}
        <div class="breadcrumb text-[14px]">
            <a href="/amp">
                <span class="breadcrumb-text">
                    {getHomeTextFromLanguage(language)} /
                </span>
            </a>
            {#if storyData?.categoryDetail}
                <a
                    data-sveltekit-reload
                    href={`/amp/${storyData?.categoryDetail?.slug}`}
                >
                    <span class="breadcrumb-text">
                        {storyData?.categoryDetail?.frontend_name
                            ?.charAt(0)
                            .toUpperCase() +
                            storyData?.categoryDetail?.frontend_name?.slice(1)} /
                    </span>
                </a>
            {/if}
            {#if storyData?.subCategoryDetail}
                <a
                    data-sveltekit-reload
                    href={`/amp/${storyData?.subCategoryDetail?.completeSlug}`}
                >
                    <span class="breadcrumb-text">
                        {storyData?.subCategoryDetail?.frontend_name
                            ?.charAt(0)
                            .toUpperCase() +
                            storyData?.subCategoryDetail?.frontend_name?.slice(
                                1,
                            )} /
                    </span>
                </a>
            {/if}
            {#if storyData?.l3categoryData}
                <a
                    data-sveltekit-reload
                    href={`/amp/${storyData?.l3categoryData?.completeSlug}`}
                >
                    <span class="breadcrumb-text">
                        {storyData?.l3categoryData?.frontend_name
                            ?.charAt(0)
                            .toUpperCase() +
                            storyData?.l3categoryData?.frontend_name?.slice(1)} /
                    </span>
                </a>
            {/if}
            {#if storyData?.l4categoryData}
                <a
                    data-sveltekit-reload
                    href={`/amp/${storyData?.l4categoryData?.completeSlug}`}
                >
                    <span class="breadcrumb-text">
                        {storyData?.l4categoryData?.frontend_name
                            ?.charAt(0)
                            .toUpperCase() +
                            storyData?.l4categoryData?.frontend_name?.slice(1)} /
                    </span>
                </a>
            {/if}
            {#if storyData?.long_heading}
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="breadcrumb-text">
                    <span class="breadcrumb-text">
                        {storyData?.long_heading}
                    </span>
                </a>
            {/if}
        </div>

        <div class="contentMainWrap" style="grid-template-columns:100%">
            <!-- Main Article Section -->
            <VideoStoryCard
                isAmp={true}
                {device}
                videoDescription={videoStoryDescription?.[0]}
                topStory={storyData}
                latest_stories={latest_stories?.data}
                {envDetails}
                {language}
                {sharePlatforms}
                {livetv_video_id}
            />
        </div>
        {#each Object.keys(rightSideBar || {}) as key}
            {#if rightSideBar[key]?.story}
                {#each rightSideBar[key].story as eachStory, i}
                    {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                        {#if getTemplateType(device, eachStory?.widget) !== TEMPLATE.HIDDEN}
                            <div class="cardsRow">
                                <CardHeader
                                    textStyle={"padding-bottom:16px; color:#D10014; font-size:28px;"}
                                >
                                    {eachStory?.widget?.title}
                                </CardHeader>
                                <div class={`asideThumb`}>
                                    <LivetvPlayer
                                        isMute={true}
                                        livetv_video_id={eachStory?.widget
                                            ?.liveTVInfo?.[0]?.videoId}
                                        isAmp={true}
                                        player={eachStory?.widget
                                            ?.liveTVInfo?.[0]?.player}
                                        autoplay={true}
                                    />
                                </div>
                            </div>
                        {/if}
                    {/if}
                {/each}
            {/if}
        {/each}
    </div>
</div>
