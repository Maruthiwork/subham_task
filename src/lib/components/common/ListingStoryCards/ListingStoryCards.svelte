<script lang="ts">
    import { STORY_TYPE } from "$lib/components/enums/story";

    //@ts-nocheck
    import {
        ConvertDateFormat,
        getViewMoreLabel,
    } from "$lib/components/utils/utils";

    import type { Story } from "../Sidebar/Types";
    import {
        IMAGE_ASPECT_RATIO,
        generateAspectRatioImageURL,
        imageDimensionProperty,
    } from "../HybridImage/Constants";
    import { lazyLoad } from "../LazyLoading/LazyLoading";
    import Divider from "../Republic-Common/Divider.svelte";
    import ViewMoreBtn from "../Republic-Common/ViewMoreBtn.svelte";
    import { TEMPLATE, TEMPLATE_PROPERTIES } from "../StoryCard/Constants";

    //props
    export let isAmp: boolean = false;
    export let widgetWithStory: any;
    export let envDetails;
    export let timeLabel: boolean = false;
    export let url: boolean = false;
    export let dataCols: any = 1;
    export let template: any = "";
    export let device: "desktop" | "mobile" = "desktop";
    export let grid: any = "";
    export let template_type: any = "";
    export let aspectRatio: any = template_type;

    export let language = "E";

    let stories: Story[] = widgetWithStory.story;

    let classProperties = "bg-white border border-gray-200 rounded-lg shadow mb-4 max-w-fit"
           

    let imageDimension = { width: "100%", height: "100%" };
    if (device?.length && aspectRatio) {
        if (aspectRatio === IMAGE_ASPECT_RATIO?.["16_9"]?.key) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
        } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["1_1"]?.key) {
            if (dataCols >= 1 && dataCols <= 3) {
                imageDimension =
                    imageDimensionProperty?.[device]?.aspectSquare?.lgImage;
            } else if (dataCols >= 4 && dataCols <= 5) {
                imageDimension =
                    imageDimensionProperty?.[device]?.aspectSquare?.baseImage;
            }
        } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["9_16"]?.key) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVerticalVideo
                    ?.baseImage;
        } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["3_4"]?.key) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVerticalVideo?.xsImage;
        } else if (
            device === "desktop" &&
            template_type === TEMPLATE_PROPERTIES.SWIPER_CARD.type.DEFAULT
        ) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.smImage;
        } else {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
        }
    }
</script>

