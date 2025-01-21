<script lang="ts">
    import { readable } from "svelte/store";
    import { onMount } from "svelte";
    import facebook from "$lib/assets/images/facebook.svg";
    import twitter from "$lib/assets/images/x-circle.svg";
    import whatsapp from "$lib/assets/images/whatsapp.svg";
    import {
        SOCIAL_PLATFORM,
        generateShareLink,
    } from "$lib/components/utils/utils";

    export let device = "desktop";
    export let setOpen;
    export let open = false;
    export let customURL = "";
    export let onCloseActionHandler: any;
    export let isQuick = false


    const sharePlatforms = readable([
        { platform: SOCIAL_PLATFORM.FACEBOOK.value, icon: facebook },
        { platform: SOCIAL_PLATFORM.TWITTER.value, icon: twitter },
        { platform: getPlatformUrl(), icon: whatsapp },
    ]);

    function getPlatformUrl() {
        if (device === "desktop") {
            return SOCIAL_PLATFORM.WHATSAPP_WEB.value;
        } else if (device === "mobile") {
            return SOCIAL_PLATFORM.WHATSAPP_APP.value;
        } else {
            return SOCIAL_PLATFORM.WHATSAPP_WEB.value;
        }
    }

    function handleShare(platform: any) {
        const url = generateShareLink(platform, customURL);
        window.open(url, "_blank");
        if (onCloseActionHandler) {
            onCloseActionHandler();
        }
    }

    onMount(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    $: sharePlatforms;
</script>

{#if open}
    <div id="sharePopup" class="sharePopupContainer" style="position: {isQuick  ? 'absolute' : 'fixed'};">
        <div class="sharePopupcontent">
            <a
                on:click={() => {
                    open = false;
                    if (onCloseActionHandler) onCloseActionHandler();
                }}
                class="close">&times;</a
            >
            <h3 class="text-center">Share</h3>
            <ul class="flexwrap shareNav">
                {#each $sharePlatforms as { platform, icon }}
                    <li>
                        <a on:click={() => handleShare(platform)}>
                            <img
                                class="svgico"
                                src={icon}
                                alt="Share Icon"
                                width={36}
                                height={36}
                            />
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
{/if}

<style>
    .sharePopupContainer h3 {
        border-bottom: 1px solid #ddd;
        font-size: var(--font20);
        padding-bottom: 5px;
    }

    .sharePopupContainer {
        transition: all 0.3s ease-in-out;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(21, 17, 17, 0.61);
        display: flex;
        align-items: center;
    }

    .sharePopupcontent {
        background-color: #fefefe;
        margin: auto;
        padding: 16px 26px 40px;
        width: 100%;
        border-radius: 10px;
        max-width: 350px;
        position: relative;
    }

    .qFeedWrapper .sharePopupcontent {
        transform: translateX(-10%);
    }

    .sharePopupcontent a.close {
        color: var(--black);
        position: absolute;
        right: 16px;
        top: 10px;
        font-size: var(--font22);
        font-weight: 400;
        background: none;
        padding: 0;
        margin: 0;
        text-decoration: none;
    }

    .sharePopupcontent a.close:hover {
        color: var(--darkred);
    }

    ul.shareNav {
        justify-content: center;
        padding-top: 40px;
        flex-direction: row;
    }

    .shareNav li {
        display: inline-block;
        padding: 0 10px;
    }

    .shareNav li a {
        width: 36px;
        height: 36px;
        display: block;
        transition: all 0.4s linear;
    }

    .shareNav li a:hover {
        transform: scale(1.1);
    }

    .shareNav li a img {
        width: 100%;
    }

    @media (max-width: 680px) {
        .sharePopupcontent {
            max-width: max-content;
            padding: 16px 16px 30px;
            transform: translateX(0);
        }

        .qFeedWrapper .sharePopupcontent {
            transform: translateX(0);
        }

        .sharePopupContainer h3 {
            font-size: var(--font18);
        }

        .shareNav li a {
            width: 26px;
            height: 26px;
        }

        .shareNav {
            padding-top: 26px;
        }
    }

    @media (max-width: 480px) {
        .sharePopupcontent {
            max-width: 230px;
            max-width: 230px;
        }
    }
</style>
