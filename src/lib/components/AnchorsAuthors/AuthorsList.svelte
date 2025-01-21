<script lang="ts">
  import PageCardGrid from "../common/Republic-Common/PageCardGrid/PageCardGrid.svelte";
  import Sidebar from "../common/Sidebar/Sidebar.svelte";
  import SEO from "$lib/components/SEO/index.svelte";
  import {
    getHomeTextFromLanguage,
    getTemplate,
    getTemplateType,
    loadMgidScript,
    useIntersectionObserver,
  } from "../utils/utils";
  import { TEMPLATE } from "../common/StoryCard/Constants";

  export let isAmp = false;
  export let authorList;
  export let trending_stories;
  export let rightSideBar: any = {};
  export let language = "E";
  export let device: "desktop" | "mobile" = "desktop";
  export let envDetails: any = "";
  export let siteNavigation: any = [];
  export let canonicalUrl: string = "";

  let author_list = authorList.author_list;

  const breadcrumbs: any[] = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Authors",
      slug: "/authors",
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
  slug={authorList?.categoryData?.completeSlug}
  pathname={"/authors"}
  title={authorList?.categoryData?.meta_title}
  metadescription={authorList?.categoryData?.meta_description}
  keywords={authorList?.categoryData?.meta_keywords}
  site_details={envDetails}
  pageType='Author'
  {siteNavigation}
/>
<div class="contentWrapper">
  <div class="flex flex-wrap gap-5">
    <div class="mainArticle w-full desktop:w-[64.66%]">
      <div class="innerLeftBlock">
        <div class="breadcrumb">
          <ul>
            <li>
              <a href={`${isAmp ? "/amp/" : "/"}`}>
                {getHomeTextFromLanguage(language)} /
              </a>
            </li>
            <li>Authors</li>
          </ul>
        </div>
        <div class="anchorsListingWrap">
          <div
            style="background-color: #D10014;"
            class="articleHead blackArticleHead mainPagehead bg-[#D10014] text-white"
          >
            <h2
              class="flexwrap p-2 font-noto-sans text-2xl font-extrabold leading-[28.8px] tracking-[-0.04em] text-left"
            >
              Authors
            </h2>
          </div>
          <PageCardGrid
            {isAmp}
            title={""}
            columns={"3"}
            anchor_author_list={author_list}
            templateType={"MEDIUM"}
            cardStyle="padding:12px;text-align: -webkit-center;"
            pageRoute={"authors"}
            {device}
            {language}
            showDesignation={false}
            imgStyle={"border-radius: 50%"}
            footerStyles={"justify-content: center; "}
            isList={true}
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
