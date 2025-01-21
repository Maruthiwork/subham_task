<script lang="ts">
	import AnchorAuthor from "./AnchorAuthor.svelte";
	import CategorySchema from "./CategorySchema.svelte";
	import CommonSchema from "./CommonSchema.svelte";
	import StorySchema from "./StorySchema.svelte";

	export let pageType = "";
	export let author;

	/**
	 * @type {{ name: string; slug: string }[]}
	 */
	export let breadcrumbs;
	export let slug = "";
	export let datePublished;
	export let dateCreated = "";
	export let latest_stories: any = [];
	export let entity;
	export let lastUpdated;
	export let featuredImage;
	export let metadescription;
	export let siteLanguage;
	export let siteTitle;
	export let siteTitleAlt;
	/**
	 * @type {any}
	 */
	export let siteUrl;
	export let title;
	export let url;
	export let facebookPage;
	export let twitterUsername;
	export let site_details = {};
	export let keywords;
	export let lang = "E";
	export let storyData: any = {};
	export let categoryStories: any = [];
	export let web_stories_media: any = [];
	export let siteNavigation: any = [];
	export let faqs: any = [];
	export let category: any = {};
	export let anchorAuthorData: any = {};
	export let pathname: any = "";

	/**
	 * @type {{ url: string; faviconWidth: number; faviconHeight: number } | null}
	 */
	if (pageType === "Story") {
		lastUpdated = storyData?.updatedAt;
	}

	let commonSchema = {
		site_details,
		title,
		description: metadescription,
		keywords,
		lang,
		lastUpdated,
		siteNavigation,
		pageType,
	};
</script>

<CommonSchema {...commonSchema} />
<!-- Page Type Schema -->
{#if pageType === "Story"}
	<StorySchema
		{lang}
		{site_details}
		{title}
		{storyData}
		description={metadescription}
		lastUpdated={storyData?.updatedAt}
		{datePublished}
		{keywords}
		{slug}
		story_category_data={storyData?.categoryDetail
			? storyData?.categoryDetail
			: storyData?.categoryData}
		author_details={storyData?.authorDetail}
		story_l3category_data={storyData?.l3categoryDetail
			? storyData?.l3categoryDetail
			: storyData?.l3categoryData}
		story_subcategory_data={storyData?.subCategoryDetail
			? storyData?.subCategoryDetail
			: storyData?.subcategoryData}
		story_type={storyData?.story_type}
		dateCreated={storyData?.createdAt ?? storyData?.updatedAt}
		live_blog_details={storyData?.live_blog_texts ?? []}
		image={storyData?.images}
		video={storyData?.video}
		{web_stories_media}
		{latest_stories}
	/>
{:else if pageType === "Category"}
	<CategorySchema
		{lang}
		{category}
		{site_details}
		{categoryStories}
		{dateCreated}
		{lastUpdated}
		{datePublished}
		{faqs}
	/>
{:else if pageType == "AuthorAnchor"}
	<AnchorAuthor
		{anchorAuthorData}
		{breadcrumbs}
		slug={pathname}
		{lang}
		{title}
		{site_details}
	/>
{/if}
