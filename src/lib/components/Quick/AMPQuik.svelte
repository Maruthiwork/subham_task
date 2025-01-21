<script lang="ts">
  import LivetvPlayer from "../common/LiveTvPlayer/LivetvPlayer.svelte";
  import SEO from "$lib/components/SEO/index.svelte";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import { timeToRead } from "../utils/utils";
  import "$lib/assets/styles/amp-shorts.css";
  import {
    generateAspectRatioImageURL,
    IMAGE_ASPECT_RATIO,
    ImageDimensions,
  } from "../common/HybridImage/Constants";
  import closeIcon from "../../assets/images/feed-close-black.svg";

  // ** Props
  export let reels: any[] = [];
  export let envDetails = {};
  export let language = "E";
  export let canonicalUrl = "";
  export let device = "desktop";
  export let pathname = "";

  // ** Variables
  let activeIndex = 0;

  // ** Methods
  const getTitle = (reel: {
    images: { versions: { [x: string]: { title: any } } };
    small_heading: any;
  }) => {
    return reel.images.versions["3_4"]
      ? reel.images.versions["3_4"].title || ""
      : reel.small_heading || "";
  };

  const breadcrumbs: any[] = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: reels?.[activeIndex]?.long_heading,
      slug: reels?.[activeIndex]?.completeSlug,
    },
  ];
</script>

<SEO
  lang={language}
  {canonicalUrl}
  pageType={"Story"}
  {breadcrumbs}
  slug={reels?.[activeIndex]?.completeSlug}
  title={reels?.[activeIndex]?.long_heading}
  storyData={reels?.[activeIndex]}
  datePublished={reels?.[activeIndex]?.publish_at}
  lastUpdated={reels?.[activeIndex]?.updatedAt}
  metadescription={reels?.[activeIndex]?.description ??
    reels?.[activeIndex]?.meta_description}
  keywords={reels?.[activeIndex]?.keywords}
  timeToRead={timeToRead(reels?.[activeIndex]?.word_count)}
  featuredImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogSquareImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  twitterImage={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    reels?.[activeIndex]?.images?.versions?.["16_9"].filePath}
  site_details={envDetails}
  dateCreated={reels?.[activeIndex]?.createdAt ??
    reels?.[activeIndex]?.updatedAt}
  pathname={pathname}
/>
<div class="wrapper">
  <div class="qFeedClose">
    <a data-sveltekit-reload href={`/`} class="absolute">
      <img
        class="relative top-2 left-2 z-50"
        src={closeIcon}
        alt="Feed Close icon"
        width={32}
        height={32}
        style="object-fit: contain;"
      />
    </a>
  </div>
  <div class="swiper-container swiper quickFeedSwiper qFeedContainer">
    <div class="swiper-wrapper">
      <amp-base-carousel
        width="9"
        height="16"
        controls={false}
        horizontal={false}
        layout="responsive"
      >
        {#each reels as reel (reel?._id)}
          <div class="carousel-slide">
            <div class="reel">
              {#if reel.video && reel.video.id}
                <div class="video-wrapper">
                  <LivetvPlayer
                    isAmp={true}
                    isMute={true}
                    livetv_video_id={reel?.video?.id}
                    autoplay={true}
                  />
                  <div class="overlay-link">
                    <a href={`/${reel?.completeSlug}`}>
                      <p>{reel?.long_heading}</p>
                      <div class="cardftr darkCardftr qFeedFtr">
                        <span>
                          <a
                            class="category"
                            data-sveltekit-reload
                            href={`/${reel?.categoryData?.slug}`}
                          >
                            {reel?.categoryData?.frontend_name ||
                              reel?.categoryData?.name}
                          </a>
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              {:else}
                <amp-img
                  src={generateAspectRatioImageURL(
                    reel.images,
                    ImageDimensions?.[device]?.squareImages,
                    IMAGE_ASPECT_RATIO?.["1_1"]?.key,
                  )}
                  layout="responsive"
                  width="3"
                  height="4"
                  alt={reel.images.versions["1_1"].alt || reel.small_heading}
                ></amp-img>
                <div class="flex flex-col gap-2 text-left px-5 pt-4 pb-3">
                  <h2
                    class="text-left text-xl font-extrabold mt-4 -tracking-[0.999px]"
                  >
                    {getTitle(reel)}
                  </h2>
                  <a
                    data-sveltekit-reload
                    href={"/" + reel?.completeSlug ?? ""}
                    {...reel?.categoryData?.slug === "web-stories"
                      ? { target: "_blank" }
                      : {}}
                    class="w-fit text-sm py-1 px-2 text-white bg-red-600 border-t border-r-4 border-b-4 border-l border-red-800"
                  >
                    Read more
                  </a>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </amp-base-carousel>
    </div>
  </div>
</div>
