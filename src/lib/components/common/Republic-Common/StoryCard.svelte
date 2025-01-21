<script lang="ts">
    //@ts-nocheck
    import CardFooter from "$lib/components/common/Republic-Common/CardFooter.svelte";
    import CardTitle from "$lib/components/common/Republic-Common/CardTitle.svelte";
    import { STORY_TYPE, TEMPLATE_TYPE } from "$lib/components/enums/story";
    import { handleError } from "$lib/utils";
    import {
        getFullImageUrl,
        imageDimensionProperty,
    } from "../HybridImage/Constants";
    import { lazyLoad } from "../LazyLoading/LazyLoading";
    import { TEMPLATE, TEMPLATE_PROPERTIES } from "../StoryCard/Constants";
    import AnchorFooter from "./AnchorFooter.svelte";
    import PlayIcon from "./PlayIcon/PlayIcon.svelte";

    // ** Props
    export let envDetails: any = {};
    export let isAmp: boolean = false;
    export let title: string;
    export let summary: string = "";
    export let imageUrl: string = "";
    export let alt: string;
    export let category: any;
    export let time: string;
    export let link: string;
    export let fontColor: string = "#000";
    export let categoryLabel: string = "#D10014";
    export let template: string = "";
    export let story_link: any = {};
    export let template_type: any = "";
    export let columns: any = 1;
    export let borderStyle = "";
    export let classProperties = "";
    export let cardStyle = "";
    export let swiperfontStyle = "";
    export let summaryfontStyle = "";
    export let bigfontStyle = "";
    export let mediumfontStyle = "";
    export let video: any = "";
    export let storyType: any = "";
    export let stickerData: any = "";
    export let prefixData: any = {};
    export let relatedStories: any[] = [];
    export let device: "desktop" | "mobile" = "desktop";
    export let customImageDimension: any = {};
    export let author_anchor_name: string = "";
    export let author_anchor_link: string = "";
    export let primaryColor: any = "";
    export let cardBgColor: any = "";
    export let secondaryColor: any = "";
    export let grid: any = 1;
    export let lazyLoading: boolean = true;
    export let gridTemplate: any = "";
    export let defaultClassName: any = "";
    export let widgetGrid: any = "";
    export let categoryLabelClassName: any = "";
    export let templateName: string = "";
    export let extraData: any = {};

    let imageDimension = { width: "100%", height: "100%" };
    if (Object.keys(customImageDimension)?.length) {
        imageDimension = customImageDimension;
    } else {
        if (template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.lgImage;
        } else if (
            template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM
        ) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
        } else if (
            template_type ===
                TEMPLATE_PROPERTIES.STORY_CARD.type.ANCHOR_STORY ||
            template_type ===
                TEMPLATE_PROPERTIES.STORY_CARD.type.ANCHOR_STORY_FLIP
        ) {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
        } else {
            imageDimension =
                imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
        }
    }
    const gridValue = grid || 1; // Default to grid 1 if not provided
    const deviceType = device; // Assuming device is provided
    const dataColumns = columns || 1; // Default to 1 if not provided

    // Extract styles from envDetails
    const gridStyles =
        envDetails?.styleProperties?.[template]?.[template_type]?.fontStyle?.[
            deviceType
        ];

    // Default to style for grid 1 if grid is not 1 or 2
    const defaultStyle = gridStyles?.[1]?.[dataColumns] ?? "";
    const actualStyle =
        gridValue === 1 || gridValue == 2
            ? (gridStyles?.[gridValue]?.[dataColumns] ?? "")
            : defaultStyle;

    // Calculate PlayIcon size based on image dimensions
    let imageHeight =
        device === "desktop" &&
        widgetGrid == "30" &&
        template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM &&
        columns == 1
            ? (imageDimensionProperty?.[device]?.aspectVideo?.mdImage?.height ??
              "")
            : imageDimension.height;

    let imageWidth =
        device === "desktop" &&
        widgetGrid == "30" &&
        template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM &&
        columns == 1
            ? (imageDimensionProperty?.[device]?.aspectVideo?.mdImage?.width ??
              "")
            : imageDimension.width;

    let playIconSize;
    if (imageHeight < 200 || imageWidth < 200) {
        // Small thumbnail
        playIconSize = 22;
    } else if (imageHeight <= 350 || imageWidth <= 500) {
        // Medium thumbnail
        playIconSize = 36;
    } else {
        // Large thumbnail
        playIconSize = 56;
    }

    function getBigBreakingImageSize(gridTemplate) {
        if (gridTemplate === "BIG_BREAKING_NEWS" && device === "desktop") {
            return `width:740px;height:400px;object-fit:cover;`;
        } else if (
            gridTemplate === "BIG_BREAKING_NEWS" &&
            device === "mobile"
        ) {
            return `width:100%; object-fit:cover;`;
        } else {
            return "width:100%; height:100%;";
        }
    }
