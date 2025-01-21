<script lang="ts">
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import { postPoll } from "../../../../../routes/api/postData";

  export let isAmp: boolean = false;
  export let pollData: any = {};
  export let isSponsorLogo: boolean = false;
  export let sectionId: string;
  export let widget: any = {};
  export let language: string = "E";
  export let envDetails: any;
  export let pollTitleStyle = `text-[22px] desktop:text-[28px]`;
  export let hashTagStyle = `text-[16px] font-bold leading-[21.6px] desktop:text-[18px] desktop:leading-[24.3px]`;
  export let questionStyle = `text-[24px] font-extrabold overflow-hidden text-ellipsis line-clamp-3  desktop:text-[22px]`;

  const setInitialValue = () => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem("pollInfo");
      return storedValue ? JSON.parse(storedValue) : [];
    }
  };

  const storeIntoLocalStorage = (updatePollInfo: any) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("pollInfo", JSON.stringify(updatePollInfo));
    }
  };

  const updateLocalStorage = (pollDetails: any) => {
    const updatePollInfo = setInitialValue();
    updatePollInfo.push(pollDetails);
    storeIntoLocalStorage(updatePollInfo);
  };

  const checkIfPollExist = (pollId: any) => {
    if (typeof window !== "undefined") {
      const pollInfoString = window.localStorage.getItem("pollInfo");
      if (pollInfoString !== null) {
        const pollInfoList = JSON.parse(pollInfoString);
        return pollInfoList?.some(
          (eachPollInfo: any) => eachPollInfo.pollId === pollId,
        );
      }
      return false; // or handle the case when pollInfo is null based on your logic
    }
  };

  const handleClick = async (pollId: string, selectedOptionId: string) => {
    try {
      if (pollId && selectedOptionId) {
        let pollLocalData = {
          pollId: pollId,
          optionId: selectedOptionId,
        };

        if (!checkIfPollExist(pollId)) {
          let payload = {
            lang: language,
            poll_id: pollId,
            option_id: selectedOptionId,
          };
          let data: any;
          if (language) {
            data = await postPoll(payload, language);
          }
          if (data) {
            updateLocalStorage(pollLocalData);

            pollData = data?.data?.data?.data;
          }
        }
      }
    } catch (error) {}
  };

  const getPollResultInPercentage = (options: any) => {
    if (checkIfPollExist(pollData?._id)) {
      let pollResultNumber = parseFloat(options?.pollResult);

      if (isNaN(pollResultNumber)) {
        return "Invalid Value";
      }

      let totalPercentage = 0;
      pollData?.updatedOptions?.forEach((option: any) => {
        totalPercentage += parseFloat(option?.pollResult || 0);
      });

      let percentages = pollData?.updatedOptions?.map((option: any) => {
        return (parseFloat(option?.pollResult || 0) / totalPercentage) * 100;
      });

      let roundedPercentages = percentages.map((val: number) =>
        Math.round(val),
      );

      let discrepancy =
        100 - roundedPercentages.reduce((a: any, b: any) => a + b, 0);

      let indexToAdjust = percentages.indexOf(Math.max(...percentages));
      roundedPercentages[indexToAdjust] += discrepancy;

      let roundedResult =
        roundedPercentages[pollData?.updatedOptions?.indexOf(options)];

      return roundedResult + "%";
    }
  };

  const getStyles = (options: any) => {
    if (checkIfPollExist(pollData?._id)) {
      const percentage = getPollResultInPercentage(options);
      if (percentage) {
        return `${percentage}`;
      }
    }
    return "0px";
  };
</script>

