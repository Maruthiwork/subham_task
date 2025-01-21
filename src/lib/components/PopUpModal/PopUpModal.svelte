<script lang="ts">
    import { onMount } from "svelte";
    import SmallStoryCard from "../common/SmallStoryCard/SmallStoryCard.svelte";
    import BigCardWithTwoCols from "../BigCardWithTwoCols/BigCardWithTwoCols.svelte";

    export let topStories;
    export let device;
    export let shouldShowModal = false;

    onMount(() => {
        const lastClosedTime = localStorage.getItem("popupModalLastClosed");
        if (lastClosedTime) {
            const twelveHoursAgo = new Date().getTime() - 12 * 60 * 60 * 1000; // 12 hours
            if (parseInt(lastClosedTime) > twelveHoursAgo) {
                shouldShowModal = false;
            }
        }
    });

    const handleClose = () => {
        localStorage.setItem(
            "popupModalLastClosed",
            new Date().getTime().toString(),
        );
        shouldShowModal = false;
    };
</script>

<div class="modal pop-up-modal {shouldShowModal ? 'visible' : ''}">
    <div
        class="modal-content pop-up-modal-content flex flex-col gap-5"
        on:click|stopPropagation={handleClose}
    >
        <div class="pop-up-design"></div>
        <span class="close pop-up-close" on:click={handleClose}>&times;</span>

        <!-- Title -->
        <h2 class="modal-title">Top Trending Stories</h2>
        <div
            class="CatBigStoryTopRow flexwrap pop-up-flexwrap"
            on:click={handleClose}
        >
            <BigCardWithTwoCols bigStory={topStories} {device} />
        </div>
        <div class="flex gap-5" on:click={handleClose}>
            {#if topStories && Array.isArray(topStories?.story)}
                {#each topStories?.story.slice(3, 5) as item, idx}
                    <div class="cardCol">
                        <SmallStoryCard {item} {device} />
                    </div>
                {/each}
            {:else}
                <div></div>
            {/if}
        </div>
    </div>
</div>

<style>
    .pop-up-modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        transform: translateY(60%) scale(0);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .pop-up-modal.visible {
        transform: translateY(0) scale(1);
    }

 

    .modal-title {
        padding: 15px 0px 10px 0px;
    }

    .pop-up-design {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background-color: red;
        z-index: 1001;
    }

    .pop-up-modal-content {
        position: relative;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        padding: 45px;
        max-width: 800px;
        width: 100%;
        max-height: 90%;
        overflow-y: auto;
    }

    .pop-up-close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
        font-weight: bold;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        width: 30px;
        height: 30px;
    }

    .pop-up-flexwrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .CatBigStoryTopRow {
        width: 100%;
    }
</style>
