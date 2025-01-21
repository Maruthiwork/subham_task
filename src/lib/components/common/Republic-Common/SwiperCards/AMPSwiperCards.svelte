<script lang="ts">
  // @ts-nocheck
  import { STORY_TYPE, TEMPLATE_TYPE } from "$lib/components/enums/story";

  import { EnvironmentConfig } from "../../../utils/environmentConfig";
  import { getTemplateType } from "$lib/components/utils/utils";
  import { TEMPLATE, TEMPLATE_PROPERTIES } from "../../StoryCard/Constants";
  import {
    generateAspectRatioImageURL,
    IMAGE_ASPECT_RATIO,
    imageDimensionProperty,
  } from "../../HybridImage/Constants";
  import StoryCard from "../StoryCard.svelte";
  import PlayIcon from "../PlayIcon/PlayIcon.svelte";
  import ViewMoreBtn from "../ViewMoreBtn.svelte";

  export let widgetWithStory: WidgetWithStory;
  export let eachStory: any;
  export let envDetails;
  export let cardType: string = "";
  export let swiperWidth: string = "";
  export let cardHeight: string = "100%";
  export let cardWidth: string = "100%";
  export let categoryLabel: boolean = false;
  export let timeLabel: boolean = false;
  export let url: boolean = false;
  export let storyType: string = "";
  export let dataCols: any = 1;
  export let template: any = "";
  export let device: "desktop" | "mobile" = "desktop";
  export let grid: any = "";
  export let language: string = "E";
  export let headingClasses: string = "";
  export let swiperFooterClasses: string = "";
  export let template_type: any = "";
  export let aspectRatio: any = template_type;

  let stories: Story[] = widgetWithStory.story;

  let classProperties =
    "bg-white border border-gray-200 rounded-lg shadow  mb-4 w-full h-fit";

  let imageDimension = { width: "100%", height: "100%" };
  if (device?.length && aspectRatio) {
    if (aspectRatio === IMAGE_ASPECT_RATIO?.["16_9"]?.key) {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
    } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["1_1"]?.key) {
      if (dataCols >= 1 && dataCols <= 3) {
        imageDimension =
          imageDimensionProperty?.[device]?.aspectSquare?.lgImage;
      } else if (dataCols >= 4 && dataCols <= 5) {
        imageDimension =
          imageDimensionProperty?.[device]?.aspectSquare?.baseImage;
      }
    } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["4_3"]?.key) {
      imageDimension = imageDimensionProperty?.[device]?.aspect4_3?.baseImage;
    } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["9_16"]?.key) {
      imageDimension =
        imageDimensionProperty?.[device]?.aspectVerticalVideo?.baseImage;
    } else if (aspectRatio === IMAGE_ASPECT_RATIO?.["3_4"]?.key) {
      imageDimension =
        imageDimensionProperty?.[device]?.aspectVerticalVideo?.xsImage;
    } else if (
      device === "desktop" &&
      template_type === TEMPLATE_PROPERTIES.SWIPER_CARD.type.DEFAULT
    ) {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.smImage;
    } else if (
      device === "desktop" &&
      template_type === TEMPLATE_PROPERTIES.SWIPER_CARD.type.ANCHOR_STORY
    ) {
      imageDimension =
        imageDimensionProperty?.[device]?.aspectSquare?.baseImage;
    } else {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
    }
  }

  const gridValue = grid || 1; // Default to grid 1 if not provided
  const deviceType = device; // Assuming device is provided
  const dataColumns = dataCols || 1; // Default to 1 if not provided

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

  let playIconSize;
  if (imageDimension.width <= 200) {
    // Small thumbnail
    playIconSize = 22;
  } else if (imageDimension.width <= 350) {
    // Medium thumbnail
    playIconSize = 40;
  } else {
    // Large thumbnail
    playIconSize = 56;
  }
  // Map aspect ratio values to width and height
  const aspectRatios = {
    "16_9": {
      width: 16,
      height: 9,
      carouselHeight: "350px",
      carouselWidth: "345px",
      visibleCount: 1
    },
    "1_1": {
      width: 1,
      height: 1,
      carouselHeight: "280px",
      carouselWidth: "350px",
      visibleCount: 1
    },
    "9_16": {
      width: 9,
      height: 16,
      carouselHeight: "273px",
      carouselWidth: "168px",
      visibleCount: 2
    },
    "3_4": {
      width: 3,
      height: 4,
      carouselHeight: "340px",
      carouselWidth: "168px",
      visibleCount: 2
    },
  };

  // Get the corresponding width and height for the dynamic aspect ratio
  const { width, height, carouselHeight, carouselWidth, visibleCount } =
    aspectRatios[aspectRatio] || aspectRatios["16_9"];
</script>

