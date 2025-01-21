<script lang="ts">
    import rightArrow from "$lib/assets/images/right-arrow.svg";
    import rssIcon from "$lib/assets/images/rssreader.webp";
    import SEO from "$lib/components/SEO/index.svelte";
    export let data: any;
    const { rssList,seoRssData,envDetails,language,canonicalUrl,siteNavigation } = data?.props;

    const rssUrl = (url: string) => {
        if (url) {
            return `/rss/${url}.xml`;
        }
    };

    const currentDate = new Date().toISOString();

    let breadcrumbs = [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "RSS Feeds",
            url: "/rss",
        },
    ];

</script>

<SEO
    lang={language}
    pageType={"Category"}
    {breadcrumbs}
    {canonicalUrl}
    slug={breadcrumbs?.[1].url}
    pathname={'/rss'}
    title={seoRssData.title}
    keywords={seoRssData.keywords}
    datePublished={currentDate}
    lastUpdated={currentDate}
    metadescription={seoRssData.description}
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
    <div class="innerLeftBlock">
        <div class="topichead graystrip">Republic World RSS Feeds</div>
        <div class="flex gap-1 mb30">
            <img
                alt="Like Active Icon"
                src={rightArrow}
                decoding="async"
                loading="lazy"
                width="10px"
            />
            <span class="pl4">Main Feeds</span>
        </div>

        <div class="rssCol">
            {#if rssList}
                <div class="grid grid-cols-3 gap-4">
                    {#each rssList as item}
                        <div class="flex flex-row justify-between " >
                            <a href={rssUrl(item?.completeSlug)} target="_blank"
                                >{item?.name}
                            </a>
                            <div>
                                <a
                                target="_blank"
                                href={rssUrl(item?.completeSlug)}
                            >
                                <img src={rssIcon} alt={item?.name} width={60} height={22} />
                            </a>
                            </div>
                           
                        </div>

                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .graystrip {
        background-color: var(--light_gray);
        color: var(--black);
        font-weight: 700;
    }

    .topichead {
        padding: 8px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        width: 100%;
    }
    .sitemapCol {
        columns: 4;
        column-gap: 40px;
    }

    .sitemapList {
        margin-bottom: 40px;
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid;
    }

    .sitemapList h4 {
        font-size: var(--font20);
        line-height: 1;
        font-weight: 900;
        margin-bottom: 20px;
    }

    .sitemapList ul li {
        display: block;
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