{#if template === TEMPLATE.STORY_CARD_LISTING}
    <div class="smThumbContainer">
        <div
            class="carousel-container"
            style={`background-color:${widgetWithStory?.widget?.bgColor ? widgetWithStory?.widget?.bgColor : "none"};color:${widgetWithStory?.widget?.primaryColor ? widgetWithStory?.widget?.primaryColor : "#000000"};padding:${widgetWithStory?.widget?.bgColor ? "" : ""}`}
            id={widgetWithStory?.widget?._id}
        >
            <div
                class="grid"
                style="--columns: {dataCols}; row-gap: 0; column-gap: 12px; grid-template-columns: repeat({dataCols}, 1fr)"
            >
                {#each stories as item, index}
                    <div class="carousel-item">
                        <div
                            class="flexCardCol desktop:w-[156px]"
                            style={widgetWithStory?.widget?.cardBgColor
                                ? `border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.10); background: ${widgetWithStory?.widget?.cardBgColor ?? ""}; padding: 12px;`
                                : ""}
                        >
                            <div
                                class={template_type ==
                                    TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                                item?.story_type === STORY_TYPE.GALLERY.value
                                    ? classProperties
                                    : ""}
                            >
                                <div
                                    class="w-auto relative flex flex-col {template_type ==
                                        TEMPLATE_PROPERTIES.SWIPER_CARD
                                            .type[34] ||
                                    item?.story_type ===
                                        STORY_TYPE.GALLERY.value
                                        ? 'gap-0'
                                        : 'gap-2'}"
                                >
                                    <a
                                        data-sveltekit-reload
                                        href={`${isAmp ? "/amp/" : "/"}${item?.completeSlug}`}
                                        target={template_type ==
                                        TEMPLATE_PROPERTIES.SWIPER_CARD.type[34]
                                            ? "_blank"
                                            : "_self"}
                                    >
                                        <div
                                            class="relative w-auto {template_type ==
                                            TEMPLATE_PROPERTIES.SWIPER_CARD
                                                .type[34]
                                                ? 'webstoriesIco'
                                                : ''}"
                                        >
                                            {#if isAmp}
                                                <amp-img
                                                    class="rounded-t-lg"
                                                    src={generateAspectRatioImageURL(
                                                        item?.images,
                                                        imageDimension,
                                                        IMAGE_ASPECT_RATIO[
                                                            aspectRatio
                                                        ]?.key ?? aspectRatio,
                                                    )}
                                                    style="width: 100%;"
                                                    {...imageDimension}
                                                    alt={item?.images
                                                        ?.versions?.[
                                                        aspectRatio
                                                    ]?.alt || "video_img"}
                                                    layout="responsive"
                                                ></amp-img>
                                            {:else}
                                                <img
                                                    class="lazy-loading-img {template_type ==
                                                        TEMPLATE_PROPERTIES
                                                            .SWIPER_CARD
                                                            .type[34] &&
                                                    template_type ==
                                                        TEMPLATE_PROPERTIES
                                                            .SWIPER_CARD
                                                            .type[43]
                                                        ? 'rounded-t-lg'
                                                        : ''}"
                                                    use:lazyLoad={generateAspectRatioImageURL(
                                                        item?.images,
                                                        imageDimension,
                                                        IMAGE_ASPECT_RATIO[
                                                            aspectRatio
                                                        ]?.key ?? aspectRatio,
                                                    )}
                                                    decoding="async"
                                                    data-nimg="fill"
                                                    loading="lazy"
                                                    style="width: 100%;"
                                                    {...imageDimension}
                                                    alt={item?.images
                                                        ?.versions?.[
                                                        aspectRatio
                                                    ]?.alt || "video_img"}
                                                />
                                                {#if item?.story_type === STORY_TYPE.GALLERY.value}
                                                    <div class="cameraIcon">
                                                        <span
                                                            >{item?.gallery_image_count}</span
                                                        >
                                                    </div>
                                                {/if}
                                            {/if}
                                        </div>
                                    </a>
                                    <div class="p-0">
                                        <a
                                            data-sveltekit-reload
                                            href={`${isAmp ? "/amp/" : "/"}${item?.completeSlug}`}
                                        >
                                            <p
                                                style={`color:${widgetWithStory?.widget?.primaryColor ?? ""};${envDetails?.styleProperties?.[template]?.[template_type]?.fontStyle?.[device][grid || 1][dataCols || 1] ?? ""}`}
                                                class={`!line-clamp-2 tracking-normal ${
                                                    template_type ==
                                                        TEMPLATE_PROPERTIES
                                                            .SWIPER_CARD
                                                            .type[34] ||
                                                    item?.story_type ===
                                                        STORY_TYPE.GALLERY.value
                                                        ? "mx-2 my-3"
                                                        : "font-bold whitespace-nowrap"
                                                }`}
                                            >
                                                {item?.mid_heading}
                                            </p>
                                        </a>
                                        {#if timeLabel === true}
                                            <p
                                                class="cardTime"
                                                style="font-size: 10px;"
                                            >
                                                {ConvertDateFormat(
                                                    item?.updatedAt,
                                                    "MMM DD, YYYY",
                                                )}
                                            </p>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {#if (index + 1) % dataCols === 0 && index !== stories.length - 1}
                        <div
                            class="full-width-divider"
                            style="grid-column: 1 / -1; margin: 12px 0;"
                        >
                            <Divider classes={"my-6 w-full"} />
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
{/if}
{#if template === TEMPLATE.STORY_CARD_LISTING_IN_PICTURE}
    <div
        class="inpicture-carousel-container grid w-full"
        style="--columns: {dataCols}; row-gap: 0; column-gap: 12px; grid-template-columns: repeat({dataCols}, 1fr)"
    >
        {#each stories as item, index}
            <div
                class="flexCardCol"
                style={widgetWithStory?.widget?.cardBgColor
                    ? `border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: ${widgetWithStory?.widget?.cardBgColor};padding:12px;margin-bottom:20px;`
                    : ""}
            >
                <div class="videoThumbCard cardsHover">
                    <a
                        data-sveltekit-reload
                        href={`${isAmp ? "/amp/" : "/"}${item?.completeSlug}`}
                        class="relative overflow-hidden table"
                    >
                        {#if isAmp}
                            <amp-img
                                class="videoThumbImg"
                                src={generateAspectRatioImageURL(
                                    item?.images,
                                    imageDimension,
                                    IMAGE_ASPECT_RATIO[aspectRatio]?.key ??
                                        aspectRatio,
                                )}
                                style="width:100%;"
                                {...imageDimension}
                                alt={item?.images?.versions?.[aspectRatio]
                                    ?.alt || "video_img"}
                                layout="responsive"
                            ></amp-img>
                        {:else}
                            <img
                                class="videoThumbImg lazy-loading-img"
                                use:lazyLoad={generateAspectRatioImageURL(
                                    item?.images,
                                    imageDimension,
                                    IMAGE_ASPECT_RATIO[aspectRatio]?.key ??
                                        aspectRatio,
                                )}
                                decoding="async"
                                data-nimg="fill"
                                loading="lazy"
                                style="width:100%;"
                                {...imageDimension}
                                alt={item?.images?.versions?.[aspectRatio]
                                    ?.alt || "video_img"}
                            />
                        {/if}

                        <div class="videoThumbTitle">
                            <span class="playIcon playTopLeftsm"></span>
                            <div class="sqThumbOvertxt whitetxt">
                                <div class="cardTitle darkCardTitle">
                                    <h2>{item.mid_heading}</h2>
                                </div>
                                {#if item?.categoryData?.name !== "Shorts"}
                                    <div class="cardftr darkCardftr">
                                        {#if item?.categoryData?.name}
                                            <span
                                                class="cardLabel pr-[6px] mr-[6px]"
                                                ><a
                                                    data-sveltekit-reload
                                                    target="_self"
                                                    href={`${isAmp ? "/amp/" : "/"}${item?.categoryData?.slug}`}
                                                    class="text-white text-sm"
                                                    style="font-family: {envDetails.secondaryFont ??
                                                        ''};"
                                                    >{item?.categoryData
                                                        ?.frontend_name ||
                                                        item?.categoryData
                                                            ?.name}</a
                                                ></span
                                            >
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            {#if (index + 1) % dataCols === 0 && index !== stories.length - 1}
                <div
                    class="full-width-divider"
                    style="grid-column: 1 / -1; margin: 12px 0;"
                >
                    <Divider classes={"my-6 w-full"} />
                </div>
            {/if}
        {/each}
    </div>
{/if}
{#if url && url.length > 0}
    <ViewMoreBtn
        {language}
        text={getViewMoreLabel(language)}
        {url}
        backgroundColor={widgetWithStory?.widget?.primaryColor}
        fontColor={widgetWithStory?.widget?.secondaryColor}
    />
{/if}

<style>
    .sqThumbOvertxt {
        position: absolute;
        left: 12px;
        bottom: 15px;
        width: 90%;
        z-index: 2;
    }
    .videoThumbTitle h2 {
        font-size: 24px;
        font-weight: 900;
        color: #fff;
        left: 0;
        right: 0;
        line-height: 155%;
        letter-spacing: normal;
        z-index: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        line-height: 120%; /* 28.8px */
        letter-spacing: -0.96px;
    }
    .videoThumbCard .videoThumbImg {
        display: block;
        border-radius: 5px;
    }

    .p-0 p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
        height: fit-content;
        padding: 0;
        font-size: 16px;
        line-height: 1.5;
        height: 100%;
    }
    .dot {
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        width: 8px;
        height: 8px;
    }
    .selected {
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.7);
        width: 16px;
        height: 8px;
    }
    .playIcon.playTopLeftsm {
        top: 10px;
        left: 10px;
        width: 32px;
        height: 32px;
    }
    .playIcon {
        position: absolute;
        z-index: 1;
        -o-object-fit: cover;
        object-fit: cover;
        background-image: url("https://img.republicworld.com/icons/icons/Play.svg");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .webstoriesIco:after,
    .webstoriesIconRightSide:after {
        position: absolute;
        content: "";
        background-image: url("https://img.republicworld.com/icons/icons/Icon_Webstories.svg");
        background-repeat: no-repeat;
        background-size: cover;
        height: 30px;
        width: 30px;
        display: block;
    }
    .webstoriesIco:after {
        top: 4px;
        right: 3px;
    }
    .grid {
        display: grid;
    }
    .full-width-divider {
        grid-column: 1 / -1;
    }
    .cameraIcon {
    width: 39px;
    height: 30px;
  }
  .cameraIcon {
    position: absolute;
    top: 0;
    background: #d10014;
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 4px 0 4px 0;
  }
  .cameraIcon:before,
  .listenIcon {
    background-repeat: no-repeat;
    background-size: cover;
    height: 28px;
    display: block;
  }
  .cameraIcon:before {
    position: relative;
    content: "";
    background-image: url($lib/assets/images/camera.svg);
    width: 24px;
    top: 0;
    left: 0;
  }
  .cameraIcon span {
    font-size: 12px;
    padding-left: 2px;
    color: #fff;
    font-family: "Mulish";
  }
  @media (max-width: 768px) {
    .videoThumbTitle h2 {
      font-size: 20px;
      font-weight: 900;
      line-height: 115%;
      letter-spacing: -0.8px;
    }
  }
</style>