{#if widgetWithStory?.widget?.title}
  <h3
    class={`text-[22px] tracking-[-1.12px] font-black text-black  ${grid == "1" ? "desktop:text-[24px]" : "desktop:text-[28px]"} ${widgetWithStory?.widget?.headerBgColor ? "p-2" : ""}${headingClasses} ${widgetWithStory?.widget?.isBigBreaking ? "desktop:text-xl desktop:font-bold desktop:tracking-[-0.8px] pb-0" : "mb-4"}`}
    style={`background-color:${widgetWithStory?.widget?.headerBgColor ?? ""};color:${widgetWithStory?.widget?.headerColor ?? ""}`}
  >
    {widgetWithStory?.widget?.title}
  </h3>
{/if}
  <amp-base-carousel
  width={carouselWidth}
  height={carouselHeight}
  visible-count={visibleCount}
  role="region"
  layout="responsive"
  style="width:100%;height:{carouselHeight}"
>
{#if stories && stories.length > 0}
{#each stories as item}
  {#if template_type === TEMPLATE_TYPE.FLIP || template_type === TEMPLATE_TYPE.DEFAULT}
    <div class="swiper-slide" style="width:100%; height: 100%;">
      <div
        class={`p-6 ${widgetWithStory?.widget?.cardBgColor ? "desktop:p-6 h-auto" : ""}`}
        style={`background-color:${widgetWithStory?.widget?.cardBgColor};`}
      >
        <StoryCard
          isAmp={true}
          title={item.mid_heading}
          summary={item.short_description}
          imageUrl={template_type === TEMPLATE_TYPE.ANCHOR_STORY || template_type === TEMPLATE_TYPE.ANCHOR_STORY_FLIP ? generateAspectRatioImageURL(
            item?.images,
            imageDimension,
            IMAGE_ASPECT_RATIO["1_1"]?.key,
          ) : generateAspectRatioImageURL(
            item?.images,
            imageDimension,
            IMAGE_ASPECT_RATIO["16_9"]?.key,
          )}
          lazyLoading={true}
          {device}
          {envDetails}
          customImageDimension={imageDimension}
          video={item?.video}
          storyType={item?.story_type}
          stickerData={item?.stickerData}
          alt={item.images?.versions?.["16_9"]?.alt || "story_img"}
          category={item.categoryData || ""}
          time={item.updatedAt}
          link={item.completeSlug}
          {template_type}
          {template}
          primaryColor={widgetWithStory?.widget?.primaryColor}
          secondaryColor={widgetWithStory?.widget?.secondaryColor}
          columns={widgetWithStory?.widget?.[
            device === "desktop" ? "dDataCol" : "mDataCol"
          ]}
          {grid}
          fontColor={"#FFF"}
          categoryLabel={"#FFF"}
          summaryfontStyle={"font-size: 16px;font-weight: 500;line-height: 21.6px;letter-spacing: -0.02em;text-align: left;"}
          swiperfontStyle={dataCols == 1
            ? "font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.96px;text-align: left;"
            : ""}
        />
      </div>
    </div>
  {:else if template_type === TEMPLATE_TYPE.ANCHOR_STORY || template_type === TEMPLATE_TYPE.ANCHOR_STORY_FLIP}
  <div class="swiper-slide flex flex-col items-center h-full">
      <div
        class="w-full flex items-start justify-center h-full"
        style={`background-color: ${widgetWithStory?.widget?.cardBgColor ?? ""};padding:${template_type === TEMPLATE_TYPE.ANCHOR_STORY && widgetWithStory?.widget?.cardBgColor ? "32px 16px 40px 16px" : ""};border-radius: ${widgetWithStory?.widget?.cardBgColor ? "4px" : ""};border: ${widgetWithStory?.widget?.cardBgColor ? "1px solid var(--Strock, rgba(0, 0, 0, 0.16))" : ""};`}
      >
        <StoryCard
          isAmp={true}
          title={item.mid_heading}
          summary={item.mid_heading}
          imageUrl={generateAspectRatioImageURL(
            item?.authorDetail?.image ?? item?.images,
            imageDimension,
            IMAGE_ASPECT_RATIO["1_1"]?.key,
          )}
          {envDetails}
          lazyLoading={true}
          {device}
          customImageDimension={imageDimension}
          video={item?.video}
          storyType={item?.story_type}
          stickerData={item?.stickerData}
          alt={item.images?.versions?.["16_9"]?.alt || "story_img"}
          category={item?.authorDetail?.name || ""}
          time={item?.updatedAt}
          link={item?.authorDetail?.slug ?? ""}
          story_link={item?.completeSlug ?? ""}
          {template_type}
          primaryColor={widgetWithStory?.widget?.primaryColor}
          secondaryColor={widgetWithStory?.widget?.secondaryColor}
          fontColor={"#000000"}
          categoryLabel={"#FFF"}
          author_anchor_name={item?.authorDetail?.name ??
            (item?.authorDetail?.firstName && item?.authorDetail?.lastName
              ? item?.authorDetail?.firstName +
                " " +
                item?.authorDetail?.lastName
              : "")}
          author_anchor_link={item?.authorDetail?.slug ?? ""}
          columns={widgetWithStory?.widget?.[
            device === "desktop" ? "dDataCol" : "mDataCol"
          ]}
          {grid}
        />
      </div>
    </div>
  {:else}
    <div>
      <div
        class="flexCardCol h-full"
        style={widgetWithStory?.widget?.cardBgColor
          ? `border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: ${widgetWithStory?.widget?.cardBgColor};padding:12px;`
          : 'padding:12px'}
      >
        <div
          class={template_type == TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
          item?.story_type === STORY_TYPE.GALLERY.value
            ? classProperties
            : ""}
        >
          <div
            class="relative flex flex-col {template_type ==
              TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
            item?.story_type === STORY_TYPE.GALLERY.value
              ? 'gap-0'
              : 'gap-[8px]'}"
          >
            <a
              data-sveltekit-reload
              href={"/amp/" + item?.completeSlug}
              target={template_type ==
              TEMPLATE_PROPERTIES.SWIPER_CARD.type[34]
                ? "_blank"
                : "_self"}
            >
              <div
                class="relative w-auto {item?.story_type ===
                STORY_TYPE.WEB_STORY.value
                  ? 'webstoriesIco'
                  : ''}"
              >
                <amp-img
                  src={generateAspectRatioImageURL(
                    item?.images,
                    imageDimension,
                    IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio,
                  )}
                  alt={item?.images?.versions?.[aspectRatio]?.alt ||
                    "video_img"}
                  style="width:100%;border-radius: 5px;"
                  {height}
                  {width}
                  layout="responsive"
                />
                {#if item?.story_type === STORY_TYPE.VIDEO.value || item?.story_type === STORY_TYPE.SHOW.value || item?.story_type === STORY_TYPE.DEBATE.value}
                  <PlayIcon
                    duration={item?.video?.duration}
                    size={playIconSize}
                  />
                {/if}
              </div>
            </a>
            <div
              style={template === TEMPLATE.SWIPER_IN_PICTURE_CARD
                ? "background: linear-gradient(180deg, #0000 52.08%, #000);width: 100%;height:92%;position:absolute;color:white;"
                : ""}
            >
              <div
                style={template === TEMPLATE.SWIPER_IN_PICTURE_CARD
                  ? "position:absolute;bottom:10%;width:100%;padding:16px"
                  : "padding:12px 0px"}
              >
                <a data-sveltekit-reload href={"/amp/" + item?.completeSlug}>
                  <p
                    style={`color:${widgetWithStory?.widget?.primaryColor ?? ""};${actualStyle};${template === TEMPLATE.SWIPER_IN_PICTURE_CARD ? "font-size: 20px;font-weight: 900;line-height: 115%;letter-spacing: -.8px;" : ""};${
                      template_type ==
                        TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                      item?.story_type === STORY_TYPE.GALLERY.value
                        ? "height: 44px;-webkit-line-clamp: 3;overflow: hidden;"
                        : ""
                    }`}
                    class={`line-clamp-2 ${
                      template_type ==
                        TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                      item?.story_type === STORY_TYPE.GALLERY.value
                        ? "mx-2 my-3"
                        : "font-extrabold text-2xl leading-[115%] tracking-[-0.96px]"
                    }`}
                  >
                  {template === TEMPLATE.SWIPER_IN_PICTURE_CARD ? item?.small_heading : item?.mid_heading}
                  </p>
                  <!-- {#if widgetWithStory?.widget?.name
                    ?.toLowerCase()
                    .replace(/ /g, "") === "deepdive"}
                    <p class="text-[17px] mt-1">
                      {template === TEMPLATE.SWIPER_IN_PICTURE_CARD ? item?.small_heading :item?.mid_heading}
                    </p>
                  {/if} -->
                </a>
                {#if item.categoryData && template_type !== TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] && item.categoryData && template_type !== TEMPLATE_PROPERTIES.SWIPER_CARD.type[916]}
                  <div
                    class="flex items-center pt-2 {item?.story_type ===
                    STORY_TYPE.GALLERY.value
                      ? 'pl-2 pb-2'
                      : ''}"
                  >
                    <span class="cardLabel">
                      <a
                        data-sveltekit-reload
                        href={"/amp/" + item.categoryData?.completeSlug}
                        style="color:{widgetWithStory?.widget
                          ?.secondaryColor ??
                          ''};font-family: {envDetails.secondaryFont ?? ''};"
                        class="text-sm"
                        >{item.categoryData.frontend_name ||
                          item.categoryData.name}</a
                      >
                    </span>
                  </div>
                {/if}
                {#if url}
                <a
                    data-sveltekit-reload
                    href={"/amp/" + widgetWithStory.widget.moreUrl}
                    class="paragraphSlot"
                  >
                    <slot />
                  </a>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/each}
{/if}
</amp-base-carousel>
{#if widgetWithStory?.widget?.moreUrl}
      <ViewMoreBtn
        {language}
        moreUrl={widgetWithStory?.widget?.moreUrl}
        className={widgetWithStory?.widget?.isBigBreaking ? "mb-4" : ""}
      />
{/if}