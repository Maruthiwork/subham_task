<script>
  import Sidebar from "../common/Sidebar/Sidebar.svelte";
  import {
    getCalculatorTextFromLanguage,
    getHomeTextFromLanguage,
    loadMgidScript,
    useIntersectionObserver,
  } from "../utils/utils";
  import CalculatorCard from "./CalculatorCard.svelte";
  import { getCalculatorListing } from "./utils/constants";
  import SEO from "$lib/components/SEO/index.svelte";

  export let trending_stories;
  export let device;
  export let language;
  export let envDetails;
  /**
     * @type {never[]}
     */
   export let siteNavigation = []; 
  export let seoData;

  useIntersectionObserver("migid-container", 0.1, () => loadMgidScript(envDetails?.language));

  seoData = {
    ...seoData,
    slug: "calculators",
    completeSlug: "calculators",
    name: "calculators",
  }
  
</script>

<SEO
  lang={language}
  title={seoData?.title || ""}
  metadescription={seoData?.description || ""}
  keywords={seoData?.keywords || ""}
  pathname={"/calculators"}
  site_details={envDetails}
  category={seoData || {}}
  pageType={"Category"}
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
              <a href="/calculators">{getCalculatorTextFromLanguage(language)} /</a>
            </li>
          </ul>
        </div>
        <div class="outer-calculator-conatiner">
          <div class="calculator-container">
            {#each Object.values(getCalculatorListing(language)) as calculator}
              <CalculatorCard
                bgColor={calculator?.cardColor}
                title={calculator?.title}
                calculatorTitle={calculator?.calculatorText}
                calculatorButton={calculator?.buttonColor}
                upperCircleBgColor={calculator?.upperCircleColor}
                lowerCircleBgColor={calculator?.lowerCircleColor}
                image={calculator?.imagePath}
                buttonText={calculator?.buttonText}
                path={calculator?.path}
              />
            {/each}
          </div>
        </div>
      </div>
      
    </div>
    <div class="w-full desktop:w-[31.33%]">
      {#if trending_stories}
        <Sidebar
          {device}
          {envDetails}
          {language}
          sideBarData={trending_stories}
          sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
        />
      {/if}
    </div>
  </div>
  <div id="migid-container" />
</div>

<style>
  .breadcrumb ul {
    display: flex;
    gap: 4px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 400;
    margin: 12px 0;
  }

  .outer-calculator-conatiner {
    padding: 1px;
  }

  .calculator-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(317px, 1fr));
    gap: 24px;
    border-radius: 8px;
  }

  @media screen and (max-width: 680px) {
    .breadcrumb ul li {
      font-size: 12px;
    }

    .calculator-container {
      grid-template-columns: repeat(2, 1fr); /* Show 2 cards per row */
      gap: 16px; /* Adjust gap between cards */
    }
  }
</style>



