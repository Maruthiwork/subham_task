<script>
    // @ts-nocheck
    import { page } from "$app/stores";
    import ListingStoryCards from "../common/ListingStoryCards/ListingStoryCards.svelte";
    import KeyDates from "../common/KeyDates/KeyDates.svelte";
    import {
        TEMPLATE,
        TEMPLATE_PROPERTIES,
    } from "../common/StoryCard/Constants";
    import StoryGrid from "../common/Republic-Common/StoryGrid/StoryGrid.svelte";
    import {
        getLoadMoreLabel,
        getTemplate,
        getTemplateType,
    } from "../utils/utils";
    import DisplayAd from "../common/DisplayAd/DisplayAd.svelte";
    import CandidateCard from "../common/CandidateCardSwiper/CandidateCard.svelte";
    import Divider from "../common/Republic-Common/Divider.svelte";
    import SocialEmbed from "../common/SocialEmbed/SocialEmbed.svelte";
    import LiveBlogUpdates from "../common/LiveBlogUpdates/LiveBlogUpdates.svelte";
    import GainerLossers from "../common/Market/GainerLossers.svelte";
    import Market from "../common/Market/Market.svelte";
    import { EnvironmentConfig } from "../utils/environmentConfig";
    import Arrow from "$lib/assets/svg/arrow.svelte";
    import ViewMoreBtn from "../common/Republic-Common/ViewMoreBtn.svelte";
    import AmpSwiperCards from "../common/Republic-Common/SwiperCards/AMPSwiperCards.svelte";
    import Livetv from "../common/Livetv/Livetv.svelte";
    import CardHeader from "../common/Republic-Common/CardHeader.svelte";
    import LivetvPlayer from "../common/LiveTvPlayer/LivetvPlayer.svelte";
    import FloatAd from "../common/FloatAd/FloatAd.svelte";
    import AmpGainerLossers from "../common/Market/AmpGainerLossers.svelte";
    import AmpMarket from "../common/Market/AmpMarket.svelte";

    // ** Props
    export let envDetails;
    export let eachWidget;
    export let gridIndex;
    export let device = "desktop";
    export let language = "E";
    export let categoryDetails = {};
    export let pagination = {};
    export let nextStoryUrl = "";
    export let categoryPageWidgets = {};
    export let categoryInfo = {};
    export let addStories = () => {};
    export let gainerAndLoosersData;
    export let marketData;

    let imageDimension = { width: "100%", height: "100%" };
    let classProperties =
        "bg-white border border-gray-200 rounded-lg shadow  mb-4 max-w-fit h-fit";
    let aspectRatio = "16_9";

    const sectionWidth = {
        desktop: {
            1: `width: 33.33%`,
            2: `width: 65.66%`,
            3: `width: 100%`,
        },
        mobile: {
            1: `width: 100%`,
        },
    };

    function isValidJson(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (error) {
            return false;
        }
    }

    // ** Variables
    let sectionClass = "contentWrapper";
    let j = 1;
    let repeatIndex = 1;

    if (eachWidget?.dGrid == 2) {
        sectionClass = "contentWrapper-A";
    } else if (eachWidget?.dGrid == 1) {
        sectionClass = "contentWrapper-B";
    }
    let dataSlot = "";

    // Ensure data is correctly set before component render
    $: {
        dataSlot =
            j <= 5
                ? envDetails.adsFile.Mobile?.[`BTF${j}`]?.ampCat
                : envDetails.adsFile.Mobile?.[`BTF${5}_${repeatIndex}`]?.ampCat;
    }
</script>

<div
    class={`py-2 desktop:px-3 ${sectionClass} ${gridIndex > 1 ? (getTemplate(device, eachWidget?.story[0]?.widget) !== TEMPLATE.ADS_CARD && (eachWidget?.headerBgColor?.length > 0 || eachWidget?.bgColor?.length > 0) ? "py-4 desktop:py-8" : "") : ""}`}
    style={`${
        device === "desktop"
            ? gridIndex % 2 === 0
                ? "margin-left: auto;"
                : "margin-right: auto;"
            : ""
    }`}
