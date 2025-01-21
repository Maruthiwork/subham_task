<script lang="ts">
    import { formatDate } from "$lib/components/utils/utils";
    import AmpDescriptionWithAds from "../DescriptionWithAds/AmpDescriptionWithAds.svelte";
    import {
        IMAGE_ASPECT_RATIO,
        ImageDimensions,
        generateAspectRatioImageURL,
    } from "../HybridImage/Constants";
    import ShowTags from "../ShowTags/ShowTags.svelte";
    import FollowUs from "../SocialSharing/FollowUs.svelte";
    import type { NewsStory } from "./Types";

    // ** Props
    export let story: NewsStory;
    export let device: string = "desktop";
    export let envDetails: any = {};
    export let descriptionContent: any;
    export let sharePlatforms: any = [];
</script>

{#if story !== null}
    <div
        class="storyContent flex flex-col"
        style="font-family: {envDetails.tertiaryFont ?? ''};"
    >
        <div class="storyImg">
            {#if story?.story_type === "VIDEO" || (story?.video &&  Object.values(story?.video).length)}
                <div style="min-height: 185px;">
                    {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
                        <LivetvPlayer.default
                            isAmp={true}
                            isMute={true}
                            livetv_video_id={story?.video?.id}
                            player='https://content.jwplatform.com/libraries/uzU0TBR0.js'
                            autoplay={true}
                        />
                    {/await}
                </div>
                {#if story?.story_type === "VIDEO"}
                    <div class="imgCredit text-xs text-[#474747] pt-2"></div>
                {/if}
            {:else}
                <!-- TODO : Make img into hybrid component -->
                <div style="min-height: 185px;">
                    <amp-img
                    src={
                        generateAspectRatioImageURL(
                            story?.images,
                            ImageDimensions?.[device]?.ampBannerImage,
                            IMAGE_ASPECT_RATIO["16_9"]?.key
                        ) || IMAGE_ASPECT_RATIO["16_9"]?.defaultImage
                        }
                        alt={story?.images?.versions?.["16_9"].alt ?? story?.long_heading}
                        width="16"
                        height="9"
                        layout="responsive"
                    >
                    <noscript data-image="image">
                        <img src={generateAspectRatioImageURL(
                            story?.images,
                            ImageDimensions?.[device]?.ampBannerImage,
                            IMAGE_ASPECT_RATIO["16_9"]?.key,
                        ) || IMAGE_ASPECT_RATIO["16_9"]?.defaultImage} width="16"
                        height="9" alt={story?.images?.versions?.["16_9"].alt ?? story?.long_heading}>
                      </noscript>
                    </amp-img>
                </div>
                {#if story?.story_type === "REGULAR" || story?.story_type === "OPINION"}
                    <div class="imgCredit text-xs text-[#474747] pt-2">
                        {story?.images?.versions?.["16_9"]?.caption} | Image:
                        {story?.images?.versions?.["16_9"]?.source}
                    </div>
                {:else}
                    <div class="imgCredit text-xs text-[#474747] pt-2">
                        {story?.images?.versions?.["16_9"]?.caption} | Image:
                        {story?.images?.versions?.["16_9"]?.source}
                    </div>
                {/if}
            {/if}
        </div>
        {#if device === "mobile"}
            <FollowUs isAmp={true} {story} {device} {envDetails} {sharePlatforms} />
        {/if}
        <div id="descwithads">
            <AmpDescriptionWithAds
                {descriptionContent}
                {device}
                {envDetails}
            />
        </div>
        {#if story?.disclaimer?.length > 0}
            {#each story?.disclaimer as item}
                <div>{@html item?.footer_content}</div>
            {/each}
        {/if}
    </div>
    <div class="published">
        <p> {`${envDetails?.language === "H" ? "अपडेटेड" : "Updated"} ${formatDate(story?.updatedAt)}`}</p>
    </div>
    <div id="migid-container"></div>
    <ShowTags isAmp={true} tagsData={[...(story?.tagsData || []), ...(story?.extra_added_tags || [])]} />

{:else}
    <div>Oops! Something went wrong. Please try after sometime</div>
{/if}
