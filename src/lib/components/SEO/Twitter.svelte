<script>
	// @ts-nocheck
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { EnvironmentConfig } from "../utils/environmentConfig";
	import { stripHtmlAndEscape } from "../utils/utils";

	export let pageType = "Story";
	export let author;
	export let twitterUsername;
	export let image;
	export let lang = "E";
	export let timeToRead = "0";
	export let site_details = {};
	export let description = "";

	/*
	 * When there is an equivalent og tag present, Twitter takes that so check OpenGraph before
	 * adding additional tags, unless you want to override OpenGraph.
	 */
</script>

<svelte:head>
	{#if !browser}
		<meta name="twitter:card" content={stripHtmlAndEscape(description, lang)} >
		{#if image}
			<!-- NotificationIcon is the website's logo and site_details is envConfig -->
			<meta
				name="twitter:image"
				content={image?.url || site_details?.notificationIcon}
			>
		{/if}
		{#if twitterUsername}
			<meta name="twitter:creator" content={site_details?.twitterUrl} >
			<meta name="twitter:site" content={site_details?.twitterUrl}  >
		{/if}
		<!-- <meta name="twitter:label1" content="Written by" > -->
		<!-- <meta name="twitter:data1" content={author} > -->
		<!-- <meta
			name="twitter:app:id:iphone"
			content={`${EnvironmentConfig.VITE_APPLE_ID ?? ""}`}
		> -->
		<!-- <meta
			property="twitter:domain"
			content={site_details?.allDomainList?.[0]?.url || ""}
		>
		<meta
			name="twitter:app:name:googleplay"
			content={site_details?.allDomainList?.[0]?.name ?? ""}
		>
		<meta
			name="twitter:app:name:ipad"
			content={site_details?.allDomainList?.[0]?.name ?? ""}
		>
		<meta
			name="twitter:app:name:iphone"
			content={site_details?.allDomainList?.[0]?.name ?? ""}
		> -->
		<meta name="twitter:description" content={stripHtmlAndEscape(description, lang) || ""} >
		<meta
			name="twitter:title"
			content={site_details?.allDomainList?.[0]?.name ?? ""}
		>
		<meta
			name="tweetmeme-title"
			content={stripHtmlAndEscape(description, lang) || ""}
		>
		<meta
			name="twitter:url"
			content={$page.url.pathname}
		>
		<meta name="twitter:image:alt" content={image?.alt ?? ""} >
		{#if pageType === "Story" && timeToRead > 0}
			<meta name="twitter:label2" content="Est. reading time" >
			<meta
				name="twitter:data2"
				content={timeToRead !== 1
					? `${timeToRead} minutes`
					: "1 minute"}
			>
		{/if}
	{/if}
</svelte:head>
