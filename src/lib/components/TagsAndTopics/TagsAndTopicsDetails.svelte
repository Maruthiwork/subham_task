<script lang="ts">
  import { fetchTagsAndTopics } from "../../../routes/api/fetchData";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../common/HybridImage/Constants";
  import PageCardGrid from "../common/Republic-Common/PageCardGrid/PageCardGrid.svelte";
  import StoryCard from "../common/Republic-Common/StoryCard.svelte";
  import Sidebar from "../common/Sidebar/Sidebar.svelte";
  import {
    getHomeTextFromLanguage,
    loadMgidScript,
    useIntersectionObserver,
    getViewMoreLabel,
    getTemplate,
    getTemplateType,
  } from "../utils/utils";
  import SEO from "$lib/components/SEO/index.svelte";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import { TEMPLATE, TEMPLATE_PROPERTIES } from "../common/StoryCard/Constants";
  import Arrow from "$lib/assets/svg/arrow.svelte";

  // ** Props
  export let tag_and_topics_data: any;
  export let sideBarData;
  export let rightSideBar: any = {};
  export let siteNavigation: any = [];
  export let device: "desktop" | "mobile" = "desktop";
  export let envDetails: any = "";
  export let language = "E";
  export let canonicalUrl: string = "";
  export let isAmp: boolean = false;

  // ** Variables
  let tag_and_topics_stories: any = [];
  let { menu, details, tag_stories, pagination } = tag_and_topics_data;
  let paginationData = tag_and_topics_data?.pagination;
  let selectedCategory = "all";
  let slug = details?.[0]?.slug;
  $: loading = false;
  $: topicsPagination = { pageNo: 1, pageSize: 10 };
  $: tag_and_topics_stories = tag_stories;

  const handleWidgetClick = async (slug: any) => {
    selectedCategory = slug;
    await fetchData();
  };

  async function fetchData() {
    try {
      const response = await fetchTagsAndTopics(
        language,
        slug,
        selectedCategory,
      );
      tag_and_topics_stories = response?.data?.data?.tag_stories || [];
      paginationData = response?.data?.data?.pagination;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function GET_STORIES(slug: string, category: string, page = 1, size = 10) {
    let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/tags/tag-detail?slug=${slug}&category=${category}`;
    if (page && size) {
      apiUrl += `&page=${page}&pageSize=${size}`;
    }

    return apiUrl;
  }

  async function loadMore() {
    loading = true;
    const config = {
      method: "GET",
      headers: { lang: language },
    };
    const url = GET_STORIES(
      slug,
      selectedCategory,
      (tag_and_topics_data?.pagination?.currentPage || 0) + 1,
      topicsPagination?.pageSize,
    );

    const response = await fetch(url, config);
    const data = await response.json();

    if (data?.status && data?.statusCode === 200 && data?.data?.data) {
      loading = false;
      return data?.data?.data;
    } else {
      loading = false;
      return {};
    }
  }

  const aspectRatio = IMAGE_ASPECT_RATIO?.["16_9"]?.key;

  const breadcrumbs = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Tags and Topics",
      slug: "/topics",
    },
    {
      name: `${details?.[0]?.name}`,
      slug: `/topics/${details?.[0]?.slug}`,
    },
  ];
  useIntersectionObserver("migid-container", 0.1, () =>
    loadMgidScript(envDetails?.language),
  );
</script>

<SEO
  {isAmp}
  lang={language}
  {canonicalUrl}
  {breadcrumbs}
  slug={details?.[0]?.slug}
  title={details?.[0]?.meta_title}
  storyData={tag_stories}
  metadescription={details?.[0]?.meta_description}
  keywords={details?.[0]?.meta_keyword}
  ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    details?.[0]?.image?.versions?.["16_9"]?.filePath}
  ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    details?.[0]?.image?.versions?.["16_9"]?.filePath}
  twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    details?.[0]?.image?.versions?.["16_9"]?.filePath}
  featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    details?.[0]?.image?.versions?.["16_9"]?.filePath}
  site_details={envDetails}
  pathname={`/topics/${details?.[0]?.slug}`}
  {siteNavigation}
/>
<div class="contentWrapper">
  <div class="flex flex-wrap gap-5">
    <div class="mainArticle w-full desktop:w-[64.66%]">
      <div class="innerLeftBlock">
        <div class="breadcrumb">
          <ul>
            <li>
              <a href="/">
                {getHomeTextFromLanguage(language)} /
              </a>
            </li>
            <li>
              <a href={isAmp ? "/amp/topics" : '/topics' }> Tags and Topics / </a>
            </li>
            <li>
              <p>{details?.[0]?.name}</p>
            </li>
          </ul>
        </div>
        <div class="videosCategoriesList flex flex-col mt-5">
          <PageCardGrid
            {isAmp}
            {envDetails}
            title={""}
            columns={"1"}
            anchor_author_list={details}
            templateType={"FLIP"}
            cardStyle="padding:12px"
            pageRoute={"topics"}
            {device}
            isLinkDisabled={true}
            classProperties={"text-[22px] leading-[25.4px] tracking-[-4] desktop:text-[24px] desktop:leading-[28.8px] desktop:tracking-[-4] line-clamp-3 mt-3"}
          />
          {#if !isAmp}
            <div class="flex gap-4 overflow-auto pb-4">
              {#each menu as item}
                {#if item}
                  <button
                    aria-label="Menu Click"
                    on:click={() => handleWidgetClick(item.slug)}
                  >
                    <p
                      class="font-normal rounded-[18px] px-4 py-3 text-base h-9 w-auto flex justify-center items-center whitespace-nowrap"
                      style="background-color: {selectedCategory === item.slug
                        ? '#D10014'
                        : '#E4E4E4'}; color: {selectedCategory === item.slug
                        ? '#FFFFFF'
                        : '#000000'}"
                    >
                      {item.name}
                    </p>
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </div>

        {#if tag_and_topics_stories?.length > 0}
          <div
            class="grid"
            style="--columns: {2};column-gap:0;{device === 'mobile'
              ? 'gap:0px'
              : 'gap:24px'}"
          >
            {#each tag_and_topics_stories as story}
              <StoryCard
                {isAmp}
                title={story?.long_heading}
                imageUrl={generateAspectRatioImageURL(
                  story?.images,
                  ImageDimensions?.[device]?.mediumThumbnail,
                  IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio,
                )}
                {envDetails}
                video={story?.video}
                storyType={story?.story_type}
                stickerData={story?.stickerData}
                alt={story?.images?.versions?.["16_9"]?.alt || "tag_img"}
                category={story?.categoryData || ""}
                time={story?.updatedAt ?? ""}
                link={story?.completeSlug ?? ""}
                columns={"1"}
                template={TEMPLATE_PROPERTIES.STORY_CARD.key}
                template_type={TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT}
                cardStyle={device === "desktop"
                  ? language !== "RB"
                    ? "border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: #FCFCFC;padding:16px;"
                    : "border-radius: 4px;padding:16px;"
                  : ""}
                cardBgColor={"white"}
                secondaryColor={"#D10014"}
                bigfontStyle={"font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;"}
                mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
              />
            {/each}
          </div>
          {#if !paginationData?.isLastPage}
            <div class="w-full flex items-center justify-center my-5">
              <button
                aria-label="Load More"
                disabled={loading}
                style="background-color: #D10014"
                class={`flex items-center gap-2 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] ${loading ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer"}`}
                on:click={async () => {
                  const topics = await loadMore();
                  tag_and_topics_data = topics;
                  paginationData = topics?.pagination;
                  const newStories = topics?.tag_stories;
                  tag_and_topics_stories = [
                    ...tag_and_topics_stories,
                    ...newStories,
                  ];

                  topicsPagination = {
                    ...topicsPagination,
                    pageNo: (topics?.pagination?.currentPage || 0) + 1,
                  };
                }}
              >
                {#if loading}
                  ...
                {:else}
                  <div class="flex items-center justify-center gap-2">
                    {getViewMoreLabel(language)}
                    <Arrow />
                  </div>
                {/if}
              </button>
            </div>
          {/if}
        {/if}
      </div>
    </div>
    <div class="w-full desktop:w-[31.33%]">
      {#if sideBarData}
        <Sidebar
          {isAmp}
          {device}
          {envDetails}
          {language}
          {sideBarData}
          {rightSideBar}
          sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
        />
      {/if}
      {#each Object.keys(rightSideBar || {}) as key}
        {#if rightSideBar[key]?.story}
          {#each rightSideBar[key].story as eachStory, i}
            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
              {#if getTemplateType(device, eachStory?.widget) !== TEMPLATE.HIDDEN}
                {#await import("$lib/components/common/Livetv/Livetv.svelte") then Livetv}
                  <div class="sticky mx-3 mt-3 top-[46px]">
                    <Livetv.default data={eachStory?.widget} isSideBar={true} />
                  </div>
                {/await}
              {/if}
            {/if}
          {/each}
        {/if}
      {/each}
    </div>
  </div>
  <div id="migid-container" />
</div>

<style>
  .breadcrumb ul {
    display: flex;
    gap: 4px;
    display: flex;
    gap: 4px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 400;
    margin: 12px 0;
  }
  /* Hide the scrollbar for webkit browsers (Chrome, Safari, etc.) */
  .flex::-webkit-scrollbar {
    display: none;
  }

  /* Optional: Hide the scrollbar for Firefox */
  .flex {
    scrollbar-width: none;
  }
  .articleHead.mainPagehead {
    margin-bottom: 20px;
    padding: 0;
  }

  .articleHead,
  .articleHead h2 {
    display: flex;
    align-items: center;
  }

  .articleHead {
    justify-content: space-between;
    margin-bottom: 16px;
    width: 100%;
  }
  @media screen and (max-width: 680px) {
    .breadcrumb ul li {
      font-size: 12px;
    }
  }
</style>
