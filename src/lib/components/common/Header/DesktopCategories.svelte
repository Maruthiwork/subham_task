<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import redArrow from "$lib/assets/images/red-arrow-downward.svg";
    import whiteArrow from "$lib/assets/images/white-arrow-upward.svg";
    import { MORE } from "./Constants";
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import RepublicAnchorTag from "../RepublicAnchorTag/RepublicAnchorTag.svelte";

    let pathname: any = ``;
    let showMore = false;

    let header: HTMLElement | null = null;
    let hamburgerIcon: HTMLElement | null = null;

    let sticky: number;

    export let nav_bar: any = [];
    export let envDetails;

    const toggleShowMore = () => {
        showMore = !showMore;
    };
    function handleScroll() {
        if (window.pageYOffset > sticky) {
            header?.classList.add("stickyheader");
            hamburgerIcon?.classList.add("fixedMenu");
        } else {
            header?.classList.remove("stickyheader");
            hamburgerIcon?.classList.remove("fixedMenu");
        }
    }

    onMount(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            const fullRoute = window.location.pathname;
            pathname = fullRoute.split("/")?.[1];
            // Set up the header element and sticky offset after the DOM is fully loaded
            setTimeout(() => {
                header = document.getElementById("fixedheader");
                hamburgerIcon = document.getElementById("fixedRightMenu");
                if (header) {
                    sticky = header.offsetTop;
                }
            }, 0);

            window.addEventListener("scroll", handleScroll);
        }
    });
    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("scroll", handleScroll);
        }
    });
</script>

