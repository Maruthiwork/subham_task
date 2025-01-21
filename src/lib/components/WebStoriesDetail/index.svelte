<script lang="ts">
  import { afterUpdate } from "svelte";
  import { EnvironmentConfig } from "./../utils/environmentConfig.js";
  import SEO from "$lib/components/SEO/index.svelte";

  export let webstoryDetail: any;
  export let web_story_media: any = [];
  export let envDetails: any = {};
  export let language = "E";
  export let canonicalUrl: string = "";
  export let pathname: string = "";

  function sanitizeCaption(caption: any) {
    if (!caption) return "";

    // Replace all occurrences of `!important`
    const sanitizedCaption = caption.replace(/!important/g, "");

    // You can add further sanitization logic here if needed
    return sanitizedCaption;
  }

  let newMediaObject = {
    type: "IMAGE",
    media: "new-media.jpg",
    title: "view next slide",
    isLast: true,
  };

  afterUpdate(() => {
    if (webstoryDetail?.data) {
      web_story_media?.push(newMediaObject);
    }
  });

  function handleNextSlideClick() {
    if (
      webstoryDetail?.data &&
      webstoryDetail?.data?.nextStory &&
      webstoryDetail?.data?.nextStory.completeSlug
    ) {
      window.location.href = `/${webstoryDetail?.data?.nextStory.completeSlug}`;
    }
  }

  const breadcrumbs = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: webstoryDetail?.data?.long_heading,
      slug: webstoryDetail?.data?.completeSlug,
    },
  ];
</script>

<SEO
  lang={language}
  {canonicalUrl}
  pageType="Story"
  {breadcrumbs}
  slug={webstoryDetail?.data?.completeSlug}
  title={webstoryDetail?.data?.long_heading}
  storyData={webstoryDetail?.data}
  datePublished={webstoryDetail?.data?.createdAt}
  metadescription={webstoryDetail?.data?.meta_description ||
    webstoryDetail?.data?.long_heading}
  keywords={webstoryDetail?.data?.keywords}
  ogSquareImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    webstoryDetail?.data?.images?.versions?.["16_9"].filePath}
  ogImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    webstoryDetail?.data?.images?.versions?.["16_9"].filePath}
  twitterImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    webstoryDetail?.data?.images?.versions?.["16_9"].filePath}
  featuredImageSrc={EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL +
    webstoryDetail?.data?.images?.versions?.["16_9"].filePath}
  site_details={envDetails}
  dateCreated={webstoryDetail?.data?.createdAt ??
    webstoryDetail?.data?.updatedAt}
  web_stories_media={web_story_media ?? []}
  isAmp={true}
  {pathname}
/>

