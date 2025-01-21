<script lang="ts">
  import {
    convertToTimeZone,
    generateJsonLdScript,
    stripHtmlAndEscape,
  } from "../utils/utils";
  import { page } from "$app/stores";

  export let title;
  export let description;
  export let keywords;
  export let lang;
  export let lastUpdated;
  export let site_details: any = {};
  export let siteNavigation: any = [];
  export let pageType: any = "";

  // New in Language
  const langBasedContent: any = {
    E: "en-IN",
    RB: "en-IN",
    H: "hi",
  };

  const availableLanguage: any = {
    E: "English",
    RB: "English",
    H: "Hindi",
  };

  const addressList: any = {
    E: {
      "@type": "PostalAddress",
      streetAddress:
        "FC6V+7RF, Sector 158, Noida, Gulavali, Uttar Pradesh 201310, India",
      postalCode: "201310",
      addressLocality: "Noida",
      addressRegion: "UP",
      addressCountry: "IN",
    },
    H: {
      "@type": "PostalAddress",
      streetAddress:
        "FC6V+7RF, Sector 158, Noida, Gulavali, Uttar Pradesh 201310, India",
      postalCode: "201310",
      addressLocality: "नोएडा",
      addressRegion: "यूपी",
      addressCountry: "भारत",
    },
    RB: {
      "@type": "PostalAddress",
      streetAddress:
        "FC6V+7RF, Sector 158, Noida, Gulavali, Uttar Pradesh 201310, India",
      postalCode: "201310",
      addressLocality: "Noida",
      addressRegion: "UP",
      addressCountry: "IN",
    },
    KA: {
      "@type": "PostalAddress",
      streetAddress:
        "13/3 Lal Bagh Main Road, K. S. Garden, Vinobha Nagar, Sudhama Nagar, Bengaluru, Karnataka 560027, India",
      postalCode: "560027",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    B: {
      "@type": "PostalAddress",
      streetAddress:
        "DLF 1, Tower C, 1st Floor, Commercial Block, 8 Major Arterial Road, Block AF, Newtown Kolkata - 700156, India",
      postalCode: "v",
      addressLocality: "Newtown Kolkata",
      addressRegion: "Kolkata",
      addressCountry: "IN",
    },
  };

  // News Media Organisation schema
  const newsMediaOrganisation = {
    "@type": "NewsMediaOrganization",
    name: `${site_details?.allDomainList?.[0]?.name || ""}`,
    url: `${site_details?.allDomainList?.[0]?.url || ""}`,
    address: addressList[lang ?? "E"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 – 0120 451 2100",
      contactType: "Customer Service",
      areaServed: "IN",
      availableLanguage: availableLanguage[lang ?? "E"],
      hoursAvailable: {
        opens: "09:00",
        closes: "18:00",
      },
    },
    sameAs: [
      `${site_details?.facebookUrl || ""}`,
      `${site_details?.twitterUrl || ""}`,
      `${site_details?.linkdenUrl || ""}`,
      `${site_details?.instaUrl || ""}`,
      `${site_details?.youtubeUrl || ""}`,
    ],
  };

  const newsMediaOrganisationSchema = {
    "@context": "https://schema.org",
    ...newsMediaOrganisation,
  };

  // Site Navigation
  let siteNavigationSchema = {};
  if (siteNavigation.length > 0) {
    siteNavigationSchema = {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: [
        ...siteNavigation
          .filter((item: any) => item?.status)
          .map((item: any) => item?.frontend_name),
        "Quick",
        "Shorts",
      ],
      url: [
        ...siteNavigation
          .filter((item: any) => item?.status)
          .map(
            (item: any) =>
              `${site_details?.allDomainList?.[0]?.url}${item?.completeSlug}`,
          ),
        `${site_details?.allDomainList?.[0]?.url}quick`,
        `${site_details?.allDomainList?.[0]?.url}shorts`,
      ],
    };
  }



  const name = stripHtmlAndEscape(title ?? "", lang);
  let baseURL = site_details?.allDomainList?.[0]?.url;
  // WebPage
  const webPageSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    name: `${name}`,
    description: `${stripHtmlAndEscape(description ?? "", lang)}`,
    keywords: `${keywords}`,
    url: `${baseURL + $page.url.pathname?.slice(1)}`,
    Specialty: "https://schema.org/NewsMediaOrganization",
    mainContentOfPage: "News",
    lastReviewed: `${convertToTimeZone(lastUpdated)}`,
  };

  const newsMediaOrganisationScript = generateJsonLdScript(
    newsMediaOrganisationSchema,
  );

  // Web Site schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site_details?.allDomainList?.[0]?.name || ""}`,
    url: `${site_details?.allDomainList?.[0]?.url || ""}`,
  };
  const webSiteScript = generateJsonLdScript(webSiteSchema);

  const siteNavigationScript = generateJsonLdScript(siteNavigationSchema);
  const webPageScript = generateJsonLdScript(webPageSchema);
</script>


{@html webPageScript}
{@html newsMediaOrganisationScript}
{#if $page.url.pathname == "/" || pageType === "Category"}
  {@html webSiteScript}
{/if}
{@html siteNavigationScript}

