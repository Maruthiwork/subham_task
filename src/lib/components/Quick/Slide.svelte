<script lang="ts">
  import { STORY_TYPE } from "../enums/story";
  import muteCircle from "$lib/assets/images/quick-shorts-svg/mute-circle.svg";
  import shareOutlined from "$lib/assets/images/quick-shorts-svg/share-outlined.svg";
  import volumeCircle from "$lib/assets/images/quick-shorts-svg/volume-circle.svg";
  import playPauseIcon from "$lib/assets/images/quick-shorts-svg/play-circle.svg";

  import { EnvironmentConfig } from "../utils/environmentConfig";
  import SharePopup from "../common/Republic-Common/SharePopup.svelte";

  // ** Props
  export let value;
  export let index;
  export let activeIndex;
  export let prevIndex;
  export let device = "desktop";

  // ** Variables
  let bookMark = false;
  let isMuted = true;
  let liked = false;
  let openCommentModal = false;
  let isVideoPlaying = false;
  let likedList: string[] = [];
  let open = false;
  let popupIndex = -1;
  let isQuick = true;

  // ** Methods
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

  const setOpen = (idx: number) => {
    open = !open;
    popupIndex = idx;
  };

  const onCloseActionHandler = () => {
    open = false;
    popupIndex = -1;
  };

  const setInitialValue = () => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem("likedArray");
      return storedValue ? JSON.parse(storedValue) : [];
    }
    return [];
  };

  const storeIntoLocalStorage = (updateLikedInfo: string[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "likedArray",
        JSON.stringify(updateLikedInfo),
      );
    }
  };

  const pauseVideo = (index: number) => {
    const videoElementPrevSlide = document.getElementById(
      `video-${index}`,
    ) as HTMLVideoElement | null;
    if (videoElementPrevSlide) {
      videoElementPrevSlide.pause();
      isVideoPlaying = false;
    }
  };

  const playVideo = (index: number) => {
    const videoElementActiveSlide = document.getElementById(
      `video-${index}`,
    ) as HTMLVideoElement | null;
    if (videoElementActiveSlide) {
      videoElementActiveSlide.play();
      isVideoPlaying = true;
    }
  };

  const playPauseVideoHandler = () => {
    const videoElement = document.getElementById(
      `video-${activeIndex}`,
    ) as HTMLVideoElement | null;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        isVideoPlaying = true;
      } else {
        videoElement.pause();
        isVideoPlaying = false;
      }
    }
  };

  const muteHandler = () => {
    const videoElement = document.getElementById(
      `video-${activeIndex}`,
    ) as HTMLVideoElement | null;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      isMuted = !videoElement.muted;
    }
  };

  const likeQuickHandler = (storyIndex: string) => {
    likedList = setInitialValue();
    const index = likedList.indexOf(storyIndex);
    if (index === -1) {
      likedList.push(storyIndex);
    } else {
      likedList.splice(index, 1);
    }
    liked = likedList.includes(storyIndex);
    storeIntoLocalStorage(likedList);
  };

  const bookMarkStory = () => {
    bookMark = !bookMark;
  };

  const feedCmtModal = (index: number) => {
    openCommentModal = !openCommentModal;
    if (openCommentModal) {
      pauseVideo(index);
    } else {
      playVideo(index);
    }
  };

  $: {
    if (typeof document !== "undefined") {
      pauseVideo(prevIndex);
      playVideo(activeIndex);
    }
    likedList = setInitialValue();
  }
</script>

