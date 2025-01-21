<script>
    // @ts-nocheck

    import { EnvironmentConfig } from "../utils/environmentConfig";
    import { setCookie } from "../utils/utils";

    export let showModal = true;
    // @ts-ignore
    export let allowNotification;
    export let envDetails = "";

    const toggleModal = () => {
        showModal = !showModal;
        const date = new Date();
        date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
        setCookie("tempBlockNotification", true, date);
    };
</script>

{#if showModal}
    <div
        style={`font-family:"${envDetails?.primaryFont}"`}
        class="fixed w-full h-full bottom-0 m-0 p-0  bg-gray-600 bg-opacity-50 flex items-start justify-center z-[999999999] desktop:inset-0"
    >
        <div class="bg-white w-full fixed bottom-0 shadow-lg desktop:w-[500px] rounded-none desktop:rounded-bl-[6px] desktop:rounded-br-[6px] desktop:top-0 desktop:h-fit">
            <div class="modal-content p-3 desktop:p-6">
                <div class="modal-image">
                    <img
                        src={envDetails?.notificationIcon}
                        alt="Republic Logo icon"
                        decoding="async"
                        loading="lazy"
                        width="100"
                    />
                </div>
                <div class="modal-text">
                    <h4 class="text-sm font-extrabold leading-[130%] mb-1 desktop:mb-2 desktop:text-xl">
                        Get Breaking News alerts from {envDetails?.siteName}
                    </h4>
                    <p class="text-xs font-medium leading-[140%] desktop:text-[17px]" style="color: rgba(0, 0, 0, 0.70);">
                        Allow push notifications now to get latest news updates,
                        sharpest opinions and much more.
                    </p>
                </div>
            </div>
            <div class="action notification-permission-content">
                <button on:click={toggleModal} style={`background-color: ${envDetails?.language === "RB" ? '#FFE4CB' : '#D2D2D2'};`} class="later-btn"
                    >l’ll do this later
                </button>
                <button on:click={allowNotification} class="allow-btn"
                    >Allow</button
                >
            </div>
        </div>
    </div>
{/if}

<style>
    .z-50 {
        z-index: 99999;
    }
    .modal-content {
        display: flex;
        align-items: flex-start;
    }
    .modal-image {
        max-width: 150px; /* Adjust as necessary */
        margin-right: 10px;
    }
    .modal-text {
        flex: 2;
    }
    @media screen and (max-width: 768px) {
        .modal-image {
            max-width: 46px; /* Adjust as necessary */
            margin-right: 10px;
        }
    }
</style>
