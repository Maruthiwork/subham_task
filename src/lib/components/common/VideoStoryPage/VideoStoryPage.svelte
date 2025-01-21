<script lang="ts">
  import {
    generateBreadCrumbs,
    getHomeTextFromLanguage,
    getTemplate,
    getTemplateType,
    timeToRead,
  } from "$lib/components/utils/utils";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";
  import VideoStoryCard from "../VideoStoryCard/VideoStoryCard.svelte";
  import SEO from "$lib/components/SEO/index.svelte";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import { onMount } from "svelte";
  import { TEMPLATE } from "../StoryCard/Constants";

  // ** Props
  export let video_story_details;
  export let sideBarData: any = [];
  export let latest_stories: any = [];
  export let getParentCategory: any = [];
  export let device: "desktop" | "mobile" = "desktop";
  export let language: string = "E";
  export let envDetails: any = {};
  export let rightSideBar: any = {};
  export let canonicalUrl: string = "";
  export let pathname: string = "";
  export let livetv_video_id: string = "";

  // * Variables
  let storyData = video_story_details?.storyDetails?.[0];
  let sidebarElement: HTMLElement;
  let breadcrumbSegments: any = [];
  let sidebarLoaded = false;

  // Check if storyData.completeSlug exists and split it
  breadcrumbSegments = generateBreadCrumbs(storyData);

  const breadcrumbs: any[] = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: storyData?.long_heading,
      slug: storyData?.completeSlug,
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        sidebarLoaded = entry.isIntersecting;
      },
      {
        root: null,
        threshold: 0.1,
      },
    );
    if (sidebarElement) {
      observer.observe(sidebarElement);
    }
    return () => {
      if (sidebarElement) {
        observer.unobserve(sidebarElement);
      }
    };
  });
</script>

<SEO
  lang={language}
  {canonicalUrl}
  pageType={"Story"}
  {breadcrumbs}
  slug={storyData?.completeSlug}
  title={storyData?.meta_title}
  {storyData}
  datePublished={storyData?.publish_at}
  lastUpdated={storyData?.updatedAt}
  metadescription={storyData?.meta_description}
  keywords={storyData?.keywords}
  timeToRead={timeToRead(storyData?.word_count)}
  featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    storyData?.images?.versions?.["16_9"].filePath}
  ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    storyData?.images?.versions?.["16_9"].filePath}
  ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    storyData?.images?.versions?.["16_9"].filePath}
  twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    storyData?.images?.versions?.["16_9"].filePath}
  site_details={envDetails}
  dateCreated={storyData?.createdAt ?? storyData?.updatedAt}
  pathname={pathname}
  latest_stories={latest_stories?.data}
  siteNavigation={getParentCategory}
/>

