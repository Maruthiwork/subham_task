<script lang="ts">
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import { formatDate } from "$lib/components/utils/utils";
    import { handleError } from "$lib/utils";

    // ** Props
    export let device: string;
    export let long_heading: string;
    export let updatedAt: string;
    export let publish_at: string;
    export let summary: string;
    export let short_description: string;
    export let story_type: string;
    export let image: Record<string, any>;
    export let prefix: Record<string, any>;
    export let stickerdata: Record<string, any>;
    export let envDetails: any;
    export let isAmp = false;
</script>

<div class="flex items-start justify-center flex-col gap-0">
    {#if story_type === "OPINION"}
        <div class="text-black font-bold bg-[#FFD8D8] py-1 {envDetails?.language === "MH" || envDetails?.language === "H" ? 'pt-2' : 'pt-1'} px-3 mb-4 rounded w-fit desktop:py-2 desktop:px-4 desktop:mb-8">
            OPINION
        </div>
    {:else if story_type === "LIVE-BLOG"}
        <div class="flex items-center font-bold bg-red-800 text-white py-1 px-3 mb-4 rounded w-fit desktop:py-2 desktop:px-4 desktop:mb-8">
            <div class="mr-2 bg-white rounded-full w-3 h-3 blinking"></div>
            <span class="flex items-center h-fit" style="{envDetails?.language === "H" || envDetails?.language === "MH" ? "margin-top:8px" : ""}">LIVE-BLOG</span>
        </div>
    {:else if story_type === "DEEP-FOCUS"}
        <div class="font-bold bg-yellow-500 py-1 px-3 rounded w-fit mb-4 desktop:py-2 desktop:px-4 desktop:mb-8">
            {envDetails?.language === "RB" ? "DEEP-SCROLL" : "DEEP-FOCUS"}
        </div>
    {/if}

    {#if story_type === "GALLERY"}
        <div class="image-container">
            <img
                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${image?.versions?.["16_9"]?.filePath}`}
                alt={image?.versions?.["16_9"]?.alt  ?? long_heading}
                class="full-width-image"
                loading="lazy"
                width="auto" height="auto"
                on:error={handleError}
            />
        </div>
    {/if}

    <div class={story_type === "GALLERY" ? `topStorycard galleryStorycard ${isAmp ? "w100" : ""}` : `topStorycard !w-full ${isAmp ? "w100" : ""}`}>
        <div class="flex flex-col text-left gap-2 desktop:gap-5">
                <p class="{envDetails?.language === "MH" || envDetails?.language === "H" ? 'text-[14px]' : 'text-[12px]'} mb-2 desktop:text-sm text-black desktop:mb-0 font-medium" style="font-display: optional;">
                    {`${envDetails?.language === "H" ? 'पब्लिश्ड' : 'Published'} ${formatDate(publish_at)}`}
                </p>
            <div class="storyTitle">
                <h1 class="text-[28px] tracking-[-1.12px] desktop:text-[52px] font-black leading-[120%] desktop:tracking-[-2.08px] storyheading">
                    {#if prefix?.name}
                        <span class="text-[#D10014]">{prefix?.name}/ </span>
                    {/if}
                    {long_heading}
                </h1>
            </div>
            {#if summary}
                <h2 style="font-family: {envDetails?.language === "MH" || envDetails?.language === "H" ? envDetails?.secondaryFont : envDetails?.tertiaryFont};" class="text-base leading-[140%] mb-4 font-medium tracking-[-0.5px] desktop:text-[22px] desktop:mb-5">
                    {summary}
                </h2>
            {/if}
        </div>
    </div>
</div>


<style>
    .image-container {
        max-width: 100%;
        width: 100%;
    }

    .full-width-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
</style>
