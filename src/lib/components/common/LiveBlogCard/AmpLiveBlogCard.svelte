<script lang="ts">
    // @ts-nocheck
    import type { AdSlotUsage, NewsStory } from "$lib/components/Story/Types";
    import { formatDate, generateSlug } from "$lib/components/utils/utils";
    import DisplayAd from "../DisplayAd/DisplayAd.svelte";
    import {
        generateAspectRatioImageURL,
        IMAGE_ASPECT_RATIO,
        ImageDimensions,
    } from "../HybridImage/Constants";
    import LatestUpdates from "../LatestUpdates/LatestUpdates.svelte";
    import ShowTags from "../ShowTags/ShowTags.svelte";
    import FollowUs from "../SocialSharing/FollowUs.svelte";

    // ** Props
    export let story: NewsStory;
    export let device: string = "desktop";
    export let envDetails: any = {};
    export let descriptionContent: any;
    export let sharePlatforms: any = [];

    // Initialize dataSlot counter
    let dataSlotCounter = 2;

    // Compute `dataSlot` values based on index and cap at 5
    descriptionContent = descriptionContent.map((item: any) => {
        if (item.type === "ad") {
            const dataSlotKey = `BTF${dataSlotCounter <= 5 ? dataSlotCounter : 5}`;
            item.computedDataSlot =
                envDetails.adsFile.Mobile?.[dataSlotKey]?.ampAP;
            dataSlotCounter++;
        }
        return item;
    });
</script>

