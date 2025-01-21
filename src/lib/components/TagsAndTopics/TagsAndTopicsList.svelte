<script lang="ts">
  import PageCardGrid from "../common/Republic-Common/PageCardGrid/PageCardGrid.svelte";
  import Sidebar from "../common/Sidebar/Sidebar.svelte";
  import {
    getHomeTextFromLanguage,
    getTemplate,
    getTemplateType,
    loadMgidScript,
    useIntersectionObserver,
  } from "../utils/utils";
  import SEO from "$lib/components/SEO/index.svelte";
  import { TEMPLATE } from "../common/StoryCard/Constants";
  export let tag_and_topics_list;
  export let trending_stories = {};
  export let siteNavigation:any[] = [];
  export let rightSideBar: any = {};
  export let language = "E";
  export let device: "desktop" | "mobile" = "desktop";
  export let envDetails: any = {};
  export let canonicalUrl: string = "";
  export let isAmp: boolean = false;

  let { data, pagination, tagData } = tag_and_topics_list;

  const breadcrumbs = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Tags and Topics",
      slug: "/topics",
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
  title={tagData?.meta_title}
  metadescription={tagData?.meta_description}
  keywords={tagData?.meta_keyword}
  site_details={envDetails}
  pathname={"/topics"}
  {siteNavigation}
/>
<div class="contentWrapper">
  <div class="flex flex-wrap gap-5">
    <div class="mainArticle w-full desktop:w-[64.66%]">
      <div class="innerLeftBlock">
        <div class="breadcrumb">
          <ul>
            <li>
              <a href="/"> {getHomeTextFromLanguage(language)} / </a>
            </li>
            <li>
              <a href="/topics"> Tags and Topics </a>
            </li>
          </ul>
        </div>
        <div class="anchorsListingWrap">
          <PageCardGrid
            {isAmp}
            showLoadMoreButton={!pagination?.isLastPage}
            title={"Tags and Topics"}
            columns={"1"}
            {language}
            anchor_author_list={data}
            templateType={"FLIP"}
            cardStyle="padding:12px"
            pageRoute={"topics"}
          />
        </div>
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
        {#if rightSideBar?.[key]?.story}
          {#each rightSideBar?.[key].story as eachStory, i}
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
  @media screen and (max-width: 680px) {
    .breadcrumb ul li {
      font-size: 12px;
    }
  }
</style>
