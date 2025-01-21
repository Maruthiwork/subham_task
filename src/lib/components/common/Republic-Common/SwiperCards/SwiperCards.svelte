<script lang="ts">
  //@ts-nocheck
  import { STORY_TYPE, TEMPLATE_TYPE } from "$lib/components/enums/story";
  import { ConvertDateFormat } from "$lib/components/utils/utils";
  import {
    IMAGE_ASPECT_RATIO,
    generateAspectRatioImageURL,
    imageDimensionProperty,
  } from "../../HybridImage/Constants";
  import { lazyLoad } from "../../LazyLoading/LazyLoading";
  import type { Story, WidgetWithStory } from "../../Sidebar/Types";
  import { TEMPLATE, TEMPLATE_PROPERTIES } from "../../StoryCard/Constants";
  import StoryCard from "../StoryCard.svelte";
  import { onDestroy, onMount } from "svelte";
  import ViewMoreBtn from "../ViewMoreBtn.svelte";
  import PlayIcon from "../PlayIcon/PlayIcon.svelte";
  import { handleError } from "$lib/utils";

  //props
  export let widgetWithStory: WidgetWithStory;
  export let envDetails;
  export let cardType: string = "";
  export let swiperWidth: string = "";
  export let carouselHeight: string = "100%";
  export let cardHeight: string = "100%";
  export let cardWidth: string = "100%";
  export let categoryLabel: boolean = false;
  export let timeLabel: boolean = false;
  export let url: boolean = false;
  export let storyType: string = "";
  export let dataCols: any = 1;
  export let template: any = "";
  export let device: "desktop" | "mobile" | string = "desktop";
  export let grid: any = "";
  export let language: string = "E";
  export let headingClasses: string = "";
  export let swiperFooterClasses: string = "";

  export let template_type: any = "";
  export let aspectRatio: any = template_type;

  let stories: Story[] = widgetWithStory?.story;

  let classProperties =
    "bg-white border border-gray-200 rounded-lg shadow  mb-4 max-w-fit h-fit";

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
    } else if (
      template_type === TEMPLATE_PROPERTIES.SWIPER_CARD.type.ANCHOR_STORY_FLIP
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

  function loadSwiperScript() {
    return new Promise((resolve, reject) => {
      // if (document.querySelector(`script[src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"]`)) {
      //   resolve();
      // } else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
      // }
    });
  }

  let swiper;
  async function initializeSwiper() {
    await loadSwiperScript();
    var swiperContainer = document.getElementById(widgetWithStory.widget._id);
    if (swiperContainer && dataCols) {
      swiper = new Swiper(swiperContainer, {
        slidesPerView: parseInt(dataCols),
        spaceBetween: 12,
        lazy: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }
  async function initializeCardSwiper() {
    await loadSwiperScript();
    var cardswiperContainer = document.getElementById(
      widgetWithStory.widget._id
    );
    if (cardswiperContainer && dataCols) {
      swiper = new Swiper(cardswiperContainer, {
        effect: "cards",
        grabCursor: true,
        loop: true,
        speed: "1000",
        cardsEffect: {
          perSlideOffset: 4,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }

  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              template === TEMPLATE.SWIPER_IN_PICTURE_CARD &&
              template_type ===
                TEMPLATE_PROPERTIES.SWIPER_IN_PICTURE_CARD.type[11] &&
              device == "mobile"
            ) {
              initializeCardSwiper();
            } else {
              initializeSwiper();
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px 0px",
      }
    );

    const target = document.getElementById(widgetWithStory.widget._id);
    if (target) {
      observer.observe(target);
    }
  }

  onMount(() => {
    setupIntersectionObserver();
  });
  onDestroy(() => {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  });
  let playIconSize;
  if (imageDimension.width <= 200) {
    // Small thumbnail
    playIconSize = 22;
  } else if (imageDimension.width <= 500) {
    // Medium thumbnail
    playIconSize = 40;
  } else {
    // Large thumbnail
    playIconSize = 56;
  }
</script>

<svelte:head>
  <link
    rel="preload"
    href="/swiper-bundle.min.css"
    as="style"
    on:load={() => {
      const link = document.querySelector('link[rel="preload"][as="style"]');
      if (link instanceof HTMLLinkElement) {
        link.rel = "stylesheet";
      }
    }}
  />
</svelte:head>

{#if widgetWithStory?.widget?.title}
  <h2
    class={`text-[22px] tracking-[-1.12px] font-black text-black  ${
      grid == "1" ? "desktop:text-[24px]" : "desktop:text-[28px]"
    } ${widgetWithStory?.widget?.headerBgColor ? "p-2" : ""}${headingClasses} ${
      widgetWithStory?.widget?.isBigBreaking
        ? "desktop:text-xl desktop:font-bold desktop:tracking-[-0.8px] pb-0"
        : "mb-4"
    }`}
    style={`background-color:${
      widgetWithStory?.widget?.headerBgColor ?? ""
    };color:${widgetWithStory?.widget?.headerColor ?? ""}`}
  >
    {widgetWithStory?.widget?.title}
  </h2>
{/if}
{#if template === TEMPLATE.SWIPER_CARD}
  <div class="smThumbContainer">
    <div
      class="carousel-container"
      style={`background-color:${
        widgetWithStory?.widget?.bgColor
          ? widgetWithStory?.widget?.bgColor
          : "none"
      };color:${
        widgetWithStory?.widget?.primaryColor
          ? widgetWithStory?.widget?.primaryColor
          : "#000000"
      };padding:${
        widgetWithStory?.widget?.bgColor &&
        widgetWithStory.widget.dGrid != 1 &&
        grid != 1 &&
        dataCols != 3 &&
        !widgetWithStory?.widget?.isBigBreaking
          ? "24px"
          : ""
      };${widgetWithStory?.widget?.isBigBreaking ? 'padding-right:13px':''}`}
      id={widgetWithStory?.widget?._id}
    >
      <div
        class="swiper-wrapper"
        style={`padding:${
          widgetWithStory?.widget?.isBigBreaking ? "12px 8px" : ""
        }`}
      >
        {#if stories && stories.length > 0} 
        {#each stories as item}
          {#if template_type === TEMPLATE_TYPE.FLIP || template_type === TEMPLATE_TYPE.DEFAULT}
            <div class="swiper-slide" style="height: auto;">
              <div
                class={`p-6 ${
                  widgetWithStory?.widget?.cardBgColor
                    ? "desktop:p-6 h-full"
                    : ""
                }`}
                style={`background-color:${widgetWithStory?.widget?.cardBgColor};`}
              >
                <StoryCard
                  title={item.mid_heading}
                  summary={item.short_description}
                  imageUrl={generateAspectRatioImageURL(
                    item?.images,
                    imageDimension,
                    IMAGE_ASPECT_RATIO["16_9"]?.key
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
                style={`background-color: ${
                  widgetWithStory?.widget?.cardBgColor ?? ""
                };padding:${
                  template_type === TEMPLATE_TYPE.ANCHOR_STORY &&
                  widgetWithStory?.widget?.cardBgColor
                    ? "32px 16px 40px 16px"
                    : ""
                };border-radius: ${
                  widgetWithStory?.widget?.cardBgColor ? "4px" : ""
                };border: ${
                  widgetWithStory?.widget?.cardBgColor
                    ? "1px solid var(--Strock, rgba(0, 0, 0, 0.16))"
                    : ""
                };`}
              >
                <StoryCard
                  title={item.mid_heading}
                  summary={item.mid_heading}
                  imageUrl={generateAspectRatioImageURL(
                    item?.authorDetail?.image ?? item?.images,
                    imageDimension,
                    IMAGE_ASPECT_RATIO["1_1"]?.key
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
                    (item?.authorDetail?.firstName &&
                    item?.authorDetail?.lastName
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
            <div class="swiper-slide">
              <div
                class="flexCardCol h-auto"
                style={widgetWithStory?.widget?.cardBgColor
                  ? `border-radius: 4px;background: ${widgetWithStory?.widget?.cardBgColor};`
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
                    class="w-auto  relative flex flex-col {template_type ==
                      TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                    item?.story_type === STORY_TYPE.GALLERY.value
                      ? 'gap-0'
                      : 'gap-[12px]'}"
                  >
                    <a
                      data-sveltekit-reload
                      href={"/" + item?.completeSlug}
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
                        <img
                          class="lazy-loading-img {item?.story_type ===
                            STORY_TYPE.WEB_STORY.value ||
                          item?.story_type === STORY_TYPE.GALLERY.value
                            ? 'rounded-t-lg'
                            : ''}"
                          use:lazyLoad={generateAspectRatioImageURL(
                            item?.images,
                            imageDimension,
                            IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio
                          )}
                          on:error={handleError}
                          decoding="async"
                          data-nimg="fill"
                          loading="lazy"
                          style="width:100%;"
                          {...imageDimension}
                          alt={item?.images?.versions?.[aspectRatio]?.alt ||
                            "video_img"}
                        />
                        {#if item?.story_type === STORY_TYPE.VIDEO.value || item?.story_type === STORY_TYPE.SHOW.value || item?.story_type === STORY_TYPE.DEBATE.value}
                          <PlayIcon
                            duration={item?.video?.duration}
                            size={playIconSize}
                          />
                        {/if}
                        {#if item?.story_type === STORY_TYPE.GALLERY.value}
                          <div class="cameraIcon">
                            <span>{item?.gallery_image_count}</span>
                          </div>
                        {/if}
                      </div>
                    </a>
                    <div class="min-h-[65px] {template_type ==
                    TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                  item?.story_type === STORY_TYPE.GALLERY.value ? "min-h-[76px]" : "p-3 pt-0 desktop:pl-0 desktop:pt-0"}">
                      <a data-sveltekit-reload href={"/" + item?.completeSlug}>
                        <p
                          style={`color:${
                            widgetWithStory?.widget?.primaryColor ?? ""
                          };${actualStyle};${ (template_type ==
                              TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] && envDetails?.language == "H") ? 'min-height: 62px;' : 'min-height: 51px;'};${ (item?.story_type === STORY_TYPE.GALLERY.value && envDetails?.language == "H") ? 'min-height: 76px;' : ''}`}
                          class= {`tracking-normal ${
                            template_type ==
                              TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                            item?.story_type === STORY_TYPE.GALLERY.value
                              ? "mx-2 my-3 line-clamp-2 text-ellipsis min-h-[68px]"
                              : "font-extrabold  text-2xl leading-[115%] tracking-[-0.96px]"
                          }`}
                        >
                          {template_type ==
                            TEMPLATE_PROPERTIES.SWIPER_CARD.type[34] ||
                          item?.story_type === STORY_TYPE.GALLERY.value ? item?.small_heading : item?.mid_heading}
                        </p>
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
                              href={"/" + item.categoryData?.completeSlug}
                              style="color:{widgetWithStory?.widget
                                ?.secondaryColor ??
                                ''};font-family: {envDetails.secondaryFont ??
                                ''};"
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
                          href={"/" + widgetWithStory.widget.moreUrl}
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
          {/if}
        {/each}
        {/if}
      </div>
      <div
        class={`customNav mb-4 ${
          widgetWithStory?.widget?.isBigBreaking ? "pb-3" : ""
        } ${swiperFooterClasses}`}
      >
        <div class="pageWrapper flex gap-2 items-center justify-center">
          <div class="swiper-button-prev" />
          <div class="swiper-pagination" />
          <div class="swiper-button-next" />
        </div>
      </div>
      {#if widgetWithStory?.widget?.moreUrl}
        <ViewMoreBtn
          {language}
          moreUrl={widgetWithStory?.widget?.moreUrl}
          className={widgetWithStory?.widget?.isBigBreaking ? "mb-4" : ""}
        />
      {/if}
    </div>
  </div>
{/if}

{#if template === TEMPLATE.SWIPER_IN_PICTURE_CARD}
  <div
    class="inpicture-carousel-container smThumbContainer"
    id={widgetWithStory?.widget?._id}
  >
    <div class="swiper-wrapper">
      {#each stories as item}
        <div class="swiper-slide">
          <div
            class="flexCardCol "
            style={widgetWithStory?.widget?.cardBgColor
              ? `border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: ${widgetWithStory?.widget?.cardBgColor};padding:12px;margin-bottom:20px;`
              : ""}
          >
            <div class="videoThumbCard cardsHover">
              <a
                data-sveltekit-reload
                href={"/" + item?.completeSlug}
                class="relative gradientImg overflow-hidden table bg-gradient-to-t"
              >
                <!-- class="videoThumbImg" -->
                <img
                  class="videoThumbImg lazy-loading-img"
                  use:lazyLoad={generateAspectRatioImageURL(
                    item?.images,
                    imageDimension,
                    IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio
                  )}
                  decoding="async"
                  data-nimg="fill"
                  loading="lazy"
                  style="width:100%;"
                  {...imageDimension}
                  alt={item?.images?.versions?.[aspectRatio]?.alt ||
                    "video_img"}
                  on:error={handleError}
                />

                <div class="videoThumbTitle">
                  {#if item?.story_type === STORY_TYPE.VIDEO.value || item?.story_type === STORY_TYPE.SHOW.value || item?.story_type === STORY_TYPE.DEBATE.value || template_type == TEMPLATE_PROPERTIES.SWIPER_IN_PICTURE_CARD.type[916]}
                    <span class="playIcon playTopLeftsm" />
                  {/if}
                  <div class="sqThumbOvertxt whitetxt">
                    <div class="cardTitle darkCardTitle">
                      <h2
                        style={`${actualStyle};line-height:${
                          envDetails?.language === "H" ||
                          envDetails?.language === "MH"
                            ? "155%"
                            : ""
                        }`}
                        class={widgetWithStory?.widget?.name ===
                          "you-cant-miss-this" && device == "mobile"
                          ? "font-28"
                          : ""}
                      >
                        {item.small_heading}
                      </h2>
                    </div>
                    <!-- {#if item?.categoryData?.name !== "Shorts"}
                      <div class="cardftr darkCardftr {(widgetWithStory?.widget?.name === "you-cant-miss-this" && device == 'mobile') ? "pt-2":""}">
                        {#if item?.categoryData?.name}
                          <span class="cardLabel pr-[6px] mr-[6px]"
                            ><a
                              data-sveltekit-reload
                              target="_self"
                              href={"/" + item?.categoryData?.slug}
                              class="text-white text-sm"
                              style="font-family: {envDetails.secondaryFont ??
                                ''};"
                              >{item?.categoryData?.frontend_name ||
                                item?.categoryData?.name}</a
                            ></span
                          >
                        {/if}
                      </div>
                    {/if} -->
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="customNav">
      <div class="pageWrapper flex gap-2 items-center justify-center">
        <div class="swiper-button-prev" />
        <div class="swiper-pagination" />
        <div class="swiper-button-next" />
      </div>
      {#if widgetWithStory?.widget?.moreUrl?.length}
        <ViewMoreBtn
          {language}
          styles={"justify-content:flex-end;"}
          moreUrl={widgetWithStory?.widget?.moreUrl}
        />
      {/if}
    </div>
  </div>
{/if}

<style>
  .carousel-container,
  .inpicture-carousel-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    overflow: clip;
    list-style: none;
    padding: 0;
    z-index: 1; 
  }
  .pageWrapper {
    width: 140px;
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }
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
    line-height: 120%; /* 28.8px */
    letter-spacing: -0.96px;
    color: #fff;
    left: 0;
    right: 0;
    z-index: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    white-space: normal;
  }
  .videoThumbCard .videoThumbImg {
    display: block;
    border-radius: 5px;
  }

  .gradientImg::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 52.08%, #000000);
  }

  radius-5 {
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
    line-height: 155%;
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
  .cameraIcon {
    width: 50px;
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

    .font-28 {
      font-size: 28px !important;
    }
  }
</style>
