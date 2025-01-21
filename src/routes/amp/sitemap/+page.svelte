<script lang="ts">
    import SEO from "$lib/components/SEO/index.svelte";
    export let data: any;
    const { sitemapList,envDetails,language,seoSiteMapData,canonicalUrl,deviceType,siteNavigation } = data?.props;

    const currentDate = new Date().toISOString();
    let breadcrumbs = [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "RSS Feeds",
            url: "/sitemap",
        },
    ];

</script>

<SEO
    lang={language}
    pageType={"Category"}
    {breadcrumbs}
    {canonicalUrl}
    pathname={'/sitemap'}
    slug={breadcrumbs?.[1].url}
    title={seoSiteMapData.title}
    keywords={seoSiteMapData.keywords}
    datePublished={currentDate}
    lastUpdated={currentDate}
    metadescription={seoSiteMapData.description}
    timeToRead={""}
    featuredImage={envDetails?.siteLogo}
    ogImage={envDetails?.siteLogo}
    ogSquareImage={envDetails?.siteLogo}
    twitterImage={envDetails?.siteLogo}
    ogSquareImageSrc={envDetails?.siteLogo}
    ogImageSrc={envDetails?.siteLogo}
    twitterImageSrc={envDetails?.siteLogo}
    featuredImageSrc={envDetails?.siteLogo}
    site_details={envDetails}
    dateCreated={currentDate}
    {siteNavigation}
/>
<div class="contentWrapper flex flex-col gap-5">
    <div class="border border-gray-200 px-4 py-4 mb-8 columns-2 desktop:columns-4">
        {#if sitemapList}
            <div class="grid gap-4">
                {#each sitemapList as item}
                    <div class="sitemapList">
                        <a href={item?.l1?.completeSlug}
                            ><h4>{item?.l1?.name}</h4></a
                        >
                        <ul>
                            {#each item?.child as value, index (index)}
                                <li>
                                    <a
                                        href={`${value?.completeSlug}`}
                                        data-sveltekit-reload
                                    >
                                        {value?.name}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .sitemapList h4 {
    font-size: var(--font20);
    line-height: 1;
    font-weight: 900;
    margin-bottom: 20px;
}
.sitemapList ul li a {
    font-size: var(--font16);
    line-height: 1.2;
    font-weight: 500;
    padding: 6px 0;
    color: var(--black);
    display: inline-block;
}
</style>