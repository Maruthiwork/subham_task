<script lang="ts">
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import SharePopup from "../Republic-Common/SharePopup.svelte";

    export let story: any = {};
    export let device: any = "desktop";
    export let envDetails: any = "";
    export let isAmp: any = false;
    export let sharePlatforms: any = [];

    let open = false;
    const setOpen = () => {
        open = !open;
    };

    const onCloseActionHandler = () => {
        open = false;
    };

    // Define the shareUrl function inside the script block
    const shareUrl = (url: string, title: string, text: string) => {
        if (!navigator.share) return;

        navigator
            .share({ url, title, text })
            .then(() => {
                console.log("Shared");
            })
            .catch((error) => {
                console.log("Sharing Failed");
            });
    };
</script>

<div class="flex flex-wrap justify-start pb-4 desktop:pb-5 items-center">
    <span
        class="{envDetails?.language === 'MH' || envDetails?.language === 'H'
            ? 'text-[15px]'
            : 'text-[13px]'} desktop:text-[17px] font-medium flex items-start justify-start gap-2"
    >
        Follow:
        <a
            class="flex items-center"
            target="_blank"
            rel="noreferrer"
            href={envDetails?.googleNewsLink}
        >
            <img
                class="google-news-icon"
                alt="Google News Icon"
                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}/icons/icons/google-news.svg`}
                decoding="async"
                loading="lazy"
            />
        </a>
    </span>
    <div
        style="width: 1px; height: 18px;"
        class="vartical-dash border border-black/15 mx-3"
    ></div>
    <ul class="h-full flex gap-4 items-center justify-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        {#if isAmp}
            <li
                style="margin: 0px;"
                class="flex items-center justify-center cursor-pointer"
            >
                <amp-img
                    tabindex="0"
                    alt="share"
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}/icons/icons/share.svg`}
                    height="28px"
                    width="80px"
                    class="Storyshare"
                    on="tap:shareModal"
                    role="button"
                ></amp-img>
            </li>
        {:else}
            <li
                style="margin: 0px !important;"
                class="flex items-center justify-center cursor-pointer"
                on:click={() => {
                    if (device === "mobile") {
                        shareUrl(
                            window?.location?.pathname,
                            story?.mid_heading,
                            story?.short_description,
                        );
                    } else {
                        setOpen();
                    }
                }}
            >
                <img
                    alt="share"
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}/icons/icons/share.svg`}
                    decoding="async"
                    height="28px"
                    width="80px"
                    loading="lazy"
                    class="Storyshare"
                />
            </li>
        {/if}
    </ul>
</div>

<!-- Share Popup Ordinary -->
<SharePopup {onCloseActionHandler} customURL={""} {open} {setOpen} />

<!-- Share Popup AMP -->
{#if isAmp}
    <!-- AMP Lightbox Modal -->
    <amp-lightbox id="shareModal" layout="nodisplay">
        <div
            style="background-color: #1511119c;"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
        >
            <div
                style="max-width: 350px;"
                class="bg-white pt-4 px-6 pb-10 rounded-lg w-full shadow-lg text-center relative"
            >
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span
                    tabindex="0"
                    class="absolute top-2 right-4 text-2xl text-gray-600 cursor-pointer"
                    on="tap:shareModal.close"
                    role="banner"
                >
                    &times;
                </span>

                <h3 class="text-xl">Share</h3>
                <hr class="mt-2 mb-11" />
                <!-- Share Platforms -->
                <ul class="flex flex-wrap justify-center gap-5 shareNav">
                    {#each sharePlatforms as { platform, icon, url }}
                        <li style="list-style-type: none;">
                            <button
                                on="tap:AMP.navigateTo(url='{url}', target='_blank')"
                            >
                                <amp-img
                                    tabindex="0"
                                    class="svgico"
                                    src={icon}
                                    alt={`${platform} Share Icon`}
                                    width={"36px"}
                                    height={"36px"}
                                ></amp-img>
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </amp-lightbox>
{/if}

<style>
    .google-news-icon {
        width: 32.003px;
        height: 26.287px;
    }
    .vartical-dash {
        width: 1px;
        height: 18px;
    }

    .galleryCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -14px;
    }

    @media screen and (max-width: 680px) {
        .google-news-icon {
            width: 23.002px;
            height: 18.894px;
            flex-shrink: 0;
        }
    }
</style>
