<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { stripHtmlAndEscape } from "../utils/utils";

	export let pageType = "";
	export let datePublished;
	export let lastUpdated;
	export let facebookAuthorPage = "";
	export let facebookPage = "";
	export let image;
	export let squareImage;
	export let metadescription;
	export let ogLanguage;
	export let pageTitle;
	export let siteTitle;
	export let url;
	export let lang = "E";
	export let keywords = "";
	export let video_image: any = {};
	export let site_details: any = {};
	export let storyData: any = {};

	let rightSideBarLiveTv =
		$page?.data?.props?.rightSideBar?.[0]?.groupPin?.find(
			(item: any) => item?.template === "LIVE_TV",
		)?.liveTVInfo?.[0] || null;
</script>

<svelte:head>
	{#if !browser}
		<meta
			property="og:site_name"
			content={site_details?.allDomainList?.[0]?.name ?? ""}
		>
		<meta property="og:locale" content={ogLanguage} >
		<meta property="og:url" content={url} >
		<meta
			property="og:type"
			content={pageType === "Story" ? "article" : "website"}
		>
		<meta property="og:title" content={pageTitle} >

		<!-- <meta
		name="description"
		content={stripHtmlAndEscape(metadescription) || ""}
	/> -->

		<meta
			property="og:description"
			content={stripHtmlAndEscape(metadescription, lang)}
		>
		<!-- <meta
			property="og:updated_time"
			content={convertToTimeZone(lastUpdated) || ""}
		/> -->

		{#if image}
			<meta
				property="og:image"
				content={image?.url || site_details?.notificationIcon}
			>
			<!-- <meta
				property="og:logo"
				content={image?.url || site_details?.notificationIcon}
			> -->
			<meta property="og:image:width" content="1280" >
			<meta property="og:image:height" content="720" >
			<meta property="og:image:alt" content={image?.alt} >
		{/if}
		<!-- {#if squareImage}
		<meta
			property="og:image"
			content={squareImage?.url || site_details?.notificationIcon}
		/>
		<meta property="og:image:width" content="400" />
		<meta property="og:image:height" content="400" />
		<meta property="og:image:alt" content={squareImage.alt} />
	{/if} -->
		{#if pageType === "Story"}
			<!-- <meta property="article:publisher" content={facebookPage} />
			<meta property="article:author" content={facebookAuthorPage} />
			<meta
				property="article:published_time"
				content={convertToTimeZone(datePublished)}
			/>
			<meta
				property="article:modified_time"
				content={convertToTimeZone(lastUpdated)}
			/> -->
			{#if storyData?.tagsData?.length}
				{#each storyData?.tagsData as tag}
					<meta property="article:tag" content={tag?.name} >
				{/each}
			{/if}
		{/if}

		{#if pageType === "Story" && video_image && video_image?.id}
			<meta
				property="og:video"
				content={`https://cdn.jwplayer.com/videos/${video_image?.id}.mp4`}
			>

			<meta property="og:video:type" content="video/mp4" >
			<meta property="og:video:width" content="1280" >
			<meta property="og:video:height" content="720" >
		{:else if pageType === "Story" && rightSideBarLiveTv}
			<!-- <meta
				property="og:video"
				content={rightSideBarLiveTv?.source_url || ""}
			/>
			<meta property="og:video:type" content="video/mp4" />
			<meta property="og:video:width" content="1280" />
			<meta property="og:video:height" content="720" /> -->
		{/if}
	{/if}
</svelte:head>
