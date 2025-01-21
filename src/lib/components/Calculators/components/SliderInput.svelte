<script lang="ts">
  export let start: number = 0;
  export let end: number = 100000;
  export let step: number = 1;
  export let value: number = 50000;
  export let type: "amount" | "months" | "rate" = "amount";
  export let unfilledColor: string = "#ccc";
  export let setValue: (value: number) => void;
  export let label: string = "Slider";
  export let backgroundColor: string = "#CA000B";
  export let sybol: string = "₹";
  export let isSliderVisible = true;

  function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value);
  }

  function parseNumber(formattedValue: string): number {
    return parseFloat(formattedValue.replace(/,/g, ''));
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;

    if (/^-?\d*\.?\d*$/.test(rawValue)) { // Allow valid numeric patterns
      let parsedValue = parseNumber(rawValue);
      if (!isNaN(parsedValue)) {
        parsedValue = Math.max(start, Math.min(parsedValue, end)); // Clamp value
        value = parsedValue;
        setValue(value);
      }
    }
  }

  function handleFocus(event: Event) {
    const target = event.target as HTMLInputElement;
    target.value = value.toString(); // Show raw value
  }

  function handleBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    target.value = formatNumber(value); // Format on blur
  }

  function handleSliderInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let parsedValue = +target.value;

    parsedValue = Math.max(start, Math.min(parsedValue, end));
    value = parsedValue;
    setValue(value);
  }

  function handleKeyPress(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const key = event.key;

    if (key === '.' && target.value.includes('.')) {
      event.preventDefault(); // Prevent multiple decimals
    } else if (!/^\d$|^\.$/.test(key)) {
      event.preventDefault(); // Allow only digits and one decimal
    }
  }
</script>

<div class="flex flex-col gap-3 items-center py-4" style="--slider-bg-color: {backgroundColor}; --unfilled-color: {unfilledColor};">
  <div class="flex justify-between w-full items-center">
    <label for="slider" style="color: {backgroundColor}; font-weight:600; font-size:16px">{label}</label>
    <div class="flex">
      <div class="input-container relative">
        <input
          type="text"
          value={value.toString()}
          min={start}
          max={end}
          step={step}
          style={`background-color: ${backgroundColor}; color: white;`}
          class="slider-input pl-10"
          on:input={handleInput}
          on:focus={handleFocus}
          on:blur={handleBlur}
          on:keypress={handleKeyPress}
        />
        <span class="symbol absolute">{sybol}</span>
      </div>
    </div>
  </div>
  {#if isSliderVisible}
  <div class="slider-container w-full">
    <input
      type="range"
      min={start}
      max={end}
      step={step}
      value={value}
      class="slider"
      on:input={handleSliderInput}
      style="background: linear-gradient(to right, var(--slider-bg-color) 0%, var(--slider-bg-color) {((value - start) / (end - start)) * 100}%, var(--unfilled-color) {((value - start) / (end - start)) * 100}%, var(--unfilled-color) 100%);"
    />
  </div>
  {/if}
</div>


<style>
  .input-container {
    position: relative;
    width: fit-content;
  }

  .symbol {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 500;
    font-size: 20px;
    color: #ffffff;
    background: transparent;
    pointer-events: none;
  }

  .slider-input {
    padding-left: 2.0rem;
    width: 120px;
    height: 27px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  }

  .slider-input::-webkit-inner-spin-button,
  .slider-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 4px;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--unfilled-color);
    cursor: pointer;
    border: 5px solid var(--slider-bg-color);
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--unfilled-color);
    cursor: pointer;
    border: 5px solid var(--slider-bg-color);
  }
</style>
