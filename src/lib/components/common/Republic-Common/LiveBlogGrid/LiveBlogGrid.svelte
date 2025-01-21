<script lang="ts">
  import { TEMPLATE_TYPE } from "$lib/components/enums/story";
  import {
    ConvertDateFormat,
    getViewAllUpdateText,
  } from "$lib/components/utils/utils";
  import {
    IMAGE_ASPECT_RATIO,
    generateAspectRatioImageURL,
    imageDimensionProperty,
  } from "../../HybridImage/Constants";
  import StoryCard from "../StoryCard.svelte";

  // ** Props
  export let liveBlogStory: any;
  export let isAmp: boolean = false;
  export let device: "desktop" | "mobile" = "desktop";
  export let envDetails: any = {};
</script>

{#if liveBlogStory.story.length > 0}
  <!-- <Divider classes={"my-4"} /> -->
  <div
    class="topichead redstrip mb0 bg-[#D10014] text-white p-2 w-full flex items-center"
  >
    <div class="livedot mr-2 inline-block">
      <div class="liveRing"></div>
      <div class="liveDot"></div>
    </div>
    <h2 class="uppercase text-base font-bold">Live blog</h2>
  </div>
  {#each liveBlogStory.story as story}
    <div
      class="flex-container flex-col py-4 px-3 mb-4 desktop:flex-nowrap desktop:flex-row"
      style={`background-color:${liveBlogStory?.widget?.cardBgColor ?? ""}`}
    >
      <div class="flex-1 col-span-full desktop:col-span-1">
        <StoryCard
          title={liveBlogStory?.story[0]?.mid_heading}
          imageUrl={generateAspectRatioImageURL(
            liveBlogStory?.story?.[0]?.images,
            imageDimensionProperty?.[device]?.aspectVideo?.baseImage,
            IMAGE_ASPECT_RATIO["16_9"]?.key,
          )}
          {envDetails}
          {device}
          {isAmp}
          video={liveBlogStory?.video}
          storyType={liveBlogStory?.story_type}
          stickerData={liveBlogStory?.stickerData}
          prefixData={liveBlogStory?.prefixData}
          alt={liveBlogStory?.story?.[0].images?.versions?.["16_9"]?.alt ||
            "live_blog_story_img"}
          category={liveBlogStory?.story?.[0].categoryData || ""}
          time={liveBlogStory?.story?.[0].updatedAt}
          link={liveBlogStory?.story?.[0]?.completeSlug}
          template={"STORY_CARD"}
          template_type={TEMPLATE_TYPE.MEDIUM}
          classProperties={"text-xl leading-[130%] font-bold tracking-[-0.8px]"}
        />
      </div>
      <div class="flex-1 col-span-full desktop:col-span-1">
        <div class="cardCol">
          <div class="cardpdLeft">
            <ul class="bulletList">
              {#each story?.live_blog_texts?.slice(0, 3) as val, index}
                <li
                  style="color: rgb(0, 0, 0);"
                  class={`${index < 2 && "border-b border-b-black/15"}`}
                >
                  <span
                    class="listTime"
                    style="color: rgb(0, 0, 0);font-family:{envDetails?.secondaryFont}"
                  >
                    {ConvertDateFormat(val?.updatedAt || val?.createdAt)}
                  </span>
                  <p class="line-clamp-3 text-base desktop:text-[17px]">
                    {val?.header}
                  </p>
                </li>
              {/each}
            </ul>
            <div class="w-full text-right">
              <a
                href={`${isAmp ? "/amp/" : "/"}${story?.completeSlug || "/"}`}
                rel="external"
                class="text-[#D10014] text-xs w-full arrowlink text-right desktop:text-sm"
              >
                {getViewAllUpdateText(envDetails?.language)} >>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
  <!-- <Divider classes={"my-4"} /> -->
{/if}

<style>
  .flex-container {
    display: flex;
  }

  .col-span-1 {
    flex: 1;
  }
  .cardCol:last-child {
    border-right: 0;
  }
  .cardCol {
    flex-grow: 1;
    width: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.16);
  }
  .cardpdLeft {
    padding-left: 15px;
  }

  ul {
    margin: 0;
    padding: 0;
  }
  .liveblogwidget .bulletList li {
    display: block;
  }
  .bulletList li:before {
    position: absolute;
    content: "";
    left: 0;
    top: 2px;
    width: 10px;
    height: 10px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    background-color: var(--darkred);
    border-radius: 2px;
  }

  .liveblogwidget .listTime {
    font-weight: 700;
  }

  .listTime {
    display: block;
    font-size: 14px;
    line-height: 1;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .bulletList li {
    font-size: 17px;
    line-height: 1.4;
    font-weight: 500;
    padding: 0 0 12px 20px;
    margin-bottom: 12px;
    position: relative;
  }

  ol li,
  ul li {
    list-style-type: none;
    text-decoration: none;
  }

  .liveblogwidget .bulletList li {
    display: block;
  }

  .liveblogwidget .bulletList li:last-child {
    margin-top: 16px;
  }

  .liveblogwidget .bulletList li {
    display: block;
  }
  .liveRing {
    border: 3px solid #fff;
    height: 17px;
    width: 17px;
    position: absolute;
    left: 2px;
    top: 2px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    border-radius: 22px;
  }
  .liveDot {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    top: 0;
    left: 0;
  }

  .liveDot {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    .cardpdLeft {
      padding-left: 0;
      padding-top: 12px;
    }
    .listTime {
      font-size: 12px;
      font-weight: 600;
    }
  }
</style>
