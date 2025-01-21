<script lang="ts">
  import {
    loadMgidScript,
    useIntersectionObserver,
  } from "$lib/components/utils/utils";
  import { getCalculatorDetails } from "../utils/constants";
  import CalculatorsTabs from "./CalculatorsTabs.svelte";

  export let calculatorPath: string;
  export let language: any;
  export let envDetails: any;
  export let calculatorDetails: any;

  const extractedPath = calculatorPath?.match(/\[shortcode:(.*?)\]/)?.[1] || calculatorPath;

  useIntersectionObserver("migid-container", 0.1, () =>
    loadMgidScript(envDetails?.language),
  );

  const calculatorDetailsOG = getCalculatorDetails(extractedPath, language);

  let calculatorTitle = calculatorDetailsOG?.name;
</script>

<div
  class="calculator-container"
  style="background-color: {calculatorDetails?.bgColor ?? '#F8D9DB'};"
>
  <div class="gap-7.5">
    <CalculatorsTabs
      tabs={calculatorDetailsOG?.tabs}
      title={calculatorTitle}
      textColor={calculatorDetails?.textColor ?? '#CA000B'}
      imagePath={calculatorDetailsOG?.imagePath}
      {language}
    />
  </div>
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
