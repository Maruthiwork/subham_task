<script>
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import formatSecondsToTime from "$lib/components/utils/utils";
    export let duration;
    export let size; // Accept size prop

    // Additional styles
    let iconStyle = `width: ${size}px; height: ${size}px;`;
</script>

<div class="cardImgFtr pr-0 listingVideoFtr">
    <div class="playicon bottom-2 relative" style={iconStyle}>
        <img
            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/Play.svg`}
            alt="play-icon"
            width={size}
            height={size}
        />
    </div>
    <div class="videotime videoTimeBG">{formatSecondsToTime(duration)}</div>
</div>

<style>
    .cardImgFtr {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        width: auto;
        align-items: flex-end;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0 8px;
    }
    .videoTimeBG {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 0 0 2px 0;
        padding: 6px 4px;
    }
    .videotime {
        font-size: 0.7em;
        font-weight: 400;
        color: var(--white);
    }
</style>
