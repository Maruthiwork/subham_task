<script >
	// @ts-nocheck
	import { page } from "$app/stores";
	import website from "../config/website";
	import { EnvironmentConfig } from "../utils/environmentConfig";
	import OpenGraph from "./OpenGraph.svelte";
	import SchemaOrg from "./SchemaOrg.svelte";
	import Twitter from "./Twitter.svelte";
	import {
		convertToTimeZone,
		keywordsSanitized,
		stripHtmlAndEscape,
	} from "../utils/utils";
	import { makeAmpUrl, makeCanonicalUrl } from "$lib/utils";
	import { browser } from "$app/environment";

	let {
		author,
		entity,
		facebookAuthorPage,
		facebookPage,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		twitterUsername,
	} = website;

	export let pageType = "";
	export let breadcrumbs = [];
	export let latest_stories = [];
	export let siteNavigation = [];
	export let entityMeta = null;
	export let lastUpdated = "";
	export let datePublished = "";
	export let dateCreated = "";
	export let ogSquareImageSrc = "";
	export let ogImageSrc = "";
	export let twitterImageSrc = "";
	export let keywords = "";
	export let featuredImage = "";
	export let ogImage = "";
	export let ogSquareImage = "";
	export let twitterImage = "";
	export let featuredImageSrc = "";
	export let metadescription = "";
	export let slug = "";
	export let timeToRead = "0";
	export let title = "";
	export let video_image = "";
	export let lang = "E";
	export let site_details = {};
	export let story_author = "";
	export let image_file_path = "";
	export let category = {};
	export let storyData = {};
	export let anchorAuthorData = {};
	export let categoryStories = [];
	export let web_stories_media = [];
	export let faqs = [];
	export let canonicalUrl = "";
	export let isAmp = false;
	export let pathname = "";

	keywords = keywordsSanitized(keywords);
	let customCanonicalUrl = canonicalUrl;
	let defaultAlt = ( site_details?.siteIcon ?? "Republic TV" ) + ' - Latest News and Updates';

	if (pageType === "Story") {
		title = title || storyData?.long_heading || "";
		metadescription = metadescription || storyData?.long_heading || "";
		story_author = storyData?.authorDetail?.name;
		facebookAuthorPage = story_author;

		defaultAlt = storyData?.images?.versions?.["16_9"]?.alt || defaultAlt;


		if (storyData.story_type === "VIDEO") {
			video_image = storyData.video;
		}
		
	}

	const langBasedContent = {
		E: "en-IN",
		H: "hi",
		RB: "en-IN",
	};

	featuredImage = {
		url: featuredImageSrc,
		alt: defaultAlt,
		width: 672,
		height: 448,
		caption: "Home page",
	};
	ogImage = {
		url: ogImageSrc,
		alt: defaultAlt,
	};
	ogSquareImage = {
		url: ogSquareImageSrc,
		alt: defaultAlt,
	};
	twitterImage = {
		url: twitterImageSrc,
		alt: defaultAlt,
	};
	let url = `${siteUrl}${slug}`;
	let pageTitle = `${title}`;
	let openGraphProps = {
		pageType,
		datePublished,
		lang,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...(pageType === "Story"
			? { datePublished, lastUpdated, facebookPage, facebookAuthorPage }
			: {}),
		keywords,
		video_image,
		site_details,
		storyData
	};
	let schemaOrgProps = {
		pageType,
		author,
		breadcrumbs,
		datePublished,
		entity,
		lastUpdated,
		entityMeta,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt: siteShortTitle,
		siteUrl,
		title: pageTitle,
		url,
		facebookPage,
		twitterUsername,
		keywords,
		site_details,
		lang,
		category,
		slug,
		categoryStories,
		storyData,
		anchorAuthorData,
		web_stories_media,
		pathname,
		dateCreated,
		latest_stories,
		faqs,
		siteNavigation,
	};
	let twitterProps = {
		pageType,
		author,
		lang,
		twitterUsername,
		image: twitterImage,
		timeToRead,
		site_details,
		description: metadescription,
	};

	function rssLink(slug, incremental = false, prefix = "") {
		// Now split the slug and get the first part
		if (!slug) return [];

		let allSlugs = slug.split("/");
		// now generate incremental slugs
		let incrementalSlugs = [];
		if (incremental) {
			for (let i = 0; i < allSlugs.length; i++) {
				incrementalSlugs.push(
					`${prefix}rss/${allSlugs.slice(0, i + 1).join("/")}.xml`,
				);
			}
		} else {
			incrementalSlugs.push(`${prefix}rss/${slug}.xml`);
		}

		return incrementalSlugs;
	}