{#if pollData?.question?.length > 0}
  <div class="pollCard">
    <div
      class="articleHead whiteArticleHead darkRedStrip"
      style="background: {widget?.headerBgColor
        ? widget?.headerBgColor
        : pollData?.color_code};color:{widget?.headerColor
        ? widget?.headerColor
        : '#FFF'} "
    >
      <h2
        class="flexwrap justify-between gap-2 title {pollTitleStyle} font-[900]"
        style="color:{widget?.headerColor
          ? widget?.headerColor
          : '#FFF'};line-height:{envDetails?.language === 'MH' ||
        envDetails?.language === 'H'
          ? '152%'
          : ''};letter-spacing:{envDetails?.language === 'MH' ||
        envDetails?.language === 'H'
          ? '0'
          : ''}"
      >
        <!-- <span class="rlogo">
        <img src={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL} alt="Republic Logo Frame icon" />
      </span> -->
        {widget?.title ? widget?.title : pollData?.title}
        {#if isSponsorLogo}
          <span class="text-xs font-normal flex items-center gap-1"
            >Powered By:
            <div class="clientLogo">
              {#if isAmp}
                <amp-img
                  src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}logo/english/natrajlogo.png`}
                  alt="sponsors-logo"
                  height={30}
                  width={70}
                  style="font-size: 12px;"
                  layout="responsive"
                ></amp-img>
              {:else}
                <img
                  src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}logo/english/natrajlogo.png`}
                  alt="sponsors-logo"
                  height={30}
                  width={70}
                  style="font-size: 12px;"
                />
              {/if}
            </div>
          </span>
        {/if}
      </h2>
    </div>

    <div class="optionCardForm" style="background-color: {widget?.bgColor};">
      <div class:polled={checkIfPollExist(pollData?._id)}>
        <p class="redtxt {hashTagStyle}">
          {pollData?.hashtag}
        </p>
        <div
          style={`${envDetails?.language === "H" || envDetails?.language === "MH" ? "line-height:150%;letter-spacing:0;" : "line-height:31.2px;letter-spacing:-0.8px;"}`}
          class="{questionStyle};overflow-hidden text-ellipsis line-clamp-3"
        >
          {@html pollData?.question}
        </div>
        <div class="pollBtnCol">
          {#if pollData?.updatedOptions?.length > 0}
            {#each pollData?.updatedOptions as options}
              <a
                class="option {checkIfPollExist(pollData?._id)
                  ? 'textLeft'
                  : ''}"
                on:click={() => handleClick(pollData?._id, options?._id)}
              >
                <span class="pollResultBar" style="width: {getStyles(options)};"
                ></span>
                {#if checkIfPollExist(pollData?._id)}
                  <span class="pollResultTag"
                    >{`${options?.title ?? ""} ${getPollResultInPercentage(options)}`}</span
                  >
                {/if}
                {options?.title ?? ""}
              </a>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .rightGridCol .pollCard,
  .contentMainWrap .pollCard {
    padding: 0;
  }
  .pollList .pollCard {
    padding-left: 0;
    padding-top: 0;
  }
  .pollCard .articleHead {
    align-items: center;
    padding: 8px 10px;
    width: auto;
    margin-bottom: 0;
  }

  .pollCardForm {
    background: #fff0f0;
    padding: 12px 16px 16px;
    margin-bottom: 32px;
  }

  .pollCardForm p {
    font-weight: 500;
    margin-bottom: 12px;
  }

  .pollCardForm h4 {
    font-size: 24px;
    font-weight: 800;
    line-height: 30px;
    padding-bottom: 10px;
  }
  .optionCard .articleHead {
    align-items: center;
    padding: 8px;
    width: auto;
    margin: 0;
  }
  .optionCardForm {
    background: #fff0f0;
    padding: 12px 16px 16px;
    margin-bottom: 32px;
  }
  .optionCardForm {
    padding: 12px 16px 12px;
    margin-bottom: 12px;
    background: #fff0f0;
  }
  .pollList .optionCardForm .imgSliderFtrRow {
    border-top: 1px solid #000;
    margin-top: 20px;
    padding-top: 15px;
  }

  .optionCardForm p {
    font-weight: 500;
    margin-bottom: 12px;
  }
  .optionCardForm h4,
  .pollQuestion {
    font-size: 22px;
    font-weight: 900;
    line-height: 30px;
    padding-bottom: 10px;
    line-height: 120%; /* 24px */
    letter-spacing: -0.8px;
  }
  .pollList .optionCardForm p {
    font-size: 18px;
    font-weight: 800;
  }
  .pollList .optionCardForm .imgSliderFtrRow .singleArrow {
    color: #b10203;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
  .pollBtnCol {
    display: flex;
    column-gap: 19px;
    flex-direction: column;
    cursor: pointer;
  }
  .pollList .pollBtnCol {
    flex-direction: initial;
  }
  .option a {
    display: grid;
    font-size: 16px;
    font-weight: 500;
    /* padding: 0px 1px 0px 65px; */
    padding: 10px 0;
    color: #a20014;
    text-align: center;
    text-transform: uppercase;
    align-content: center;
    border-radius: 4px;
  }
  .pollList .option a {
    text-align: left;
  }

  .desktop-text {
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: 0.5px;
  }

  .mobile-text {
    font-size: 22px;
    line-height: 1.3;
    letter-spacing: 0.3px;
  }

  .option {
    border: 1px solid #b10203;
    border-radius: 4px;
    margin-top: 16px;
    position: relative;
    padding-left: 20px;
    width: 100%;
    height: 46px;
    display: grid;
    align-items: center;
    justify-items: center;
    border-top: 1px solid #b10203;
    border-right: 1px solid #b10203;
    border-bottom: 1px solid #b10203;
    border-left: 6px solid #b10203;
    background: #fff0f0;
    color: #b10203;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0;
  }
  .option span.pollResultBar {
    background: #b10203;
    content: "";
    position: absolute;
    left: 0;
    width: 5px;
    height: 100%;
    z-index: 1;
    border-radius: 0;
  }

  .polled .option a {
    display: none;
  }
  .polled .option span.pollResultBar {
    background: #b10203;
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    z-index: 1;
    /* border-radius: 4px; */
    transition: width 0.6s ease;
  }

  .option span.pollResultTag {
    display: block;
    position: absolute;
    background: #ffd700;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px;
    font-size: 16px;
    font-weight: 800;
    z-index: 5;
    transition: 0.4s ease;
  }

  .optionCard .articleHead h2 {
    font-size: 28px;
    line-height: 34px;
  }
  .pollCard .solidBtn {
    margin-top: 25px;
  }

  /*----------------------------------sportsPollCard ------------------------------------------*/
  .sportsPollCard .optionCardForm p.sportsPollPera {
    font-size: 18px;
    margin: 14px 0;
  }
  .sportsPollCard .optionCardForm p.sportsPollPera a {
    color: #000;
    border-bottom: 1px solid;
    font-weight: 500;
  }

  @media screen and (max-width: 1024px) {
    .pollList .optionCardForm p {
      font-size: 16px;
      font-weight: 700;
    }

    .optionCardForm h4 {
      font-size: 22px;
      font-weight: 800;
      line-height: 28.16px;
    }
  }

  @media screen and (max-width: 680px) {
    .pollList .pollBtnCol {
      flex-direction: column;
    }
    .optionCardForm h4 {
      font-size: 24px;
      font-weight: 900;
    }
    .optionCardForm .pollQuestion p {
      font-size: 22px;
      font-weight: 900;
      padding-bottom: 0;
      letter-spacing: -0.96px;
    }
    .optionCardForm p {
      font-size: 16px;
      font-weight: 700;
    }
    .option {
      margin-top: 12px;
      background: #fff0f0;
    }
    .option a {
      color: #000;
    }
    .option span.pollResultBar {
      background: #000;
      width: 6px;
    }
    .pollCard {
      padding: 0;
    }
  }
</style>
