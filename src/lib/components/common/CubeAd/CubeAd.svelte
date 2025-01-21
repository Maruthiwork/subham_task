<script lang="ts">
    import BannerAd from "../BannerAd/BannerAd.svelte";

    let isBannerVisible = true;
    export let envDetails: any;

    const closeBanner = () => {
        isBannerVisible = false;
    };
</script>

{#if isBannerVisible}
    <div id="banner-cube-pe">
        <div id="cube-close-pe" on:click={closeBanner}>&times;</div>
        <div id="banner-cube-stage">
            <div id="banner-cube-shape">
                <!-- Cube 1 -->
                <div
                    id="cube-side-expensive"
                    style="transform: scale3d(1.05, 1, 1.05) rotateY(-90deg) translateZ(149px) !important"
                >
                    <BannerAd adslot={envDetails?.adsFile?.Desktop?.CUBE1?.home} />
                </div>
                <!-- Cube 2 -->
                <div
                    id="cube-side-expensive"
                    style="transform: scale3d(1.05, 1, 1.05) translateZ(149px) !important"
                >
                    <BannerAd adslot={envDetails?.adsFile?.Desktop?.CUBE2?.home} />
                </div>
                <!-- Cube 3 -->
                <div
                    id="cube-side-expensive"
                    style="transform: scale3d(1.05, 1, 1.05) rotateY(90deg) translateZ(149px) !important"
                >
                    <BannerAd adslot={envDetails?.adsFile?.Desktop?.CUBE3?.home} />
                </div>
                <!-- Cube 4 -->
                <div
                    id="cube-side-expensive"
                    style="transform: scale3d(1.05, 1, 1.05) rotateY(180deg) translateZ(149px) !important"
                >
                    <BannerAd adslot={envDetails?.adsFile?.Desktop?.CUBE4?.home} />
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    #banner-cube-pe {
        position: fixed;

        margin: 0px auto;

        z-index: 100001;

        bottom: 10%;

        left: 0;

        cursor: pointer;

        width: 300px;

        height: 250px;

        margin: auto;

        transform: scale(0.6);

    }

    #cube-close-pe {
        right: -91px !important;

        top: 18px;

        width: 22px !important;

        height: 22px;

        position: absolute !important;

        z-index: 4500 !important;

        font-size: 20px;

        background: red;

        border-radius: 50%;

        color: #fff;

        font-weight: 700;

        text-align: center;

        line-height: 1.1;
    }

    @media (max-width: 480px) {
        #banner-cube-pe {
            transform: scale(0.5);
        }
    }

    #cube-side-expensive {
        position: absolute;

        height: 250px;

        width: 300px;
    }

    #banner-cube-stage {
        transition: transform 2s ease 0s;

        transform-style: preserve-3d;

        position: relative;
    }

    #banner-cube-shape {
        animation-duration: 14s;

        animation-timing-function: linear;

        animation-delay: 0s;

        animation-iteration-count: infinite;

        animation-direction: normal;

        animation-fill-mode: none;

        animation-play-state: running;

        animation-name: spin_Cube;

        position: relative;

        top: 46px;

        margin: 0px auto;

        height: 250px;

        width: 300px;

        transform-style: preserve-3d;
    }

    @keyframes spin_Cube {
        from {
            transform: rotateY(0);
        }

        to {
            transform: rotateY(-360deg);
        }
    }

    @media (max-width: 480px) {
        #banner-cube-pe {
            transform: scale(0.4);
            left: -26px;
            bottom: 10%;
        }
    }
</style>
