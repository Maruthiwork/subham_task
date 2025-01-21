<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import CardHeader from "$lib/components/common/Republic-Common/CardHeader.svelte";

  export let data = {};
  export let isSideBar = false;
  export let className = "";
  export let isAmp: boolean = false;

  let selectedTabIndex = 0;
  let playerKey = 0;
  let tabNames = [];
  const tabNamesStore = writable([]);

  onMount(() => {
    tabNames = data?.liveTVInfo?.map((tabTitle) => tabTitle?.videoTitle) || [];
    tabNamesStore.set(tabNames);
  });

  const handleTabClick = (index) => {
    selectedTabIndex = index;
    playerKey += 1;
  };

  $: selectedTab = data?.liveTVInfo?.[selectedTabIndex];
</script>

<div class="cardsRow">
  <CardHeader textStyle={"font-size:28px;color:#D10014"} classes={"pb-4"}
    >{data?.title}</CardHeader
  >
  <div class={`asideThumb ${className}`}>
    {#await import("$lib/components/common/LiveTvPlayer/LivetvPlayer.svelte") then LivetvPlayer}
      <LivetvPlayer.default
        key={selectedTab?.videoId}
        isMute={true}
        livetv_video_id={selectedTab?.videoId}
        {isAmp}
        player={selectedTab?.player}
        autoplay={true}
        can_float={true}
      />
    {/await}
  </div>
  <div class="asideTab py-3">
    <ul class={`flex overflow-x-scroll ${isSideBar ? "gap-2 justify-between" : ""}`}>
      {#each $tabNamesStore as tab, index}
        <li
          class={`${index === selectedTabIndex ? "tabActive" : ""}  ${isSideBar ? "tabBtnHomepage" : " w-full"} tabItem`}
        >
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <a
            class={`w-full flex justify-center items-center whitespace-nowrap ${isSideBar ? "" : "tabBtn"}`}
            title={tab}
            on:click={() => handleTabClick(index)}
          >
            {#if data?.liveTVInfo?.[index]?.videoUrl}
              <img class="h-6" src={data?.liveTVInfo?.[index]?.videoUrl} alt={tab} height={24} />
            {:else}
              {tab}
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  {#if isSideBar}
    <div class="asideMastHead">
      <h2>{selectedTab?.videoDescription}</h2>
      {#if data?.moreUrl}
        <a
          data-sveltekit-reload
          href={data?.moreUrl}
          title="More Live TV"
          class="arrowlink">More Live TV</a
        >
      {/if}
    </div>
  {/if}
</div>

<style>
  .tabItem a {
    font-size: 13px;
  }
  .asideTab ul {
    text-align: center;
  }
  .asideTab .tabItem.tabActive .tabBtn,
  .asideTab .tabItem:hover .tabBtn {
    color: #fff;
    /* border-radius: 3.554px; */
    border-top: 0.889px solid rgba(0, 0, 0, 0.16);
    border-right: 3.11px solid rgba(0, 0, 0, 0.16);
    border-left: 0.889px solid rgba(0, 0, 0, 0.16);
    background: #d10014;
  }
  .asideTab .tabItem.tabActive .tabBtn {
    text-transform: capitalize;
    font-weight: 700;
  }

  .asideTab .tabItem .tabBtn img {
    height: 24px;
  }
  .asideTab .tabItem .tabBtn {
    border-right-width: 2px;
    border-bottom-width: 2px;
  }

  .asideTab .tabItem .tabBtn .radius-4 {
    border-radius: 4px;
  }

  .asideTab .tabItem .tabBtn {
    background: var(--white);
    padding: 12px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--black);
    border-top: 0.5px solid #d10014;
    border-right: 1.772px solid #d10014;
    border-bottom: 1.772px solid #d10014;
    border-left: 0.5px solid #d10014;
    font-weight: 500;
    font-family: var(--fmulish);
    cursor: pointer;
  }
  .asideMastHead h2 {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
  }
  .arrowlink {
    color: var(--darkred);
    font-size: var(--font16);
    line-height: 1;
    font-weight: 600;
    display: flex;
    justify-content: right;
    text-align: center;
    width: max-content;
    margin: 0 0 0 auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .arrowlink:after,
  .arrowlinkWhite:after {
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
    transition: all 0.4s ease;
    animation: forwordsArrow 3s infinite;
    opacity: 0;
  }
  .arrowlink:after {
    background-image: url($lib/assets/images/right-arrow.svg);
  }

  .asideTab .tabBtnHomepage {
    display: flex;
    width: 29%;
    height: 34.989px;
    justify-content: center;
    align-items: center;
    gap: 5.332px;
    flex-shrink: 0;
    border-radius: 3.554px;
    border-top: 0.889px solid #d10014;
    border-right: 3.11px solid #d10014;
    border-bottom: 3.11px solid #d10014;
    border-left: 0.889px solid #d10014;
    background: #fff;
  }

  .asideTab .tabBtnHomepage:hover,
  .asideTab .tabBtnHomepage.tabActive {
    color: #fff;
    background: #d10014;
    border-top: 0.889px solid rgba(0, 0, 0, 0.16);
    border-right: 3.11px solid rgba(0, 0, 0, 0.16);
    border-bottom: 3.11px solid rgba(0, 0, 0, 0.16);
    border-left: 0.889px solid rgba(0, 0, 0, 0.16);
  }
  @media screen and (max-width: 680px) {
    .asideTab .tabItem .tabBtn {
      background: var(--white);
      display: flex;
      padding: 8px 8px;
      align-items: center;
      justify-content: center;
      color: var(--black);
      border-top: 0.5px solid #d10014;
      border-right: 1.772px solid #d10014;
      border-bottom: 1.772px solid #d10014;
      border-left: 0.5px solid #d10014;
      background: #fff;
      font-weight: 500;
      font-family: var(--fmulish);
      cursor: pointer;
    }
  }
  .asideTab>div:first-child{
    -webkit-overflow-scrolling: touch;
  }
</style>
