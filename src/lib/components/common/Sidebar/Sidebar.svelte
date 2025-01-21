<script lang="ts">
  import { COMPONENT_TYPE } from "$lib/components/enums/story";
  import {
    getTemplate,
    getTemplateType,
    isValidJson,
  } from "$lib/components/utils/utils";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";
  import Divider from "../Republic-Common/Divider.svelte";
  import StoryGrid from "../Republic-Common/StoryGrid/StoryGrid.svelte";
  import AmpSwiperCards from "../Republic-Common/SwiperCards/AMPSwiperCards.svelte";
  import SwiperCards from "../Republic-Common/SwiperCards/SwiperCards.svelte";
  import { TEMPLATE, TEMPLATE_PROPERTIES } from "../StoryCard/Constants";

  export let sideBarData: any = {};
  export let storyNotIncludes: any = [];
  export let storyId = '';
  export let sidebarTop: any = undefined;
  export let device: "desktop" | "mobile" = "desktop";
  export let envDetails: any = {};
  export let rightSideBar: any = {};
  export let language: string = "E";
  export let isAmp: boolean = false;

  let sideBarUniqueStories = sideBarData?.data?.filter((story: any) => {
  const isDifferentStory = story?._id !== storyId;
  const isNotIncluded = storyNotIncludes?.length > 0 
    ? !storyNotIncludes.includes(story?.story_type) 
    : true; 

  return isDifferentStory && isNotIncluded; 
});

  let sideBarTemplateType =
    language === "RB" || device === "mobile"
      ? TEMPLATE_PROPERTIES?.STORY_CARD?.type?.DEFAULT
      : device === "desktop"
        ? TEMPLATE_PROPERTIES?.STORY_CARD?.type?.MEDIUM
        : TEMPLATE_PROPERTIES?.STORY_CARD?.type?.DEFAULT;
</script>

<div
  class={`-ml-4 -mr-4 desktop:px-3 flex flex-col desktop:gap-y-4 desktop:ml-0 desktop:mr-0`}
>
  {#if sidebarTop && device == "desktop"}
    <DisplayAd adslot={sidebarTop} height={"250"} width={"300"} />
  {/if}

  {#if sideBarData?.data?.length > 0}
    <StoryGrid
      {envDetails}
      storiesCardStyle={`background-color:${language == "RB" ? "#E5D9E9" : "#FFF0F0"};padding: 12px;`}
      title={"Recommended"}
      titleStyle={"pl-0 py-3"}
      columns={1}
      storyData={{
        primaryColor: envDetails?.sidebar?.primaryColor || "#000000",
        secondaryColor: envDetails?.sidebar?.secondaryColor || "#D10014",
      }}
      {device}
      stories={sideBarUniqueStories}
      pageType={"CATEGORY"}
      template={"STORY_CARD"}
      templateType={sideBarTemplateType}
      bigfontStyle={"font-size: 18px;font-weight: 900;line-height: 140%;letter-spacing: -0.96px;"}
      mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
      fontStyle={"font-size: 18px;font-weight: 600;line-height: 140%;"}
      grid={"1"}
      classProperties={"font-semibold"}
      hideLastDivider={true}
      {isAmp}
    />
  {/if}

  {#each Object.keys(rightSideBar || {}) as key}
    {#if rightSideBar[key]?.story}
      {#each rightSideBar[key].story as eachStory, i}
        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_CARD || getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_IN_PICTURE_CARD}
          <div
            style="background: {eachStory?.widget?.bgColor}; padding: {eachStory
              ?.widget?.bgColor
              ? '12px 12px 16px 12px'
              : '0px'}"
          >
            {#if isAmp}
              <AmpSwiperCards
                {language}
                {envDetails}
                cardType={COMPONENT_TYPE.StoryCard}
                widgetWithStory={eachStory}
                {eachStory}
                storyType={eachStory.widget.storyType}
                grid={"1"}
                dataCols={eachStory?.widget?.[
                  device === "desktop" ? "dDataCol" : "mDataCol"
                ]}
                template={getTemplate(device, eachStory?.widget)}
                template_type={getTemplateType(device, eachStory?.widget)}
                {device}
                aspectRatio={eachStory?.widget?.aspectRatio}
              />
            {:else}
              <SwiperCards
                {language}
                {envDetails}
                headingClasses={"!mb-0"}
                swiperFooterClasses={"!mt-2"}
                cardType={COMPONENT_TYPE.StoryCard}
                widgetWithStory={eachStory}
                storyType={eachStory.widget.storyType}
                dataCols={eachStory?.widget?.[
                  device === "desktop" ? "dDataCol" : "mDataCol"
                ]}
                template={getTemplate(device, eachStory?.widget)}
                template_type={getTemplateType(device, eachStory?.widget)}
                {device}
                grid={"1"}
              />
            {/if}
          </div>
        {/if}
        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD}
          {#if device == "desktop" && eachStory?.widget?.webAds?.webAdId?.length}
            <Divider classes={"my-5"} />
            <DisplayAd
              adslot={{
                id: eachStory?.widget?.webAds?.webAdId,
                slot: eachStory?.widget?.webAds?.webAdSlot,
                size: isValidJson(eachStory?.widget?.webAds?.webAdSize)
                  ? JSON.parse(eachStory?.widget?.webAds.webAdSize)
                  : null,
              }}
            />
            <Divider classes={"my-5"} />
          {:else if device == "mobile" && eachStory?.widget?.mAds?.mAdId?.length}
            <Divider classes={"my-5"} />
            <DisplayAd
              adslot={{
                id: eachStory?.widget?.mAds?.mAdId,
                slot: eachStory?.widget?.mAds?.mAdSlot,
                size: isValidJson(eachStory?.widget?.mAds?.mAdSize)
                  ? JSON.parse(eachStory?.widget?.mAds?.mAdSize)
                  : null,
              }}
            />
            <Divider classes={"my-5"} />
          {/if}
        {/if}
   
      {/each}
    {/if}
  {/each}
</div>
