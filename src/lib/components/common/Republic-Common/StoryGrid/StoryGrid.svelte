<script lang="ts">
  //@ts-nocheck
  import {
    IMAGE_ASPECT_RATIO,
    generateAspectRatioImageURL,
    imageDimensionProperty,
  } from "../../HybridImage/Constants";
  import type { Story } from "../../Sidebar/Types";
  import { TEMPLATE_PROPERTIES } from "../../StoryCard/Constants";
  import CardHeader from "../CardHeader.svelte";
  import Divider from "../Divider.svelte";
  import StoryCard from "../StoryCard.svelte";

  // ** Props
  export let envDetails: any = "";
  export let isAmp: boolean = false;
  export let isBigBreaking: boolean = false;
  export let title: string = "";
  export let storyData: any = "";
  export let columns: any = "1";
  export let limit: number = 15;
  export let gridTemplate: any = "";
  export let template: any = "";
  export let templateType: any = TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT;
  export let stories: Story[] = [];
  export let cardStyle = "";
  export let fontStyle = "";
  export let bigfontStyle = "";
  export let cardContainerStyle = "";
  export let mediumfontStyle = "";
  export let device: "desktop" | "mobile" | string = "desktop";
  export let grid: any = "";
  export let widgetGrid: any = "";
  export let lazyLoading: boolean = true;
  export let enforceH1: boolean = false;
  export let storiesCardDivStyle: string = "";
  export let storiesCardStyle: string = "";
  export let titleStyle: string = "";
  export let hideLastDivider: boolean = false;
  export let categoryLabelClassName: any = "";
  export let pageType: "HOMEPAGE" | "CATEGORY" | "STORY" = "HOMEPAGE";
  export let classProperties: any = "";

  const regularStories =
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG ||
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGNOIMAGE ||
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGFLIP
      ? stories.slice(1, limit)
      : stories;

  const aspectRatio = IMAGE_ASPECT_RATIO?.["16_9"]?.key;

  let imageDimension: any = { width: "100%", height: "100%" };

  if (
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG ||
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGNOIMAGE ||
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGFLIP
  ) {
    if (device === "desktop" && grid >= 2 && widgetGrid >= 2) {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.lgImage;
    } else if (device === "mobile") {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.lgImage;
    } else {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
    }
  } else if (
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM ||
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP
  ) {
    imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
  } else if (
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type["4_3"] ||
    templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP_4_3
  ) {
    imageDimension = imageDimensionProperty?.[device]?.aspect4_3?.baseImage;
  } else if (templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT) {
    if (device === "desktop" && grid >= 2 && widgetGrid >= 2 && columns < 2) {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.smImage;
    } else {
      imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
    }
  } else {
    imageDimension = imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
  }

  function getCustomImageDimensionForBigType() {
    if (
      templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG ||
      templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGFLIP
    ) {
      if (device === "desktop") {
        if (grid >= 2 && columns == 1 && widgetGrid >= 2) {
          if (templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGFLIP) {
            return imageDimensionProperty?.[device]?.aspectVideo?.baseImage;
          } else {
            return imageDimensionProperty?.[device]?.aspectVideo?.smImage;
          }
        } else {
          return imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
        }
      } else {
        return imageDimensionProperty?.[device]?.aspectVideo?.xsImage;
      }
    } else {
      return imageDimension;
    }
  }
</script>