</script>

{#if template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG || template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM || template_type === TEMPLATE_PROPERTIES.STORY_CARD.type["4_3"]}
    <div
        class="w-auto"
        style={cardBgColor && device == "desktop"
            ? `border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: ${
                  cardBgColor ?? ""
              }; ${gridTemplate === "BIG_BREAKING_NEWS" ? "" : "padding:12px;"}`
            : ""}
    >
        {#if templateName === "budget-over-the-years"}
            <div class="relative">
                <a
                    data-sveltekit-reload
                    target="_self"
                    class="black"
                    href={isAmp ? "/amp/" + link : "/" + link}
                >
                    {#if isAmp}
                        <amp-img
                            src={extraData?.deep_focus_image || imageUrl}
                            {alt}
                            layout="responsive"
                            width="16"
                            height="9"
                        />
                    {:else if lazyLoading}
                        <img
                            class="lazy-loading-img"
                            use:lazyLoad={getFullImageUrl(
                                extraData?.deep_focus_image || imageUrl,
                                { width: 280 },
                            )}
                            {alt}
                            on:error={handleError}
                            decoding="async"
                            data-nimg="fill"
                            loading="lazy"
                            style={`width:100%; ${
                                device === "desktop" &&
                                template_type ===
                                    TEMPLATE_PROPERTIES.STORY_CARD.type
                                        .MEDIUM &&
                                columns == 1 &&
                                templateName !== "budget-over-the-years" &&
                                `border-radius: 2px; height:${
                                    imageDimensionProperty?.[device]
                                        ?.aspectVideo?.mdImage?.height ?? ""
                                }px;`
                            }`}
                            {...imageDimension}
                        />
                    {:else}
                        <img
                            src={extraData?.deep_focus_image || imageUrl}
                            {alt}
                            on:error={handleError}
                            decoding="async"
                            data-nimg="fill"
                            loading="lazy"
                            style={`width:100%;  ${
                                device === "desktop" &&
                                template_type ===
                                    TEMPLATE_PROPERTIES.STORY_CARD.type
                                        .MEDIUM &&
                                columns == 1 &&
                                `height:${
                                    imageDimensionProperty?.[device]
                                        ?.aspectVideo?.mdImage?.height ?? ""
                                }px;`
                            }`}
                            {...imageDimension}
                        />
                    {/if}
                </a>
            </div>
        {:else}
            <div class="relative">
                <a
                    data-sveltekit-reload
                    target="_self"
                    class="black"
                    href={isAmp ? "/amp/" + link : "/" + link}
                >
                    {#if isAmp}
                        <amp-img
                            src={imageUrl}
                            {alt}
                            layout="responsive"
                            width="16"
                            height="9"
                        />
                    {:else if lazyLoading}
                        <img
                            use:lazyLoad={imageUrl}
                            class="lazy-loading-img"
                            {alt}
                            on:error={handleError}
                            decoding="async"
                            data-nimg="fill"
                            loading="lazy"
                            style={`width:100%; ${
                                device === "desktop" &&
                                widgetGrid == "30" &&
                                template_type ===
                                    TEMPLATE_PROPERTIES.STORY_CARD.type
                                        .MEDIUM &&
                                columns == 1 &&
                                `height:${
                                    imageDimensionProperty?.[device]
                                        ?.aspectVideo?.mdImage?.height ?? ""
                                }px;`
                            }`}
                            {...imageDimension}
                        />
                    {:else}
                        <img
                            src={imageUrl}
                            {alt}
                            decoding="async"
                            data-nimg="fill"
                            fetchpriority="high"
                            on:error={handleError}
                            loading="eager"
                            style={`${getBigBreakingImageSize(gridTemplate)} ${
                                device === "desktop" &&
                                template_type ===
                                    TEMPLATE_PROPERTIES.STORY_CARD.type
                                        .MEDIUM &&
                                columns == 1 &&
                                `height:${
                                    imageDimensionProperty?.[device]
                                        ?.aspectVideo?.mdImage?.height ?? ""
                                }px;`
                            }`}
                            {...imageDimension}
                        />
                    {/if}
                </a>
                {#if storyType === STORY_TYPE.VIDEO.value || storyType === STORY_TYPE.SHOW.value || storyType === STORY_TYPE.DEBATE.value}
                    <PlayIcon duration={video?.duration} size={playIconSize} />
                {/if}
            </div>
            {#if stickerData?.name?.length}
                <div
                    class="mt-3 {envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? 'text-sm desktop:text-base'
                        : 'text-xs'} px-[10px] py-1 w-fit text-xs font-extrabold uppercase tracking-[0.48px]"
                    style="padding-top: {envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? '0.5rem'
                        : '6px'};background-color: {stickerData?.sticker
                        ?.backgroundColor ??
                        ''};font-family: {envDetails?.secondaryFont}; font-style: {stickerData
                        ?.sticker?.bold
                        ? 'bold'
                        : 'italic'}; color: {stickerData?.sticker?.fontColor ??
                        ''};"
                >
                    {stickerData?.name}
                </div>
            {/if}
            {#if device === "desktop" && gridTemplate === "BIG_BREAKING_NEWS" ? false : true}
                <CardTitle
                    {link}
                    {isAmp}
                    classes="text-[18px] font-black leading-[140%] tracking-[-0.72px] overflow-hidden text-ellipsis desktop:line-clamp-3 mt-3 {classProperties ??
                        ''}"
                    style={`color:${primaryColor ?? ""};${actualStyle}`}
                >
                    {#if prefixData?.name}
                        <span style="color:{secondaryColor ?? ''}">
                            {prefixData?.name}/
                        </span>
                    {/if}
                    {title}
                </CardTitle>
            {/if}
            {#if device === "desktop" && gridTemplate === "BIG_BREAKING_NEWS" ? false : true}
                <CardFooter
                    {category}
                    {link}
                    {isAmp}
                    style="color: {secondaryColor ?? ''}"
                    {categoryLabel}
                    {envDetails}
                    className={`${categoryLabelClassName} ${
                        envDetails?.language === "MH" ||
                        (envDetails?.language === "H" &&
                            template_type ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM) ||
                        template_type ===
                            TEMPLATE_PROPERTIES.STORY_CARD.type.BIG
                            ? "desktop:pt-[0px]"
                            : "pt-2"
                    }`}
                />
            {/if}
            {#if relatedStories?.length}
                <div class="flex flex-col">
                    <div
                        class="w-fit px-3 py-1 mt-5 mb-2 text-xs font-semibold uppercase text-white bg-[#FF3930]"
                    >
                        RELATED
                    </div>
                    <div
                        class="w-full flex flex-col items-start justify-center gap-2"
                    >
                        {#each relatedStories?.filter((_, index) => index < 3) as eachStory}
                            <a
                                target="_self"
                                href={isAmp
                                    ? "/amp/" + eachStory?.completeSlug
                                    : "/" + eachStory?.completeSlug || "/"}
                            >
                                <h4
                                    class="w-full text-lg font-semibold underline line-clamp-2 decoration-[#B10203]/30"
                                >
                                    {eachStory?.mid_heading || ""}
                                </h4>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    </div>
{/if}

{#if template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT || template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.NOIMAGE || template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP || template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP_4_3 || template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.EQUALDEFAULT}
    <div
        class={`hrcards horizontalImgCard relative overflow-hidden cardsHover w-full 
        ${isAmp ? "flex items-center justify-center" : ""}
  ${
      gridTemplate !== TEMPLATE_PROPERTIES.VIDEO_CENTER.key ? "" : ""
  } ${defaultClassName}
`}
        style="{borderStyle ?? ''};{cardBgColor &&
        columns === '1' &&
        device == 'desktop'
            ? cardStyle != ''
                ? cardStyle
                : `border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background-color: ${
                      cardBgColor ?? ''
                  };padding:16px;border-radius: 4px;`
            : ''}"
    >
        <div
            class={`w-full flex flex-wrap gap-2 justify-between desktop:gap-[11px] ${
                grid >= 3 &&
                columns == 2 &&
                template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT &&
                "desktop:p-3"
            }`}
        >
            {#if stickerData?.name && template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT}
                <div
                    class="px-[10px] {envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? 'text-sm desktop:text-base'
                        : 'text-xs'} py-1 w-fit font-extrabold uppercase tracking-[0.48px]"
                    style="padding-top: {envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? '0.5rem'
                        : '6px'};background-color: {stickerData?.sticker
                        ?.backgroundColor ??
                        ''};font-family: {envDetails?.secondaryFont}; font-style: {stickerData
                        ?.sticker?.bold
                        ? 'bold'
                        : 'italic'}; color: {stickerData?.sticker?.fontColor ??
                        ''}"
                >
                    {stickerData?.name}
                </div>
            {/if}
            <div
                class="flex w-full {isAmp
                    ? 'items-center justify-between'
                    : ''} {template_type ===
                TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP_4_3
                    ? 'gap-3'
                    : 'gap-2'} {template_type ===
                    TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP ||
                template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP_4_3
                    ? 'flex-row-reverse'
                    : 'flex-row'}"
            >
                <div
                    class={`${
                        template_type ===
                        TEMPLATE_PROPERTIES.STORY_CARD.type.NOIMAGE
                            ? "w-full"
                            : " w-3/5"
                    } ${
                        (template_type ===
                            TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP &&
                            gridTemplate !==
                                TEMPLATE_PROPERTIES.VIDEO_CENTER.key &&
                            grid >= 2 &&
                            columns == 1) ||
                        template_type ===
                            TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP_4_3 ||
                        template_type ===
                            TEMPLATE_PROPERTIES.STORY_CARD.type.EQUALDEFAULT
                            ? "flex-1"
                            : ""
                    }`}
                >
                    <div class="flex flex-col h-full gap-0 justify-center">
                        {#if stickerData?.name && template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP}
                            <div
                                class="px-[10px] py-1 w-fit {envDetails?.language ===
                                    'MH' || envDetails?.language === 'H'
                                    ? 'text-sm desktop:text-base'
                                    : 'text-xs'} font-extrabold uppercase tracking-[0.48px]"
                                style="padding-top: {envDetails?.language ===
                                    'MH' || envDetails?.language === 'H'
                                    ? '0.5rem'
                                    : '6px'};font-family: {envDetails?.secondaryFont};background-color: {stickerData
                                    ?.sticker?.backgroundColor ??
                                    ''}; font-style: {stickerData?.sticker?.bold
                                    ? 'bold'
                                    : 'italic'}; color: {stickerData?.sticker
                                    ?.fontColor ?? ''}"
                            >
                                {stickerData?.name}
                            </div>
                        {/if}
                        <CardTitle
                            {link}
                            {isAmp}
                            classes="text-[17px] text-left font-medium leading-normal whitespace-normal overflow-hidden text-ellipsis line-clamp-3"
                            style={`color: ${
                                primaryColor ?? ""
                            };${actualStyle}`}
                        >
                            {#if prefixData?.name}
                                <span style="color:{secondaryColor ?? ''}"
                                    >{prefixData?.name}/</span
                                >
                            {/if}
                            {title}
                        </CardTitle>
                        {#if summary && grid === 2 && template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT}
                            <span
                                style="color:{primaryColor ??
                                    ''};{summaryfontStyle ??
                                    ''};padding-top:12px;">{summary}</span
                            >
                        {/if}
                        <CardFooter
                            {category}
                            {link}
                            {isAmp}
                            style="color:{secondaryColor ?? ''}"
                            {categoryLabel}
                            {envDetails}
                            className={"desktop:pt-2"}
                        />
                    </div>
                </div>
                {#if template_type !== TEMPLATE_TYPE.NO_IMAGE}
                    <div
                        class={`imgWrapper relative w-2/5 h-fit ${
                            (template_type ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP &&
                                grid >= 2 &&
                                columns == 1) ||
                            template_type ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP_4_3 ||
                            template_type ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.EQUALDEFAULT
                                ? "flex-1"
                                : ""
                        }`}
                        style="position: relative; width: 40%; min-width: 40%; height: fit-content;aspect-ratio:{imageDimension?.width + "/" + imageDimension?.height};"
                    >
                        <div class="cardImg ImgThumb innerThumRadius">
                            <a
                                data-sveltekit-reload
                                target="_self"
                                class="black"
                                href={isAmp ? "/amp/" + link : "/" + link}
                            >
                                {#if isAmp}
                                    <amp-img
                                        src={imageUrl}
                                        {alt}
                                        width="16"
                                        height="9"
                                        layout="responsive"
                                    />
                                {:else if lazyLoading}
                                    <img
                                        class="lazy-loading-img"
                                        use:lazyLoad={imageUrl}
                                        {alt}
                                        on:error={handleError}
                                        decoding="async"
                                        data-nimg="fill"
                                        loading="lazy"
                                        style={`width:100%; ${
                                            device === "desktop" &&
                                            template_type ===
                                                TEMPLATE_PROPERTIES.STORY_CARD
                                                    .type.MEDIUM &&
                                            columns == 1 &&
                                            `height:${
                                                imageDimensionProperty?.[device]
                                                    ?.aspectVideo?.mdImage
                                                    ?.height ?? ""
                                            }px;`
                                        }`}
                                        {...imageDimension}
                                    />
                                {:else}
                                    <img
                                        src={imageUrl}
                                        {alt}
                                        on:error={handleError}
                                        decoding="async"
                                        data-nimg="fill"
                                        loading="lazy"
                                        style={`width:100%; ${
                                            device === "desktop" &&
                                            template_type ===
                                                TEMPLATE_PROPERTIES.STORY_CARD
                                                    .type.MEDIUM &&
                                            columns == 1 &&
                                            `height:${
                                                imageDimensionProperty?.[device]
                                                    ?.aspectVideo?.mdImage
                                                    ?.height ?? ""
                                            }px;`
                                        }`}
                                        {...imageDimension}
                                    />
                                {/if}
                            </a>
                        </div>
                        {#if storyType === STORY_TYPE.VIDEO.value || storyType === STORY_TYPE.SHOW.value || storyType === STORY_TYPE.DEBATE.value}
                            <PlayIcon
                                duration={video?.duration}
                                size={playIconSize}
                            />
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

{#if template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.ANCHOR_STORY}
    <div
        class="w-full flex flex-col gap-4 items-center justify-center text-center"
    >
        <div class="flex-1 flex items-center justify-center">
            {#if isAmp}
                <amp-img
                    class="min-w-[164px] max-w-[164px] w-full desktop:w-2/3 aspect-square object-cover rounded-full"
                    src={imageUrl}
                    {alt}
                    height="130px"
                />
            {:else}
                <img
                    class="min-w-[164px] max-w-[164px] w-full desktop:w-2/3 aspect-square object-cover rounded-full"
                    src={imageUrl}
                    {alt}
                    on:error={handleError}
                    loading="lazy"
                    {...imageDimension}
                />
            {/if}
        </div>
        <div class="flex flex-col flex-1 gap-4 justify-center items-center">
            {#if stickerData?.name?.length}
                <div
                    class="w-fit h-8 flex items-center text-base font-semibold capitalize tracking-[-0.32px] px-3 py-[6px]"
                    style="font-size: {envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? '16px'
                        : '12px'};padding-top: {envDetails?.language === 'MH' ||
                    envDetails?.language === 'H'
                        ? '0.5rem'
                        : '6px'};background-color: {stickerData?.sticker
                        ?.backgroundColor ??
                        ''};font-family: {envDetails?.secondaryFont}; font-style: {stickerData
                        ?.sticker?.bold
                        ? 'bold'
                        : 'italic'}; color: {stickerData?.sticker?.fontColor ??
                        ''};"
                >
                    {stickerData?.name ?? ""}
                </div>
            {/if}
            <CardTitle
                link={story_link}
                {isAmp}
                classes="text-[18px] font-black leading-9 overflow-hidden text-ellipsis line-clamp-3 {classProperties ??
                    ''}"
                style="color:{fontColor ??
                    ''};font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;height:86px;"
                >{title}</CardTitle
            >
            <AnchorFooter
                {classProperties}
                {author_anchor_name}
                {author_anchor_link}
            />
        </div>
    </div>
{/if}

{#if template_type === TEMPLATE_PROPERTIES.STORY_CARD.type.ANCHOR_STORY_FLIP}
    <div
        class="hrcards horizontalImgCard relative overflow-hidden cardsHover w-full"
        style={borderStyle ?? ""}
    >
        <div
            class="w-full flex gap-3 topicTagWrap withTagDesc p-3  {columns == 1 ? "desktop:p-0" :"desktop:px-7 desktop:py-6"}"
        >
            <div style="width: 26%;"
                class="flex items-start justify-center cardImg ImgThumb innerThumRadius"
            >
                {#if isAmp}
                    <amp-img
                        class="w-full aspect-square object-cover rounded-full"
                        src={imageUrl}
                        {alt}
                        width="1"
                        height="1"
                        layout="responsive"
                    />
                {:else}
                    <img
                        class="w-full aspect-square object-cover rounded-full"
                        src={imageUrl}
                        {alt}
                        on:error={handleError}
                        loading="lazy"
                        {...imageDimension}
                    />
                {/if}
            </div>
            <div
                style="width: 74%;"
                class="topicTagContent w-[74%] flex flex-col gap-3 desktop:w-4/5"
            >
                <div class="topicTagHead">
                    <CardTitle
                        link={story_link}
                        {isAmp}
                        classes="text-[16px] font-semibold leading-[120%] overflow-hidden text-ellipsis tracking-[-0.3px] line-clamp-2 {columns == 1 ? "desktop:text-[18px] desktop:font-semibold" : "desktop:text-xl  desktop:font-bold"} desktop:leading-6 desktop:tracking-[-0.4px] {classProperties ??
                            ''}"
                        style="color:{fontColor ?? ''};">{title}</CardTitle
                    >
                </div>
                <div class="topicTagDesc">
                    <AnchorFooter
                        {classProperties}
                        {author_anchor_name}
                        {author_anchor_link}
                    />
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .smThumbListing .horizontalImgCard .horicardRight .cardImg {
        aspect-ratio: 16/9;
        display: block;
        border-radius: 2px;
        position: relative;
        overflow: hidden;
    }
</style>
