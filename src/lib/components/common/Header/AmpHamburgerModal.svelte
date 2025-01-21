<script lang="ts">
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import {
    DOWNLOAD_THE_ALL_NEW_REPUBLIC_APP,
    FOOTER_LINKS,
  } from "../Footer/Constants";
  import RepublicAnchorTag from "../RepublicAnchorTag/RepublicAnchorTag.svelte";

  export let nav_bar: any = [];
  export let envDetails;
  export let searchSlug: string = "";
  export let trendingbarData: any = [];
  let searchInput = searchSlug;
</script>

<amp-sidebar
  id="sidebar"
  layout="nodisplay"
  side="right"
  style={`background-color:${envDetails.bgColor};width:100%;max-width:100%;`}
>
  <div class="sidebar-content p-3">
    <a href="/amp">
      <div class="logo">
        <amp-img
          src={envDetails.siteLogo}
          alt="Republic TV Logo"
          width="172"
          height="62"
          style="object-fit: contain;"
        />
      </div>
    </a>
    <button
      on="tap:sidebar.close"
      class="ampstart-navbar-trigger items-start leading-[3.5rem] text-[2rem] w-[30px] float-right"
    >
      ✕
    </button>
  </div>
  <div class="searchField mb-4 max-w-5xl mx-auto px-5">
    <a class="voiceLink" href="#"
      ><img
        alt="Search icon"
        src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/search.svg`}
        decoding="async"
      /></a
    >
    <div class="searchInputBox relative">
      <form
        data-initialize-from-url
        method="get"
        action="/amp/search"
        target="_top"
      >
        <input
          type="text"
          name="query"
          bind:value={searchInput}
          placeholder="Search..."
          class="searchInput"
          required
          data-allow-initialization
        />
      </form>
    </div>
  </div>
  {#if trendingbarData?.length > 0}
    <div class="menuTrendingblock px-5 max-w-5xl mx-auto">
      <h5
        style="color: #D10014;font-weight:600;margin-bottom:12px;font-size:14px"
      >
        Trending
      </h5>
      <ul
        class="menuTrendingList flex flex-wrap pb-1 border-b border-black border-opacity-15"
      >
        {#each trendingbarData as trendingkeyWord}
          <li>
            <a
              data-sveltekit-reload
              href={trendingkeyWord?.url}
              class="flex items-center h-8 ellipsisHB trendingkeyword"
              >{trendingkeyWord?.keyword}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <div
    class="categoriesWrapper grid grid-cols-1 pb-3 px-5 relative text-base font-semibold capitalize desktop:grid-cols-7 max-w-5xl mx-auto my-0"
  >
    {#each nav_bar as item}
      <RepublicAnchorTag
        completeSlug={(() => {
          const slug = item?.completeSlug ?? "";
          const baseURL = envDetails.allDomainList?.[0]?.url ?? "";

          if (baseURL && slug.startsWith(baseURL)) {
            return "amp/" + slug.replace(baseURL, "").replace(/^\/+/, "");
          }

          return "amp/" + slug.replace(/^\/+/, "");
        })()}
        title={item?.frontend_name}
        classes="py-2 border-b border-black border-opacity-15 desktop:border-b-0 flex gap-2"
      >
        <div class="flex items-center flex-row">
          <span>
            {#if item?.icon?.length > 0}
              <amp-img
                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + item.icon}`}
                alt="icon"
                width="24"
                height="24"
                style="object-fit: contain; margin: 4px 6px 0px 0px;"
              />
            {/if}
          </span>
          <span class="menu-items">{item?.frontend_name ?? item?.name}</span>
        </div>
        <span>
          {#if item?.badge?.length > 0}
            <amp-img
              src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + item.badge}`}
              alt="icon"
              width="24"
              height="24"
              style="object-fit: contain; margin: 4px 6px 0px 0px;"
            />
          {/if}
        </span>
      </RepublicAnchorTag>
    {/each}
  </div>
  <div class="ftrCol w-full flex items-center justify-center px-3">
    <ul style="width: 100%; max-width: 1022px;" class="links">
      {#if envDetails?.language === "B" || envDetails?.language === "KA"}
        {#each FOOTER_LINKS.filter((link) => link?.text !== "Sitemap" && link?.text !== "RSS") as link}
          <li>
            <a
              target="_self"
              title={"/" + link?.text}
              class="text-sm font-medium leading-relaxed text-black py-2 !px-0 inline-block desktop:font-semibold"
              href={`/amp${link?.url}`}>{link?.text}</a
            >
          </li>
        {/each}
      {:else}
        {#each FOOTER_LINKS as link}
          <li>
            <a
              target="_self"
              title={"/" + link?.text}
              class="text-sm font-medium leading-relaxed text-black py-2 !px-0 inline-block desktop:font-semibold"
              href={`/amp${link?.url}`}>{link?.text}</a
            >
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <div class="ftrCol flex flex-col justify-center items-center m-2">
    <h5>{DOWNLOAD_THE_ALL_NEW_REPUBLIC_APP}</h5>
    <div class="flex">
      <a
        href="https://apps.apple.com/in/app/republic-tv/id1326556994"
        target="_blank"
        class=""
      >
        <amp-img
          src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/app-store.svg"
          alt="Republic Apple logo"
          width={148}
          height={50}
          style="object-fit: contain; margin: 4px 6px 0px 0px;"
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.republicworld&amp;hl=en"
        target="_blank"
        class="googleplayLogo"
      >
        <amp-img
          src="{EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}icons/icons/google-play.svg"
          alt="Republic Play store logo"
          width={148}
          height={50}
          style="object-fit: contain; margin: 4px 6px 0px 0px;"
        />
      </a>
    </div>
  </div>
</amp-sidebar>

<style>
  .custom-select {
    position: relative;
    width: 20px;
  }

  .custom-select select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    padding-right: 30px;
    background: transparent;
  }

  .custom-select:after {
    position: absolute;
    content: "";
    background: url($lib/assets/images/arrow-down.svg) no-repeat 50%;
    width: 16px;
    height: 16px;
    transition: all 0.2s linear;
    transform: rotate(0);
    right: 5px;
    top: 20%;
    pointer-events: none;
    font-size: 16px;
    color: #000;
  }
  .voiceIcon {
    background-image: url(/src/lib/assets/images/voice-icon.svg);
    background-size: 15px;
  }
  .searchInput {
    background-color: inherit;
    background-position: right 11px center;
    background-repeat: no-repeat;
    border: 1px solid rgba(0, 0, 0, 0.16);
    height: 40px;
    line-height: 1;
    padding: 6px 50px;
    border-radius: 24px;
    outline: none;
    box-shadow: none;
    font-size: var(--font14);
    letter-spacing: 0.25px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    width: 100%;
    margin-bottom: 12px;
  }
  .searchIconOverlay {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    background: transparent;
    margin-left: 85%;
  }
  .searchField .voiceLink {
    position: absolute;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    margin: 6px 8px 8px;
  }
  .menuTrendingList li a {
    background-color: #ffdbdb;
    border-radius: 18px;
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    color: var(--black);
    padding: 6px 12px;
    display: flex;
    align-items: center;
    vertical-align: top;
    transition: all 0.4s ease;
    white-space: nowrap;
  }
  .menuTrendingList li {
    margin: 5px 12px 5px 0;
  }
</style>