<div style={`${storiesCardStyle ?? ""}`}>
  <div class="flex flex-col" style={cardContainerStyle ?? ""}>
    {#if title}
      <CardHeader
        classes={titleStyle}
        {enforceH1}
        textStyle={`${device == "desktop" ? `font-size:${grid == "1" ? "24px" : "28px"};padding-top:${envDetails?.language === "MH" || envDetails?.language === "H"  ? '6px' : ''}` : `font-size:${grid == "1" ? "20px" : "20px"}`}`}
        style={`background-color:${storyData?.headerBgColor ?? ""};color:${storyData?.headerColor ?? ""};padding-bottom:${envDetails?.language === "MH" || envDetails?.language === "H"  ? '6px' : ''};`}
      >
        {title}
      </CardHeader>
    {/if}
    {#if templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIG || templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGNOIMAGE || templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGFLIP}
      <div>
        <StoryCard
          title={isBigBreaking ? stories?.[0]?.long_heading : stories?.[0]?.mid_heading}
          imageUrl={generateAspectRatioImageURL(
            stories?.[0]?.images,
            imageDimension,
            IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio,
            40
          )}
          customImageDimension={imageDimension}
          {device}
          video={stories?.[0]?.video}
          storyType={stories?.[0]?.story_type}
          stickerData={stories?.[0]?.stickerData}
          prefixData={stories?.[0]?.prefixData}
          alt={stories?.[0]?.images?.versions?.["16_9"]?.alt || "story_img"}
          category={stories?.[0]?.categoryData}
          time={stories?.[0]?.updatedAt}
          link={stories?.[0]?.completeSlug}
          {template}
          template_type={TEMPLATE_PROPERTIES.STORY_CARD.type.BIG}
          primaryColor={storyData?.primaryColor || "#000"}
          secondaryColor={storyData?.secondaryColor || "#D10014"}
          cardBgColor={storyData?.cardBgColor || ""}
          {cardStyle}
          {bigfontStyle}
          {mediumfontStyle}
          relatedStories={stories?.[0]?.inter_link_story_list ?? []}
          {lazyLoading}
          {envDetails}
          {gridTemplate}
          {grid}
          {classProperties}
          {isAmp}
        />
      </div>

      {#if regularStories?.length > 0}
        {#if envDetails.language === "E" && pageType === "CATEGORY"}
          <Divider classes={`border-b my-4 desktop:my-3 desktop:border-none`} />
        {:else}
          <Divider classes={`my-4`} />
        {/if}
      {/if}
    {/if}
  </div>
  {#if regularStories?.length > 0}
    <div
      class={`grid ${storiesCardDivStyle ?? ""}`}
      style={`--columns: ${columns};${envDetails?.language === "E" && pageType === "CATEGORY" ? (device === "mobile" ? "gap:0px" : "gap:24px") : "gap:12px"};`}
    >
      {#each regularStories as story, index}
        <StoryCard
          title={story.mid_heading}
          imageUrl={generateAspectRatioImageURL(
            story?.images,
            getCustomImageDimensionForBigType(),
            IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio,
          )}
          {device}
          templateName={storyData?.name}
          extraData={story?.extraData}
          customImageDimension={getCustomImageDimensionForBigType()}
          video={story?.video}
          storyType={story?.story_type}
          stickerData={story?.stickerData}
          prefixData={story?.prefixData}
          alt={story?.images?.versions?.["16_9"]?.alt || "story_img"}
          category={story.categoryData || ""}
          time={story.updatedAt}
          link={story.completeSlug}
          story_link={story.completeSlug}
          author_anchor_name={story?.authorDetail?.name ??
            (story?.authorDetail?.firstName &&
            story?.authorDetail?.lastName
              ? story?.authorDetail?.firstName +
                " " +
                story?.authorDetail?.lastName
              : "")}
          author_anchor_link={story?.authorDetail?.slug ?? ""}
          {template}
          {columns}
          {widgetGrid}
          defaultClassName={templateType ===
            TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT &&
            columns == 1 &&
            widgetGrid == 1 &&
            grid == 3 &&
            index == 0 &&
            "!mt-0"}
          template_type={templateType ===
          TEMPLATE_PROPERTIES.STORY_CARD.type.BIG
            ? TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT
            : templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGNOIMAGE
              ? TEMPLATE_PROPERTIES.STORY_CARD.type.NOIMAGE
              : templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.BIGFLIP
                ? TEMPLATE_PROPERTIES.STORY_CARD.type.FLIP
                : templateType}
          borderStyle={columns === "2" && index % 2 === 0
            ? ""
            : columns === "2" && index % 2 === 1
              ? "border-left: 1px solid rgba(0, 0, 0, 0.16);padding-left:12px;"
              : ""}
          primaryColor={storyData?.primaryColor || "#000"}
          secondaryColor={storyData?.secondaryColor || "#D10014"}
          cardBgColor={storyData?.cardBgColor || ""}
          {cardStyle}
          {mediumfontStyle}
          {envDetails}
          {gridTemplate}
          {grid}
          {categoryLabelClassName}
          {classProperties}
          {isAmp}
        />
        {#if hideLastDivider ? index !== regularStories?.length - 1 : true}
          {#if !(title
              ?.toLowerCase()
              ?.trim() === "recommended" && templateType === TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM)}
            {#if columns == "2"}
              {#if (index + 1) % 2 === 0 && !cardStyle && (device === "desktop" ? index !== regularStories.length - 1 : true)}
                <Divider style={`grid-column: 1 / -1;`} />
              {/if}
            {:else if columns == "1"}
              {#if (index + 1) % 1 === 0 && !storyData?.cardBgColor && index !== regularStories.length - 1}
                <Divider
                  style={`grid-column: 1 / -1;`}
                  classes={(templateType ===
                    TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM &&
                    gridTemplate === TEMPLATE_PROPERTIES.GRID?.key) ||
                  (device === "mobile" &&
                    templateType ===
                      TEMPLATE_PROPERTIES.STORY_CARD.type?.["4_3"])
                    ? "my-4 desktop:my-9"
                    : device === "mobile" &&
                        envDetails?.language === "E" &&
                        pageType === "CATEGORY" &&
                        templateType ===
                          TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT
                      ? "my-4"
                      : ""}
                />
              {:else if device === "mobile" && index !== regularStories.length - 1 && (templateType === TEMPLATE_PROPERTIES.STORY_CARD.type?.["4_3"] || templateType === TEMPLATE_PROPERTIES.STORY_CARD.type?.MEDIUM || templateType === TEMPLATE_PROPERTIES.STORY_CARD.type?.BIGNOIMAGE || templateType === TEMPLATE_PROPERTIES.STORY_CARD.type?.DEFAULT || templateType === TEMPLATE_PROPERTIES.STORY_CARD.type?.BIG)}
                <Divider
                  style={`grid-column: 1 / -1;`}
                  classes={"my-4 desktop:my-9"}
                />
              {/if}
            {/if}
          {/if}
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 1rem;
  }

  .cell {
    padding: 1rem;
    background-color: lightgray;
    border-radius: 0.5rem;
    text-align: center;
  }
</style>
