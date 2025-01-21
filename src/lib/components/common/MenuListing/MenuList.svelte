<script>
  //@ts-nocheck
  import { onDestroy, onMount } from "svelte";

  export let menuList = [];
  export let envDetails = {};
  export let categoryMenu = [];
  export let isAmp = false;

  let categorymenuswiper; // Declare swiper variable

  // Load Swiper script dynamically
  async function loadSwiperScript() {
    return new Promise((resolve, reject) => {
      if (
        document.querySelector(
          `script[src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"]`
        )
      ) {
        console.log("Swiper script already loaded.");
        resolve();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
        script.defer = true;
        script.onload = () => {
          console.log("Swiper script loaded.");
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }

  // Initialize Swiper after script loads
  async function initializeSwiper() {
    await loadSwiperScript();
    console.log("Initializing Swiper...");
    const categorymenuswiperContainer =
      document.querySelector(".swiper-container");

    if (categorymenuswiperContainer) {
      categorymenuswiper = new Swiper(categorymenuswiperContainer, {
        slidesPerView: "auto",
        speed: 2000,
        navigation: {
          prevEl: ".swiper-button-prev-category",
          nextEl: ".swiper-button-next-category",
        },
      });
      console.log("Swiper initialized:", categorymenuswiper);
    }
  }

  // Run when component mounts
  onMount(() => {
    initializeSwiper();
  });

  // Clean up Swiper when component is destroyed
  onDestroy(() => {
    if (categorymenuswiper) {
      categorymenuswiper.destroy(true, true);
      categorymenuswiper = null;
    }
  });
</script>

<svelte:head>
  <link
    rel="preload"
    href="/swiper-bundle.min.css"
    as="style"
    on:load={() => {
      const link = document.querySelector('link[rel="preload"][as="style"]');
      if (link instanceof HTMLLinkElement) {
        link.rel = "stylesheet";
      }
    }}
  />
</svelte:head>

<div class="flex items-baseline">
  {#if menuList?.length > 0}
    <div
      class="swiper-container sectionNavigation relative w-full overflow-auto px-4 desktop:w-11/12"
      id="sectionNavigation"
    >
      <div
        class="categoryList swiper-wrapper overflow-visible flex pb-4 desktop:pb-2"
      >
        {#each categoryMenu as menu, index}
          <div class="swiper-slide">
            <a
              data-sveltekit-reload
              href={`${isAmp ? '/amp': ''}/${menu?.completeSlug}`}
              target={menu?.open_in_new_tab === true ? "_blank" : "_self"}
            >
              <h6
                class={`flex self-center items-center justify-center whitespace-nowrap p-1 rounded-full cursor-pointer px-4 ${
                  index > 0 ? "mx-2" : "mr-2 desktop:mx-2"
                }`}
                style="color:{menu?.font_color ??
                  '#000'}; background-color:{menu?.color_code ??
                  envDetails?.bgColor};padding-top:{envDetails?.language === 'H'
                  ? '0.5rem'
                  : ''}"
              >
                {menu?.frontend_name}
              </h6>
            </a>
          </div>
        {/each}
      </div>
    </div>
    <div class="navarrows hidden sectionNavigationArrows desktop:block">
      <div class="swiper-button-prev swiper-button-prev-category"></div>
      <div class="swiper-button-next swiper-button-next-category"></div>
    </div>
  {/if}
</div>

<style>
  .sectionNavigation {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
