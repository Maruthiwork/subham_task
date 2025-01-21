<script lang="ts">
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import formatSecondsToTime, {
    ConvertDateFormat,
  } from "$lib/components/utils/utils";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../HybridImage/Constants";
  import RepublicAnchorTag from "../RepublicAnchorTag/RepublicAnchorTag.svelte";

  export let item;
  export let colorData = {};
  export let categoryLabel = "";
  export let device: "desktop" | "mobile" = "desktop";
</script>

<div class="hrcards horizontalImgCard cardsHover">
  <div class="flex flex-row-reverse">
    <div class="horicardRight w-2/5">
      <div class="cardImg ImgThumb">
        <a href={`${EnvironmentConfig.VITE_REPUBLIC_URL}${item?.completeSlug}`}>
          {#if item?.stickerData}
            <span
              class="StoryTagOnImage font12"
              style="background-color: {item?.stickerData
                ?.background_color}; font-style: {item?.stickerData
                ?.font_style}; color: {item?.stickerData?.text_color};"
            >
              {item?.stickerData?.name}
            </span>
          {/if}
          <img
            src={generateAspectRatioImageURL(
              item.images,
              ImageDimensions?.[device]?.bannerImage,
              IMAGE_ASPECT_RATIO["16_9"]?.key,
            )}
            alt={item.images?.versions?.["16_9"]?.alt || "Small Story Card"}
            height="396px"
            width="704px"
            fetchpriority="high"
            loading="eager"
          />
        </a>
        {#if item?.story_type === "VIDEO" || item?.story_type === "SHORT"}
          <div class="cardImgFtr pr0 listingVideoFtr">
            <div class="playicon">
              <a
                href={`${EnvironmentConfig.VITE_REPUBLIC_URL}${item?.completeSlug}`}
              >
              <span class="playIcon playTopLeftsm"></span>
                <!-- <HybridImage
                  {isAmp}
                  {...getElementProps(isAmp, { height: '18', width: '18' })}
                  {...getElementProps(!isAmp, { layout: 'fill' })}
                  src={`${config.republic_url}styles/images/Play.svg`}
                  alt="Play Button icon"
                /> -->
              </a>
            </div>
            {#if item?.video?.duration}
              <div class="videotime videoTimeBG">
                {formatSecondsToTime(item?.video?.duration)}
              </div>
            {/if}
          </div>
        {:else if item?.story_type === "GALLERY"}
          <span class="innerCamera"></span>
        {:else if item?.story_type === "WEB-STORIES"}
          <span class="webstoriesIco"></span>
        {/if}
      </div>
    </div>
    <div class="horicardLeft w-3/5">
      <p class="lightCardTitle">
        <RepublicAnchorTag
          completeSlug={item?.completeSlug}
          style="color: {colorData};"
          storyType={item?.story_type}
        >
          {item?.mid_heading}
        </RepublicAnchorTag>
      </p>
      <div class="cardftr lightCardftr">
        {#if item?.categoryData?.name}
          <span class="cardLabel" style="border-right: 1px solid {colorData};">
            <a
              href={`${EnvironmentConfig.VITE_REPUBLIC_URL}${item?.categoryData?.completeSlug}`}
              style="color: {categoryLabel};"
            >
              {item?.categoryData?.frontend_name || item?.categoryData?.name}
            </a>
          </span>
        {/if}
        <span class="cardTime" style="color: {colorData};">
          {ConvertDateFormat(item?.updatedAt)}
        </span>
      </div>
    </div>
  </div>
</div>

<style>

  /* Remove border radius */
  .card-container {
    /* Your other styles */
    border-radius: 0; /* Set border-radius to 0 */
    height: 100%;
  }

  .category-section {
    padding: 8px 0px; /* Removed bottom padding */
  }

  /* Remove margin-bottom from the image */
  .card-container img {
    margin-bottom: 0;
    height: 100%;
  }

  .p-4 {
    padding: 8px 0px; /* Removed bottom padding */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-title {
    width: 100%; 
    max-width: 100%;
    font-size: 24px;
    font-weight: 800;
    line-height: 1.2; 
    letter-spacing: -0.04em;
    word-wrap: break-word; 
    overflow-wrap: break-word; 
  }

  .horicardRight {
  position: relative;
  margin-left: 12px;
}

.horicardRight .cardImg {
  position: relative;
  border-radius: 2px;
}
</style>
