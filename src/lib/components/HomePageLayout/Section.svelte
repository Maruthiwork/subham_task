<script>
    import { handleError } from "$lib/utils";
    import CalculatorDetail from "../Calculators/components/CalculatorDetail.svelte";
    import Faq from "../Calculators/components/FAQ.svelte";

    //@ts-nocheck
    import DisplayAd from "../common/DisplayAd/DisplayAd.svelte";
    import {
        getFullImageUrl,
        imageDimensionProperty,
    } from "../common/HybridImage/Constants";
    import LiveBlogUpdates from "../common/LiveBlogUpdates/LiveBlogUpdates.svelte";
    import Livetv from "../common/Livetv/Livetv.svelte";
    import GainerLossers from "../common/Market/GainerLossers.svelte";
    import Market from "../common/Market/Market.svelte";
    import Divider from "../common/Republic-Common/Divider.svelte";
    import StoryGrid from "../common/Republic-Common/StoryGrid/StoryGrid.svelte";
    import SwiperCards from "../common/Republic-Common/SwiperCards/SwiperCards.svelte";
    import ViewMoreBtn from "../common/Republic-Common/ViewMoreBtn.svelte";
    import {
        TEMPLATE,
        TEMPLATE_PROPERTIES,
    } from "../common/StoryCard/Constants";
    import { COMPONENT_TYPE } from "../enums/story";
    import {
        getTemplate,
        getTemplateType,
        isValidJson,
        loadUnibotScript,
        useIntersectionObserver,
    } from "../utils/utils";

    // ** Props
    export let envDetails;
    export let eachWidget;
    export let pagewidgetindex;
    export let device = "desktop";
    export let language = "E";
    let playerScriptLoaded = false;

    // ** Variables
    let sectionClass = "contentWrapper";

    const sectionWidth = {
        desktop: {
            1: `width: 33%`,
            2: `width: 67%`,
            3: `width: 100%`,
        },
        mobile: {
            1: `width: 100%`,
        },
    };
    if (eachWidget?.dGrid == 2) {
        sectionClass = "contentWrapper-A";
    } else if (eachWidget?.dGrid == 1) {
        sectionClass = "contentWrapper-B";
    }

    useIntersectionObserver(
        envDetails?.language === "H"
            ? "div-ub-republicbharat.com_1719829339250"
            : "div-ub-republicworld1.com_1719637493308",
        0.1,
        () => {
            if (!playerScriptLoaded) {
                loadUnibotScript(envDetails?.language, () => {
                    playerScriptLoaded = true;
                });
            }
        },
    );
</script>

<div
    class={`py-2 desktop:px-3 ${sectionClass} ${
        pagewidgetindex >= 2
            ? getTemplate(device, eachWidget?.story?.[0]?.widget) !==
                  TEMPLATE.ADS_CARD &&
              (eachWidget?.headerBgColor?.length > 0 ||
                  eachWidget?.bgColor?.length > 0)
                ? "py-4 desktop:py-8"
                : ""
            : ""
    }`}
