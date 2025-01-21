<!-- LiveTvPlayer.svelte -->
<script lang="ts">
  import { writable } from "svelte/store";

  import { useIntersectionObserver } from "../../utils/utils";

  let isVisible = false;

  useIntersectionObserver("livetv-container", 0.1, () => {
    isVisible = true;
    initPlayer();
  });

  let isPlayerReady = writable(false);
  let playerRef: HTMLDivElement;
  let jwplayerInstance: any; // Store reference to the JW Player instance

  export let livetv_video_id: string;
  export let player: string = 'https://content.jwplatform.com/libraries/uzU0TBR0.js';
  export let autoplay: boolean;
  export let isMute: boolean;
  export let className: string = "";
  export let isAmp: boolean = false;
  export let width: string = "16";
  export let height: string = "9";
  function initPlayer() {
    if (livetv_video_id) {
      const script = document.createElement("script");
      script.src = player;
      script.defer = true;
      script.onload = () => {
        isPlayerReady.set(true);
      };
      document.body.appendChild(script);
    }
  }

  function setupPlayer(jwplayer: any) {
    if (jwplayerInstance) {
      jwplayerInstance.remove(); // Remove existing player instance if present
    }

    jwplayerInstance = jwplayer?.setup({
      playlist: `https://content.jwplatform.com/v2/media/${livetv_video_id}`,
      autostart: autoplay,
      mute: isMute,
      autoPause: {
        viewability: true,
        pauseAds: true,
      },
      playsinline: true,
    });
  }

  $: {
    if ($isPlayerReady && livetv_video_id && playerRef) {
      const jwplayer = (window as any)?.jwplayer(playerRef);
      setupPlayer(jwplayer);
    }
  }
</script>

{#if isAmp}
  <amp-jwplayer
    data-media-id={livetv_video_id}
    data-player-id={'uzU0TBR0'}
    layout="responsive"
    width={width || "16"} 
    height={height || "9"} 
    autoplay
  ></amp-jwplayer>
{:else}
  <div id="livetv-container" class={`${className}`}>
    {#if isVisible}
      {#key livetv_video_id}
        <div bind:this={playerRef}></div>
      {/key}
    {/if}
  </div>
{/if}