>
    {#if eachWidget?.title && getTemplate(device, eachWidget) !== TEMPLATE.VIDEO_CENTER}
        <h3
            class={`text-[22px] font-black text-black mb-4 desktop:text-[28px] ${eachWidget?.headerBgColor ? "p-2" : ""} ${device !== "mobile" ? "pl-2.5" : ""}`}
            style={`background-color:${eachWidget?.headerBgColor ?? ""}; color:${eachWidget?.headerColor ?? ""}; letter-spacing: -0.04rem; line-height: 33.6px;`}
        >
            {eachWidget?.title}
            <!-- {eachWidget?.template} - {eachWidget?.dGrid} -->
        </h3>
    {/if}
    <div
        class={`${envDetails?.language === "RB" ? "catSection" : ""} flex flex-wrap gap-y-4 ${device === "desktop" && gridIndex < 2 && categoryDetails?.category?.completeSlug !== "deep-scroll" ? "px-2" : ""}`}
    >
        {#each eachWidget?.story as eachStory, widgetIndex}
            <!-- {eachStory?.widget?.template} - {eachStory?.widget?.title} -
            {eachStory?.widget?.templateType} - {eachStory?.widget?.dGrid} - {eachStory
                ?.widget?.dDataCol} - {widgetIndex} - {gridIndex} -->

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD}
                {#if device == "desktop" && eachStory?.widget?.webAds?.webAdId?.length && eachStory?.widget?.ampAds?.ampAdSlot}
                    <div
                        class={getTemplateType(device, eachStory?.widget) ===
                        TEMPLATE_PROPERTIES.ADS_CARD.type.STICKY_ADS
                            ? "sticky top-[46px] adWidget"
                            : "adWidget"}
                    >
                        <DisplayAd
                            isAmp={true}
                            adslot={{
                                id: eachStory?.widget?.webAds?.webAdId,
                                slot: eachStory?.widget?.webAds?.webAdSlot,
                                size: isValidJson(
                                    eachStory?.widget?.webAds?.webAdSize,
                                )
                                    ? JSON.parse(
                                          eachStory?.widget?.webAds.webAdSize,
                                      )
                                    : null,
                            }}
                            dataSlot={{
                                slot: eachStory?.widget?.ampAds?.ampAdSlot,
                                width: isValidJson(
                                    eachStory?.widget?.ampAds?.ampAdSize,
                                )
                                    ? JSON.parse(
                                          eachStory?.widget?.ampAds?.ampAdSize,
                                      )[0]
                                    : null,
                                height: isValidJson(
                                    eachStory?.widget?.ampAds?.ampAdSize,
                                )
                                    ? JSON.parse(
                                          eachStory?.widget?.ampAds?.ampAdSize,
                                      )[1]
                                    : null,
                                dataMultiSizes: eachStory?.widget?.ampAds?.ampAdId
                            }}
                        />
                    </div>
                {:else if device == "mobile" && eachStory?.widget?.mAds?.mAdId?.length && eachStory?.widget?.ampAds?.ampAdSlot}
                    <DisplayAd
                        isAmp={true}
                        adslot={{
                            id: eachStory?.widget?.mAds?.mAdId,
                            slot: eachStory?.widget?.mAds?.mAdSlot,
                            size: isValidJson(eachStory?.widget?.mAds?.mAdSize)
                                ? JSON.parse(eachStory?.widget?.mAds?.mAdSize)
                                : null,
                        }}
                        dataSlot={{
                            slot: eachStory?.widget?.ampAds?.ampAdSlot,
                            width: isValidJson(
                                eachStory?.widget?.ampAds?.ampAdSize,
                            )
                                ? JSON.parse(
                                      eachStory?.widget?.ampAds?.ampAdSize,
                                  )[0]
                                : null,
                            height: isValidJson(
                                eachStory?.widget?.ampAds?.ampAdSize,
                            )
                                ? JSON.parse(
                                      eachStory?.widget?.ampAds?.ampAdSize,
                                  )[1]
                                : null,
                            dataMultiSizes: eachStory?.widget?.ampAds?.ampAdId
                        }}
                    />
                {/if}
            {/if}

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD}
                <div
                    style={`${
                        sectionWidth?.[device?.toLowerCase() || "desktop"]?.[
                            eachStory?.widget?.[
                                device === "mobile" ? "mGrid" : "dGrid"
                            ]
                        ] ||
                        `width: ${eachStory?.widget?.[device === "mobile" ? "mGrid" : "dGrid"]}%`
                    }; ${
                        device === "desktop" && eachWidget.dGrid == "3"
                            ? `${widgetIndex === 0 ? "padding-right: 12px;" : widgetIndex === 2 ? "padding-left: 12px;" : ""}${eachWidget.dGrid == "3" && getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD && widgetIndex === 1 ? "padding-left: 12px; padding-right: 12px; border-right: 1px solid rgba(0, 0, 0, 0.16); border-left: 1px solid rgba(0, 0, 0, 0.16)" : ""}`
                            : ""
                    }`}
                >
                    <StoryGrid
                        isAmp={true}
                        {envDetails}
                        storyData={eachStory?.widget}
                        title={eachStory?.widget?.title}
                        titleStyle={`${
                            getTemplateType(device, eachStory?.widget) ===
                            TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT
                                ? "py-3"
                                : "mb-4"
                        }`}
                        storiesCardStyle={`${eachStory?.widget?.bgColor ? `background-color:${eachStory?.widget?.bgColor ?? ""};padding:12px;color:${eachStory?.widget?.primaryColor ?? ""};margin-left: ${device === "mobile" ? "-16px" : "0px"};margin-right: ${device === "mobile" ? "-16px" : "0px"}` : ""}`}
                        storiesCardDivStyle={`${
                            getTemplateType(device, eachStory?.widget) ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM &&
                            gridIndex < 2
                                ? `gap-x-3 ${envDetails?.language === "E" ? "!gap-y-4 desktop:!gap-y-8" : ""}`
                                : ""
                        }`}
                        categoryLabelClassName={`${
                            getTemplateType(device, eachStory?.widget) ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.MEDIUM &&
                            gridIndex < 2
                                ? `${envDetails?.language === "E" ? "!pt-2" : ""}`
                                : ""
                        }`}
                        columns={eachStory?.widget?.[
                            device === "mobile" ? "mDataCol" : "dDataCol"
                        ]}
                        grid={eachWidget?.[
                            device === "mobile" ? "mGrid" : "dGrid"
                        ]}
                        widgetGrid={eachStory?.widget?.[
                            device === "mobile" ? "mGrid" : "dGrid"
                        ]}
                        lazyLoading={gridIndex > 1}
                        {device}
                        hideLastDivider={(eachWidget?.name === "sideBar" &&
                            gridIndex === 1 &&
                            getTemplate(device, eachStory?.widget) ===
                                TEMPLATE_PROPERTIES.STORY_CARD?.key) ||
                            widgetIndex ===
                                eachWidget?.story?.filter(
                                    (eachStory) => eachStory?.story?.length > 0,
                                )?.length -
                                    1}
                        limit={eachStory?.story?.length}
                        stories={eachStory?.story}
                        gridTemplate={getTemplate(device, eachWidget)}
                        template={getTemplate(device, eachStory?.widget)}
                        templateType={getTemplateType(
                            device,
                            eachStory?.widget,
                        )}
                        bigfontStyle={"font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;"}
                        mediumfontStyle={"font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;"}
                        fontStyle={"font-size: 18px;font-weight: 600;line-height: 140%;"}
                        pageType={"CATEGORY"}
                    />
                </div>
            {/if}

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD_LISTING || getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD_LISTING_IN_PICTURE}
                <ListingStoryCards
                    isAmp={true}
                    {envDetails}
                    widgetWithStory={eachStory}
                    storyType={eachStory.widget.storyType}
                    dataCols={eachStory?.widget?.[
                        device === "mobile" ? "mDataCol" : "dDataCol"
                    ]}
                    template={getTemplate(device, eachStory?.widget)}
                    template_type={getTemplateType(device, eachStory?.widget)}
                    {device}
                    grid={eachWidget?.[device === "mobile" ? "mGrid" : "dGrid"]}
                />
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
                        <source
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            type="video/mp4"
                        />
                    </amp-ima-video>
                </div>
            {/if}

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_CARD || getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_IN_PICTURE_CARD}
                <div
                    class={`${eachWidget?.[device === "desktop" ? "dGrid" : "mGrid"] > 1 || !eachStory?.widget?.bgColor ? "" : "p-4"}`}
                    style={`background-color:${eachStory?.widget?.bgColor ?? ""}; ${sectionWidth?.[device?.toLowerCase() || "desktop"]?.[eachStory?.widget?.[device === "mobile" ? "mGrid" : "dGrid"]]}`}
                >
                    <AmpSwiperCards
                        {envDetails}
                        {language}
                        widgetWithStory={eachStory}
                        storyType={eachStory.widget.storyType}
                        dataCols={eachStory?.widget?.[
                            device === "mobile" ? "mDataCol" : "dDataCol"
                        ]}
                        template={getTemplate(device, eachStory?.widget)}
                        template_type={getTemplateType(
                            device,
                            eachStory?.widget,
                        )}
                        {device}
                        grid={eachWidget?.[
                            device === "mobile" ? "mGrid" : "dGrid"
                        ]}
                    />
                </div>
            {/if}

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.GAINERS_AND_LOSERS}
                <AmpGainerLossers {gainerAndLoosersData} />
            {/if}

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.MARKETS}
                <AmpMarket {marketData} />
            {/if}

            {#if (device === "desktop" ? eachWidget.dGrid == "1" || eachWidget.dGrid == "2" : true) && widgetIndex !== Object.keys(eachWidget?.story).length - 1}
                {#if Divider && getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD ? (eachStory?.widget?.[device === "desktop" ? "webAds" : "mAds"]?.[device === "desktop" ? "webAdId" : "mAdId"] ?? "")?.length > 0 : true}
                    <Divider />
                {/if}
            {/if}

            {#if eachStory?.widget?.loadMore && !pagination.isLastPage}
                <div class="w-full flex items-center justify-center my-5">
                    <button
                        on="tap:AMP.navigateTo(url='{`${nextStoryUrl}&gi=${gridIndex}&wi=${widgetIndex}`}', target=_top)"
                        style="background-color: #D10014;"
                        class={`flex items-center gap-2 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white`}
                    >
                        {getLoadMoreLabel(
                            language,
                            categoryInfo?.frontend_name || "",
                        )}
                        <Arrow />
                    </button>
                </div>
            {/if}

            {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                <div
                    class={eachWidget?.dGrid == "1" ? "sticky top-[50px]" : ""}
                    style={`${
                        sectionWidth?.[device?.toLowerCase() || "desktop"]?.[
                            eachStory?.widget?.[
                                device === "mobile" ? "mGrid" : "dGrid"
                            ]
                        ] ?? "width : 100%"
                    }`}
                >
                    <div class="cardsRow">
                        <CardHeader
                            textStyle={"font-size:28px;color:#D10014"}
                            classes={"text-[#D10014] pb-4"}
                            >{eachStory?.widget?.title}</CardHeader
                        >
                        <div class={`asideThumb`}>
                            <LivetvPlayer
                                key={eachStory?.widget?.liveTVInfo?.[0]
                                    ?.videoId}
                                isMute={true}
                                livetv_video_id={eachStory?.widget
                                    ?.liveTVInfo?.[0]?.videoId}
                                isAmp={true}
                                player={eachStory?.widget?.liveTVInfo?.[0]
                                    ?.player}
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
                                    href={eachStory?.widget?.liveTVInfo?.[0]
                                        ?.moreUrl}
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
        {/each}

        {#if eachWidget?.moreUrl?.length}
            <ViewMoreBtn {language} moreUrl={eachWidget?.moreUrl} />
        {/if}
    </div>
</div>