>
    {#if eachWidget?.title && getTemplate(device, eachWidget) !== TEMPLATE.VIDEO_CENTER}
        {#if pagewidgetindex === 0}
            <h3
                style={`background-color:${
                    eachWidget?.headerBgColor ?? ""
                };color:${eachWidget?.headerColor ?? ""}`}
                class="text-[22px] whitespace-nowrap tracking-[-0.66px] font-black text-black mb-4 {eachWidget?.dGrid ==
                '1'
                    ? 'desktop:text-[24px]'
                    : 'desktop:text-[28px]'}  desktop:font-black"
            >
                {eachWidget?.title}
            </h3>
        {:else}
            <h2
                style={`background-color:${
                    eachWidget?.headerBgColor ?? ""
                };color:${eachWidget?.headerColor ?? ""};`}
                class={`text-[22px] tracking-[-0.66px] font-black text-black ${
                    eachWidget?.dGrid == "1"
                        ? "desktop:text-[24px]"
                        : "desktop:text-[28px]"
                }  desktop:font-black mb-4 ${
                    eachWidget?.headerBgColor ? "p-2" : ""
                }`}
            >
                {eachWidget?.title}
            </h2>
        {/if}
    {/if}
    {#if eachWidget?.isBigBreaking && device === "desktop"}
        <a
            data-sveltekit-reload
            href={eachWidget?.story?.[0]?.story?.[0]?.completeSlug}
        >
            <h1
                style={`background-color:${
                    eachWidget?.headerBgColor ?? ""
                };color:${eachWidget?.headerColor ?? ""}`}
                class={`text-[22px] ${envDetails?.language === "RB" ? 'tracking-[-0.88px]' : 'tracking-[-1.76px]'} font-black leading-[120%]  text-black desktop:text-[44px] desktop:font-black mb-4 ${
                    eachWidget?.headerBgColor ? "p-2" : ""
                }`}
            >
                {eachWidget?.story[0]?.story[0]?.long_heading}
            </h1>
        </a>
    {/if}
    <div class="w-full flex flex-col gap-4">
        <div class="flex flex-wrap justify-between">
            {#if eachWidget?.story?.length}
                {#each eachWidget?.story as eachStory, i}
                    {#if eachStory?.widget?.status === true &&  getTemplate(device, eachStory?.widget) === TEMPLATE.DEFAULT && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.DEFAULT.type.BANNER}
                        <div style="width: -webkit-fill-available;">
                            {#if device === "desktop"}
                                <img
                                    src={`${eachStory?.widget?.bannerInfo[0]?.activeImage}`}
                                    alt={"banner-img"}
                                    class="my-4"
                                    on:error={handleError}
                                    fetchpriority="high"
                                    loading="eager"
                                    height="100%"
                                    width="100%"
                                />
                            {:else}
                                <img
                                    src={`${eachStory?.widget?.bannerInfo[0]?.image}`}
                                    alt={"banner-img"}
                                    on:error={handleError}
                                    class="my-4"
                                    fetchpriority="high"
                                    loading="eager"
                                    height="100%"
                                    width="100%"
                                />
                            {/if}
                        </div>
                    {/if}

                    <div
                        style={`${
                            sectionWidth?.[
                                device?.toLowerCase() || "desktop"
                            ]?.[
                                eachStory?.widget?.[
                                    device === "desktop" ? "dGrid" : "mGrid"
                                ]
                            ] ||
                            `width: ${
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            }%`
                        } `}
                        class={getTemplate(device, eachStory?.widget) ===
                            TEMPLATE.SWIPER_CARD ||
                        getTemplate(device, eachStory?.widget) ===
                            TEMPLATE.SWIPER_IN_PICTURE_CARD
                            ? ""
                            : "flex flex-col justify-between"}
                    >
                        {#if eachStory?.widget?.status === true &&  getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD}
                            {#if device == "desktop" && eachStory?.widget?.webAds?.webAdId?.length}
                                <!-- {#if Divider && pagewidgetindex === 1 ? i !== 0 : true}
                            <Divider classes={"my-4"} />
                        {/if} -->
                                <DisplayAd
                                    adslot={{
                                        id: eachStory?.widget?.webAds?.webAdId,
                                        slot: eachStory?.widget?.webAds
                                            ?.webAdSlot,
                                        refresh:
                                            eachStory?.widget?.webAds
                                                ?.webAdRefresh ?? true,
                                        size: isValidJson(
                                            eachStory?.widget?.webAds
                                                ?.webAdSize,
                                        )
                                            ? JSON.parse(
                                                  eachStory?.widget?.webAds
                                                      .webAdSize,
                                              )
                                            : null,
                                    }}
                                />
                                <!-- {#if Divider && pagewidgetindex === 1 ? i !== eachWidget?.story?.length - 1 : true}
                            <Divider classes={"my-4"} />
                        {/if} -->
                            {:else if device == "mobile" && eachStory?.widget?.mAds?.mAdId?.length}
                                <!-- {#if Divider && pagewidgetindex >= 2 && (pagewidgetindex === 1 ? i !== 0 : true)}
                            <Divider classes={"my-4"} />
                        {/if} -->
                                <DisplayAd
                                    adslot={{
                                        id: eachStory?.widget?.mAds?.mAdId,
                                        slot: eachStory?.widget?.mAds?.mAdSlot,
                                        refresh:
                                            eachStory?.widget?.mAds
                                                ?.mAdRefresh ?? true,
                                        size: isValidJson(
                                            eachStory?.widget?.mAds?.mAdSize,
                                        )
                                            ? JSON.parse(
                                                  eachStory?.widget?.mAds
                                                      ?.mAdSize,
                                              )
                                            : null,
                                    }}
                                />
                                <!-- {#if Divider && pagewidgetindex === 1 ? i !== eachWidget?.story?.length - 1 : true}
                            <Divider classes={"my-4"} />
                        {/if} -->
                            {/if}
                        {/if}

                        {#if eachStory?.widget?.status === true &&  getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD}
                            {#if getTemplate(device, eachWidget) === "BIG_BREAKING_NEWS" && device === "desktop"}
                                <a
                                    class="w-full h-full"
                                    data-sveltekit-reload
                                    href={eachWidget?.story[0]?.story?.[0]
                                        ?.completeSlug}
                                >
                                    <img
                                        src={
                                        getFullImageUrl(eachWidget?.story?.[0]?.story?.[0]
                                        ?.images?.versions?.["16_9"]?.filePath,    imageDimensionProperty?.[device]
                                        ?.aspectVideo?.lgImage, 50)
                                        }
                                        on:error={handleError}
                                        style="width:100%;height: 100%;object-fit: cover;"
                                        alt={"Big Breaking News Image"}
                                        decoding="async"
                                        data-nimg="fill"
                                        fetchpriority="high"
                                        loading="eager"
                                    />
                                </a>
                            {:else}
                                <div
                                    style={`${
                                        eachWidget.dGrid == "3"
                                            ? device === "desktop"
                                                ? `${
                                                      i === 0
                                                          ? "padding-right: 12px;"
                                                          : i === 2
                                                            ? "padding-left: 12px;"
                                                            : ""
                                                  }${
                                                      eachWidget.dGrid == "3" &&
                                                      getTemplate(
                                                          device,
                                                          eachStory?.widget,
                                                      ) ===
                                                          TEMPLATE.STORY_CARD &&
                                                      i === 1
                                                          ? "padding-left: 12px; padding-right: 12px; border-right: 1px solid rgba(0, 0, 0, 0.16); border-left: 1px solid rgba(0, 0, 0, 0.16);"
                                                          : ""
                                                  }`
                                                : ""
                                            : ""
                                    }`}
                                >
                                    <StoryGrid
                                        {envDetails}
                                        enforceH1={pagewidgetindex === 0}
                                        storyData={eachStory?.widget}
                                        title={eachStory?.widget?.title}
                                        isBigBreaking={eachWidget?.isBigBreaking}
                                        titleStyle={`${
                                            eachStory?.widget.headerBgColor
                                                ? "p-3"
                                                : ""
                                        } ${
                                            eachStory?.widget.headerBgColor &&
                                            eachStory?.widget?.[
                                                device === "mobile"
                                                    ? "mGrid"
                                                    : "dGrid"
                                            ] >= 2
                                                ? ""
                                                : "mb-4"
                                        }`}
                                        columns={eachStory?.widget?.[
                                            device === "desktop"
                                                ? "dDataCol"
                                                : "mDataCol"
                                        ]}
                                        grid={eachWidget?.[
                                            device === "mobile"
                                                ? "mGrid"
                                                : "dGrid"
                                        ]}
                                        widgetGrid={eachStory?.widget?.[
                                            device === "mobile"
                                                ? "mGrid"
                                                : "dGrid"
                                        ]}
                                        stories={eachStory?.story}
                                        gridTemplate={getTemplate(
                                            device,
                                            eachWidget,
                                        )}
                                        template={getTemplate(
                                            device,
                                            eachStory?.widget,
                                        )}
                                        templateType={getTemplateType(
                                            device,
                                            eachStory?.widget,
                                        )}
                                        {device}
                                        hideLastDivider={i ===
                                            eachWidget?.story?.filter(
                                                (eachStory) =>
                                                    eachStory?.story?.length >
                                                    0,
                                            )?.length -
                                                1}
                                        relatedStories={eachStory?.widget
                                            ?.relatedStories || []}
                                        lazyLoading={pagewidgetindex > 1}
                                        bigfontStyle={"font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -0.84px;"}
                                        mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
                                        fontStyle={"font-size: 18px;font-weight: 600;line-height: 140%;"}
                                        pageType={"HOMEPAGE"}
                                    />
                                    {#if eachStory?.widget?.moreUrl?.length}
                                        <ViewMoreBtn
                                            {language}
                                            moreUrl={eachStory?.widget?.moreUrl}
                                            className={"pt-4"}
                                        />
                                    {/if}
                                </div>
                            {/if}
                        {/if}
                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_BLOG && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.DEFAULT}
                            {#await import("$lib/components/common/Republic-Common/LiveBlogGrid/LiveBlogGrid.svelte") then LiveBlogGrid}
                                <LiveBlogGrid.default
                                    liveBlogStory={eachStory}
                                    {device}
                                    {envDetails}
                                />
                                {#if eachStory?.widget?.moreUrl?.length}
                                    <ViewMoreBtn
                                        {language}
                                        moreUrl={eachStory?.widget?.moreUrl}
                                    />
                                {/if}
                            {/await}
                        {/if}

                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_BLOG && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.LIVEUPDATE}
                            <LiveBlogUpdates
                                {language}
                                liveBlogStory={eachStory?.story?.[0]}
                            />
                        {/if}

                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.ADS_CARD.type.VDO_ADS && device === "mobile"}
                            <div id={eachStory?.widget?.vdoId} />
                        {/if}

                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                            {#if getTemplateType(device, eachStory?.widget) !== TEMPLATE.HIDDEN}
                                <Livetv
                                    className="min-h-[160px]"
                                    data={eachStory?.widget}
                                    isSideBar={eachWidget?.dGrid == "1"
                                        ? true
                                        : false}
                                />
                            {/if}

                            <!-- {#if Divider}
                        <Divider classes={"my-8"} />
                    {/if} -->
                        {/if}

                        {#if eachStory?.widget?.status === true &&  getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_CARD || getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_IN_PICTURE_CARD}
                            <div
                                class={`${pagewidgetindex < 3 ? "m-0" : ""} ${
                                    eachWidget?.template === "BIG_BREAKING_NEWS"
                                        ? "pt-4 desktop:pt-6"
                                        : ""
                                }`}
                            >
                                <SwiperCards
                                    {language}
                                    {envDetails}
                                    cardType={COMPONENT_TYPE.StoryCard}
                                    widgetWithStory={eachStory}
                                    storyType={eachStory.widget.storyType}
                                    grid={eachWidget?.[
                                        device === "mobile" ? "mGrid" : "dGrid"
                                    ]}
                                    dataCols={eachStory?.widget?.[
                                        device === "desktop"
                                            ? "dDataCol"
                                            : "mDataCol"
                                    ]}
                                    template={getTemplate(
                                        device,
                                        eachStory?.widget,
                                    )}
                                    template_type={getTemplateType(
                                        device,
                                        eachStory?.widget,
                                    )}
                                    {device}
                                />
                            </div>
                        {/if}

                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.GAINERS_AND_LOSERS}
                            <GainerLossers {language} />
                        {/if}

                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.MARKETS}
                            <Market {language} />
                          
                        {/if}

                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.POLL_CARD && eachStory?.story?._id?.length > 0}
                            {#await import("$lib/components/common/Republic-Common/PollCard/PollCard.svelte") then PollCard}
                                <!-- <Divider classes={"my-4"} /> -->
                                <PollCard.default
                                    isSponsorLogo ={false}
                                    pollData={eachStory?.story}
                                    widget={eachStory?.widget}
                                    sectionId={"arnab-poll"}
                                    {language}
                                    {envDetails}
                                    pollTitleStyle={"text-[22px] leading-[25.3px] tracking-[-4] desktop:text-[24px] desktop:leading-[28.8px] desktop:tracking-[-4]"}
                                    hashTagStyle={"text-[16px] leading-[21.6px]  desktop:text-[14px] desktop:leading-[18.9px]"}
                                    questionStyle={"text-[24px] font-extrabold leading-[28.8px] desktop:text-[20px] desktop:leading-[24px] desktop:tracking-[-4]"}
                                />
                            {/await}
                            {#if eachStory?.widget?.moreUrl?.length}
                                <ViewMoreBtn
                                    {language}
                                    moreUrl={eachStory?.widget?.moreUrl}
                                />
                            {/if}
                        {/if}
                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.SHORTCODE && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.SHORTCODE.type.DEFAULT}
                            <CalculatorDetail
                                calculatorDetails={{
                                    bgColor:
                                        eachStory?.widget?.bgColor ?? "#F8D9DB",
                                    textColor:
                                        eachStory?.widget?.textColor ??
                                        "#CA000B",
                                }}
                                calculatorPath={eachStory?.widget?.shortcode}
                                {language}
                                {envDetails}
                            />
                        {/if}
                        {#if eachStory?.widget?.status === true && getTemplate(device, eachStory?.widget) === TEMPLATE.FAQ && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.SHORTCODE.type.DEFAULT}
                            {#each eachStory?.widget?.info as faq}
                                <Faq faqs={faq} />
                            {/each}
                        {/if}

                        {#if eachStory?.widget?.status === true && (device === "desktop" ? eachWidget.dGrid == "1" || eachWidget.dGrid == "2" : true) && i !== Object.keys(eachWidget?.story).length - 1 && eachWidget?.template !== TEMPLATE.VIDEO_CENTER && eachWidget?.template !== "BIG_BREAKING_NEWS"}
                            {#if Divider && eachStory?.widget?.template === TEMPLATE.ADS_CARD ? (eachStory?.widget?.[device === "desktop" ? "webAds" : "mAds"]?.[device === "desktop" ? "webAdId" : "mAdId"] ?? "")?.length > 0 : true}
                            <div class={getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD ? "divider-disable" : ""}> 
                                <Divider classes={"my-4"} />
                            </div>
                            {/if}
                        {/if}
                    </div>
                {/each}
            {/if}
            {#if eachWidget?.status === true && getTemplate(device, eachWidget) === TEMPLATE.VIDEO_CENTER}
                {#await import("$lib/components/common/VideoSection/VideoSection.svelte") then VideoSection}
                    <VideoSection.default
                        debateData={{
                            widget: eachWidget,
                            story: eachWidget?.story,
                        }}
                        {envDetails}
                        {device}
                        {language}
                        grid={eachWidget?.[
                            device === "mobile" ? "mGrid" : "dGrid"
                        ]}
                    />
                {/await}
            {/if}
        </div>
        {#if eachWidget?.moreUrl?.length}
            <ViewMoreBtn {language} moreUrl={eachWidget?.moreUrl} />
        {/if}
    </div>
</div>
