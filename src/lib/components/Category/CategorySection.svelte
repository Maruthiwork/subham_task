<script>
    // @ts-nocheck
    import { page } from "$app/stores";
    import ListingStoryCards from "./../common/ListingStoryCards/ListingStoryCards.svelte";
    import KeyDates from "./../common/KeyDates/KeyDates.svelte";
    import {
        TEMPLATE,
        TEMPLATE_PROPERTIES,
    } from "../common/StoryCard/Constants";
    import StoryGrid from "../common/Republic-Common/StoryGrid/StoryGrid.svelte";
    import {
        getLoadMoreLabel,
        getTemplate,
        getTemplateType,
        loadUnibotScript,
        useIntersectionObserver,
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
    import Faq from "../Calculators/components/FAQ.svelte";
    import SeoFooter from "../common/SeoFooter/SeoFooter.svelte";
  import { handleError } from "$lib/utils";

    // ** Props
    export let envDetails;
    export let eachWidget;
    export let gridIndex;
    export let device = "desktop";
    export let language = "E";
    export let categoryInfo = {};
    export let categoryPageWidgets = {};
    export let categoryDetails = {};
    export let pagination = {};
    let loadmore = {};
    export let addStories = () => {};
    let isVisible = false;
    let playerScriptLoaded = false;
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

    const url = $page.url;
    $: loading = false;

    function GET_STORIES(completeSlug, pageNo = 1, pageSize = 10) {
        let url = `${EnvironmentConfig.VITE_API_END_POINT}/v2/category/pagination-v2?completeSlug=${completeSlug}`;

        if (pageNo && pageSize) {
            url += `&page=${pageNo}&pageSize=${pageSize}`;
        }

        return url;
    }

    function generateRequestBody() {
    const index = categoryPageWidgets?.findIndex(
        (eachItem) => eachItem?.loadMore,
    );

    if (index === -1 || !categoryDetails?.widgetinfo?.[index]?.story) {
        return { pinIds: [] }; // Return a default structure to avoid errors
    }

    const pinIds = categoryDetails.widgetinfo[index].story.reduce(
        (existingStories, currentStory) => {
            if (Array.isArray(currentStory?.story)) {
                const newPinnedIds = currentStory.story
                    .map((eachStory) => eachStory?._id)
                    .filter((id) => id); 
                if(newPinnedIds.length > 0){
                    existingStories.pinIds.push(...newPinnedIds);
                }

            }
            return existingStories;
        },
        {
            pinIds: [],
        },
    );

    return pinIds;
}


    async function loadMore(gridIndex, widgetIndex) {
        if (url?.pathname.length > 1) {
            loading = true;

            const config = {
                method: "PUT",
                headers: { lang: language, "Content-Type": "application/json" },
                body: JSON.stringify(generateRequestBody()),
            };
            try {
                const response = await fetch(
                    GET_STORIES(
                        url?.pathname.substring(1),
                        pagination?.pageNo,
                        pagination?.pageSize,
                    ),
                    config,
                );
                const data = await response.json();
                pagination.isLastPage = data?.data?.pagination?.isLastPage;
                if (
                    data?.status &&
                    data?.statusCode === 200 &&
                    data?.data?.data?.length
                ) {
                    loading = false;
                    pagination.pageNo++;
                    return data?.data?.data;
                } else {
                    loading = false;
                    return [];
                }
            } catch (error) {
                loading = false;
                console.error("Error loading more stories:", error);
                return [];
            }
        }
    }

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

    if (eachWidget?.dGrid == 2) {
        sectionClass = "contentWrapper-A";
    } else if (eachWidget?.dGrid == 1) {
        sectionClass = "contentWrapper-B";
    }

</script>

<div
    class={`py-2 desktop:px-3 ${sectionClass} ${
        gridIndex > 1
            ? getTemplate(device, eachWidget?.story?.[0]?.widget) !==
                  TEMPLATE.ADS_CARD &&
              (eachWidget?.headerBgColor?.length > 0 ||
                  eachWidget?.bgColor?.length > 0)
                ? "py-4 desktop:py-8"
                : ""
            : ""
    }`}
    style={`${
        device === "desktop"
            ? gridIndex % 2 === 0
                ? "margin-left: auto;"
                : "margin-right: auto;"
            : ""
    }`}
>
    {#if eachWidget?.title && getTemplate(device, eachWidget) !== TEMPLATE.VIDEO_CENTER}
        <h2
            class={`text-[22px] font-black text-black mb-4 desktop:text-[28px] ${
                eachWidget?.headerBgColor ? "p-2" : ""
            } ${device !== "mobile" ? "pl-2.5" : ""}`}
            style={`background-color:${
                eachWidget?.headerBgColor ?? ""
            }; color:${
                eachWidget?.headerColor ?? ""
            }; letter-spacing: -0.04rem; line-height: 33.6px;${envDetails?.language === "MH" || envDetails?.language === "MH" ? "letter-spacing: 0;line-height: 149%;font-weight: 800;" : ""}`}
        >
            {eachWidget?.title}
        </h2>
    {/if}
    <div
        class={`${
            envDetails?.language === "RB" ? "catSection justify-between" : ""
        } flex flex-wrap gap-y-4 ${
            device === "desktop" &&
            gridIndex < 2 &&
            categoryDetails?.category?.completeSlug !== "deep-scroll"
                ? "px-2"
                : ""
        }`}
    >
        {#if eachWidget?.story?.length}
            {#each eachWidget?.story as eachStory, widgetIndex}
                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD}
                    {#if device == "desktop" && eachStory?.widget?.webAds?.webAdId?.length}
                        <div
                            class={getTemplateType(
                                device,
                                eachStory?.widget,
                            ) === TEMPLATE_PROPERTIES.ADS_CARD.type.STICKY_ADS
                                ? "sticky top-[46px] adWidget"
                                : "adWidget"}
                        >
                            <DisplayAd
                                adslot={{
                                    id: eachStory?.widget?.webAds?.webAdId,
                                    slot: eachStory?.widget?.webAds?.webAdSlot,
                                    refresh:
                                        eachStory?.widget?.webAds
                                            ?.webAdRefresh ?? true,
                                    size: isValidJson(
                                        eachStory?.widget?.webAds?.webAdSize,
                                    )
                                        ? JSON.parse(
                                              eachStory?.widget?.webAds
                                                  .webAdSize,
                                          )
                                        : null,
                                }}
                            />
                        </div>
                      
                    {:else if device == "mobile" && eachStory?.widget?.mAds?.mAdId?.length}
                      
                        <DisplayAd
                            adslot={{
                                id: eachStory?.widget?.mAds?.mAdId,
                                slot: eachStory?.widget?.mAds?.mAdSlot,
                                refresh:
                                    eachStory?.widget?.webAds?.webAdRefresh ??
                                    true,
                                size: isValidJson(
                                    eachStory?.widget?.mAds?.mAdSize,
                                )
                                    ? JSON.parse(
                                          eachStory?.widget?.mAds?.mAdSize,
                                      )
                                    : null,
                            }}
                        />
                       
                    {/if}
                {/if}
                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD}
                    <div
                        style={`${
                            sectionWidth?.[
                                device?.toLowerCase() || "desktop"
                            ]?.[
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            ] ||
                            `width: ${
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            }%`
                        }; ${
                            device === "desktop" && eachWidget.dGrid == "3"
                                ? `${
                                      widgetIndex === 0
                                          ? "padding-right: 12px;"
                                          : widgetIndex === 2
                                            ? "padding-left: 12px;"
                                            : ""
                                  }${
                                      eachWidget.dGrid == "3" &&
                                      getTemplate(device, eachStory?.widget) ===
                                          TEMPLATE.STORY_CARD &&
                                      widgetIndex === 1
                                          ? "padding-left: 12px; padding-right: 12px; border-right: 1px solid rgba(0, 0, 0, 0.16); border-left: 1px solid rgba(0, 0, 0, 0.16)"
                                          : ""
                                  }`
                                : ""
                        }`}
                    >
                        <StoryGrid
                            {envDetails}
                            storyData={eachStory?.widget}
                            title={eachStory?.widget?.title}
                            titleStyle={`${
                                getTemplateType(device, eachStory?.widget) ===
                                TEMPLATE_PROPERTIES.STORY_CARD.type.DEFAULT
                                    ? "py-3"
                                    : "mb-4"
                            }`}
                            storiesCardStyle={`${
                                eachStory?.widget?.bgColor
                                    ? `background-color:${
                                          eachStory?.widget?.bgColor ?? ""
                                      };padding:12px;color:${
                                          eachStory?.widget?.primaryColor ?? ""
                                      };margin-left: ${
                                          device === "mobile" ? "-16px" : "0px"
                                      };margin-right: ${
                                          device === "mobile" ? "-16px" : "0px"
                                      }`
                                    : ""
                            }`}
                            storiesCardDivStyle={`${
                                getTemplateType(device, eachStory?.widget) ===
                                    TEMPLATE_PROPERTIES.STORY_CARD.type
                                        .MEDIUM && gridIndex < 2
                                    ? `gap-x-3 ${
                                          envDetails?.language === "E"
                                              ? "!gap-y-4 desktop:!gap-y-8"
                                              : ""
                                      }`
                                    : ""
                            }`}
                            categoryLabelClassName={`${
                                getTemplateType(device, eachStory?.widget) ===
                                    TEMPLATE_PROPERTIES.STORY_CARD.type
                                        .MEDIUM && gridIndex < 2
                                    ? `${
                                          envDetails?.language === "E"
                                              ? "!pt-2"
                                              : ""
                                      }`
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
                                        (eachStory) =>
                                            eachStory?.story?.length > 0,
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

                {#if eachStory?.widget?.status === true &&  getTemplate(device, eachStory?.widget) === TEMPLATE.DEFAULT && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.DEFAULT.type.BANNER}
                    <h3
                        style={`background-color:${
                            eachStory?.widget?.headerBgColor ?? ""
                        };color:${eachStory?.widget?.headerColor ?? ""}`}
                        class="text-[22px] whitespace-nowrap tracking-[-0.66px] font-black text-black mb-4 desktop:font-black"
                    >
                        {eachStory?.widget?.title}
                    </h3>
                    <div style="width: -webkit-fill-available;">
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

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD_LISTING || getTemplate(device, eachStory?.widget) === TEMPLATE.STORY_CARD_LISTING_IN_PICTURE}
                    <ListingStoryCards
                        {envDetails}
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
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.ADS_CARD.type.VDO_ADS && device === "mobile"}
                    <div style="width: 100%;">
                        <div id={eachStory?.widget?.vdoId} />
                    </div>
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_BLOG && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.LIVEUPDATE}
                    <div
                        style={`${
                            sectionWidth?.[
                                device?.toLowerCase() || "desktop"
                            ]?.[
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            ] ||
                            `width: ${
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            }%`
                        }; ${
                            device === "desktop" && eachWidget.dGrid == "3"
                                ? `${
                                      widgetIndex === 0
                                          ? "padding-right: 12px;"
                                          : widgetIndex === 2
                                            ? "padding-left: 12px;"
                                            : ""
                                  }${
                                      eachWidget.dGrid == "3" &&
                                      getTemplate(device, eachStory?.widget) ===
                                          TEMPLATE.STORY_CARD &&
                                      widgetIndex === 1
                                          ? "padding-left: 12px; padding-right: 12px; border-right: 1px solid rgba(0, 0, 0, 0.16); border-left: 1px solid rgba(0, 0, 0, 0.16);"
                                          : ""
                                  }`
                                : ""
                        }`}
                    >
                        <LiveBlogUpdates
                            {language}
                            liveBlogStory={eachStory?.story?.[0]}
                        />
                    </div>
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.GAINERS_AND_LOSERS}
                    <GainerLossers {language} />
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.MARKETS}
                    <Market {language} />
                {/if}
                
                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.HTMLCONTENT && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.DEFAULT}                    
                        {@html eachStory?.widget?.content}
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ELECTION_KEY_DATES}
                    <KeyDates
                        keyDates={JSON.parse(
                            eachStory?.widget?.info?.[0]?.embedded_code,
                        )}
                    />
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.ELECTION_KEY_CANDIDATES}
                    <CandidateCard
                        {device}
                        widgetId={eachStory?.widget?._id}
                        title={eachStory?.widget?.title}
                        keyCandidates={JSON.parse(
                            eachStory?.widget?.info?.[0]?.embedded_code,
                        )}
                        dataCols={eachStory?.widget?.[
                            device === "mobile" ? "mDataCol" : "dDataCol"
                        ]}
                    />
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.EMBED}
                    <SocialEmbed widgetData={eachStory?.widget} />
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_BLOG && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.LIVE_BLOG.type.DEFAULT}
                    {#await import("$lib/components/common/Republic-Common/LiveBlogGrid/LiveBlogGrid.svelte") then LiveBlogGrid}
                        <LiveBlogGrid.default
                            liveBlogStory={eachStory}
                            {device}
                            {envDetails}
                        />
                    {/await}
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.LIVE_TV}
                    <div
                        style={`${
                            sectionWidth?.[
                                device?.toLowerCase() || "desktop"
                            ]?.[
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            ]
                        }`}
                    >
                        {#await import("$lib/components/common/Livetv/Livetv.svelte") then Livetv}
                            <Livetv.default
                                data={eachStory?.widget}
                                isSideBar={eachWidget?.dGrid == "1"
                                    ? true
                                    : false}
                            />
                        {/await}
                    </div>
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_CARD || getTemplate(device, eachStory?.widget) === TEMPLATE.SWIPER_IN_PICTURE_CARD}
                    <div
                        class={`${
                            eachWidget?.[
                                device === "desktop" ? "dGrid" : "mGrid"
                            ] > 1 || !eachStory?.widget?.bgColor
                                ? ""
                                : "p-4"
                        }`}
                        style={`background-color:${
                            eachStory?.widget?.bgColor ?? ""
                        }; ${
                            sectionWidth?.[
                                device?.toLowerCase() || "desktop"
                            ]?.[
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            ]
                        }`}
                    >
                        {#await import("$lib/components/common/Republic-Common/SwiperCards/SwiperCards.svelte") then SwiperCards}
                            <SwiperCards.default
                                {envDetails}
                                {language}
                                widgetWithStory={eachStory}
                                storyType={eachStory.widget.storyType}
                                dataCols={eachStory?.widget?.[
                                    device === "mobile"
                                        ? "mDataCol"
                                        : "dDataCol"
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
                                grid={eachWidget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]}
                            />
                        {/await}
                    </div>
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.POLL_CARD}
                    <div
                        style={`${
                            sectionWidth?.[
                                device?.toLowerCase() || "desktop"
                            ]?.[
                                eachStory?.widget?.[
                                    device === "mobile" ? "mGrid" : "dGrid"
                                ]
                            ]
                        }`}
                    >
                        {#await import("$lib/components/common/Republic-Common/PollCard/PollCard.svelte") then PollCard}
                            <PollCard.default
                                pollData={eachStory?.story}
                                widget={eachStory?.widget}
                                sectionId={"arnab-poll"}
                                {language}
                                {envDetails}
                            />
                        {/await}
                    </div>
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.SHORTCODE && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.SHORTCODE.type.DEFAULT}
                   <!-- need to add short code widget in category section -->
                {/if}

                {#if getTemplate(device, eachStory?.widget) === TEMPLATE.FAQ && getTemplateType(device, eachStory?.widget) === TEMPLATE_PROPERTIES.SHORTCODE.type.DEFAULT}
                    {#each eachStory?.widget?.info as faq}
                    <div class="w-full">
                        <Faq faqs={faq?.embedded_code} {envDetails} />
                    </div>
                    {/each}
                {/if}

                {#if eachStory?.widget?.loadMore && !pagination.isLastPage}
                    <div class="w-full flex items-center justify-center my-5">
                        <a
                            rel="next"
                            aria-label="Load More"
                            disabled={loading}
                            class={`flex items-center gap-2 shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] ${
                                loading
                                    ? "cursor-not-allowed opacity-50 pointer-events-none"
                                    : "cursor-pointer"
                            }`}
                            href="javascript:void(0)"
                            on:click={async () => {
                                const oldStories =
                                    categoryPageWidgets?.[gridIndex]?.story?.[
                                        widgetIndex
                                    ]?.story;
                                const newStories = await loadMore(
                                    gridIndex,
                                    widgetIndex,
                                );

                                addStories(
                                    oldStories,
                                    newStories,
                                    gridIndex,
                                    widgetIndex,
                                );
                            }}
                        >
                           
                                {getLoadMoreLabel(
                                    language,
                                    categoryInfo?.frontend_name || "",
                                )}
                                <Arrow />
                        </a>
                    </div>
                {/if}
                {#if (device === "desktop" ? eachWidget.dGrid == "1" || eachWidget.dGrid == "2" : true) && widgetIndex !== Object.keys(eachWidget?.story).length - 1}
                    {#if Divider && getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD ? (eachStory?.widget?.[device === "desktop" ? "webAds" : "mAds"]?.[device === "desktop" ? "webAdId" : "mAdId"] ?? "")?.length > 0 : true}
                    <div class={getTemplate(device, eachStory?.widget) === TEMPLATE.ADS_CARD ? "divider-disable" : ""}>    
                        <Divider />
                    </div>
                    {/if}
                {/if}
            {/each}
        {/if}
        {#if getTemplate(device, eachWidget) === TEMPLATE.VIDEO_CENTER}
            {#await import("$lib/components/common/VideoSection/VideoSection.svelte") then VideoSection}
                <VideoSection.default
                    debateData={{
                        widget: eachWidget,
                        story: eachWidget?.story,
                    }}
                    {device}
                    {envDetails}
                    {language}
                    grid={eachWidget?.[device === "mobile" ? "mGrid" : "dGrid"]}
                />
            {/await}
        {/if}
        {#if eachWidget?.moreUrl?.length}
            <ViewMoreBtn {language} moreUrl={eachWidget?.moreUrl} />
        {/if}
    </div>
</div>
