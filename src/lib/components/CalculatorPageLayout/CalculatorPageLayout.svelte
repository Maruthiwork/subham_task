<script lang="ts">
    import Sidebar from "$lib/components/common/Sidebar/Sidebar.svelte";
    import {
        getCalculatorTextFromLanguage,
        getHomeTextFromLanguage,
        loadMgidScript,
        useIntersectionObserver,
    } from "$lib/components/utils/utils";
    import SEO from "$lib/components/SEO/index.svelte";
    import Faq from "../Calculators/components/FAQ.svelte";
    import { getCalculatorDetails } from "../Calculators/utils/constants";
    import CalculatorDetail from "../Calculators/components/CalculatorDetail.svelte";

    export let calculatorPath: any;
    export let trending_stories: any;
    export let device: any;
    export let language: any;
    export let envDetails: any;
    export let calculatorDetails: any;
    export let sections: any;
    export let rightSideBar: any = {};
    export let seoContent: any = {};
    export let siteNavigation: any = [];
    export let canonicalUrl: any = "";

    useIntersectionObserver("migid-container", 0.1, () =>
        loadMgidScript(envDetails?.language),
    );

    const calculatorDetailsOG = getCalculatorDetails(calculatorPath, language);

    let calculatorTitle = calculatorDetailsOG?.name;

    let FaqData = sections?.find((section: any) => section.template === "FAQ")
        ?.groupPin?.[0]?.info?.[0]?.embedded_code ?? "[]";

    const breadcrumbs: any[] = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name: "Calculators",
            slug: "/calculators",
        },
        {
            name: `${calculatorTitle}`,
            slug: `/${calculatorDetailsOG?.path}`,
        },
    ];

    
  calculatorDetails = {
    ...calculatorDetails,
    slug:calculatorDetails?.path,
    completeSlug: calculatorDetails?.path,
  }

  
</script>

<SEO
    {breadcrumbs}
    slug={calculatorDetailsOG?.path}
    pathname={calculatorDetailsOG?.path}
    lang={language}
    {canonicalUrl}
    title={seoContent?.meta_title}
    metadescription={seoContent?.meta_description}
    keywords={seoContent?.meta_keywords}
    site_details={envDetails}
    category={calculatorDetails || {}}
    pageType={"Category"}
    {siteNavigation}
    faqs={JSON.parse(FaqData)}
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
                            <a href="/calculators"
                                >{getCalculatorTextFromLanguage(language)} /</a
                            >
                        </li>
                        <li>{calculatorTitle}</li>
                    </ul>
                </div>

                <CalculatorDetail
                    {calculatorDetails}
                    {calculatorPath}
                    {language}
                    {envDetails}
                />

                <Faq faqs={FaqData} />
            </div>
        </div>
        <div class="w-full desktop:w-[31.33%]">
            {#if trending_stories}
                <Sidebar
                    {device}
                    {envDetails}
                    {language}
                    sideBarData={trending_stories}
                    {rightSideBar}
                    sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
                />
            {/if}
        </div>
    </div>
    <div id="migid-container" />
</div>

<style>
    .calculator {
        height: 438px;
        width: 100%;
        opacity: 1;

        gap: 20px;
        border: 1px solid #e5e5e5;
    }

    .calculator-container {
        width: 100%;
        padding: 16px;
        gap: 24px;
    }

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
