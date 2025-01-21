<script lang="ts">
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import Sidebar from "../common/Sidebar/Sidebar.svelte";
  import PageCardGrid from "../common/Republic-Common/PageCardGrid/PageCardGrid.svelte";
  import { fetchAnchorAndAuthorDetails } from "../../../routes/api/fetchData";
  import SEO from "$lib/components/SEO/index.svelte";
  import {
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
    generateAspectRatioImageURL,
  } from "../common/HybridImage/Constants";
  import StoryCard from "../common/Republic-Common/StoryCard.svelte";
  import {
    getHomeTextFromLanguage,
    getLoadMoreLabel,
    getTemplate,
    getTemplateType,
    loadMgidScript,
    useIntersectionObserver,
  } from "../utils/utils";
  import { TEMPLATE, TEMPLATE_PROPERTIES } from "../common/StoryCard/Constants";
  import Divider from "../common/Republic-Common/Divider.svelte";
  import Arrow from "$lib/assets/svg/arrow.svelte";
  import { page } from "$app/stores";

  export let isAmp = false;
  export let anchor_author_details: any;
  export let trending_stories;
  export let rightSideBar: any = {};
  export let device: "desktop" | "mobile" = "desktop";
  export let language: string = "E";
  export let envDetails: any = {};
  export let siteNavigation: any = [];
  export let canonicalUrl: string = "";

  let selectedCategory = "all";
  let { info, isAnchor, menu } = anchor_author_details;
  let slug = info?.slug;



  $: authorAnchorInfo = anchor_author_details;

  $: loading = false;
  $: pagination = {
    pageNo: 2,
    pageSize: 10,
  };

  const menulist = menu || [];

  const handleWidgetClick = async (slug: any) => {
    selectedCategory = slug;
    pagination.pageNo = 2;
    await fetchData();
  };

  async function fetchData() {
    try {
      const response = await fetchAnchorAndAuthorDetails(
        language,
        slug,
        selectedCategory,
        1,
        10,
      );
      authorAnchorInfo = response?.data?.data;
      pagination.pageNo = 2; // Reset pagination to the first page when fetching new data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const aspectRatio = IMAGE_ASPECT_RATIO?.["16_9"]?.key;

  function GET_STORIES(
    completeSlug: string,
    storyType: string,
    pageNo = 1,
    pageSize = 10,
  ) {
    let url = `${EnvironmentConfig.VITE_API_END_POINT}/anchors-and-authors/info?slug=${completeSlug}&storytype=${storyType}`;

    if (pageNo && pageSize) {
      url += `&page=${pageNo}&pageSize=${pageSize}`;
    }

    return url;
  }

  async function loadMore() {
    loading = true;
    const config = {
      method: "GET",
      headers: { lang: language },
    };

    const response = await fetch(
      GET_STORIES(
        slug,
        selectedCategory,
        pagination.pageNo,
        pagination.pageSize,
      ),
      config,
    );
    const data = await response.json();

    if (
      data?.status &&
      data?.statusCode === 200 &&
      data?.data?.data?.stories?.length
    ) {
      loading = false;

      // Filter out duplicate stories based on unique IDs (assuming each story has an `id`)
      const newStories = data?.data?.data?.stories;
      const existingStoryIds = new Set(
        authorAnchorInfo?.stories.map((story: any) => story._id),
      );

      const uniqueNewStories = newStories.filter(
        (story: any) => !existingStoryIds.has(story._id),
      );

      // Append unique stories to `authorAnchorInfo.stories`
      authorAnchorInfo = {
        ...authorAnchorInfo,
        stories: [...authorAnchorInfo?.stories, ...uniqueNewStories],
      };

      pagination.pageNo += 1;
      return uniqueNewStories;
    } else {
      loading = false;
      return [];
    }
  }

  const categorySlug = $page.url.pathname.split("/")[2];

  const categoryMenu = info.type == 'ANCHOR' ? `anchors` : `authors`;

  const breadcrumbs: any[] = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: { categorySlug },
      slug: `/${categorySlug}`,
    },
    {
      name: `${info?.firstName + info?.lastName}`,
      slug: info.type == 'ANCHOR' ? `/anchors/${info?.slug}` : `/authors/${info?.slug}`,
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
  slug={info?.slug}
  pathname={info.type == 'ANCHOR' ? `/anchors/${info?.slug}` : `/authors/${info?.slug}`}
  title={info?.firstName + " " + info?.lastName}
  metadescription={info?.meta_description}
  keywords={info?.meta_keywords}
  site_details={envDetails}
  anchorAuthorData={info}
  pageType="AuthorAnchor"
  {siteNavigation}
/>
<div class="contentWrapper">
  <div class="flex flex-wrap gap-5">
    <div class="mainArticle w-full desktop:w-[64.66%]">
      <div class="innerLeftBlock">
        <div class="breadcrumb">
          <ul>
            <li>
              <a href={`${isAmp ? "/amp/" : "/"}`}> {getHomeTextFromLanguage(language)} / </a>
            </li>
            <li>
              <a data-sveltekit-reload href={`${isAmp ? "/amp/" : "/"}${categoryMenu}`}>
                {categoryMenu} /
              </a>
            </li>
            <li>
              {info?.firstName + " " + info?.lastName}
            </li>
          </ul>
        </div>
        <div class="anchorsListingWrap">
          <PageCardGrid
            {isAmp}
            title={""}
            {envDetails}
            columns={"1"}
            anchor_author_list={[info]}
            templateType={"FLIP"}
            cardStyle="padding:12px"
            pageRoute={`${categorySlug}`}
            {device}
            {language}
            imgStyle={"border-radius: 50%"}
            isLinkDisabled={true}
            classProperties={"text-[22px] leading-[25.4px] tracking-[-4] desktop:text-[24px] desktop:leading-[28.8px] desktop:tracking-[-4] line-clamp-3 mt-3"}
          />
          {#if !isAmp}
            <div class="flex gap-x-2 pb-4">
              {#each menulist as item}
                <button
                  aria-label="Click Story"
                  on:click={() => handleWidgetClick(item.slug)}
                >
                  <p
                    class="font-normal rounded-[18px] px-4 py-3 text-base h-9 w-auto flex justify-center items-center"
                    style="background-color: {selectedCategory === item?.slug
                      ? '#D10014'
                      : '#E4E4E4'} ;color: {selectedCategory === item?.slug
                      ? '#FFFFFF'
                      : '#000000'}"
                  >
                    {item.name}
                  </p>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        {#if authorAnchorInfo?.stories?.length > 0}
          <div
            class="grid gap-4 desktop:gap-6"
            style="--columns: {2};column-gap:0;"
          >
            {#each authorAnchorInfo?.stories as story, index}
              <StoryCard
                {isAmp}
                title={story.long_heading}
                imageUrl={generateAspectRatioImageURL(
                  story?.images,
                  ImageDimensions?.[device]?.mediumThumbnail,
                  IMAGE_ASPECT_RATIO[aspectRatio]?.key ?? aspectRatio,
                )}
                {envDetails}
                video={story?.video}
                storyType={story?.story_type}
                stickerData={story?.stickerData}
                alt={story?.images?.versions?.["16_9"]?.alt}
                category={story.categoryData || ""}
                time={story.updatedAt}
                columns={"1"}
                cardBgColor={device === "desktop" && language !== "RB"
                  ? "#fff"
                  : ""}
                template={TEMPLATE_PROPERTIES.STORY_CARD.key}
                template_type={TEMPLATE_PROPERTIES.STORY_CARD.type.EQUALDEFAULT}
                link={story.completeSlug}
                cardStyle={device === "desktop"
                  ? language !== "RB"
                    ? "border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.10);background: #FCFCFC;padding:16px;"
                    : "border-radius: 4px;padding:16px;"
                  : ""}
                bigfontStyle={"font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;"}
                mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
                grid={"2"}
                {device}
              />
              {#if device === "mobile"}
                <Divider />
              {/if}
            {/each}
            {#if !isAmp && !anchor_author_details?.isLastPage}
              <div class="w-full flex items-center justify-center my-5">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a
                  rel="next"
                  href="javascript:void(0)"
                  aria-label="Load More"
                  aria-disabled={loading}
                  class={`flex items-center gap-2 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] ${
                    loading
                      ? "cursor-not-allowed  opacity-50 pointer-events-none"
                      : "cursor-pointer"
                  }`}
                  on:click={async () => {
                    const authorAnchorResponse = await loadMore();

                    authorAnchorInfo = {
                      ...authorAnchorInfo,
                      stories: [
                        ...authorAnchorInfo?.stories,
                        ...authorAnchorResponse?.stories,
                      ],
                    };
                    pagination = {
                      ...pagination,
                      pageNo: pagination?.pageNo + 1,
                    };
                  }}
                >
                  {#if loading}
                    Loading...
                  {:else}
                    {getLoadMoreLabel(language, "")}
                    <Arrow />
                  {/if}
                </a>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <div class="w-full desktop:w-[31.33%]">
      {#if trending_stories}
        <Sidebar
          {isAmp}
          {device}
          {envDetails}
          {language}
          sideBarData={trending_stories}
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
