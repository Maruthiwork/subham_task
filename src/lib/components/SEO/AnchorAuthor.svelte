<script lang="ts">
  import { SOCIAL_PLATFORM } from "../common/Footer/Constants";
  import type { SocialPlatformType } from "../common/StoryCard/Types";
  import { EnvironmentConfig } from "../utils/environmentConfig";
  import { generateConditionalJsonLdScript } from "../utils/utils";

  const SOCIAL_PLATFORM_DETAILS: SocialPlatformType = SOCIAL_PLATFORM;

  export let anchorAuthorData: any = {};
  export let breadcrumbs = {};
  export let slug = "";
  export let title = "";
  export let lang = "E";
  export let pathname = "";
  export let site_details: any = {};
  let baseURL = site_details?.allDomainList?.[0]?.url;
  let full_complete_slug = baseURL + slug.slice(1);

  const parts: any = slug ? slug.split("/") : "";

  const nameMapping = [
    "",
    anchorAuthorData?.type === "AUTHOR" ? "Author" : "Anchor",
    title,
  ].filter((value) => value !== null && value !== undefined);

  const breadcrumbsList = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": `${baseURL}`,
        name: "Home",
      },
    },
  ];

  let currentPosition = 2;

  for (let i = 1; i < parts?.length && i < 4; i++) {
    const slugPart = parts
      ?.slice(0, i + 1)
      .join("/")
      .slice(1);

    const breadcrumbName =
      nameMapping?.[i] === undefined ? "" : nameMapping?.[i];

    breadcrumbsList.push({
      "@type": "ListItem",
      position: currentPosition,
      item: {
        "@id": `${site_details?.allDomainList?.[0]?.url}${slugPart}`,
        name: breadcrumbName,
      },
    });

    currentPosition++;
  }

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbsList,
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${title ?? "republic"}`,
    description: `${anchorAuthorData?.description ?? "republic world anchor or author"}`,
    url: `${full_complete_slug ?? "republic"}`,
    mainEntity : {
      "@type": "Person",
      name: `${title ?? "republic"}`,
      alternateName: `${title ?? "republic"}`,
      address: {
        "@type": "PostalAddress",
        "streetAddress": "FC6V+7RF Sector 158",
        "addressLocality": "Noida",
        "addressRegion": "Gulavali, Uttar Pradesh 201310",
        "postalCode": "201310",
        "addressCountry": "IN"
      },
      image: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${anchorAuthorData?.image?.versions?.["16_9"]?.filePath}`,
      jobTitle: `${anchorAuthorData?.designation ?? "anchor"}`,
      worksFor: {
        "@type": "Organization",
        name: `${site_details?.allDomainList?.[0]?.name ?? ""}`,
        url: `${site_details?.allDomainList?.[0]?.url ?? ""}`,
      },
      sameAs: [
        `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[1].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
        `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[2].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
        `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[3].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
      ],
      url: `${full_complete_slug ?? "republic"}`,
      description: `${anchorAuthorData?.description ?? "republic world anchor or author"}`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbsList,
    },
    about: {
      "@type": "Person",
      name: `${title ?? "republic"}`,
      image: `${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${anchorAuthorData?.image?.versions?.["16_9"]?.filePath}`,
      jobTitle: `${anchorAuthorData?.designation ?? "anchor"}`,
      worksFor: {
        "@type": "Organization",
        name: `${site_details?.allDomainList?.[0]?.name ?? ""}`,
        url: `${site_details?.allDomainList?.[0]?.url ?? ""}`,
      },
      sameAs: [
        `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[1].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
        `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[2].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
        `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[3].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
      ],
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${title ?? "republic"}`,
    url: `${full_complete_slug ?? "republic"}`,
    sameAs: `${SOCIAL_PLATFORM_DETAILS?.[site_details?.language]?.[4].url ?? EnvironmentConfig.VITE_TWITTER_USER_NAME}`,
    jobTitle: `${anchorAuthorData?.designation ?? "anchor"}`,
  };

  let breadCrumbListObjectScript =
    generateConditionalJsonLdScript(breadcrumbListSchema);
  let personObjectScript = generateConditionalJsonLdScript(personSchema);
  let profilePageObjectScript =
    generateConditionalJsonLdScript(profilePageSchema);
</script>

{#if breadCrumbListObjectScript}
  {@html breadCrumbListObjectScript}
{/if}
{#if personObjectScript}
  {@html personObjectScript}
{/if}
{#if profilePageObjectScript}
  {@html profilePageObjectScript}
{/if}
