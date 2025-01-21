<script lang="ts">
  import DisplayAd from "$lib/components/common/DisplayAd/DisplayAd.svelte";
  import Card from "$lib/components/common/Republic-Common/Card.svelte";
  import TopSection from "$lib/components/common/TopSection/TopSection.svelte";
  import SEO from "$lib/components/SEO/index.svelte";
  import type { AdSlotUsage, StoryDetails } from "./Types";
  import {
    getHomeTextFromLanguage,
    getTemplate,
    getTemplateType,
    timeToRead,
  } from "../utils/utils";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import RegularStory from "../common/StoryCard/RegularStory.svelte";
  import FloatAd from "../common/FloatAd/FloatAd.svelte";
  import { onMount } from "svelte";
  import SocialSharing from "../common/SocialSharing/SocialSharing.svelte";
  import { TEMPLATE } from "../common/StoryCard/Constants";
  import FloatingButton from "../common/FloatingButton/FloatingButton.svelte";
  import placeholder_16_9 from "$lib/assets/no-img/16-9-placeholder.jpg";
  import LiveBlogCard from "../common/LiveBlogCard/LiveBlogCard.svelte";
  import GalleryCard from "../common/GalleryCard/GalleryCard.svelte";
  import DeepFocusCard from "../common/DeepFocusCard/DeepFocusCard.svelte";

  // ** Props
  export let storyDetails: StoryDetails;
  export let sideBarData: any;
  export let device: "desktop" | "mobile" = "desktop";
  export let language: string = "E";
  export let envDetails: any = {};
  export let rightSideBar: any = {};
  export let canonicalUrl: string = "";
  export let trendingBar: any = {};
  export let pathname = "";
  export let getParentCategory:any[] = [];


  let storyNotIncludes = ['VIDEO', 'SHOW', 'DEBATE'];
  let defaultFontStyle = "font-display: optional;";
  let sidebarElement: HTMLElement;
  let socialElement: HTMLElement;

  let adsSlotAndUsage: AdSlotUsage = { adSlotIndex: 0, usageCount: 0 };

  const businessLink = `https://republicbusiness.page.link/?link=${canonicalUrl}&apn=com.republic.republicbusiness&isi=6503001628&ibi=com.republic.republicbusiness`;
  const otherDomainLink = `https://republicworld.page.link/?link=${canonicalUrl}&apn=com.republicworld&isi=1326556994&ibi=com.republicworld`;

  let {
    story: [storyData],
    scroll_stories: scroll_stories,
  } = storyDetails;

  let storyId = storyData?._id;

  let sidebarLoaded = false;

  const breadcrumbs: any[] = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: storyData?.mid_heading,
      slug: storyData?.completeSlug,
    },
  ];

    const imagePath =
    storyData?.images?.versions?.["16_9"]?.filePath;

    console.log("imagePath", imagePath);
    
  const imageSources = {
    ogSquareImageSrc:  imagePath ? EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + imagePath : placeholder_16_9,
    ogImageSrc: imagePath ? EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + imagePath : placeholder_16_9,
    twitterImageSrc: imagePath ? EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + imagePath : placeholder_16_9,
    featuredImageSrc: imagePath ? EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + imagePath : placeholder_16_9,
  };

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

<svelte:head>
  <link
    rel="preload"
    href={`/${envDetails?.globalCSS}`}
    as="style"
    on:load={() => {
      const link = document.querySelector('link[rel="preload"][as="style"]');
      if (link instanceof HTMLLinkElement) {
        link.rel = "stylesheet";
      }
    }}
  />
</svelte:head>

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
  ogSquareImageSrc={imageSources.ogSquareImageSrc}
  ogImageSrc={imageSources.ogImageSrc}
  twitterImageSrc={imageSources.twitterImageSrc}
  featuredImageSrc={imageSources.featuredImageSrc}
  site_details={envDetails}
  dateCreated={storyData?.createdAt ?? storyData?.updatedAt}
  {pathname}
  siteNavigation={getParentCategory}
