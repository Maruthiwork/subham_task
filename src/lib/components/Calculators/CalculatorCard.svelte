<script>
  export let bgColor;
  export let title;
  export let calculatorTitle;
  export let image;
  export let buttonText;
  export let path;
  export let upperCircleBgColor;
  export let lowerCircleBgColor;
  export let calculatorButton;
</script>

<div class="card" style="background: {bgColor}">
  <div class="content">
    <div class="title mb-4 font-bold leading-[33.6px]">
      <div>{title}</div>
    </div>

    <div class="title mb-4 font-bold leading-[33.6px]">
      <div>{calculatorTitle}</div>
    </div>

    {#if buttonText?.length > 0}
      <div class="custom-padding">
        <a href={"calculators/" + path}>
          <button
            class="calculator-button"
            style="background-color: {calculatorButton};"
          >
            {buttonText}
          </button>
        </a>
      </div>
    {/if}
  </div>

  <div class="upper-circle" style="background: {upperCircleBgColor}">
    {#if image?.length > 0}
      <img src={image} alt="Icon" class="image-in-circle" />
    {/if}
  </div>
  <div class="lower-circle" style="background: {lowerCircleBgColor}"></div>
</div>

<style>
  .calculator-button {
    font-family: "Inter", sans-serif;
    font-size: 18px; /* Default size for desktop */
    font-weight: 600;
    line-height: 21.78px;
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 123.95px;
    height: 37.95px;
    border-radius: 4px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center; /* Vertically centers the text */
    font-family: "Inter", sans-serif;
    font-weight: 600;
    text-align: center;
    color: white;
    background-color: var(--button-color);
    border-radius: 4.29px 0 0 0;
    padding: 8.59px 0; /* Removed padding on the top, bottom padding to center text vertically */
    width: 113.17px;
    height: 36.17px;
    gap: 21.46px;
    opacity: 1;
  }

  .custom-padding {
    padding-bottom: 19.94px;
  }

  .title {
    font-family: "Inter", sans-serif;
    font-weight: 700;
    text-align: left;
    color: white;
  }

  /* Calculator button for tablet view (max-width: 1024px) */
  @media screen and (max-width: 1024px) {
  }

  .card {
    display: flex;
    align-items: center;
    background-color: var(--bg-color);
    height: 283.13px; /* Default height */
    border-radius: 8px;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .content {
    flex-grow: 1;
    z-index: 3;
    margin-top: 120px;
  }

  .title {
    font-size: 24px; /* Font size for tablet */
    line-height: 28.8px; /* Line height for tablet */
  }

  .upper-circle {
    width: 287.12px;
    height: 287.12px;
    position: absolute;
    top: -88.53px;
    left: 90%;
    transform: translateX(-50%);
    border-radius: 50%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lower-circle {
    width: 220px;
    height: 220px;
    position: absolute;
    bottom: -70px;
    left: 177px;
    border-radius: 50%;
    z-index: 1;
  }

  .image-in-circle {
    width: 70px; /* Default image size for larger screens */
    height: 70px;
    object-fit: cover;
    margin-left: -40px;
  }

  /* For tablet view (e.g. max-width: 1024px) */
  @media screen and (max-width: 1024px) {
    .calculator-button {
      font-family: "Inter", sans-serif;
      font-size: 16px; /* Font size for tablet */
      line-height: 19.36px; /* Line height for tablet */
      font-weight: 600;
      text-align: center;
      width: 113.17px; /* Button width for tablet */
      height: 36.17px; /* Button height for tablet */
      padding: 8.59px 0 0 0; /* Button padding for tablet */
      gap: 21.46px; /* Gap between elements inside button for tablet */
      border-radius: 4.29px 0 0 0; /* Button border-radius for tablet */
    }

    button {
      font-size: 18px;
      line-height: 21.78px;
      width: 113.17px;
      height: 36.17px;
      padding: 8.59px 0 0 0;
      gap: 21.46px;
      border-radius: 4.29px 0 0 0;
      opacity: 1;
    }

    .custom-padding {
      padding-bottom: 40.94px;
    }

    .card {
      height: 304px; /* Height for tablets */
    }

    .image-in-circle {
      width: 80.52px; /* Image size for tablets */
      height: 80.52px;
      margin: 20px 81px 20px 20px;
    }

    /* Tablet text styles */
    .title {
      font-family: Inter, sans-serif;
      font-size: 24px;
      font-weight: 700;
      line-height: 28.8px;
      text-align: left;
    }
  }

  /* For mobile devices (e.g. max-width: 680px) */
  @media screen and (max-width: 680px) {
    .upper-circle {
      width: 144px;
      height: 144px;
      position: absolute;
      top: -38.53px;
      left: 100%;
      transform: translateX(-50%);
      border-radius: 50%;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .calculator-button {
      font-family: "Inter", sans-serif;
      font-size: 12px; /* Font size for mobile */
      line-height: 14.52px; /* Line height for mobile */
      font-weight: 600;
      text-align: center;
      width: 80px; /* Button width for mobile */
      height: 23px; /* Button height for mobile */
      padding: 4px 0 0 0; /* Button padding for mobile */
      gap: 10px; /* Gap between elements inside button for mobile */
      border-radius: 2px 0 0 0; /* Button border-radius for mobile */
    }

    .card {
      height: 142px; /* Height for mobile devices */
      padding: 12px;
    }

    .custom-padding {
      padding-bottom: 40.94px;
    }

    .content {
      margin-top: 100px; /* Adjust content positioning for mobile */
    }

    .lower-circle {
      width: 144px;
      height: 144px;
      bottom: -47px;
      left: 99px;
    }

    .image-in-circle {
      width: 40px; /* Image size for mobile */
      height: 40px;
      margin: 20px 81px 20px 20px;
    }

    /* Mobile text styles */
    .title {
      font-size: 14px; /* Font size for mobile */
      line-height: 5.8px; /* Line height for mobile */
    }

    button {
      font-size: 16px; /* Font size for mobile */
      line-height: 19.36px; /* Line height for mobile */
      width: 80px; /* Width for mobile */
      height: 23px; /* Height for mobile */
      padding: 4px 0 0 0; /* Padding for mobile */
      gap: 10px; /* Gap for mobile */
      border-radius: 2px 0 0 0; /* Border-radius for mobile */
      opacity: 1; /* Full opacity */
    }
  }
</style>
