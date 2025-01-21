<script lang="ts">
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import { ConvertDateFormat } from "$lib/components/utils/utils";

    export let item: any;
    export let categoryLabel: boolean;
    export let timeLabel: boolean;
    export let styleCard: string = 'height: 297px; width: 300px;';
    export let imageStyle: string = 'aspect-ratio: 9/16; display: block;border-radius: 5px;border-radius: 8px;background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 52.08%, #000 100%)';
    export let categoryTextColor:string = '#D10014'
    export let timeTextColor:string = '#FFF'
</script>

<div style={styleCard}>
    <a href={item?.completeSlug} class="card-link">
        <img
            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${item?.images?.versions?.["9_16"]?.filePath}`}
            alt="{item?.images?.versions?.["9_16"]?.alt}"
            class="videoThumbImg"
            width="246px"
            height="246px"
            style="{imageStyle}"
        />
        <div class="videoThumbTitle iconImg relative">
            {#if item.story_type === "SHORT" || item.story_type === "VIDEO"}
                <span class="playIcon playTopLeftsm"></span>
            {:else if item.story_type === "GALLERY"}
                <span class="cameraIcon shortsCameraIcon"></span>
            {:else if item.story_type === "WEB-STORIES"}
                <span class="webstoriesIco"></span>
            {/if}
            <h2 class="lightCardTitle">{item?.small_heading}</h2>
            <div class="flex items-center text-gray-600">
                {#if categoryLabel}
                    <span class="cardLabel pr-[6px] mr-[6px]">
                        <a
                            href={item.completeSlug}
                            class="text-[{categoryTextColor}] text-sm"
                            >{item?.categoryData?.frontend_name || item?.categoryData?.name }
                    </a>
                    </span>
                {/if}
                {#if timeLabel}
                    <p class="category-section text-[{timeTextColor}]">
                        {ConvertDateFormat(item.updatedAt)}
                    </p>
                {/if}
            </div>
        </div>
    </a>
</div>

<style>
    .videoThumbTitle {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px; /* Adjust padding as needed */
        z-index: 1;
    }

    .videoThumbTitle h2 {
        font-size: 22px;
        font-weight: 900;
        color: #fff;
        line-height: normal;
        letter-spacing: normal;
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
    }

    .videoThumbCard .videoThumbImg {
        aspect-ratio: 9/16;
        display: block;
        border-radius: 5px;
    }

    .card-link {
        position: relative; /* Ensure the link is a positioning context for absolutely positioned elements */
    }

    .p-0 p {
        position: absolute;
        bottom: 10px; /* Adjust as needed */
        left: 10px; /* Adjust as needed */
        font-size: 16px;
        line-height: 1.5;
        color: #fff; /* Adjust text color as needed */
        z-index: 2; /* Ensure the text is above the background */
    }
</style>