{#if story !== null}
    <div
        class="storyContent flex flex-col"
        style="font-family: {envDetails.tertiaryFont ?? ''};"
    >
        {#if story?.video && Object.values(story?.video).length}
            {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
                <LivetvPlayer.default
                    isMute={true}
                    livetv_video_id={story.video?.id}
                    isAmp={true}
                    player="https://content.jwplatform.com/libraries/uzU0TBR0.js"
                    autoplay={true}
                />
            {/await}
            <div class="imgCredit"></div>
        {:else}
            <div class="storyImg">
                <amp-img
                    src={generateAspectRatioImageURL(
                        story?.images,
                        ImageDimensions?.[device]?.ampBannerImage,
                        IMAGE_ASPECT_RATIO["16_9"]?.key,
                    ) || IMAGE_ASPECT_RATIO["16_9"]?.defaultImage}
                    alt={story?.images?.versions?.["16_9"].alt ??
                        story?.long_heading}
                    width="16"
                    height="9"
                    layout="responsive"
                >
                <noscript data-image="image">
                    <img src={generateAspectRatioImageURL(
                        story?.images,
                        ImageDimensions?.[device]?.ampBannerImage,
                        IMAGE_ASPECT_RATIO["16_9"]?.key,
                        ) || IMAGE_ASPECT_RATIO["16_9"]?.defaultImage}
                        width="16"
                        height="9"
                    alt={story?.images?.versions?.["16_9"].alt ?? story?.long_heading}>
                </noscript>
                </amp-img>
            </div>
        {/if}

        <div class="imgCredit">
            {story.images?.versions?.["16_9"]?.caption} | Image: {story.images
                ?.versions?.["16_9"]?.source}
        </div>
        {#if device === "mobile"}
            <FollowUs
                isAmp={true}
                {story}
                {device}
                {envDetails}
                {sharePlatforms}
            />
        {/if}
        {#if story?.live_blog_headline}
            <div class="my-3">
                <p>{@html story?.live_blog_headline}</p>
            </div>
        {/if}
        <LatestUpdates live_blog_texts={story.live_blog_texts} />
        {#if device == "desktop"}
            <div class="py-6">
                <DisplayAd
                    adslot={envDetails.adsFile.Desktop?.BTF0?.AP}
                    isAmp={true}
                    dataSlot={envDetails.adsFile.Mobile?.BTF1?.ampAP}
                />
            </div>
        {:else if device == "mobile"}
            <div class="py-6">
                <DisplayAd
                    adslot={envDetails.adsFile.Mobile?.BTF0?.AP}
                    isAmp={true}
                    dataSlot={envDetails.adsFile.Mobile?.BTF1?.ampAP}
                />
            </div>
        {/if}
        {#if story?.live_blog_conclusion}
            <div
                style="display: flex;background-color: #D10014;color: white;padding: 8px;width: 100%;align-items: center;gap: 8px;"
            >
                <div
                    class="size-3 desktop:size-[14px]"
                    style="background-color: #fff;border-radius: 50%;position: relative;top: 0;left: 0;"
                ></div>
                <h4
                    class="text-base desktop:text-[22px]"
                    style="font-weight: 700;text-transform: uppercase;"
                >
                    Live Blog
                </h4>
            </div>
            <div class="my-3">
                <p>{@html story?.live_blog_conclusion}</p>
            </div>
        {/if}
        {#if envDetails?.domainName.includes("dev")}
            <amp-ima-video
                id="republicworldAmpPlayer"
                width="640"
                height="360"
                layout="responsive"
                data-tag="https://pubads.g.doubleclick.net/gampad/ads?iu=/21928950349/amp_video_test&description_url=[placeholder]&tfcd=0&npa=0&sz=640x360&gdfp_req=1&unviewed_position_start=1&output=vmap&env=vp&impl=s&ad_rule=1&correlator=&vid_d=12000"
                data-poster="https://unibots.b-cdn.net/player/amp/republicworld.png"
                autoplay
            >
                <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                />
            </amp-ima-video>
        {/if}
        <div class="audioReader lightCardTitle textCenter dNone">
            <ul class="flexwrap justifyCenter itemCenter">
                <li><span class="listenIcon" /></li>
                <li>Listen to this article</li>
                <li><span class="disc"></span></li>
            </ul>
        </div>

        {#each descriptionContent as item}
            {#if item.type === "ad"}
                <div class="ad-container mt-4 mb-4">
                    <DisplayAd
                        adslot={item.adSlot}
                        usageCount={item.usageCount}
                        isAmp={true}
                        dataSlot={item.computedDataSlot}
                    />
                </div>
            {:else if item.type === "text"}
                <div
                    id={generateSlug(item.content.header)}
                    class="overflow-hidden"
                >
                    <div class="pinned">
                        <div class="border-b border-black border-opacity-15">
                            <h6
                                class="newsTime desktop:text-lg text-xs font-semibold leading-[130%]"
                                style="font-family: {envDetails.secondaryFont ??
                                    ''};"
                            >
                                {formatDate(
                                    item.content?.updatedAt
                                        ? item.content?.updatedAt
                                        : item.content?.createdAt,
                                )}
                            </h6>
                            <input
                                type="checkbox"
                                id="chck{item.content?._id}"
                                class="hidden"
                            />
                            <h2
                                style={`font-family:'Noto Sans',sans-serif'`}
                                class="liveContent flex justify-between items-center py-2 bg-transparent font-extrabold leading-[120%] tracking-[-0.52px] cursor-pointer text-black live-blog-header"
                            >
                                {item.content.header}
                            </h2>
                            <div
                                class="live-blog-text text-black bg-transparent"
                            >
                                {@html item.content.text
                                    ?.replace(/!important/g, "")
                                    .replace(/<font[^>]*>|<\/font>/gi, "")}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        {/each}

        {#if story.disclaimer && story.disclaimer.length > 0}
            {#each story.disclaimer as item, index}
                <div>{@html item?.footer_content}</div>
            {/each}
        {/if}
    </div>
    <div class="published">
        <p>{`${envDetails?.language === "H" ? "अपडेटेड" : "Updated"} ${formatDate(story?.updatedAt)}`}</p>
    </div>
    <div id="migid-container"></div>
    <ShowTags
        isAmp={true}
        tagsData={[
            ...(story?.tagsData || []),
            ...(story?.extra_added_tags || []),
        ]}
    />
{:else}
    <div></div>
{/if}
