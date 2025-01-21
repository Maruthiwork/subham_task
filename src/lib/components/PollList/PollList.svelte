<script lang="ts">
    import { fetchAllPoll } from "../../../routes/api/fetchData";
    import Divider from "../common/Republic-Common/Divider.svelte";
    import PollCard from "../common/Republic-Common/PollCard/PollCard.svelte";
    import Sidebar from "../common/Sidebar/Sidebar.svelte";
    import { EnvironmentConfig } from "../utils/environmentConfig";
    import {
        getHomeTextFromLanguage,
        loadMgidScript,
        useIntersectionObserver,
    } from "../utils/utils";
    import SEO from "$lib/components/SEO/index.svelte";

    export let isAmp: boolean = false;
    export let pollList;
    export let trending_stories;
    export let rightSideBar = {};
    export let language: string = "E";
    export let envDetails: any = {};
    export let siteNavigation: any = [];
    export let device: "desktop" | "mobile" = "desktop";
    export let selectedCategory: string = "all";
    export let canonicalUrl: string = "";

    let pollListData: any = [];
    let { menu, categoryData } = pollList.data;

    pollListData = structuredClone(pollList?.data);

    $: loading = false;
    $: pagination = { pageNo: pollListData?.currentpage, pageSize: 10 };

    async function fetchData(completeSlug: string) {
        try {
            const response = await fetchAllPoll(language, completeSlug);
            pollListData = response.data.data;
            selectedCategory = completeSlug;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleWidgetClick = async (completeSlug: any) => {
        await fetchData(completeSlug);
    };

    function GET_POLLS(completeSlug: string, pageNo = 1, pageSize = 10) {
        let url = `${EnvironmentConfig.VITE_API_END_POINT}/poll/get?completeSlug=${completeSlug}`;

        if (pageNo && pageSize) {
            url += `&page=${pageNo}&pageSize=${pageSize}`;
        }

        return url;
    }

    async function loadMore() {
        loading = true;
        const config = {
            method: "GET",
            headers: { lang: language },
        };

        const response = await fetch(
            GET_POLLS(
                categoryData?.completeSlug,
                (pollListData?.currentpage || 0) + 1,
                pagination?.pageSize,
            ),
            config,
        );
        const data = await response.json();

        if (
            data?.status &&
            data?.statusCode === 200 &&
            data?.data?.data?.polldata?.length
        ) {
            loading = false;
            return data?.data?.data;
        } else {
            loading = false;
            return {};
        }
    }

    const breadcrumbs: any[] = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name: "Poll",
            slug: "/polls",
        },
    ];

    useIntersectionObserver("migid-container", 0.1, () =>
        loadMgidScript(envDetails?.language),
    );
</script>

<svelte:head>
    <link
        rel="preload"
        href="/swiper-bundle.min.css"
        as="style"
        on:load={() => {
            const link = document.querySelector(
                'link[rel="preload"][as="style"]',
            );
            if (link instanceof HTMLLinkElement) {
                link.rel = "stylesheet";
            }
        }}
    />
</svelte:head>
<SEO
    {isAmp}
    lang={language}
    {canonicalUrl}
    {breadcrumbs}
    slug={categoryData?.completeSlug}
    title={categoryData?.meta_title}
    metadescription={categoryData?.meta_description}
    keywords={categoryData?.meta_keywords}
    site_details={envDetails}
    pathname={"/polls"}
    {siteNavigation}
/>
<div class="contentWrapper">
    <div class="flex flex-wrap gap-5">
        <div class="mainArticle w-full desktop:w-[64.66%]">
            <div class="innerLeftBlock">
                <div class="breadcrumb">
                    <ul>
                        <li>
                            <a href={"/"}>
                                {getHomeTextFromLanguage(language)} /
                            </a>
                        </li>
                        <li>
                            <a data-sveltekit-reload href={"/polls"}> Poll </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="sectionNavigation">
                        <h1
                            class="text-[28px] font-black leading-[33.6px] tracking-[-0.04em] pt-4 pb-2"
                        >
                            Poll
                        </h1>
                        <div class="swiper-container flex">
                            <div class="swiper-wrapper flex gap-x-2">
                                {#each menu as item}
                                    <button
                                        aria-label="Poll Options"
                                        on:click={() =>
                                            handleWidgetClick(
                                                item.completeSlug,
                                            )}
                                        class="flex items-center justify-center rounded-[18px] h-9"
                                        style="background-color: {selectedCategory ===
                                        item?.completeSlug
                                            ? '#7b000c'
                                            : '#E4E4E4'}; color: {selectedCategory ===
                                        item?.completeSlug
                                            ? '#FFFFFF'
                                            : '#000000'}; padding-left: 0.7rem; padding-right: 0.5rem; min-width: fit-content;"
                                    >
                                        <p class="font-normal text-center">
                                            {item.name}
                                        </p>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>
                    {#each pollListData?.polldata as item}
                        <Divider classes={"my-4"} />
                        <PollCard
                            {isAmp}
                            pollData={item}
                            sectionId={`arnab-poll${item?._id}`}
                            {language}
                            {envDetails}
                        />
                    {/each}
                    {#if pollListData?.next_page?.length}
                        <div
                            class="w-full flex items-center justify-center my-5"
                        >
                            <a
                                rel="next"
                                href="#"
                                aria-label="Load More"
                                class={`shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-3 text-base font-medium text-white bg-[#D10014] ${loading ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer"}`}
                                on:click={async () => {
                                    const pollInfo = await loadMore();

                                    pollListData = {
                                        ...pollInfo,
                                        polldata: [
                                            ...pollListData?.polldata,
                                            ...pollInfo?.polldata,
                                        ],
                                    };
                                    pagination = {
                                        ...pagination,
                                        pageNo: pagination?.pageNo + 1,
                                    };
                                }}
                            >
                                {#if loading}
                                    Loading...
                                {:else}
                                    Load More
                                {/if}
                            </a>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        <div class="w-full desktop:w-1/3">
            {#if trending_stories}
                <Sidebar
                    {isAmp}
                    {device}
                    {envDetails}
                    {language}
                    sideBarData={trending_stories}
                    {rightSideBar}
                    sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
                />
            {/if}
        </div>
    </div>
    <div id="migid-container" />
</div>

<style>
    .swiper-container {
        overflow: hidden;
        position: relative;
    }

    .breadcrumb ul {
        display: flex;
        gap: 4px;
        padding: 8px 12px 8px 12px;
    }

    .articleHead.mainPagehead {
        margin-bottom: 20px;
        padding: 0;
    }

    .articleHead,
    .articleHead h2 {
        display: flex;
        align-items: center;
    }

    .articleHead {
        justify-content: space-between;
        margin-bottom: 16px;
        width: 100%;
    }
    @media screen and (max-width: 680px) {
        .breadcrumb ul li {
            font-size: 12px;
        }
    }
</style>
