<script lang="ts">
    import CalculatorsList from "$lib/components/Calculators/CalculatorsList.svelte";
    export let data:any;

    const {
      trending_stories,
      device,
      language,
      envDetails,
      seoData,
      getParentCategory
    } = data?.props;

</script>


<CalculatorsList 
  {trending_stories}
  {device}
  {language}
  {envDetails}
  {seoData}
  siteNavigation={getParentCategory}
/>