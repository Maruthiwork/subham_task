<script lang="ts">
  import CalculatorPageLayout from "$lib/components/CalculatorPageLayout/CalculatorPageLayout.svelte";

  export let data: any;
  const {
    calculatorPath,
    trending_stories,
    device,
    pageData,
    language,
    envDetails,
    calculatorDetails,
    rightSideBar,
    canonicalUrl,
    getParentCategory
  } = data?.props;
</script>

<CalculatorPageLayout
  {calculatorDetails}
  {calculatorPath}
  {trending_stories}
  {device}
  {language}
  {envDetails}
  {rightSideBar}
  {canonicalUrl}
  seoContent={pageData?.data.data?.seoContent}
  sections={pageData?.data.data?.sections}
  siteNavigation={getParentCategory}
/>
