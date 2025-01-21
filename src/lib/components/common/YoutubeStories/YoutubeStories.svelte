<script>
  // @ts-ignore
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import VideoModal from "./VideoModal.svelte";
  import DisplayAd from "../DisplayAd/DisplayAd.svelte";

  export let language = "B";
  export let envDetails = {};
  export let device = "desktop";

  let videos = writable([]);
  let selectedVideoId = null;
  let isModalOpen = false;
  let fileName = language == "B" ? `feed.json` : `kannada.json`;

  onMount(async () => {
    let version_number = Math.floor(Math.random() * 1000000000);
    const response = await fetch(
      `https://storage.googleapis.com/vision-prod/behtarindia/youtube/${fileName}?version=${version_number}`,
    );
    const data = await response.json();
    let langVideos =
      language === "B" ? data?.bangla?.videos : data?.kannada?.videos;
    const video_length = Math.min(langVideos?.length, 9);
    videos.set(langVideos.slice(0, video_length));
  });

  // @ts-ignore
  const getLapsedTime = (published_at) => {
    const publishedDate = new Date(published_at);
    const now = new Date();
    // @ts-ignore
    const diff = Math.floor((now - publishedDate) / 1000 / 60);
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  // @ts-ignore
  const openModal = (video_id) => {
    selectedVideoId = video_id;
    isModalOpen = true;
  };

  const closeModal = () => {
    selectedVideoId = null;
    isModalOpen = false;
  };
</script>

<div class="livetv-video-container">
  {#each $videos as video, index}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="youtube-wrapper" on:click={() => openModal(video.video_id)}>
        <div class="youtube-container">
          <div class="imgResponsive">
            <img alt={video.title} src={video.image_url} />
          </div>
          <div class="posAbsolute width100 height100p flex justify-center top-12">
            <div class="flex height100p">
              <div class="livetv-play-button"></div>
            </div>
          </div>
        </div>
        <div class="text-container">
          <div class="youtube-video-title fontweight500 txtTruncate lineClip3">
            <h2>{video.title}</h2>
          </div>
          <div class="padtop10">
            <span>{video.views} views</span>
            <span>{getLapsedTime(video.published_at)}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Display ad after every 3rd video but not after the last video -->
    {#if device === "desktop"}
    {#if (index + 1) % 3 === 0}
      <div class="ad-container">
        <DisplayAd adslot={envDetails?.adsFile?.Desktop?.[`BTF${Math.floor((index + 1) / 3)}`]?.AP} />
      </div>
    {/if}
  {:else}
    {#if (index + 1) % 2 === 0 && (index + 1) < $videos.length}
      <div class="ad-container">
        <DisplayAd adslot={envDetails?.adsFile?.Mobile?.[`BTF${Math.floor((index + 1) / 2)}`]?.AP} />
      </div>
    {/if}
  {/if}
  
  {/each}
</div>

<VideoModal videoId={selectedVideoId} isOpen={isModalOpen} {closeModal} />

<style>
  .livetv-video-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .ad-container {
    grid-column: span 3; /* Make the ad span all 3 columns */
    margin: 10px 0;
  }

  @media (max-width: 640px) {
    .livetv-video-container {
      grid-template-columns: repeat(1, 1fr);
    }

    .ad-container {
      grid-column: span 1; /* Ensure the ad spans 1 column on mobile */
    }
  }

  .youtube-wrapper {
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 100%; /* Set to 100% to allow it to fill its parent */
  }

  .youtube-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Ensure spacing between image and text */
  }

  .youtube-container img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .youtube-video-title h2 {
    font-size: 16px;
    margin: 10px 0;
  }

  .padtop10 span {
    display: block;
    color: #777;
    font-size: 14px;
  }

  .posAbsolute {
    position: absolute;
  }

  .width100 {
    width: 100%;
  }

  .height100p {
    height: 100%;
  }

  .imgResponsive {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
  }

  .livetv-play-button {
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .livetv-play-button::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 18px solid white;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }

  .text-container {
    padding: 25px 0 10px 10px;
  }

  .livetv-bottom-line {
    height: 4px;
    background-color: #eee;
  }
</style>


