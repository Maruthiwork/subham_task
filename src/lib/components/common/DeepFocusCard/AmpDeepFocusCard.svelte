<script lang="ts">
    import type { NewsStory } from "$lib/components/Story/Types";
    import { formatDate } from "$lib/components/utils/utils";
    import DisplayAd from "../DisplayAd/DisplayAd.svelte";
    import {
        generateAspectRatioImageURL,
        IMAGE_ASPECT_RATIO,
        ImageDimensions,
    } from "../HybridImage/Constants";
    import ShowTags from "../ShowTags/ShowTags.svelte";
    import RFrame from "$lib/assets/images/R-frame.svg";
    import FollowUs from "../SocialSharing/FollowUs.svelte";

    // ** Props
    export let story: NewsStory;
    export let device = "desktop";
    export let envDetails: any = "";
    export let descriptionContent: any;
    export let sharePlatforms: any = [];

    // ** Variables
    let j = 2;
    let repeatIndex = 5;
</script>
<div>
    <div
        class="storyContent flex flex-col items-center"
        style="font-family: {envDetails.tertiaryFont ?? ''};"
    >
        {#if (story?.video &&  Object.values(story?.video).length)}
            {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
                <LivetvPlayer.default
                    isMute={true}
                    livetv_video_id={story.video?.id}
                    isAmp={true}
                    player='https://content.jwplatform.com/libraries/uzU0TBR0.js'
                    autoplay={true}
                />
            {/await}
        {:else}
            <amp-img
                src={generateAspectRatioImageURL(
                    story.images,
                    ImageDimensions?.[device]?.ampBannerImage,
                    IMAGE_ASPECT_RATIO["16_9"]?.key,
                )}
                alt={story.images?.versions?.["16_9"]?.alt ||
                    "deepfocus_story_img"}
                height="396px"
                width="704px"
            >
            </amp-img>
        {/if}

        <div class="imgCredit pt-2">
            {story.images?.versions?.["16_9"]?.caption} | Image: {story.images
                ?.versions?.["16_9"]?.source}
        </div>
        {#if device === "mobile"}
            <FollowUs isAmp={true} {story} {device} {envDetails} {sharePlatforms} />
        {/if}
        <div id="v-republicworld-v9"></div>
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
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
            </amp-ima-video>
        {/if}
        {#if descriptionContent.length > 0}
            {#each descriptionContent as item, index}
                {#if item.type === "ad"}
                    <div class="ad-container mt-4 mb-4">
                        <DisplayAd
                            adslot={item.adSlot}
                            usageCount={item.usageCount}
                            isAmp={true}
                             dataSlot={j <= 5
                            ? envDetails.adsFile.Mobile?.[`BTF${j++}`]?.ampAP
                            : envDetails.adsFile.Mobile?.[`BTF${5}_${repeatIndex}`]?.ampAP
                        }
                        />
                    </div>
                     {#if j > 5}
                    {j = 5}
                {/if}
                {:else if item.type === "text"}
                    {#if story?.deep_focus?.media_items && story?.deep_focus?.media_items?.length > 0}
                        <div class="leftGridCol mb-4 bg-red-100 w-full" style="{device === "mobile" ? "width:100%": "width:50%"}">
                            <div
                                class="articleHead blackArticleHead debateHead pl-0 pr-0 mb-0"
                            >
                                <h2 class="pb-0 flex items-center gap-2">
                                    <span class="rlogo ml-2">
                                        <amp-img
                                            src={RFrame}
                                            alt="Republic Logo Frame icon"
                                            width="40"
                                            height="36"
                                        />
                                    </span>
                                    Big Data
                                </h2>
                            </div>
                                <amp-base-carousel
                                    visible-count={1}
                                    width="600"
                                    height="400"
                                    layout="responsive"
                                    class="swiper CustomSwiper videoThumbFourColumSlider swiper-initialized swiper-horizontal swiper-backface-hidden"
                                >
                                    {#each story?.deep_focus?.media_items as item, i}
                                        <div
                                            class="bigDataCard"
                                        >
                                            <div class="bigDataHead">
                                                <h4>{item?.title}</h4>
                                            </div>
                                            <div
                                                class="bigDataImage"
                                                style="height: 100%; object-fit: cover;"
                                            >
                                            <amp-img
                                                    src={generateAspectRatioImageURL(
                                                        item?.image,
                                                        ImageDimensions?.[
                                                            device
                                                        ]?.bannerImage,
                                                        IMAGE_ASPECT_RATIO[
                                                            "16_9"
                                                        ]?.key,
                                                    )}
                                                    height={9}
                                                    width={16}
                                                    alt={item?.title}
                                                />
                                            </div>
                                        </div>
                                    {/each}
                                </amp-base-carousel>
                        </div>
                    {/if}
                    <h2 class="mb-2">{item.content.header}</h2>
                    <p>{@html item.content.text}</p>
                {/if}
            {/each}
        {/if}

        {#if story.disclaimer && story.disclaimer.length > 0}
            {#each story.disclaimer as item, index}
                <div>{@html item?.footer_content}</div>
            {/each}
        {/if}
    </div>
    <div class="published">
        <p> {`${envDetails?.language === "H" ? "अपडेटेड" : "Updated"} ${formatDate(story?.updatedAt)}`}</p>
    </div>
    <div id="migid-container"></div>
    <ShowTags isAmp={true} tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]} />
</div>