<div class="mainWrapper mt-6">
  <div class="contentWrapper max-w-7xl mx-auto">
    {#if device === "mobile"}
      <DisplayAd
        adslot={envDetails.adsFile?.Mobile?.ATF?.AP}
        height={"50"}
        width={"300"}
      />
    {/if}
    <div class="breadcrumb text-[14px]">
      <a href="/">
        <span class="breadcrumb-text"
          >{getHomeTextFromLanguage(language)} /</span
        >
      </a>
      {#if storyData?.categoryDetail}
        <a data-sveltekit-reload href={`/${storyData?.categoryDetail?.slug}`}>
          <span class="breadcrumb-text">
            {storyData?.categoryDetail?.frontend_name?.charAt(0).toUpperCase() +
              storyData?.categoryDetail?.frontend_name?.slice(1)} /
          </span>
        </a>
      {/if}
      {#if storyData?.subCategoryDetail}
        <a
          data-sveltekit-reload
          href={`/${storyData?.subCategoryDetail?.completeSlug}`}
        >
          <span class="breadcrumb-text">
            {storyData?.subCategoryDetail?.frontend_name
              ?.charAt(0)
              .toUpperCase() +
              storyData?.subCategoryDetail?.frontend_name?.slice(1)} /
          </span>
        </a>
      {/if}
      {#if storyData?.l3categoryData}
        <a
          data-sveltekit-reload
          href={`/${storyData?.l3categoryData?.completeSlug}`}
        >
          <span class="breadcrumb-text">
            {storyData?.l3categoryData?.frontend_name?.charAt(0).toUpperCase() +
              storyData?.l3categoryData?.frontend_name?.slice(1)} /
          </span>
        </a>
      {/if}
      {#if storyData?.l4categoryData}
        <a
          data-sveltekit-reload
          href={`/${storyData?.l4categoryData?.completeSlug}`}
        >
          <span class="breadcrumb-text">
            {storyData?.l4categoryData?.frontend_name?.charAt(0).toUpperCase() +
              storyData?.l4categoryData?.frontend_name?.slice(1)} /
          </span>
        </a>
      {/if}
      {#if storyData?.long_heading}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="breadcrumb-text ellipsis">{storyData?.long_heading}</a>
      {/if}
    </div>

    <div class="contentMainWrap">
      <!-- Main Article Section -->
      <VideoStoryCard
        {device}
        topStory={storyData}
        latest_stories={latest_stories?.data}
        {envDetails}
        {language}
        isAmp={false}
        {livetv_video_id}
      />

      <!-- Right Sidebar Component -->
      <div bind:this={sidebarElement}>
        {#if device === "mobile"}
          {#await import("$lib/components/common/Sidebar/Sidebar.svelte") then Sidebar}
            <Sidebar.default
              {sideBarData}
              {rightSideBar}
              {device}
              {envDetails}
              {language}
            />
          {/await}
        {:else}
          {#await import("$lib/components/common/Sidebar/Sidebar.svelte") then Sidebar}
            <Sidebar.default
              {sideBarData}
              {rightSideBar}
              sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
              {device}
              {envDetails}
              {language}
            />
          {/await}
        {/if}
        {#each Object.keys(rightSideBar || {}) as key}
          {#if rightSideBar[key]?.story}
            {#each rightSideBar[key].story as eachStory, i}
              {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                {#if getTemplateType(device, eachStory?.widget) !== TEMPLATE.HIDDEN}
                  {#await import("$lib/components/common/Livetv/Livetv.svelte") then Livetv}
                    <div class="sticky top-[46px] p-4">
                      <Livetv.default
                        data={eachStory?.widget}
                        isSideBar={true}
                      />
                    </div>
                  {/await}
                {/if}
              {/if}
            {/each}
          {/if}
        {/each}
      </div>

      <!-- Ad Banner Component -->
      <div class="sideSticky">
        <div class="isDesktop">
  
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .breadcrumb-text {
    margin-right: 4px; /* Adjust spacing as needed */
    white-space: nowrap; /* Prevents wrapping */
  }

  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block; /* Ensure ellipsis works on block-level elements */
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-wrap: nowrap;
  }

  .breadcrumb span:not(:last-child) {
    margin-right: 5px;
  }
  .storyBreadcrumb {
    margin-bottom: 16px;
  }
  .breadcrumb ul {
    display: flex;
    gap: 4px;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-wrap: nowrap;
  }

  .breadcrumb ul li {
    font-size: 14px;
    font-weight: 400;
  }

  .breadcrumb a {
    color: #888;
    transition: 0.4s;
  }

  /* .breadcrumb a:hover { color: var(--darkred); } */
  .breadcrumb ul li:last-child {
    /* width: 280px; */
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
  }
  .contentMainWrap {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 64% 34.06%;
    grid-column-gap: 20px;
    margin-top: 20px;
  }
  @media screen and (max-width: 680px) {
    .storyBreadcrumb {
      padding: 0;
    }

    .breadcrumb ul li {
      font-size: 12px;
    }

    .contentWrapper {
      width: calc(100% - 32px);
    }
    .contentMainWrap {
      display: block;
    }
    .mainWrapper {
      width: calc(100% - 0px);
      margin: 0 auto;
    }
    .contentMainWrap {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .storySection .opinionFont {
  }

  .storyHead .author {
    width: max-content;
    margin: 0 auto;
  }

  .storyHead .storyImg img {
    width: 100%;
  }
</style>
