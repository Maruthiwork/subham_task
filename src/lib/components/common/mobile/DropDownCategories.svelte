<script lang="ts">
  import type { MEGA_MENU } from "../Header/Types";
  import { onDestroy } from "svelte";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  import { page } from "$app/stores";

  export let mega_menu: MEGA_MENU;
  export let device: string = "desktop";
  let { topNavBar, bottomNavBar } = mega_menu;
  export let isAmp;

  const hideDropdownFor = [
    "latest-news",
    "viral",
    "livetv",
    "web-stories",
    "shorts",
    "galleries",
    "poll",
    "breaking-news",
    "anchors-and-authors",
    "tags",
    "topics",
    "topic",
    "sitemap",
    "about-us",
    "contact-us",
    "privacy-policy",
    "policies-disclaimers",
    "search",
    "india",
    "defence",
    "pradhan-sevak",
    "videos",
    "elections",
    "dharm-aur-adhyatmikta",
    "shows",
  ];
  let selectedFrontendName = "";
  let isDropdownVisible = false;
  let selectedOption = "lastOneHour";

  const dropdownRef = null;

  const toggleDropdown = () => {
    isDropdownVisible = !isDropdownVisible;
  };

  const matchingSlug = ["shows", "videos"];
  let shouldRenderBlock =
    $page &&
    typeof $page.params.slug === "string" &&
    matchingSlug.includes($page.params.slug.split("/").pop() || "");

  let categoryPath =
    $page && typeof $page.params.slug === "string"
      ? $page.params.slug.split("/")[1]
      : "";
  let slugPath =
    $page && $page.params && Array.isArray($page.params.slug)
      ? $page.params.slug[0]
      : "";
  let isDropdownHidden =
    ($page && $page.params.slug === "/") || slugPath.endsWith(".news")
      ? true
      : hideDropdownFor.includes(categoryPath);

  function initComponent() {
    if ($page && $page.params && Array.isArray($page.params.slug)) {
      const slugParams = $page.params.slug;
      const lastPathSegment = slugParams[slugParams.length - 1];
      const formattedFrontendName = lastPathSegment
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      selectedFrontendName = formattedFrontendName;
    }
  }

  onDestroy(() => {
    // You can perform cleanup here, if necessary
  });

  const Colorchange = ["defence", "world-news", "sports", "entertainment"];
  let RenderForColor = $page && typeof $page.params.slug === 'string' && Colorchange.includes($page.params.slug.split("/").pop() || "");

  const HybridImage = isAmp ? 'img' : 'img';

  initComponent(); // Call the custom initialization function
</script>

{#if device === "desktop"}
  <div class="isDesktop">
    <a data-sveltekit-reload href={`${EnvironmentConfig.VITE_REPUBLIC_URL}`}>
      <div class="logo">
        <img
          src="https://img.republicworld.com/logo/english/republic-logo.svg"
          alt="Republic Bharat"
          width="300"
          height="44"
          style="object-fit: contain;"
          loading="lazy"
        />
      </div>
    </a>
  </div>
{:else}
  <div class="isTabletMobile">
    {#if isDropdownHidden}
      <a data-sveltekit-reload href={`${EnvironmentConfig.VITE_REPUBLIC_URL}`}>
        <div class="logo">
          <img
            src="https://img.republicworld.com/logo/english/republic-logo.svg"
            alt="Republic Bharat"
            width="254"
            height="62"
            style="object-fit: contain;"
            loading="lazy"
          />
        </div>
      </a>
    {/if}
    {#if !isDropdownHidden}
      <div class="catLogoHead">
        <div class="catlogowrap flexwrap">
          <div class="RFrame rlogo">
            <a data-sveltekit-reload href={`${EnvironmentConfig.VITE_REPUBLIC_URL}`}>
              <img
            src="https://img.republicworld.com/logo/english/republic-logo.svg"
                alt="Republic Logo Frame icon"
                width="170px"
                height="25px"
                loading="lazy"
              />
            </a>
          </div>
          <div class="select selectCategory">
            <div
              class={RenderForColor ? "selectBtn whiteSelectBtn" : "selectBtn"}
              data-type="firstOption"
              on:click={toggleDropdown}
            >
              {selectedFrontendName}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