</script>

<svelte:head>
	{#if !browser}
		<title>{pageTitle} | {site_details?.siteName}</title>
		<meta
			name="description"
			content={stripHtmlAndEscape(metadescription, lang)}
		>
		<meta name="keywords" content={keywords || ""} >
		<meta name="news_keywords" content={keywords || ""} >

		<meta
			name="google-site-verification"
			content={site_details?.googleSiteVerification}
		>

		<meta name="gaCode" content={site_details?.gaCode} />
		<meta name="googlebot" content="index, follow"/>
		<meta name="msvalidate.01" content={site_details?.bingMsID ?? ""} />
		<meta name="language" CONTENT={langBasedContent?.[lang]} />
		<meta name="dc.language" CONTENT={langBasedContent?.[lang]} />
		<meta name="DC.format" content="text/html" />
		<meta
			name="DC.rights"
			content={`${site_details?.allDomainList?.[0]?.url}privacy-policy/`}
		>
		<meta
			name="robots"
	        content="index, follow"
		>
		<meta name="robots" content="max-image-preview:large"/>
		<!-- <meta
			name="dc.source"
			CONTENT={site_details?.allDomainList?.[0]?.url ?? ""}
		/>
		<meta
			name="dc.title"
			content={site_details?.allDomainList?.[0]?.name ??
				"Republic World Digital"}
		/>
		<meta name="dc.keywords" content={keywords ?? ""} />
		<meta
			name="dc.subject"
			content={site_details?.allDomainList?.[0]?.name ??
				"Republic World Digital"}
		/>
		<meta
			name="dc.description"
			content={stripHtmlAndEscape(metadescription, lang) ?? ""}
		/>
		<meta
			name="dc.date"
			scheme="W3CDTF"
			content={convertToTimeZone(dateCreated) || ""}
		/> -->

		<!-- <meta name="external" content="true" /> -->
		<!-- <meta name="MobileOptimized" content="320" /> -->
		<!-- <meta
			name="DC.creator"
			content={site_details?.allDomainList?.[0]?.name ??
				"Republic World Digital"}
		/> -->
		<!-- <meta
			name="DC.contributor"
			content={site_details?.allDomainList?.[0]?.name ??
				"Republic World Digital"}
		/> -->
		<!-- <meta
			name="DC.contributor"
			content={site_details?.allDomainList?.[0]?.name ??
				"Republic World Digital"}
		/> -->
		<meta name="mobile-web-app-capable" content="yes" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=1">
		<meta
			name="apple-itunes-app"
			content={`app-id=${EnvironmentConfig.VITE_APPLE_ID ?? ""}`}
		>
		<meta
			name="apple-mobile-web-app-capable"
			content={`${EnvironmentConfig.VITE_APPLE_ID ?? "Yes"}`}
		>
		<meta
			name="application-name"
			content={`${EnvironmentConfig.VITE_REPUBLIC_URL}`}
		>

		<meta
			property="fb:admins"
			content={site_details?.fb_admins || "Republic World Digital"}
		>
		<meta
			property="fb:app_id"
			content={`${site_details?.fb_app_id || ""}`}
		>
		<meta
			property="fb:pages"
			content={`${site_details?.fb_pages || ""}`}
		>

		<!-- <meta
			name="msapplication-config"
			content="https://www.devdiscourse.com/AdminFiles/Favicon/browserconfig.xml"
		/>
		<meta name="msapplication-TileColor" content="#ffffff" />
		<meta
			name="msapplication-tooltip"
			content={site_details?.allDomainList?.[0]?.name ??
				"Republic World Digital"}
		/>
		<meta name="msapplication-window" content="width=1280;height=900" />
		<meta
			name="yandex-verification"
			content={EnvironmentConfig?.VITE_YANDEX_ID ?? ""}
		/> -->


		<meta
			itemprop="startDate"
			content={convertToTimeZone(datePublished) || ""}
		>
		<!-- <meta
			itemprop="endDate"
			property="article:modified_time"
			content={convertToTimeZone(lastUpdated) || ""}
		/> -->
		<meta itemprop="name" content={keywords} >
		<meta
			itemprop="dateModified"
			content={convertToTimeZone(lastUpdated) || ""}
		>
		<meta
			itemprop="datePublished"
			content={convertToTimeZone(datePublished) || ""}
		>
		<!-- <meta
			itemprop="commentTime"
			content={convertToTimeZone(datePublished) || ""}
		/>
		<meta
			itemprop="dateCreated"
			content={convertToTimeZone(dateCreated) || ""}
		/>
		<meta
			itemprop="datePosted"
			content={convertToTimeZone(datePublished) || ""}
		/>
		<meta
			itemprop="uploadDate"
			content={convertToTimeZone(datePublished) || ""}
		/> -->
		<meta
			itemprop="thumbnailUrl"
			content={twitterImageSrc ?? ""}
		/>
		
		{#if site_details?.facebookVerification}
			<meta
				name="facebook-domain-verification"
				content={site_details?.facebookVerification ?? ""}
			/>
		{/if}

		{#if pageType === "Story"}
			<!-- Meta For Live Blog  -->
			{#if storyData?.story_type === "LIVE-BLOG"}
				<meta itemprop="eventStatus" content="Live" >
			{/if}

			<!-- <meta
				name="article:author"
				content={story_author ?? "Republic World"}
			/> -->
			<!-- <meta
				name="audio_url"
				content={site_details?.allDomainList?.[0]?.url + slug ?? ""}
			/> -->
			<!-- <meta property="category" content="News" /> -->
			<!-- <meta
				name="msapplication-task"
				content={`name=News;action-uri=${
					site_details?.allDomainList?.[0]?.url + slug ?? ""
				};icon-uri=${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${image_file_path}`}
			/> -->
		{/if}

		{#if $page.url.pathname == "/" }
				<meta http-equiv="refresh" content="600" />
		{/if}

		{#if $page.url.pathname.split("/")[1] == "initiatives"}
				<meta property="cr:sponsored"/>
		{/if}
				
		{#if $page.url.pathname.split("/")[1] == "quick" }
				<!-- Do noth -->
		{:else}
			<link
				rel="canonical"
				href={makeCanonicalUrl(
					site_details?.allDomainList?.[0]?.url,
					pathname,
					storyData
				)}
			>
		{/if}

		{#if !isAmp && (pageType === "Story" || pageType === "Category" || pageType === "AuthorAnchor" || pageType === "Anchor" || pageType === "Author" || pathname === "" || pathname.split("/")[1] == "topics") && !(pageType === "Story" && pathname.split("/")[1] == "shorts") && !(pageType === "Story" && $page.url.pathname.split("/")[1] == "quick")}
			<link
				rel="amphtml"
				href={makeAmpUrl(
					site_details?.allDomainList?.[0]?.url,
					pathname,
				)}
			>
		{/if}
	{/if}

	<!-- This completely depen on pagetype -->

	{#if pageType === "Category"}
		<!-- Generata All altenate rss link -->
		{#each rssLink(slug, true) as rssUrl}
			<link
				rel="alternate"
				type="application/rss+xml"
				href={`${site_details?.allDomainList?.[0]?.url}${rssUrl}`}
			>
		{/each}
	{:else if pageType === "Story"}
		{#each rssLink(storyData?.categoryDetail ? storyData?.categoryDetail?.slug : storyData?.categoryData?.slug, false) as rssUrl}
			<link
				rel="alternate"
				type="application/rss+xml"
				href={`${site_details?.allDomainList?.[0]?.url}${rssUrl}`}
			>
		{/each}
	{:else if pathname?.split("/")[1] == "topics"}
		{#each rssLink(pathname?.slice(1), false) as rssUrl}
			<link
				rel="alternate"
				type="application/rss+xml"
				href={`${site_details?.allDomainList?.[0]?.url}${rssUrl}`}
			>
		{/each}
	{/if}
</svelte:head>

<Twitter {...twitterProps} />
<OpenGraph {...openGraphProps} />

<SchemaOrg {...schemaOrgProps} />
