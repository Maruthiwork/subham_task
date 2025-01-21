<script>

    import SmallStoryCard from '../common/SmallStoryCard/SmallStoryCard.svelte';
    import CardWithTitle from '../common/CardWithTitle/CardWithTitle.svelte';

    export let bigStory;
    export let device;
</script>

{#if bigStory}
    <div class="cardColLeft">
        <CardWithTitle
            title={bigStory?.story?.[0]?.mid_heading}
            label={bigStory?.story?.[0]?.categoryData?.frontend_name || bigStory?.story?.[0]?.categoryData?.name}
            isExternal={bigStory?.story?.[0]?.isExternal}
            externalURL={bigStory?.story?.[0]?.externalURL}
            updatedAt={bigStory?.story?.[0]?.updatedAt}
            images={bigStory?.story?.[0]?.images}
            story={Array.isArray(bigStory?.story) ? bigStory?.story.slice(1, 3) : []}
            alt={bigStory?.story?.[0]?.images?.alt}
            story_type={bigStory?.story?.[0]?.story_type}
            completeSlug={bigStory?.story?.[0]?.completeSlug}
            categorySlug={bigStory?.story?.[0]?.categoryData?.completeSlug}
            stickerData={bigStory?.story?.[0]?.stickerData}
            {device}
        />
    </div>
{/if}

<div class="cardColRight flex flex-col gap-10">
    {#if bigStory && Array.isArray(bigStory?.story)}
        {#each bigStory?.story?.slice(1, 3) as item, idx}
            <SmallStoryCard {item}  />
        {/each}
    {/if}
</div>

<style>
   .cardColLeft {
    position: relative;
    padding-right: 16px;
}
.cardColLeft, .cardColRight {
    width: 49.8%;
}
.cardColLeft:after {
    position: absolute;
    content: "";
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, .16);
}

.cardColRight {
    padding-left: 16px;
}

.cardColLeft, .cardColRight {
    width: 49.8%;
}
</style>