<div style="background-color: {envDetails.bgColor ?? ''};" id="fixedheader">
    {#if nav_bar?.length > 1}
        <div
            style={`background:${envDetails?.navBarBgColor ?? ""};color:${envDetails?.navBarTextColor ?? ""}`}
            class="categoriesHeader flex flexwrap {envDetails?.language !== 'RB'
                ? 'border-t border-gray-300 border-b'
                : ''} py-3 min-h-[45px]"
        >
            <!-- Content Wrapper -->
            <div class="contentWrapper catNavwrapper">
                <div
                    class="catNavlistSlider flex whitespace-nowrap gap-3 justify-center items-center"
                >
                    {#each [...nav_bar]?.slice(0, 10) as category}
                        <div
                            class={`${category?.completeSlug === pathname ? "active " : ""}navbarlist ${category?.completeSlug === "/" ? "veryFirst " : ""}`.trim()}
                        >
                            <RepublicAnchorTag
                                completeSlug={category?.completeSlug}
                                title={category?.frontend_name}
                                classes="flex items-center gap-1"
                            >
                                {#if category?.icon?.length > 0}
                                    <span class="w-4"
                                        ><img
                                            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.icon}`}
                                            alt="category-icon"
                                            width={18}
                                            height={18}
                                        /></span
                                    >
                                {/if}
                                <span
                                    style={envDetails?.language === "MH" ||
                                    envDetails?.language === "H"
                                        ? `font-family:${envDetails?.secondaryFont};font-size: 18px;`
                                        : `font-family-${envDetails?.primaryFont}`}
                                    class={pathname === "" &&
                                    category?.completeSlug === "/"
                                        ? "menu-items font-semibold redColor"
                                        : "menu-items font-semibold"}
                                >
                                    {category?.frontend_name}
                                </span>
                                {#if category?.badge?.length > 0}
                                    <span class="newIcon">
                                        <img
                                            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.badge}`}
                                            alt="new-icon"
                                            height="15px"
                                            width="30px"
                                        />
                                    </span>
                                {/if}
                            </RepublicAnchorTag>
                        </div>
                    {/each}
                </div>
                <div class="catNavlistSlider">
                    {#if nav_bar?.length > 10}
                        <button
                            aria-label="Show More"
                            style="background: {showMore
                                ? '#D10014'
                                : envDetails?.bgColor};color:{showMore
                                ? '#FFF'
                                : '#D10014'};{envDetails?.language === 'MH' ||
                            envDetails?.language === 'H'
                                ? `font-family:${envDetails?.secondaryFont};`
                                : `font-family-${envDetails?.primaryFont}`}"
                            class={showMore ? "more-btn-toggle" : "more-btn"}
                            on:mouseenter={toggleShowMore}
                        >
                            {MORE}
                            <img
                                src={showMore ? whiteArrow : redArrow}
                                alt="Dropdown arrow"
                                width="22"
                                height="22"
                                class="object-contain"
                                loading="lazy"
                            />
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    {/if}

    {#if showMore && nav_bar?.length > 10}
        <div
            class="categoriesHeader flex flexwrap border-b border-gray-300 py-3"
        >
            <div
                class={showMore
                    ? "catNavwrapper contentMidWrap  contentWrapper"
                    : "contentWrapper catNavwrapper contentMidWrap"}
            >
                <div
                    class="catNavlistSlider flex whitespace-nowrap gap-6 justify-center items-center"
                >
                    <!-- Render additional nav items using renderNavItem function -->
                    {#each nav_bar?.slice(10, 19) as category}
                        <div
                            class={category?.completeSlug === pathname
                                ? "active navbarlist"
                                : "navbarlist"}
                        >
                            <RepublicAnchorTag
                                completeSlug={category?.completeSlug}
                                title={category?.frontend_name}
                                classes="flex gap-1 items-center"
                            >
                                {#if category?.icon?.length > 0}
                                    <span class="w-4"
                                        ><img
                                            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.icon}`}
                                            alt="play-icon"
                                            width={16}
                                            height={16}
                                        /></span
                                    >
                                {/if}
                                <span
                                    style={envDetails?.language === "MH" ||
                                    envDetails?.language === "H"
                                        ? `font-family:${envDetails?.secondaryFont};font-size: 18px;`
                                        : `font-family-${envDetails?.primaryFont}`}
                                    class="menu-items font-semibold"
                                    >{category?.frontend_name}</span
                                >
                                {#if category?.badge?.length > 0}
                                    <span class="newIcon">
                                        <img
                                            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.badge}`}
                                            alt="new-icon"
                                            height="15px"
                                            width="30px"
                                        />
                                    </span>
                                {/if}
                            </RepublicAnchorTag>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        {#if nav_bar?.length > 19}
            <div
                class="categoriesHeader flex flexwrap border-b border-gray-300 py-3"
            >
                <div
                    class={showMore
                        ? "catNavwrapper contentMidWrap  contentWrapper"
                        : "contentWrapper catNavwrapper contentMidWrap"}
                >
                    <div
                        class="catNavlistSlider flex whitespace-nowrap gap-6 justify-center items-center"
                    >
                        {#each nav_bar?.slice(19) as category}
                            <div
                                class={category?.completeSlug === pathname
                                    ? "active navbarlist"
                                    : "navbarlist"}
                            >
                                <RepublicAnchorTag
                                    completeSlug={category?.completeSlug}
                                    title={category?.frontend_name}
                                    classes="flex gap-1 items-center"
                                >
                                    {#if category?.icon?.length > 0}
                                        <span class="w-4"
                                            ><img
                                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.icon}`}
                                                alt="play-icon"
                                                width={16}
                                                height={16}
                                            /></span
                                        >
                                    {/if}
                                    <span
                                        style={envDetails?.language === "MH" ||
                                        envDetails?.language === "H"
                                            ? `font-family:${envDetails?.secondaryFont};font-size: 18px;`
                                            : `font-family-${envDetails?.primaryFont}`}
                                        class="menu-items font-semibold"
                                        >{category?.frontend_name}</span
                                    >
                                    {#if category?.badge?.length > 0}
                                        <span class="newIcon">
                                            <img
                                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + category.badge}`}
                                                alt="new-icon"
                                                height="15px"
                                                width="30px"
                                            />
                                        </span>
                                    {/if}
                                </RepublicAnchorTag>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>

<style>
    .more-btn,
    .more-btn-toggle {
        border: 1px solid #fff;
        display: flex;
        width: 60px;
        height: 22px;
        padding: 0 4px;
        align-items: center;
        flex-shrink: 0;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-left: 6px;
    }
    .more-btn {
        color: #d10014;
        border-radius: 2px;
        border: 1px solid #d10014;
    }
    .more-btn-toggle {
        color: #d10014;
        border-radius: 2px;
        border: 1px solid #d10014;
    }
    .w-calc-95-minus-120 {
        width: calc(95% - 120px);
    }

    .active {
        color: #d10014;
        order: -1;
    }

    .redColor {
        color: #d10014;
    }

    .veryFirst {
        order: -2;
    }
    .newIcon {
        position: relative;
        margin-top: -13px;
        margin-left: 2px;
        height: 15px;
        width: 30px;
    }
</style>
