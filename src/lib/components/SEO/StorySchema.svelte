<script lang="ts">
  import { page } from "$app/stores";
  import { encodeImageName } from "$lib/utils/common";
  import { STORY_TYPE } from "../enums/story";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import {
    convertDurationToISO8601,
    convertToTimeZone,
    generateConditionalJsonLdScript,
    generateSlug,
    jwPlayerVideoUrl,
    stripHtmlAndEscape,
  } from "../utils/utils";

  export let lang;
  export let site_details;
  export let title;
  export let description;
  export let lastUpdated;
  export let datePublished;
  export let dateCreated;
  export let keywords;
  export let slug;
  export let story_category_data: any = {};
  export let author_details: any = {};
  export let story_subcategory_data: any = {};
  export let story_l3category_data: any = {};
  export let story_type: string = "";
  export let live_blog_details: any = [];
  export let web_stories_media: any = [];
  export let latest_stories: any = [];
  export let image: any = {};
  export let video: any = {};
  export let storyData: any = {};
  let imageGalleryData = {};
  let imageObjectData = {};
  let mediaGalleryData = {};
  let liveBlogScriptData = {};
  let videoObjectData = {};
  let videoGallery = {};
  let baseURL = site_details?.allDomainList?.[0]?.url;
  let full_complete_slug = baseURL + slug;
  const REPUBLIC_URL = site_details?.allDomainList?.[0]?.url;

  const isWebStory = story_type === STORY_TYPE.WEB_STORY.value;

  let articleBody = () => {
    if (story_type == STORY_TYPE.LIVE_BLOG.value) {
      let data = live_blog_details
        ?.map((update: any) => stripHtmlAndEscape(update?.text || "", lang))
        .join(" ");

      return (
        stripHtmlAndEscape(storyData.live_blog_headline) +
        " " +
        data +
        " " +
        stripHtmlAndEscape(storyData.live_blog_conclusion)
      );
    }
    if (story_type == STORY_TYPE.DEEP_FOCUS.value) {
      return storyData?.deep_focus?.content
        ?.map((item: any) => stripHtmlAndEscape(item?.text || "", lang))
        .join(" ");
    }
    return stripHtmlAndEscape(
      storyData.description ? storyData.description : (description ?? ""),
      lang,
    );
  };

  // New in Language
  const langBasedContent: any = {
    E: "en",
    RB: "en",
    H: "hi",
  };

  // News Articles Schema
  const newsArticleSchema = {
    "@context": "https://schema.org/",
    "@type": "NewsArticle",
    image: {
      "@type": "ImageObject",
      width: "1200",
      height: "900",
      url: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(image?.versions?.["16_9"]?.filePath)}`,
    },
    mainEntityOfPage: `${full_complete_slug || ""}`,
    headline: `${stripHtmlAndEscape(title ?? "", lang)}`,
    description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
    keywords: keywords
      ? keywords.split(",").map((keyword) => keyword.trim())
      : [],
    url: `${full_complete_slug || ""}`,
    datePublished: `${convertToTimeZone(datePublished) || ""}`,
    dateModified: `${convertToTimeZone(lastUpdated) || ""}`,
    articleBody: `${articleBody()}`,
    articleSection: `${story_category_data?.name ?? ""}`,
    author: {
      "@type": `${author_details?.name ? "Person" : "Organization"}`,
      name: `${author_details?.name || "Organization"}`,
      url: `${site_details?.allDomainList?.[0]?.url}authors/${author_details?.slug ?? "republic"}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Republic World",
      logo: {
        "@type": "ImageObject",
        url: `${site_details?.siteLogo ?? ""}`,
        width: 600,
        height: 60,
      },
      sameAs: [
        `${site_details?.facebookUrl || ""}`,
        `${site_details?.twitterUrl || ""}`,
        `${site_details?.linkdenUrl || ""}`,
        `${site_details?.instaUrl || ""}`,
        `${site_details?.youtubeUrl || ""}`,
      ],
    },
    associatedMedia: {
      "@type": "ImageObject",
      url: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(image?.versions?.["16_9"]?.filePath)}?impolicy=website&width=1200&height=900`,
      caption: `${image?.versions?.["16_9"]?.caption ?? "Republic Caption"}`,
      description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
      height: isWebStory ? 853 : 675,
      width: isWebStory ? 640 : 1200,
    },
  };

  // BreadCrum List
  const nameMapping = [
    story_category_data?.name ? story_category_data?.name + ` News` : null,
    story_subcategory_data?.name
      ? story_subcategory_data?.name + ` News`
      : null,
    story_l3category_data?.name ? story_l3category_data?.name + ` News` : null,
  ].filter((value) => value !== null && value !== undefined);

  const parts = slug ? slug.split("/") : "";
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": `${baseURL}`,
        name: "Home",
      },
    },
  ];

  for (let i = 0; i < parts?.length && i < 4; i++) {
    const slugPart = parts?.slice(0, i + 1).join("/");
    const breadcrumbName =
      nameMapping?.[i] === undefined ? title : nameMapping?.[i];

    breadcrumbs.push({
      "@type": "ListItem",
      position: i + 2,
      item: {
        "@id": `${site_details?.allDomainList?.[0]?.url}${slugPart}`,
        name: breadcrumbName,
      },
    });
  }

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };

  if (story_type == STORY_TYPE.LIVE_BLOG.value) {
    liveBlogScriptData = {
      "@context": "https://schema.org",
      "@type": "LiveBlogPosting",
      mainEntityOfPage: `${full_complete_slug ?? ""}`,
      url: `${full_complete_slug ?? ""}`,
      coverageStartTime: `${convertToTimeZone(dateCreated ?? datePublished)}`,
      coverageEndTime: `${convertToTimeZone(lastUpdated ?? datePublished)}`,
      dateModified: `${convertToTimeZone(lastUpdated ?? datePublished)}`,
      headline: `${stripHtmlAndEscape(title ?? "", lang)}`,
      description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
      keywords: (keywords ?? "")
        .split(",")
        .map((keyword: any) => keyword.trim()),
      author: `${author_details?.name || "Republic World"}`,
      inLanguage: `${langBasedContent[lang] ?? "E"}`,
      publisher: {
        "@type": "NewsMediaOrganization",
        name: "Republic World",
      },
      about: {
        "@type": "Event",
        name: title || "",
        startDate: `${convertToTimeZone(dateCreated ?? datePublished)}`,
        description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
        endDate: `${convertToTimeZone(lastUpdated ?? datePublished)}`,
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        eventStatus: "Live",
        image: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(image?.versions?.["16_9"]?.filePath)}`,
        location: {
          "@type": "Place",
          name: "India",
          address: {
            "@type": "PostalAddress",
            name: "India",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Republic World",
          url: `${site_details?.allDomainList?.[0]?.url}`,
        },
        performer: {
          "@type": "Person",
          name: `${author_details?.name || "Organization"}`,
          url: `${site_details?.allDomainList?.[0]?.url}authors/${author_details?.slug ?? "republic"}`,
        },
      },
      liveBlogUpdate: live_blog_details?.slice(0, 50)?.map((update: any) => ({
        "@type": "BlogPosting",
        headline: `${update?.header || ""}`,
        url: `${full_complete_slug}/#${generateSlug(update?.header)}`,
        datePublished: `${convertToTimeZone(update?.createdAt ?? update?.updatedAt)}`,
        articleBody: `${stripHtmlAndEscape(update?.text || "", lang)}`,
        dateModified: `${convertToTimeZone(update?.updatedAt ?? update?.createdAt)}`,
        image: {
          "@type": "ImageObject",
          width: "1200",
          height: "900",
          url: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}tr:w-1920,h-1080,q-100,f-auto/${encodeImageName(image?.versions?.["16_9"]?.filePath)}`,
        },
        publisher: {
          "@type": "NewsMediaOrganization",
          name: "Republic World",
          logo: {
            "@type": "ImageObject",
            url: `${site_details?.siteLogo ?? ""}`,
            width: 600,
            height: 60,
          },
        },
        author: "Republic World",
      })),
    };
  }

  // Image Object Schema
  if (image) {
    imageObjectData = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      author: `${author_details?.name || "Republic World"}`,
      contentLocation: "Noida, Uttar Pradesh",
      contentUrl: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(image?.versions?.["16_9"]?.filePath)}`,
      datePublished: `${convertToTimeZone(datePublished) || ""}`,
      description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
      name: `${image?.versions?.["16_9"]?.title || ""} | Image: ${image?.versions?.["16_9"]?.source}`,
    };
  }

  if (
    story_type == STORY_TYPE.WEB_STORY.value ||
    story_type == STORY_TYPE.GALLERY.value
  ) {
    let urls = [];

    if (story_type == STORY_TYPE.WEB_STORY.value) {
      urls = web_stories_media?.map(
        (webstory: any) =>
          `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(webstory.media)}`,
      );
    } else if (story_type == STORY_TYPE.GALLERY.value) {
      urls = storyData?.gallery_pictures.map(
        (gallery: any) =>
          `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(gallery?.filePath)}`,
      );
    }

    const keywords = web_stories_media?.map(
      (webstory: any) => `${webstory.title}`,
    );

    imageGalleryData = {
      "@context": "https://schema.org",
      "@type": "imageGallery",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${site_details?.allDomainList?.[0]?.url}${slug}`,
        headline: `${stripHtmlAndEscape(title ?? "", lang)}`,
        keywords: keywords,
        description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
      },
      url: `${site_details?.allDomainList?.[0]?.url}${slug}`,
      image: {
        "@type": "ImageObject",
        url: urls,
        width: "1600",
        height: "900",
      },
      dateCreated: `${convertToTimeZone(dateCreated ?? datePublished)}`,
      datePublished: `${convertToTimeZone(lastUpdated) || ""}`,
      dateModified: `${convertToTimeZone(datePublished) || ""}`,
      publisher: {
        "@type": "NewsmediaOrganization",
        name: `${site_details?.allDomainList?.[0]?.siteName}`,
        url: `${site_details?.allDomainList?.[0]?.url}`,
        sameAS: [
          `${site_details?.facebookUrl || ""}`,
          `${site_details?.twitterUrl || ""}`,
          `${site_details?.linkdenUrl || ""}`,
          `${site_details?.instaUrl || ""}`,
          `${site_details?.youtubeUrl || ""}`,
        ],
        logo: {
          "@type": "ImageObject",
          url: "https://www.livemint.com/lm-img/newschemalogo.png",
          width: 600,
          height: 60,
        },
      },
      author: {
        "@type": "Person",
        name: `${author_details?.name ?? "Republic"}`,
      },
    };

    mediaGalleryData = {
      "@context": "http://schema.org",
      "@type": "MediaGallery",
      description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
      mainEntityOfPage: {
        "@type": "ImageGallery",
        associatedMedia: web_stories_media?.map((webstory: any) => ({
          "@type": "ImageObject",
          thumbnailUrl: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(webstory?.media)}`,
          name: `${webstory?.title ?? ""}`,
          description: `${webstory?.title ?? ""}`,
          url: `${site_details?.allDomainList?.[0]?.url}${slug}`,
        })),
      },
    };
  }

  if (
    story_type == STORY_TYPE.VIDEO.value ||
    story_type == STORY_TYPE.SHORT.value ||
    story_type == STORY_TYPE.DEBATE.value ||
    story_type == STORY_TYPE.SHOW.value ||
    storyData?.video?.id
  ) {
    videoObjectData = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${stripHtmlAndEscape(title ?? "", lang)}`,
      description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
      thumbnailUrl: [
        `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(image?.versions?.["16_9"]?.filePath)}`,
      ],
      uploadDate: `${convertToTimeZone(dateCreated ?? datePublished)}`,
      contentUrl: `${jwPlayerVideoUrl(video?.id)}`,
      embedUrl: `${site_details?.allDomainList?.[0]?.url}${slug}`,
      publisher: {
        "@type": "Organization",
        name: "Republic World",
        logo: {
          "@type": "ImageObject",
          url: `${site_details?.siteLogo ?? ""}`,
          width: "",
          height: "",
        },
      },
      duration: `${!video?.duration || video?.duration == 0 ? convertDurationToISO8601(120) : convertDurationToISO8601(video?.duration)}`,
    };

    if (latest_stories.length > 0) {
      videoGallery = {
        "@context": "https://schema.org",
        "@type": "VideoGallery",
        name: `${stripHtmlAndEscape(title ?? "", lang)}`,
        description: `${stripHtmlAndEscape(storyData?.meta_description || title || "", lang)}`,
        url: `${full_complete_slug ?? ""}`,
        creator: {
          "@type": "Organization",
          name: `${author_details?.name || "Republic World"}`,
          url: `${site_details?.allDomainList?.[0]?.url}${author_details?.type === "AUTHOR" ? "authors/" : "anchors/"} ${author_details?.slug ?? "republic"}`,
        },
        video: latest_stories.map((story: any, index: number) => ({
          "@type": "VideoObject",
          name: `${stripHtmlAndEscape(story?.long_heading ?? story?.mid_heading ?? "", lang)}`,
          description: `${stripHtmlAndEscape(story?.meta_description ?? story?.mid_heading ?? "", lang)}`,
          thumbnailUrl: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(story?.images?.versions?.["16_9"]?.filePath)}`,
          uploadDate: `${convertToTimeZone(story?.updatedAt ?? story?.createdAt)}`,
          duration: `${!story?.video?.duration || story?.video?.duration == 0 ? convertDurationToISO8601(120) : convertDurationToISO8601(story?.video?.duration)}`, // Dynamic duration
          contentUrl: `${jwPlayerVideoUrl(story?.video?.id)}`,
          embedUrl: `${site_details?.allDomainList?.[0]?.url}${story?.completeSlug}`,
        })),
      };
    }
  }

  let rightSideBarLiveTv =
    $page?.data?.props?.rightSideBar?.[0]?.groupPin?.find(
      (item: any) => item?.template === "LIVE_TV",
    )?.liveTVInfo?.[0] || null;
  let LiveTvObjectSchema = {};
  if (rightSideBarLiveTv) {
    LiveTvObjectSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${rightSideBarLiveTv?.videoTitle ?? "Republic Live TV"}`,
      description: `${rightSideBarLiveTv?.videoDescription ?? "Watch Republic TV Live"}`,
      keywords: `${site_details.siteName} Live TV, News`,
      mainEntityOfPage: `${full_complete_slug ?? REPUBLIC_URL}`,
      thumbnailUrl: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${encodeImageName(image?.versions?.["16_9"]?.filePath)}`,
      embedUrl: `${site_details?.allDomainList?.[0]?.url}livetv`,
      contentUrl: `${rightSideBarLiveTv?.source_url}`,
      uploadDate: `${convertToTimeZone(lastUpdated) || ""}`,
      publisher: {
        "@type": "Organization",
        name: site_details.siteName,
        logo: {
          "@type": "ImageObject",
          url: `${site_details?.siteLogo ?? ""}`,
          width: "600",
          height: "60",
        },
      },
      publication: {
        "@type": "BroadcastEvent",
        name: `${rightSideBarLiveTv?.videoTitle ?? "Republic Live TV"}`,
        isLiveBroadcast: true,
      },
    };
  }

  let videoObjectScript = generateConditionalJsonLdScript(videoObjectData);
  let videoGalleryScript = generateConditionalJsonLdScript(videoGallery);
  let imageObjectScript = generateConditionalJsonLdScript(imageObjectData);
  let liveBlogScript = generateConditionalJsonLdScript(liveBlogScriptData);
  let newsArticleScript = generateConditionalJsonLdScript(newsArticleSchema);
  let breadcrumbScript = generateConditionalJsonLdScript(breadcrumbListSchema);
  let imageGalleryScript = generateConditionalJsonLdScript(imageGalleryData);
  let mediaGalleryScript = generateConditionalJsonLdScript(mediaGalleryData);
  // let LiveTvObjectScript = generateConditionalJsonLdScript(LiveTvObjectSchema);

  // let isTvShow =  rightSideBarData
</script>

{#if newsArticleScript}
  {@html newsArticleScript}
{/if}
{#if breadcrumbScript}
  {@html breadcrumbScript}
{/if}
{#if liveBlogScript}
  {@html liveBlogScript}
{/if}
{#if imageObjectScript}
  {@html imageObjectScript}
{/if}
{#if imageGalleryScript}
  {@html imageGalleryScript}
{/if}
{#if videoObjectScript}
  {@html videoObjectScript}
{/if}
<!-- {#if videoGalleryScript}
  {@html videoGalleryScript}
{/if} -->
<!-- {#if mediaGalleryScript}
  {@html mediaGalleryScript}
{/if} -->
<!-- {#if LiveTvObjectScript}
  {@html LiveTvObjectScript}
{/if} -->
