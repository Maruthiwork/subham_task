<script lang="ts">
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import { convertDurationToISO8601, convertToTimeZone, generateJsonLdScript, jwPlayerVideoUrl, stripHtmlAndEscape } from "../utils/utils";

  export let category;
  export let lang = "E";
  export let site_details;
  export let categoryStories;
  export let faqs:any = [];
  export let dateCreated = '';
  export let lastUpdated = '';
  export let datePublished = '';
  let baseURL = site_details?.allDomainList?.[0]?.url;
  const REPUBLIC_URL = site_details?.allDomainList?.[0]?.url;
  let full_complete_slug = baseURL + category?.completeSlug;





  let breadcrumbSchema = (() => {
    let segments = category?.completeSlug?.split("/")?.filter(Boolean);

    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${REPUBLIC_URL}`,
          name: "Home",
        },
      },
    ];

    for (let i = 0; i < segments?.length; i++) {
      const slugPart = segments?.slice(0, i + 1)?.join("/");
      const breadcrumbName =
        segments?.[i]?.charAt(0)?.toUpperCase() + segments?.[i]?.slice(1);

      breadcrumbs.push({
        "@type": "ListItem",
        position: i + 2,
        item: {
          "@id": `${REPUBLIC_URL}${slugPart}`,
          name: breadcrumbName,
        },
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    };
  })();

  let breadcrumbScript = generateJsonLdScript(breadcrumbSchema);

  let itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${full_complete_slug ?? REPUBLIC_URL}`,
    },
    url: `${full_complete_slug ?? REPUBLIC_URL}`,
    numberOfItems: `${categoryStories?.length.toString()}`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: categoryStories?.map((story: any, index: number) => ({
      "@type": "ListItem",
      position: `${(index + 1).toString()}`,
      url: `${full_complete_slug ?? ''}`,
      name: `${stripHtmlAndEscape(story?.long_heading ?? "", lang)}`,
      description: `${stripHtmlAndEscape(story?.meta_description || story?.long_heading, lang)}`,
    })),
  };

  let itemListScript = generateJsonLdScript(itemListSchema);

  const videoStory = categoryStories?.find((story: any) => story?.story_type === "VIDEO");


  let videoObjectScript = "";

  if (category?.completeSlug === "livetv") {
    const videoObjectSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${category?.meta_title ?? 'Republic Live TV'}`,
      description: `${category?.meta_description ?? 'Watch Republic TV Live'}`,
      keywords: `${category?.meta_keywords ?? 'Republic TV, Live TV, News'}`,
      mainEntityOfPage: `${full_complete_slug ?? REPUBLIC_URL}`,
      duration: `${!videoStory?.duration || videoStory?.duration == 0 ? convertDurationToISO8601(86400) : convertDurationToISO8601(videoStory?.duration)}`,
      thumbnailUrl:`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${videoStory?.images?.versions?.["16_9"]?.filePath}`,
      embedUrl: `${full_complete_slug ?? REPUBLIC_URL}`,
      contentUrl: `${jwPlayerVideoUrl(videoStory?.video?.id)}`,
      uploadDate: `${convertToTimeZone(videoStory?.updatedAt ?? videoStory?.createdAt)}`,
      publisher: {
        "@type": "Organization",
        name: "Republic World",
        logo: {
          "@type": "ImageObject",
          url: `${site_details?.siteLogo ?? ""}`,
          width: "600",
          height: "60",
        },
      },
      publication: {
        "@type": "BroadcastEvent",
        isLiveBroadcast: true,
        startDate:  `${convertToTimeZone(dateCreated ?? datePublished)}`,
        endDate: `${convertToTimeZone(lastUpdated)}`,
      },
    };

    videoObjectScript = generateJsonLdScript(videoObjectSchema);
  }

  let faqScript = "";
  if(faqs.length > 0){
    let faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq?.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq?.value,
        },
      })),
    };

    faqScript = generateJsonLdScript(faqSchema);
  }
  
  






</script>

{@html breadcrumbScript}
{@html itemListScript}
{@html videoObjectScript}
{@html faqScript}
