<script lang="ts">
    import {
        loadMgidScript,
        useIntersectionObserver,
    } from "$lib/components/utils/utils";
    import LivetvPlayer from "$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte";
    import ReadMoreDescription from "$lib/components/common/ReadMoreDescription/ReadMoreDescription.svelte";
    import SocialSharing from "../SocialSharing/SocialSharing.svelte";
    import Divider from "../Republic-Common/Divider.svelte";
    import { TEMPLATE, TEMPLATE_PROPERTIES } from "../StoryCard/Constants";
    import StoryGrid from "../Republic-Common/StoryGrid/StoryGrid.svelte";
    import { generateAspectRatioImageURL, IMAGE_ASPECT_RATIO, ImageDimensions } from "../HybridImage/Constants";

    // ** Props
    export let topStory;
    export let latest_stories;
    export let envDetails: any = {};
    export let device: any = "desktop";
    export let isAmp: boolean = false;
    export let language: string = "E";
    export let livetv_video_id: string = "";
    export let sharePlatforms: any = [];
    export let videoDescription: any = [];

    // ** Variables
    let showTagsLoaded = false;
    let latestStoryLoaded = false;
    let readMoreDescriptionLoaded = true;
    let topStorySlug = topStory?.completeSlug;
    let categorySlug =
        topStory?.authorDetail?.type === "AUTHOR"
            ? "authors"
            : topStory?.authorDetail?.type === "ANCHOR"
              ? "anchors"
              : "";
    latest_stories = latest_stories.filter(
        (story: any) => story?.completeSlug !== topStorySlug,
    );

    // ** Methods
    function convertTimestampToFormattedString(timestamp: any) {
        const date = new Date(timestamp);
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            timeZone: "Asia/Kolkata",
        });

        const formattedDate = dateFormatter?.format(date);
        const formattedTime = timeFormatter?.format(date);

        return { formattedDate, formattedTime };
    }

    const { formattedDate, formattedTime } = convertTimestampToFormattedString(
        topStory?.publish_at ?? new Date(),
    );

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

    // Other Intersection Observers
    useIntersectionObserver("showTags", 0.1, () => {
        showTagsLoaded = true;
    });
    useIntersectionObserver("latestStory", 0.1, () => {
        latestStoryLoaded = true;
    });
    useIntersectionObserver("readMoreDescription", 0.1, () => {
        readMoreDescriptionLoaded = true;
    });
</script>

<div class="singleVideoBlock mb-4">
    <div
        class="cardWithWatchVideo cardsHover min"
        style="background-image: url({generateAspectRatioImageURL(
            topStory?.images,
            ImageDimensions?.[device]?.bannerImage,
            IMAGE_ASPECT_RATIO["16_9"]?.key,
          )}); 
        min-height: {device === 'mobile' ? '185px': '365px'};width:100%;">

        <LivetvPlayer
            key={topStory?.video?.id}
            isMute={true}
            livetv_video_id={livetv_video_id}
            {isAmp}
            player="https://content.jwplatform.com/libraries/uzU0TBR0.js"
            autoplay={true}
            can_float={true}
            className={device === "mobile"
                ? "min-h-[185px] h-full w-full"
                : "min-h-[368px] h-full w-full"}
        />
    </div>
    <div class="singleVideoContent catVideoContent md:px-4">
        <div class="cardftr lightCardftr mb-2 gap-2 md:gap-2">
            <span
                class="text-xs md:text-sm cardTime font-normal pl-0 border-none"
            >
                {envDetails?.language === "H" ? 'पब्लिश्ड' : 'Published'} {formattedDate} at {formattedTime} IST
            </span>
        </div>

        {#if topStory?.hashtag}
            <h6 class="newsTime mb-2" style="color: #d10014;">
                #{topStory?.hashtag}
            </h6>
        {/if}
        <h1
            style={isAmp ? "font-size: 32px;" : ""}
            class="{language === 'RB'
                ? 'text-[28px]'
                : 'text-[32px]'} font-extrabold leading-[120%] tracking-[-0.02em] desktop:leading-[125%] desktop:tracking-[-0.03em]"
        >
            {topStory?.long_heading}
        </h1>
        {#if topStory?.description}
            <div
                class="lightCardTitle my-2 desktop:my-4"
                style="font-family: {envDetails.tertiaryFont ?? ''};"
                id="readMoreDescription"
            >
                <ReadMoreDescription
                    {envDetails}
                    htmlContent={isAmp ? videoDescription :topStory?.description}
                    {isAmp}
                />
            </div>
        {/if}
        <div
            class="text-[#D10014] indiReadView mb-2 desktop:mb-1"
            style="color: #D10014;"
        >
            <ul class="flex text-[13px] desktop:text-[17px]">
                <li class="border-r border-r-black/15 pr-2 mr-2">
                    <a
                        data-sveltekit-reload
                        href={`${isAmp ? "/amp/" : "/"}${topStory?.categoryDetail?.completeSlug}`}
                        class="font-mulish text-[13px] desktop:text-[17px] font-normal leading-[22.5px]"
                    >
                        {topStory?.categoryDetail?.frontend_name ||
                            topStory?.categoryDetail?.name}
                    </a>
                </li>
                {#if topStory?.authorDetail?.name}
                    <li>
                        <a
                            data-sveltekit-reload
                            href={`${isAmp ? "/amp/" : "/"}${categorySlug}/${topStory?.authorDetail?.slug}`}
                            class="font-mulish text-[13px] desktop:text-[17px] font-normal leading-[22.5px]"
                        >
                            {topStory?.authorDetail?.name}
                        </a>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
    <Divider classes={"my-3"} />
    <SocialSharing
        {isAmp}
        {device}
        storyId={topStory?._id}
        storyData={topStory}
        complete_slug={topStory?.completeSlug}
        {envDetails}
        {sharePlatforms}
    />
    <Divider classes={"-mt-1"} />
    <div id="showTags">
        {#if showTagsLoaded}
            {#await import("$lib/components/common/ShowTags/ShowTags.svelte") then ShowTags}
                <ShowTags.default
                    {isAmp}
                    tagsData={[
                        ...(topStory?.tagsData || []),
                        ...(topStory?.extra_added_tags || []),
                    ]}
                />
            {/await}
        {/if}
    </div>
    <div id="latestStory" style="padding: 16px 0px 0px 0px; margin-bottom:8px">
        {#if latestStoryLoaded}
            <StoryGrid
                {device}
                titleStyle={language == "RB" ? "p-3" : ""}
                {envDetails}
                cardContainerStyle={"margin-bottom:16px"}
                title={language == "RB" ? "Trending Videos" : "Latest Story"}
                columns={"1"}
                pageType={"CATEGORY"}
                grid={device === "desktop" ? 2 : 1}
                storyData={language === "RB"
                    ? {
                          headerBgColor: "#FFBE98",
                          headerColor: "#000000",
                      }
                    : {
                          cardBgColor: "#FFFFFF",
                      }}
                gridTemplate={TEMPLATE_PROPERTIES.GRID?.key}
                widgetGrid={device === "desktop" ? 2 : 1}
                template={TEMPLATE.STORY_CARD}
                stories={latest_stories}
                templateType={device === "desktop"
                    ? TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT
                    : language === "RB"
                      ? TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM
                      : TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT}
            />
        {/if}
    </div>
    <div id="migid-container"></div>
</div>

<style>
    .latestStory {
        padding-top: 60px;
    }
</style>
