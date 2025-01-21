<script lang="ts">
    import {
        ConvertDateFormat,
        getViewAllUpdateText,
    } from "$lib/components/utils/utils";
    import doubleImage from "$lib/assets/images/double-arrow.png";

    export let language = "E";
    export let liveBlogStory;
    export let isAmp = false;

    let bgcolorLiveBlog: "#00000";
</script>

<div
    style="background-color: {bgcolorLiveBlog ?? ''};height:100%;"
    class="pd16 rightLiveBlog"
>
    <div class="topichead redstrip mb0">
        <div class="livedot">
            <div class="liveRing"></div>
            <div class="liveDot"></div>
        </div>
        <h2 class="text-sm font-bold p-2">LIVE UPDATES</h2>
    </div>
    <div class="cardpdLeft liveblogBullets pt16">
        <ul class="bulletList p-2">
            {#if liveBlogStory?.live_blog_texts?.length > 0}
                {#each liveBlogStory?.live_blog_texts.slice(0, 3) as val, i}
                    <li style="color: #000">
                        <div class="timeline">
                            <span class="timelineCircle"></span>
                            <span class="lineblog"></span>
                        </div>
                        <div>
                            <span class="listTime">
                                {ConvertDateFormat(
                                    val.updatedAt
                                        ? val.updatedAt
                                        : val.createdAt,
                                )}
                                {#if val.pin}
                                    <div class={"pinnedTab"}></div>
                                {/if}
                            </span>
                            <div class="text-base desktop:text-lg ellipsis">
                                {val.header}
                            </div>
                        </div>
                    </li>
                {/each}
            {/if}
        </ul>
        <a
            href={`${isAmp ? "/amp/" : "/"}${liveBlogStory?.completeSlug}`}
            rel="external"
            class="arrowlink flex gap-2"
        >
            {getViewAllUpdateText(language)}
            <img src={doubleImage} alt="updates" />
        </a>
    </div>
</div>

<style>
    .ellipsis {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 30ch;
        white-space: normal;
    }

    .arrowlink:after {
        position: absolute;
        content: "";
        right: 0;
        width: 10px;
        height: 13px;
        top: 54%;
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 2;
        transform: translateY(-50%);
        background-image: url(/styles/images/right-arrow.svg);
        transition: all 0.4s ease;
        animation: forwordsArrow 3s infinite;
        opacity: 0;
    }

    .breakingWidget-wrapper .arrowlink {
        margin-top: 8px;
    }
    .arrowlink {
        color: var(--darkred);
        font-size: 14px;
        line-height: 1;
        font-weight: 600;
        display: flex;
        justify-content: right;
        text-align: center;
        width: max-content;
        margin: 0 0 0 auto;
        position: relative;
    }

    .arrowlink span {
        margin-left: 6px;
        position: relative;
        right: 0;
        top: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
        -webkit-animation: forwordsArrow 3s infinite;
        animation: forwordsArrow 3s infinite;
        opacity: 0;
    }
    .arrowlink:hover span,
    .readlink:hover span {
        right: -3px;
    }
    .breakingWidget .arrowlink {
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        margin-bottom: 16px;
        padding-bottom: 16px;
        width: 100%;
    }

    @media (max-width: 575px) {
        .breakingWidget .arrowlink {
            border-bottom: 1px solid rgba(0, 0, 0, 0.16);
            margin-bottom: 16px;
            padding-bottom: 16px;
            width: 100%;
        }
    }

    .liveblogBullets .bulletList li:before {
        background: none;
    }

    .liveblogBullets .bulletList li {
        color: rgba(0, 0, 0, 0.9);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 118%;
        border-bottom: none;
        display: flex;
        gap: 10px;
        padding: 0 0 0px 20px;
    }

    .liveblogBullets .bulletList li {
        padding-left: 0;
    }

    .rightLiveBlog div:nth-child(2) {
        padding-left: 0;
    }

    .liveblogBullets .bulletList li > div:nth-child(2) {
        padding-bottom: 13px;
    }

    .liveblogBullets .bulletList li:last-child > div:nth-child(2) {
        padding-bottom: 9px;
    }

    .timelineCircle {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-self: baseline;
        -ms-flex-item-align: baseline;
        align-self: baseline;
        border-style: solid;
        border-width: 2px;
        padding: 2px;
        border-radius: 50%;
        margin: 7px 0;
        border-color: transparent;
        background-color: #bc0012;
    }

    .blackArticleHead .textWhite {
        color: "white" !important;
    }

    .lineblog {
        width: 2px;
        background-color: #bc0012;
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    }

    .liveblogBullets .bulletList li:last-child > .timeline > .lineblog {
        display: none;
    }

    .timeline {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-flex: 0;
        -ms-flex: 0;
        flex: 0;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .deepDive .CustomSwiper .swiper-button-next:after {
        background-image: url(../images/slider-deepdiveright.svg);
    }

    .deepDive .CustomSwiper .swiper-button-prev:after {
        background-image: url(../images/slider-deepdiveleft.svg);
    }

    .deepDive .CustomSwiper .swiper-pagination-bullet {
        background: rgba(0, 0, 0, 0.6);
    }

    .liveblogBullets .bulletList .listTime {
        color: #bc0012;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        gap: 2px;
        align-items: center;
    }

    .bulletList li {
        margin-bottom: 0;
    }

    .redLine {
        width: 1px;
        background: #bc0012;
        height: 100px;
    }

    .deepDive {
        padding: 16px;
        color: #fff;
        margin-top: 24px;
    }

    .deepDive .rlogo,
    .deepDive .solidBtn {
        display: none;
    }

    .deepDive .bigIntImg {
        aspect-ratio: 16/9;
    }

    .deepDive .articleHead h2 {
        color: #d10014;
        font-size: 24px;
        font-weight: 800;
        letter-spacing: -0.96px;
    }

    .rightLiveBlog {
        background: #fff0f0;
    }

    .smallTitle {
        display: none;
    }

    @media (max-width: 1024px) {
        .rightLiveBlog {
            width: 100%;
            /* margin-top: 24px; */
        }

        .bigLeftBlock {
            width: 100%;
            margin-right: 0;
        }

        .bigTitle {
            display: none;
        }

        .smallTitle {
            display: block;
            font-size: 48px;
            font-weight: 900;
            color: #fff;
            padding-bottom: 0 !important;
        }

        .liveblogBullets .bulletList li {
            padding-left: 0;
        }

        .rightLiveBlog div:nth-child(2) {
            padding-left: 0;
        }

        .liveblogBullets .bulletList li > div:nth-child(2) {
            padding-bottom: 12px;
        }
    }

    @media (max-width: 1024px) {
        .bigTitle {
            display: none;
        }

        .rightLiveBlog {
            width: 100%;
            /* margin-top: 16px; */
        }

        .smallTitle {
            font-size: 28px;
            font-weight: 900;
            display: block;
            padding-bottom: 0 !important;
        }
    }
</style>
