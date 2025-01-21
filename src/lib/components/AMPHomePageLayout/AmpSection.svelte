<script>
    //@ts-nocheck

    import { handleError } from "$lib/utils";
    import DisplayAd from "../common/DisplayAd/DisplayAd.svelte";
    import {
        IMAGE_ASPECT_RATIO,
        generateAspectRatioImageURL,
        imageDimensionProperty,
    } from "../common/HybridImage/Constants";
    import LiveBlogUpdates from "../common/LiveBlogUpdates/LiveBlogUpdates.svelte";
    import LivetvPlayer from "../common/LiveTvPlayer/LivetvPlayer.svelte";
    import AmpGainerLossers from "../common/Market/AmpGainerLossers.svelte";
    import AmpMarket from "../common/Market/AmpMarket.svelte";
    import CardHeader from "../common/Republic-Common/CardHeader.svelte";
    import LiveBlogGrid from "../common/Republic-Common/LiveBlogGrid/LiveBlogGrid.svelte";
    import StoryGrid from "../common/Republic-Common/StoryGrid/StoryGrid.svelte";
    import AmpSwiperCards from "../common/Republic-Common/SwiperCards/AMPSwiperCards.svelte";
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
    export let isAmp = true;
    export let gainerAndLoosersData;
    export let marketData;

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

    let dataSlot = "";
    let j = 1;
    let repeatIndex = 1;

    // Ensure data is correctly set before component render
    $: {
        dataSlot =
            j <= 5
                ? envDetails.adsFile.Mobile?.[`BTF${j}`]?.ampHome
                : envDetails.adsFile.Mobile?.[`BTF${5}_${repeatIndex}`]
                      ?.ampHome;
    }
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
            <h1
                style={`background-color:${
                    eachWidget?.headerBgColor ?? ""
                };color:${eachWidget?.headerColor ?? ""}`}
                class="text-[22px] whitespace-nowrap tracking-[-0.66px] font-black text-black mb-4 {eachWidget?.dGrid ==
                '1'
                    ? 'desktop:text-[24px]'
                    : 'desktop:text-[28px]'}  desktop:font-black"
            >
                {eachWidget?.title}
            </h1>
        {:else}
            <h3
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
            </h3>
        {/if}
    {/if}
    {#if eachWidget?.isBigBreaking && device === "desktop"}
        <a
            data-sveltekit-reload
            href={`/amp/${eachWidget?.story[0]?.story[0]?.completeSlug}`}
        >
            <h3
                style={`background-color:${
                    eachWidget?.headerBgColor ?? ""
                };color:${eachWidget?.headerColor ?? ""}`}
                class={`text-[22px] tracking-[-1.76px] font-black leading-[120%]  text-black desktop:text-[44px] desktop:font-black mb-4 ${
                    eachWidget?.headerBgColor ? "p-2" : ""
                }`}
            >
                {eachWidget?.story[0]?.story[0]?.long_heading}
            </h3>
        </a>
    {/if}
    <div class="w-full flex flex-col gap-4">
        <div class="flex flex-wrap justify-between gap-6 desktop:gap-0">
            {#if eachWidget?.story?.length}
                {#each eachWidget.story.filter((eachStory, i, arr) => {
                    const currentTemplate = getTemplate(device, eachStory?.widget);
                    const previousTemplate = i > 0 ? getTemplate(device, arr[i - 1]?.widget) : null;

                    // Define allowed templates
                    const allowedTemplates = ["DEFAULT", "STORY_CARD", "ADS_CARD", "SWIPER", "SWIPER_IN_PICTURE", "LIVE_TV", "LIVE_BLOG", TEMPLATE.GAINERS_AND_LOSERS, TEMPLATE.MARKETS];

                    // Return stories that match allowed templates and avoid consecutive ADS_CARD elements
                    return allowedTemplates.includes(currentTemplate) && !(currentTemplate === "ADS_CARD" && previousTemplate === "ADS_CARD");
                }) as eachStory, i}
                    <!-- {eachStory?.widget?.template} - {eachStory?.widget?.title} -
                    {eachStory?.widget?.templateType} - {eachStory?.widget
                        ?.dGrid} - {eachStory?.widget?.dDataCol} - {i} -->
                    {#if getTemplate(device, eachStory?.widget) === TEMPLATE.DEFAULT && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.DEFAULT.type.BANNER}
                        <div>
                            {#if device === "desktop"}
                                <img
                                    src={`${eachStory?.widget?.bannerInfo[0]?.activeImage}`}
                                    alt={"banner-img"}
                                    class="my-4"
                                    on:error={handleError}
                                    height="100%"
                                    width="100%"
                                />
                            {:else}
                                <img
                                    src={`${eachStory?.widget?.bannerInfo[0]?.image}`}
                                    alt={"banner-img"}
                                    on:error={handleError}
                                    class="my-4"
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
                    {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD}
                    {#if device == "desktop" && eachStory?.widget?.webAds?.webAdId?.length && eachStory?.widget?.ampAds?.ampAdSlot}
                        <DisplayAd
                            {isAmp}
                            adslot={{
                                id: eachStory?.widget?.webAds?.webAdId,
                                slot: eachStory?.widget?.webAds?.webAdSlot,
                                refresh: eachStory?.widget?.webAds?.webAdRefresh ?? true,
                                size: isValidJson(eachStory?.widget?.webAds?.webAdSize)
                                    ? JSON.parse(eachStory?.widget?.webAds?.webAdSize)
                                    : null,
                            }}
                            dataSlot={{
                                slot: eachStory?.widget?.ampAds?.ampAdSlot,
                                width: isValidJson(eachStory?.widget?.ampAds?.ampAdSize)
                                    ? JSON.parse(eachStory?.widget?.ampAds?.ampAdSize)[0]
                                    : null,
                                height: isValidJson(eachStory?.widget?.ampAds?.ampAdSize)
                                    ? JSON.parse(eachStory?.widget?.ampAds?.ampAdSize)[1]
                                    : null,
                                dataMultiSizes: eachStory?.widget?.ampAds?.ampAdId
                            }}
                        />
                    {:else if device == "mobile" && eachStory?.widget?.mAds?.mAdId?.length && eachStory?.widget?.ampAds?.ampAdSlot}
                        <DisplayAd
                            {isAmp}
                            adslot={{
                                id: eachStory?.widget?.mAds?.mAdId,
                                slot: eachStory?.widget?.mAds?.mAdSlot,
                                refresh: eachStory?.widget?.mAds?.mAdRefresh ?? true,
                                size: isValidJson(eachStory?.widget?.mAds?.mAdSize)
                                    ? JSON.parse(eachStory?.widget?.mAds?.mAdSize)
                                    : null,
                            }}
                            dataSlot={{
                                slot: eachStory?.widget?.ampAds?.ampAdSlot,
                                width: isValidJson(eachStory?.widget?.ampAds?.ampAdSize)
                                    ? JSON.parse(eachStory?.widget?.ampAds?.ampAdSize)[0]
                                    : null,
                                height: isValidJson(eachStory?.widget?.ampAds?.ampAdSize)
                                    ? JSON.parse(eachStory?.widget?.ampAds?.ampAdSize)[1]
                                    : null,
                                dataMultiSizes: eachStory?.widget?.ampAds?.ampAdId
                            }}
                        />
                    {/if}
                {/if}
                

                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD}
                            {#if getTemplate(device, eachWidget) === "BIG_BREAKING_NEWS" && device === "desktop"}
                                <a
                                    class="w-full h-full"
                                    data-sveltekit-reload
                                    href={`/amp/${eachWidget?.story[0]?.story[0]?.completeSlug}`}
                                >
                                    <img
                                        src={generateAspectRatioImageURL(
                                            eachWidget?.story[0]?.story[0]
                                                ?.images,
                                            imageDimensionProperty?.[device]
                                                ?.aspectVideo?.lgImage,
                                            IMAGE_ASPECT_RATIO["16_9"]?.key,
                                        )}
                                        on:error={handleError}
                                        style="width:100%;height: 100%;object-fit: cover;"
                                        alt={"Big Breaking News Image"}
                                        decoding="async"
                                        data-nimg="fill"
                                        fetchpriority="high"
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
                                        {isAmp}
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
                                            className={"pt-4 mb-4"}
                                        />
                                    {/if}
                                </div>
                            {/if}
                        {/if}
                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_BLOG && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.DEFAULT}
                            <LiveBlogGrid
                                liveBlogStory={eachStory}
                                {device}
                                {envDetails}
                                {isAmp}
                            />
                            {#if eachStory?.widget?.moreUrl?.length}
                                <ViewMoreBtn
                                    {language}
                                    moreUrl={eachStory?.widget?.moreUrl}
                                />
                            {/if}
                        {/if}

                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.ADS_CARD.type.VDO_ADS && device === "mobile" && envDetails?.domainName.includes("dev")}
                        <div class="mb-4">
                            <amp-ima-video 
                                id="republicworldAmpPlayer" 
                                width="640" 
                                height="360" 
                                layout="responsive" 
                                data-tag="https://pubads.g.doubleclick.net/gampad/ads?iu=/21928950349/amp_video_test&description_url=[placeholder]&tfcd=0&npa=0&sz=640x360&gdfp_req=1&unviewed_position_start=1&output=vmap&env=vp&impl=s&ad_rule=1&correlator=&vid_d=12000" 
                                data-poster="https://unibots.b-cdn.net/player/amp/republicworld.png"
                                autoplay
                                >
                                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                            </amp-ima-video>
                        </div>
                        {/if}

                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_BLOG && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.LIVEUPDATE}
                            <LiveBlogUpdates
                                {isAmp}
                                liveBlogStory={eachStory?.story?.[0]}
                            />
                        {/if}

                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_CARD || getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_IN_PICTURE_CARD}
                            <div
                                class={`${pagewidgetindex < 3 ? "m-0" : ""} ${
                                    eachWidget?.template === "BIG_BREAKING_NEWS"
                                        ? "mt-4 desktop:mt-6 bg-white px-2 pb-4"
                                        : ""
                                }`}
                            >
                                <AmpSwiperCards
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

                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.GAINERS_AND_LOSERS}
                            <AmpGainerLossers {gainerAndLoosersData} />
                        {/if}

                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.MARKETS}
                            <AmpMarket {marketData} />
                        {/if}
                        {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                            <div
                                class={eachWidget?.dGrid == "1"
                                    ? "sticky top-[50px]"
                                    : ""}
                                style={`${
                                    sectionWidth?.[
                                        device?.toLowerCase() || "desktop"
                                    ]?.[
                                        eachStory?.widget?.[
                                            device === "mobile"
                                                ? "mGrid"
                                                : "dGrid"
                                        ]
                                    ]
                                }`}
                            >
                                <div class="cardsRow">
                                    <CardHeader
                                        textStyle={"padding-bottom:16px; color:#D10014; font-size:28px;"}
                                    >
                                        {eachStory?.widget?.title}
                                    </CardHeader>
                                    <div class={`asideThumb`}>
                                        <LivetvPlayer
                                            key={eachStory?.widget
                                                ?.liveTVInfo?.[0]?.videoId}
                                            isMute={true}
                                            livetv_video_id={eachStory?.widget
                                                ?.liveTVInfo?.[0]?.videoId}
                                            isAmp={true}
                                            player={eachStory?.widget
                                                ?.liveTVInfo?.[0]?.player}
                                            autoplay={true}
                                            can_float={true}
                                        />
                                    </div>
                                    <div>
                                        <h2
                                            class="text-black text-base font-bold leading-[150%] py-3"
                                        >
                                            {eachStory?.widget?.liveTVInfo?.[0]
                                                ?.videoDescription}
                                        </h2>
                                        {#if eachStory?.widget?.liveTVInfo?.[0]?.moreUrl}
                                            <a
                                                data-sveltekit-reload
                                                href={eachStory?.widget
                                                    ?.liveTVInfo?.[0]?.moreUrl}
                                                title="More Live TV"
                                                style="color: #d10014;"
                                                class="flex justify-end text-center font-semibold text-base leading-none relative max-w-max ml-auto pr-5"
                                            >
                                                More Live TV
                                            </a>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