/>
<div class="mainWrapper mt-6">
  <div class="contentWrapper max-w-7xl mx-auto">
    {#if device === "mobile" && storyData?.story_type === "LIVE-BLOG"}
      <div style="min-height: 290px;">
        <DisplayAd
          adslot={envDetails.adsFile?.Mobile?.ATF?.AP}
          height={"250"}
          width={"300"}
        />
      </div>
      <FloatAd adslot={envDetails.adsFile?.Mobile?.FLOATAD?.AP} />
    {/if}
    <!-- <TrendingNews {trendingBar} /> -->
    <div class="breadcrumb storyBreadcrumb" style="min-height: 20px;">
      <ul class="w-full flex overflow-auto">
        <li>
          <a style={defaultFontStyle} href={`/`}
            >{getHomeTextFromLanguage(language)} /
          </a>
        </li>
        {#if storyData?.categoryDetail}
          <li class="">
            <!-- Adjust margin as needed -->
            <a
              data-sveltekit-reload
              href={`/${storyData?.categoryDetail?.slug}`}
              style={defaultFontStyle}
            >
              {storyData?.categoryDetail?.frontend_name
                ?.charAt(0)
                .toUpperCase() +
                storyData?.categoryDetail?.frontend_name?.slice(1)} /
            </a>
          </li>
        {/if}
        {#if storyData?.subCategoryDetail}
          <li class="">
            <!-- Adjust margin as needed -->
            <a
              data-sveltekit-reload
              href={`/${storyData?.subCategoryDetail?.completeSlug}`}
              style={defaultFontStyle}
            >
              {storyData?.subCategoryDetail?.frontend_name
                ?.charAt(0)
                .toUpperCase() +
                storyData?.subCategoryDetail?.frontend_name?.slice(1)} /
            </a>
          </li>
        {/if}
        {#if storyData?.l3categoryData}
          <li class="">
            <!-- Adjust margin as needed -->
            <a
              data-sveltekit-reload
              href={`/${storyData?.l3categoryData?.completeSlug}`}
              style={defaultFontStyle}
            >
              {storyData?.l3categoryData?.frontend_name
                ?.charAt(0)
                .toUpperCase() +
                storyData?.l3categoryData?.frontend_name?.slice(1)} /
            </a>
          </li>
        {/if}
        {#if storyData?.l4categoryData}
          <li class="">
            <!-- Adjust margin as needed -->
            <a
              data-sveltekit-reload
              href={`/${storyData?.l4categoryData?.completeSlug}`}
              style={defaultFontStyle}
            >
              {storyData?.l4categoryData?.frontend_name
                ?.charAt(0)
                .toUpperCase() +
                storyData?.l4categoryData?.frontend_name?.slice(1)} /
            </a>
          </li>
        {/if}
        {#if storyData?.long_heading}
          <li class="">
            <!-- svelte-ignore a11y-missing-attribute -->
            <span style={defaultFontStyle}>
              {storyData?.long_heading}
            </span>
          </li>
        {/if}
        <!-- Add more breadcrumb items as needed -->
      </ul>
    </div>

    <div class="contentMainWrap">
      <!-- Main Article Section -->
      <Card className={"break-words"}>
        <div class="mainArticle storySection">
          <!-- Inner Left Block -->
          <div
            class="text-center flex flex-col min-h-[255px] desktop:min-h-[300px]"
          >
            <!-- Top Section Component -->
            <TopSection
              long_heading={storyData?.long_heading}
              updatedAt={storyData?.updatedAt}
              publish_at={storyData?.publish_at}
              summary={storyData?.summary}
              short_description={storyData?.short_description}
              story_type={storyData?.story_type}
              image={storyData?.images}
              prefix={storyData?.prefixData}
              stickerdata={storyData?.stickerData}
              {envDetails}
              {device}
            />

            <!-- Social Sharing Component -->
            <div bind:this={socialElement}>
              <SocialSharing
                {device}
                storyId={storyData?._id}
                {storyData}
                complete_slug={storyData?.completeSlug}
                {envDetails}
              />
            </div>
            {#if device === "mobile" && storyData?.story_type !== "LIVE-BLOG"}
              <div style="min-height: 290px;">
                <DisplayAd
                  adslot={envDetails.adsFile?.Mobile?.ATF?.AP}
                  height={"250"}
                  width={"300"}
                />
              </div>
              <FloatAd adslot={envDetails.adsFile?.Mobile?.FLOATAD?.AP} />
            {/if}
          </div>

          <!-- Render Story Content -->
          {#if storyData?.story_type === "REGULAR" || storyData?.story_type === "OPINION" || storyData?.story_type === "AGENCY"}
            <!-- {#await import("$lib/components/common/StoryCard/RegularStory.svelte") then RegularStory} -->
            <RegularStory
              story={storyData}
              story_comment={storyData?.story_comment}
              {adsSlotAndUsage}
              {device}
              {envDetails}
            />
            <!-- {/await} -->
          {:else if storyData?.story_type === "GALLERY"}            
              <GalleryCard
                story={storyData}
                story_comment={storyData?.story_comment}
                {adsSlotAndUsage}
                {device}
                {envDetails}
              />      
          {:else if storyData?.story_type === "DEEP-FOCUS"}
      
              <DeepFocusCard
                story={storyData}
                story_comment={storyData?.story_comment}
                {device}
                {language}
                {envDetails}
              />

          {:else if storyData?.story_type === "LIVE-BLOG"}
            <LiveBlogCard
              story={storyData}
              {adsSlotAndUsage}
              story_comment={storyData?.story_comment}
              {device}
              {envDetails}
            />
          {/if}
        </div>
      </Card>
      <!-- Right Sidebar Component -->
      {#if sideBarData}
        <div bind:this={sidebarElement}>
          {#if device === "mobile"}
            {#await import("$lib/components/common/Sidebar/Sidebar.svelte") then Sidebar}
              <Sidebar.default
                {storyNotIncludes}
                {sideBarData}
                {storyId}
                {device}
                {envDetails}
                {rightSideBar}
                {language}
              />
            {/await}
          {:else}
            {#await import("$lib/components/common/Sidebar/Sidebar.svelte") then Sidebar}
              <Sidebar.default
              {storyNotIncludes}
                {sideBarData}
                {storyId}
                sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
                {device}
                {envDetails}
                {rightSideBar}
                {language}
              />
            {/await}
          {/if}
          

      {#if device !== "desktop"}
       {#each Object.keys(rightSideBar || {}) as key}
            {#if rightSideBar[key]?.story}
              {#each rightSideBar[key].story as eachStory, i}
                {#if eachStory?.widget?.status === true &&  getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                  {#if getTemplateType(device, eachStory?.widget) !== TEMPLATE.HIDDEN}
                    {#await import("$lib/components/common/Livetv/Livetv.svelte") then Livetv}
                      <div class="sticky mx-3 mt-3 top-[46px]">
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
      {/if}

        
        </div>
      {/if}

      <!-- Ad Banner Component -->
      <div class="sideSticky">
        <div class="isDesktop">
          <!-- <DisplayAdBanner {adslot} /> -->
        </div>
      </div>
    </div>
  </div>
</div>
{#if device === "mobile"}
  <FloatingButton url={language === "RB" ? businessLink : otherDomainLink} />
{/if}

<style>
  .storyBreadcrumb {
    margin-bottom: 16px;
  }
  .breadcrumb ul {
    display: flex;
    gap: 4px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-wrap: nowrap;
  }

  .breadcrumb ul li {
    font-size: 14px;
    font-weight: 400;
  }

  .breadcrumb a {
    color: #000;
    transition: 0.4s;
  }

  .contentMainWrap {
    display: grid;
    grid-template-columns: calc(63%) calc(32%);
    grid-column-gap: 0px;
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

  .storyHead .author {
    width: max-content;
    margin: 0 auto;
  }

  .storyHead .storyImg img {
    width: 100%;
  }
</style>