{#if webstoryDetail?.data}
  <amp-story
    standalone
    title={webstoryDetail?.data?.long_heading || "web-story"}
    publisher={envDetails?.siteName}
    publisher-logo-src={`${EnvironmentConfig.VITE_REPUBLIC_URL}styles/images/R-frame.svg`}
    poster-portrait-src={`${EnvironmentConfig.VITE_REPUBLIC_URL}styles/images/R-frame.svg`}
  >
    <amp-story-page id="0" auto-advance-after="5s">
      {#if webstoryDetail?.data?.images?.versions?.["3_4"]?.filePath}
      <amp-story-grid-layer template="fill">
        <amp-img
          src={webstoryDetail?.data?.images?.versions?.["3_4"]?.filePath
            ? `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}tr:q-60/${webstoryDetail?.data?.images?.versions?.["3_4"]?.filePath}`
            : `${EnvironmentConfig.VITE_REPUBLIC_URL}styles/noimages/3-4-placeholder.jpg`}
          width="461"
          height="775"
          layout="responsive"
        >
        </amp-img>
      </amp-story-grid-layer>
      {/if}
      <amp-story-grid-layer template="vertical">
        <div class="rframe">
          {#if envDetails.language === "RB"}
            <amp-img
              src="https://img.republicworld.com/icons/icons/rbusiness-logo.svg"
              width="41"
              height="41"
            >
            </amp-img>
          {:else}
            <amp-img
              src="https://img.republicworld.com/icons/icons/R.logo.svg"
              width="41"
              height="41"
            >
            </amp-img>
          {/if}
        </div>

        <div
          class="webstoriesDesciption"
          style={`background:${envDetails.language === "RB" ? "#D10014" : "rgba(191, 0, 114, 0.70)"}`}
        >
          <span class={"whitehr"}></span>
          <div class="desNav">
            <span>{webstoryDetail?.data?.authorDetail?.name}</span>
          </div>
          <h1>{webstoryDetail?.data?.long_heading || "web-story"}</h1>
        </div>
      </amp-story-grid-layer>
    </amp-story-page>

    {#if webstoryDetail?.data?.web_stories_media?.length > 0}
      {#each webstoryDetail?.data?.web_stories_media as value, index}
        <amp-story-page id={index + 1} auto-advance-after="5s">
          <amp-story-grid-layer template="fill">
            {#if value?.type === "IMAGE"}
              <amp-img
                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${value?.media}`}
                width="100"
                height="100"
                layout="responsive"
              >
              </amp-img>
            {/if}
            {#if value?.type === "VIDEO"}
              <amp-video
                autoplay
                loop
                width="720"
                height="960"
                poster={value?.thumbnail}
                layout="responsive"
              >
                <source
                  src={`https://content.jwplatform.com/videos/${value?.media}.mp4`}
                  type="video/mp4"
                />
              </amp-video>
            {/if}
          </amp-story-grid-layer>
          <amp-story-grid-layer template="vertical">
            <div class="rframe">
              {#if envDetails.language === "RB"}
                <amp-img
                  src="https://img.republicworld.com/icons/icons/rbusiness-logo.svg"
                  width="41"
                  height="41"
                >
                </amp-img>
              {:else}
                <amp-img
                  src="https://img.republicworld.com/icons/icons/R.logo.svg"
                  width="41"
                  height="41"
                >
                </amp-img>
              {/if}
            </div>

            <div
              class="webstoriesDesciption"
              style="background: rgba(0, 0, 0, 0.52);"
            >
              <span class={"fullhr"} style="background: #BF0072;"></span>
              <h2
                style="font-size: 17px; letter-spacing: -0.88px;"
                class="font-medium text-base lg:text-lg xl:text-xl text-white leading-6 lg:leading-7 xl:leading-8 tracking-tight py-1"
              >
                {@html sanitizeCaption(value?.caption)}
              </h2>
              <p>Source: {value?.source}</p>
            </div>
          </amp-story-grid-layer>
          {#if web_story_media?.length - 1 === index && webstoryDetail?.data?.nextStory?.completeSlug}
            <amp-story-page-outlink layout="nodisplay">
              <a
                href={`/${webstoryDetail?.data?.nextStory?.completeSlug}`}
                title="Next Story">Next Story</a
              >
            </amp-story-page-outlink>
          {/if}
        </amp-story-page>
      {/each}
    {/if}
  </amp-story>
{/if}

<!-- {/if} -->

<style amp-custom>
  /* Add custom styles here */
  .webstoriesbg,
  .webstoryCard {
    background-color: #000;
    height: 100vh;
  }

  .webstoryCard .rframe {
    width: 40px;
    position: absolute;
    top: 23px;
    left: 16px;
  }

  amp-story-grid-layer {
    padding: 22px 15px 32px;
  }

  .whitehr {
    width: 85px;
    height: 5px;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .fullhr {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
  }

  .desNav {
    padding-bottom: 10px;
  }

  .desNav span {
    color: #ffd700;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.28px;
    padding-right: 10px;
    position: relative;
  }

  .desNav span:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #ffd700;
    transform: translateY(-50%);
  }

  .webstoriesDesciption {
    padding: 24px;
    text-align: left;
    position: absolute;
    bottom: 72px;
    left: 0;
    right: 0;
    width: 90%;
    margin: 0 auto;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.52);
  }

  .webstoriesDesciption h1,
  .webstoriesDesciption h4 {
    color: #fff;
    font-weight: 900;
    text-align: left;
    margin-bottom: 18px;
  }

  .webstoriesDesciption h1 {
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -1.12px;
  }

  .webstoriesDesciption h4 {
    font-size: 14px;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: -0.64px;
    padding-bottom: 10px;
  }

  .webstoriesDesciption p,
  .webstoriesDesciption .sdesc {
    color: rgba(255, 255, 255, 0.42);
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.24px;
  }

  .webstoriesDesciption .sdesc {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    padding-bottom: 8px;
  }
</style>