<div class="qFeedCard">
  <div class="qFeedControls {value?.story_type === STORY_TYPE.SHORT.value ? "shortsHeight" : "quicksHeight"}">
    {#if value?.story_type === STORY_TYPE.VIDEO.value || value?.story_type === STORY_TYPE.SHORT.value}
      <div class="qFeedThumb">
        <div class="flexwrap itemCenter">
          <!-- svelte-ignore a11y-media-has-caption -->
          <video
            id={`video-${index}`}
            playsinline={true}
            preload="none"
            poster="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}{value?.images
              ?.versions?.['9_16']?.filePath}"
            class="fullFeedThumb"
            on:click={() => {
              playPauseVideoHandler();
            }}
          >
            <source
              src={`http://content.jwplatform.com/videos/${value?.video?.id}.mp4`}
              class="qFeedVideo"
              type="video/mp4"
            />
          </video>
          {#if !isVideoPlaying}
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="javascript:void(0)">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <span
                on:click={() => {
                  playPauseVideoHandler();
                }}
                class="playPauseIcons"
              >
                <img src={playPauseIcon} alt="Play/Pause Icon" />
              </span>
            </a>
          {/if}
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="qFeedVol"
          on:click={() => {
            muteHandler();
          }}
        >
          {#if isMuted}
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="javascript:void(0);">
              <img src={volumeCircle} alt="" width={35} height={35} />
            </a>
          {:else}
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="javascript:void(0);">
              <img src={muteCircle} alt="" width={35} height={35} />
            </a>
          {/if}
        </div>
      </div>
      <div class="qFeedDiscription">
        <a href={`/${value?.completeSlug}`}>
          <p>{value?.long_heading}</p>
          <div class="cardftr darkCardftr qFeedFtr">
            <span class="cardLabel">
              <a data-sveltekit-reload href={`/${value?.categoryData?.slug}`}>
                {value?.categoryData?.frontend_name ||
                  value?.categoryData?.name}
              </a>
            </span>
          </div>
        </a>
      </div>
    {:else}
      <div class="qFeedThumb qFeedImgThumb">
        <div class="flexwrap itemCenter">
          <img
            src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${value?.images?.versions?.["1_1"]?.filePath}`}
            alt={value?.images?.versions?.["1_1"]?.alt ?? ""}
            class="qFeedVideo imageQuick"
            width={298}
            height={298}
            style="object-fit: contain;"
          />
        </div>
          <div class="qFeedContent">
            <div
              class="qFeedHead"
              style="border-bottom: 3px solid {value?.categoryData?.color_code ??
                '#FFFFF'};width:80%;"
            >
              <h1
                class="flex flex-nowrap gap-2 items-center"
                style="font-size: 17px;font-weight: 800; color: {value?.categoryData?.color_code ??
                  '#FFFFF'};"
              >
                <span class="rlogo">
                  <img src={"https://img.republicworld.com/icons/icons/R.logo.svg"} alt="rlogo" />
                </span>
                {value?.categoryData?.frontend_name || value?.categoryData?.name}
              </h1>
            </div>
            <div class="flex justify-between">
            <div style="width: 80%;">
            <div class="qFeedTitle">
              <h2>{value?.mid_heading ?? ""}</h2>
            </div>

         
            <div class="listingBtns">
              <a
                data-sveltekit-reload
                href={"/" + value?.completeSlug ?? ""}
                {...value?.categoryData?.slug === "web-stories"
                  ? { target: "_blank" }
                  : {}}
                class="solidBtn warmRed"
              >
                Read more
              </a>
            </div>
            </div>
            <div class="qFeedActions">
              <ul>
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li
                  on:click={() => {
                    if (device === "mobile") {
                      shareUrl(
                        window?.location?.pathname,
                        value?.mid_heading,
                        value?.short_description,
                      );
                    } else {
                      setOpen(index);
                    }
                  }}
                >
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="javascript:void(0);">
                    <img src={shareOutlined} alt="" width={40} height={40} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    {/if}
    {#if open}
      <SharePopup {onCloseActionHandler} customURL={""} {open} {setOpen} {isQuick} />
    {/if}
    
  </div>
</div>

<style>
  .qFeedWrapper {
    background: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .likefilledBtn {
    width: 40px;
    height: 40px;
    display: block;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }
  .likeOutlineBtn {
    width: 40px;
    height: 40px;
    display: block;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }

  .likefilledBtn {
    background-image: url($lib/assets/images/quick-shorts-svg/like-filled.svg);
  }
  .likeOutlineBtn {
    background-image: url($lib/assets/images/quick-shorts-svg/like-outlined.svg);
  }

  .qFeedContentWrapper {
    width: 100%;
    max-width: 490px;
    position: relative;
  }

  .qFeedCard {
    height: 100%;
    width: 100%;
  }
  .shortsHeight{
    height: 86%;
  }
  .quicksHeight{
    height: 100%;
  }
  .swiper.qFeedContainer {
    height: 100%;
    overflow-x: inherit;
  }

  .qFeedDiscription {
    padding: 12px 60px 0 0;
  }

  .qFeedThumb {
    background: #2f2f2f;
    border-radius: 4px;
    position: relative;
    height: 100%;
    overflow: hidden;
    width: 425px;
    aspect-ratio: 9/16;
    margin: 0 0 auto;
  }

  .qFeedThumb .flexwrap {
    height: 100%;
    gap: 10px;
    justify-content: center;
  }

  .qFeedActions ul li a:focus-visible,
  .qFeedActions ul li a:focus,
  .qFeedSwiperNav .swiper-button-next:focus,
  .qFeedSwiperNav .swiper-button-prev:focus,
  .qFeedSwiperNav .swiper-button-next:focus-visible,
  .qFeedSwiperNav .swiper-button-prev:focus {
    outline: 0;
  }

  .qFeedImgThumb {
    background: #fff;
  }

  .qFeedImgThumb .qFeedVol {
    display: block;
    height: 28px;
    right: 16px;
  }

  .qFeedVol {
    width: 35px;
  }

  .qFeedThumb .qFeedVideo {
    max-width: 70%;
    height: 100%;
    margin: auto;
  }

  .fullFeedThumb {
    position: relative;
    max-width: 100%;
    height: 100%;
  }

  .playPauseIcons {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    margin: auto;
  }

  .qFeedThumb.qFeedImgThumb .flexwrap {
    height: auto;
    width: 100%;
  }

  .qFeedThumb.qFeedImgThumb .qFeedVideo {
    height: auto;
    margin: 0 auto;
    width: 100%;
  }

  @keyframes fadeOutAnimation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .fadeOut {
    animation: fadeOutAnimation 0.5s ease-out;
  }

  .hidden {
    visibility: hidden;
  }

  .qFeedDiscription p {
    font-size: 18px;
    color: #fff;
    font-weight: 400;
    max-height: 60px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .qFeedDiscription .qFeedFtr {
    font-size: 16px;
  }

  .qFeedDiscription .qFeedFtr .cardLabel a {
    color: var(--darkred);
  }

  .qFeedVol {
    right: 16px;
  }

  .qFeedControls {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  .qFeedActions {
    width: 10%;
  }

  .qFeedActions ul {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }

  .qFeedActions ul li a img {
    width: 40px;
    height: 40px;
    display: block;
  }

  .qFeedActions ul li a {
    line-height: 1;
    display: block;
  }

  .qFeedSwiperNav .swiper-button-next:after,
  .qFeedSwiperNav .swiper-button-prev:after {
    font-size: 15px;
    color: #000;
  }

  .qFeedSwiperNav .swiper-button-next,
  .qFeedSwiperNav .swiper-button-prev {
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 40px;
    transform: rotate(180deg);
  }

  .qFeedSwiperNav .swiper-button-next.swiper-button-disabled,
  .qFeedSwiperNav .swiper-button-prev.swiper-button-disabled {
    opacity: 0.55;
  }

  .qFeedSwiperNav {
    position: absolute;
    right: 20px;
    top: 60px;
    transform: rotate(270deg);
    z-index: 1;
  }

  .qFeedContent {
    padding: 20px 64px 0;
  }

  .qFeedContent .qFeedHead {
    position: relative;
  }

  .qFeedContent .qFeedHead h6 {
    font-size: 16px;
    font-weight: 900;
    letter-spacing: -0.571px;
    align-items: center;
    justify-content: start;
  }

  .qFeedHead {
    width: 100%;
    padding-bottom: 5px;
  }

  .qFeedContent .qFeedHead h6 img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .qFeedContent .qFeedTitle h2 {
    font-size: 28px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%; /* 33.6px */
    letter-spacing: -1.12px;
    margin-top: 16px;
    margin-bottom: 12px;
  }

  .qFeedContent .solidBtn {
    font-size: 14px;
    padding: 4px 6px 6px;
  }

  /* .qFeedContent .listingBtns {
    margin-top: 16px;
  } */

  .feedCmtCard.open,
  .feedModal.open {
    opacity: 1;
    visibility: visible;
  }

  .feedModal {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    overflow: auto;
    z-index: 999;
  }

  .feedCmtCard {
    display: none;
    z-index: 999;
    top: 0;
    left: 70%;
    position: absolute;
    height: 100%;
    width: 360px;
    -webkit-animation: slide 0.5s forwards;
    animation: slide 0.5s forwards;
  }

  .darkCardftr.cardftr span {
    color: hsla(0, 0%, 100%, 0.8);
    border-color: hsla(0, 0%, 100%, 0.8);
  }

  .cardftr span {
    padding-right: 6px;
    margin-right: 6px;
  }

  .qFeedDiscription .qFeedFtr .cardLabel a {
    color: #ffd700;
  }

  .qFeedDiscription .qFeedFtr {
    font-size: var(--font16);
  }

  .cardftr {
    font-size: var(--font14);
    line-height: 1.2;
    font-weight: 400;
    margin-top: 4px;
    font-family: var(--fmulish);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  @-webkit-keyframes slide {
    100% {
      left: 90%;
    }
  }

  @keyframes slide {
    100% {
      left: 90%;
    }
  }

  .qFeedActions ul li a {
    cursor: pointer;
  }

  .feedCmtForm {
    gap: 12px;
    position: sticky;
    width: 100%;
    bottom: 0;
    background: #ffd8d8;
    padding: 16px 0;
  }

  .feedCmtCard .feedCmtForm input {
    background: #fff;
    border: none;
    padding: 5px 8px;
    border-radius: 2px;
    width: calc(100% - 50px);
    height: 30px;
  }

  .feedCmtCard .feedCmtForm input::-webkit-input-placeholder {
    font-size: 14px;
    color: grey;
  }

  .feedCmtCard .feedCmtForm button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .feedCmtPanel {
    position: relative; /* width: 100%; */
    height: 100%;
    padding: 16px 16px 0 16px;
    overflow-y: auto;
    background: #ffd8d8;
  }

  .feedCmtClose {
    position: absolute;
    right: 16px;
  }

  .qFeedActions li .sharePopupContainer {
    position: fixed;
    transform: scale(1);
  }
  .warmRed {
    color: var(--white);
    background: var(--darkred);
    border-top: 1px solid var(--darkshadow);
    border-right: 3.5px solid var(--darkshadow);
    border-bottom: 3.5px solid var(--darkshadow);
    border-left: 1px solid var(--darkshadow);
  }
  @media screen and (max-width: 1024px) {
    .feedCmtCard {
      top: 100%;
      left: 0;
      width: 88%;
      height: 100%;
      -webkit-animation: slide 0.5s forwards;
      animation: slide 0.5s forwards;
    }

    .quickFeedSwiper .feedCmtPanel {
      padding: 40px 16px 0 16px;
      border-radius: 30px 30px 0 0;
    }

    @-webkit-keyframes slide {
      100% {
        left: 0;
        top: 40%;
      }
    }
    @keyframes slide {
      100% {
        left: 0;
        top: 40%;
      }
    }
  }

  @media screen and (max-width: 680px) {
    .fullFeedThumb {
      object-fit: fill;
    }
    .shortsHeight{
    height: 100%;
  }
  .quicksHeight{
    height: 100%;
  }
    .qFeedThumb {
      width: 100%;
      margin: 0 auto;
    }

    .qFeedActions ul li a img,
    .qFeedActions ul li a svg {
      width: 36px;
      height: 36px;
    }

    .qFeedSwiperNav {
      right: 22px;
      top: 110px;
      display: none !important;
    }

    .qFeedSwiperNav .swiper-button-next,
    .qFeedSwiperNav .swiper-button-prev {
      width: 30px;
      height: 30px;
    }

    .qFeedThumb {
      border-radius: 0;
    }

    .qFeedContent {
      padding: 15px 20px 10px;
    }

    .feedCmtCard {
      width: 100%;
    }

    .qFeedContentWrapper {
      max-height: 100%;
      width: 100%;
      max-width: 100%;
    }

    .qFeedThumb .qFeedVideo {
      max-width: 100%;
      width: 100%;
      object-fit: contain;
    }

    .qFeedControls {
      height: 100%;
    }

    .qFeedDiscription {
      position: absolute;
      z-index: 2;
      bottom: 0;
      padding-right: 20px;
      padding: 12px 16px 20px 16px;
    }

    .qFeedActions {
      padding-top: 15px;
    }

    .qFeedWrapper {
      align-items: self-start;
      padding: 0;
    }

    .feedCmtClose {
      right: 13px;
      top: 12px;
    }

    .feedCmtClose img {
      width: 24px;
    }

    .qFeedThumb:before {
      position: absolute;
      content: "";
      left: 0;
      bottom: 0;
      width: 100%;
      height: 40.6%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
      z-index: 1;
    }

    .qFeedImgThumb.qFeedThumb:before {
      display: none;
    }

    .qFeedWrapper {
      grid-template-columns: 100%;
    }

    .qFeedContainer .commentModule {
      height: 580px;
      overflow-y: auto;
    }

    .qFeedDiscription p {
      font-weight: 600;
    }

    .qFeedDiscription .qFeedFtr {
      font-size: 14px;
    }

    .qFeedDiscription.qfeedDescMobile {
      display: none;
    }

    /* .qFeedContent .qFeedTitle h2 {
      margin-top: 16px;
    } */

    .qFeedActions ul {
      gap: 28px;
    }

    .qFeedTitle {
      max-width: 100%;
    }

    .qFeedContent .qFeedHead h6 {
      font-weight: 800;
    }

    .qFeedContent .qFeedHead h6 img {
      margin-right: 4px;
    }

    @-webkit-keyframes slide {
      100% {
        left: 0;
        top: 40%;
      }
    }
    @keyframes slide {
      100% {
        left: 0;
        top: 40%;
      }
    }
  }
</style>
