<script lang="ts">
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import { timeToRead } from "$lib/components/utils/utils";
    import type { NewsStory } from "../StoryCard/Types";
    import placeholder_16_9 from "$lib/assets/no-img/16-9-placeholder.jpg";
    import { STORY_TYPE } from "$lib/components/enums/story";
    import FollowUs from "./FollowUs.svelte";

    export let storyId: string;
    export let storyData: NewsStory;
    export let complete_slug: string;
    export let envDetails;
    export let device = "desktop";
    export let isAmp = false;
    export let sharePlatforms: any = [];

    let authorDetailCategorySlug = (storyData?.authorDetail?.type === "AUTHOR") ? 'authors' : (storyData?.authorDetail?.type === "ANCHOR") ? 'anchors' : '';
    let editedByCategorySlug = (storyData?.editedByData?.type === "AUTHOR") ? 'authors' : (storyData?.editedByData?.type === "ANCHOR") ? 'anchors' : '';

    $: categoryDetails = storyData?.categoryDetail || storyData?.categoryData;
</script>

<div
    class={`${storyData?.story_type === STORY_TYPE.GALLERY.value ? "galleryCard" : ""} storyDetails items-start`}
>
{#if storyData?.story_type !== STORY_TYPE.VIDEO.value && storyData?.story_type !== STORY_TYPE.SHOW.value}
<div class="readViews {storyData?.authorDetail ? 'mt-0' : 'mt-5'} desktop:text-[17px] mobile:text-[13px]">
    <ul class="flexwrap justify-start">
        <li>
            <a 
                style="font-family: {envDetails?.language === "MH" || envDetails?.language === "MH" ? envDetails?.secondaryFont : envDetails?.primaryFont};"
                class="{envDetails?.language === "MH" || envDetails?.language === "H" ? 'text-[15px]' : 'text-[13px]'}  desktop:text-[17px]"
                data-sveltekit-reload
                href={`${isAmp ? '/amp/' : '/'}${categoryDetails?.slug}`}
            >
                {categoryDetails?.frontend_name}
            </a>
        </li>
        <li style="font-family: {envDetails?.language === "MH" || envDetails?.language === "MH" ? envDetails?.secondaryFont : envDetails?.primaryFont};" class="{envDetails?.language === "MH" || envDetails?.language === "H" ? 'text-[15px] desktop:text-[17px]' : 'text-[15px] desktop:text-[17px]'}">
            {timeToRead(
                storyData?.word_count ||
                    (storyData?.story_type === "GALLERY" ? 200 : 400),
            )}
        </li>
    </ul>
</div>
{/if}
    {#if storyData?.story_type === STORY_TYPE.OPINION.value && storyData?.authorDetail}
        <a
            href={`${isAmp ? '/amp/' : '/'}${authorDetailCategorySlug}/${storyData?.authorDetail?.slug}`}
            class="author pb-4 desktop:pb-5 desktop:pt-1"
        >
            <img
                class="rounded-full aspect-square author-image"
                src={storyData?.authorDetail?.image?.filePath
                    ? `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${storyData?.authorDetail?.image?.filePath}`
                    : `${EnvironmentConfig.VITE_REPUBLIC_URL}${placeholder_16_9}`}
                alt={storyData?.authorDetail?.image?.alt}
                loading="lazy"
            />
            <div style="font-family: {envDetails?.language === "MH" || envDetails?.language === "MH" ? envDetails?.secondaryFont : envDetails?.primaryFont};" class="{envDetails?.language === "MH" || envDetails?.language === "H" ? 'text-[15px]' : 'text-[13px]'}">{storyData?.authorDetail?.name}</div>
        </a>
    {/if}

    {#if storyData?.story_type !== STORY_TYPE.OPINION.value && storyData?.story_type !== STORY_TYPE.VIDEO.value  && storyData?.story_type !== STORY_TYPE.SHOW.value}
    <div class="flex gap-4">
        {#if storyData?.authorDetail?._id === storyData?.editedByData?._id}
            <div class="storyEditor editor text-[16px] desktop:text-[16px]">
                Reported by: <a
                    data-sveltekit-reload
                    href={`${isAmp ? '/amp/' : '/'}${authorDetailCategorySlug}/${storyData?.authorDetail?.slug}`}
                    ><span class="highlightName"
                        >{storyData?.authorDetail?.name}</span
                    ></a
                >
            </div>
        {:else}
            <div class="storyEditor editor text-[13px] desktop:text-[17px]">
                Reported by: <a
                    data-sveltekit-reload
                    href={`${isAmp ? '/amp/' : '/'}${authorDetailCategorySlug}/${storyData?.authorDetail?.slug}`}
                    ><span class="highlightName"
                        >{storyData?.authorDetail?.name}</span
                    ></a
                >
            </div>
            {#if storyData?.editedByData?.name}
                <div class="storyEditor reporter text-[13px] desktop:text-[17px]">
                    Edited by: <a
                        data-sveltekit-reload
                        href={`${isAmp ? '/amp/' : '/'}${editedByCategorySlug}/${storyData?.editedByData?.slug}`}
                        ><span class="highlightName"
                            >{storyData?.editedByData?.name}</span
                        ></a
                    >
                </div>
            {/if}
        {/if}
    </div>
    {/if}
    {#if !isAmp && device !== 'mobile'}
        <FollowUs {isAmp} story={storyData} {device} {envDetails} {sharePlatforms} />
    {/if}
</div>

<style>
    .google-news-icon {
        width: 32.003px;
        height: 26.287px;
    }
    .vartical-dash {
        width: 1px;
        height: 18px;
    }

    .galleryCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -14px;
    }

    @media screen and (max-width: 680px) {
        .google-news-icon {
            width: 23.002px;
            height: 18.894px;
            flex-shrink: 0;
        }
    }
</style>
