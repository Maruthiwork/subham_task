<script>
  // @ts-nocheck

  import SEO from "$lib/components/SEO/index.svelte";
  import RFrame from "$lib/assets/images/R-frame.svg";
  import AmpSection from "./AmpSection.svelte";
  import {
    getViewMoreLabel,
    loadMgidScript,
    useIntersectionObserver,
  } from "../utils/utils";
  import { TEMPLATE } from "../common/StoryCard/Constants";
  import Arrow from "$lib/assets/svg/arrow.svelte";
  import BreakingNewsWidget from "../common/Header/BreakingNewsWidget.svelte";
  import { BREAKING_NEWS_BAR_TYPE } from "../common/Header/Constants";
  import Divider from "../common/Republic-Common/Divider.svelte";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import YoutubeStories from "../common/YoutubeStories/YoutubeStories.svelte";
  import TwitterEmbed from "../TwitterEmbed/TwitterEmbed.svelte";
  import DisplayAd from "../common/DisplayAd/DisplayAd.svelte";
  import CalculatorDetail from "../Calculators/components/CalculatorDetail.svelte";
  import AmpBreakingNewsWidget from "../common/Header/AmpBreakingNewsWidget.svelte";

  // ** Props
  export let homepage;
  export let device = "desktop";
  export let language = "E";
  export let envDetails = {};
  export let siteNavigation = [];
  export let canonicalUrl = "";
  export let isAmp = true;
  export let breakingNewsData = [];
  export let gainerAndLoosersData;
  export let marketData;

  let { home } = homepage?.data?.data;

  $: widgets =
    homepage?.data?.data?.widgetinfo?.[0]?.name === "ads-below-big-breaking"
      ? homepage?.data?.data?.widgetinfo.slice(1)
      : homepage?.data?.data?.widgetinfo || [];

  $: pageWidgets = [...widgets];

  const breadcrumbs = [
    {
      name: "Home",
      slug: "/",
    },
  ];

  const viewmorebtnaction = () => {
    pageWidgets = [...widgets];
  };



  useIntersectionObserver("viewmorebtn", 0.1, viewmorebtnaction);

  // ** Scroll Event Listener to Load MGID Script
  const SCROLL_THRESHOLD = 500; // Replace with the desired scroll height in pixels
  let mgidScriptLoaded = false;

  function handleScroll() {
    if (!mgidScriptLoaded && window.scrollY > SCROLL_THRESHOLD) {
      loadMgidScript(envDetails?.language);
      mgidScriptLoaded = true;
      window.removeEventListener("scroll", handleScroll);
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }
</script>

<SEO
  lang={language}
  {canonicalUrl}
  pageType={"Homepage"}
  {breadcrumbs}
  slug={home?.slug}
  title={language === "H"
    ? home?.seoContent?.meta_title
    : home?.seoContent?.meta_title.slice(0, 70)}
  keywords={home?.seoContent?.meta_keywords}
  datePublished={home?.createdAt}
  lastUpdated={home?.updatedAt}
  metadescription={home?.seoContent?.meta_description.slice(0, 160)}
  timeToRead={""}
  featuredImage={envDetails?.siteLogo}
  ogImage={envDetails?.siteLogo}
  ogSquareImage={envDetails?.siteLogo}
  twitterImage={envDetails?.siteLogo}
  ogSquareImageSrc={envDetails?.siteLogo}
  ogImageSrc={envDetails?.siteLogo}
  twitterImageSrc={envDetails?.siteLogo}
  featuredImageSrc={envDetails?.siteLogo}
  site_details={envDetails}
  dateCreated={home?.createdAt}
  story_type=""
  {siteNavigation}
/>

<AmpBreakingNewsWidget
  {breakingNewsData}
  {language}
  {device}
  type={BREAKING_NEWS_BAR_TYPE.BIG}
/>

{#if device.length}
  <div class="flex flex-wrap gap-x-5">
    {#key pageWidgets}
      {#each pageWidgets.filter((eachWidget) => !["VIDEO_CENTER"].includes(eachWidget?.template)) as eachWidget, i}
        {#if eachWidget?.story?.[0]?.story?.length >= 0 || eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD || eachWidget?.template === TEMPLATE.SEO_FOOTER}
          {#if eachWidget?.bgColor}
            <section
              class={`w-full`}
              style="background-color:{eachWidget?.bgColor ?? ''}"
            >
              <AmpSection
                {eachWidget}
                device={"mobile"}
                {language}
                pagewidgetindex={i}
                {envDetails}
                {gainerAndLoosersData}
                {marketData}
              />
            </section>
          {:else if eachWidget?.dGrid == 3}
            <section class="w-full">
              <AmpSection
                {isAmp}
                {eachWidget}
                device={"mobile"}
                {language}
                pagewidgetindex={i}
                {envDetails}
                {gainerAndLoosersData}
                {marketData}
              />
            </section>
          {:else}
            <AmpSection
              {isAmp}
              {eachWidget}
              device={"mobile"}
              {language}
              pagewidgetindex={i}
              {envDetails}
              {gainerAndLoosersData}
              {marketData}
            />
          {/if}
         {#if (device === "desktop" ? eachWidget.dGrid == "3" : true) && i !== Object.keys(pageWidgets).length - 1}
            {#if Divider && eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD ? (eachWidget?.story?.[0]?.widget?.[device === "desktop" ? "webAds" : "mAds"]?.[device === "desktop" ? "webAdId" : "mAdId"] ?? "")?.length > 0 : true}
              <div class="w-full my-4">
                <Divider classes={"contentWrapper"} />
              </div>
            {/if}
          {/if}
        {/if}
      {/each}
    {/key}
    {#if language === "B" || language === "KA"}
      <section class="w-full">
        {#if language === "B" || language == "KA"}
          <div class="py-2 desktop:px-3 contentWrapper">
            <div class="flex gap-2 flex-col desktop:flex-row">
              <YoutubeStories {language} {envDetails} {device} />
              <div class="w-full">
                {#if device === "desktop"}
                  <DisplayAd
                    adslot={envDetails?.adsFile?.Desktop?.SIDEBARTOP?.home}
                  />
                {/if}
                <TwitterEmbed
                  twitterHandle={language === "B"
                    ? "banglarepublic"
                    : "kannadarepublic"}
                />
              </div>
            </div>
          </div>
        {/if}
      </section>
    {/if}
    {#if device === "mobile" && !(widgets.length === Object.keys(pageWidgets).length)}
      <div class="w-full flex self-center items-center justify-center">
        <button
          id="viewmorebtn"
          aria-label="Read More"
          data-sveltekit-reload
          class="flex items-center gap-2 my-5 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] cursor-pointer"
          on:click={viewmorebtnaction}
        >
          <div class="flex items-center justify-center gap-2">
            {getViewMoreLabel(language)}
            <Arrow />
          </div>
        </button>
      </div>
    {/if}
  </div>
  <div id="migid-container"></div>
{/if}
