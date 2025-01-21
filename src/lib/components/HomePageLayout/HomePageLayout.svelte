<script>
  // @ts-nocheck

  import SEO from "$lib/components/SEO/index.svelte";
  import RFrame from "$lib/assets/images/R-frame.svg";
  import Section from "./Section.svelte";
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

  // ** Props
  export let homepage;
  export let device = "desktop";
  export let language = "E";
  export let envDetails = {};
  export let siteNavigation = [];
  export let canonicalUrl = "";

  let { home } = homepage?.data?.data;

  $: widgets =
    homepage?.data?.data?.widgetinfo?.[0]?.name === "ads-below-big-breaking"
      ? homepage?.data?.data?.widgetinfo.slice(1)
      : homepage?.data?.data?.widgetinfo || [];

  $: pageWidgets = device === "desktop" ? [...widgets] : [widgets?.[0]];

  const breadcrumbs = [
    {
      name: "Home",
      slug: "/",
    },
  ];

  const viewmorebtnaction = () => {
    pageWidgets = [...widgets];
  };

  //call migid ads
  // useIntersectionObserver("migid-container", 0.1, () =>
  //     loadMgidScript(envDetails?.language),
  // );

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
  pathname=""
  {siteNavigation}
/>

<BreakingNewsWidget {language} {device} type={BREAKING_NEWS_BAR_TYPE.BIG} />
{#if device.length}
  <div class="flex flex-wrap gap-x-5">
    {#key pageWidgets}
      {#each pageWidgets as eachWidget, i}
        {#if eachWidget?.story?.[0]?.story?.length >= 0 || eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD}
          {#if eachWidget?.bgColor}
            <section
              class={`w-full`}
              style="background-color:{eachWidget?.bgColor ?? ''}"
            >
              <Section
                {eachWidget}
                {device}
                {language}
                pagewidgetindex={i}
                {envDetails}
              />
            </section>
          {:else if eachWidget?.dGrid == 3}
            <section class="w-full">
              <Section
                {eachWidget}
                {device}
                {language}
                pagewidgetindex={i}
                {envDetails}
              />
            </section>
          {:else}
            <Section
              {eachWidget}
              {device}
              {language}
              pagewidgetindex={i}
              {envDetails}
            />
          {/if}
          <!-- eachWidget?.story?.[0]?.widget?.template !== TEMPLATE.ADS_CARD && -->
          {#if (device === "desktop" ? eachWidget.dGrid == "3" : true) && i !== Object.keys(pageWidgets).length - 1}
            {#if Divider && eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD ? (eachWidget?.story?.[0]?.widget?.[device === "desktop" ? "webAds" : "mAds"]?.[device === "desktop" ? "webAdId" : "mAdId"] ?? "")?.length > 0 : true}
              <div class="w-full my-4 {eachWidget?.story?.[0]?.widget?.template === TEMPLATE.ADS_CARD ? "divider-disable" : ""}">
                <Divider classes={"contentWrapper"} />
              </div>
            {/if}
          {/if}
        {/if}
      {/each}
    {/key}
    {#if (language === "B" || language === "KA") && !envDetails?.domainName.includes("dev")}
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