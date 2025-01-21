<script lang="ts">
    import PageCardTitle from "$lib/components/common/Republic-Common/PageCardTitle.svelte";
    import { TEMPLATE_TYPE } from "$lib/components/enums/story";
    import Divider from "./Divider.svelte";
    import PageCardFooter from "./PageCardFooter.svelte";

    // ** Props
    export let title: string;
    export let imageUrl: string = "";
    export let alt: string;
    export let link: string;
    export let fontColor: string = "#000";
    export let categoryLabel: string = "#D10014";
    export let template_type: any = "";
    export let borderStyle = "";
    export let classProperties = "";
    export let description_class_properties = "";
    export let cardStyle = "";
    export let imgStyle = "";
    export let footerStyles = "";
    export let designation = "";
    export let discription = "";
    export let link_text = "";
    export let showDesignation = true;
    export let isAmp: boolean = false;
    export let envDetails:any = "";

    let imageDimension = { width: "100%", height: "100%" };
    let isShowMore = false;

    function toggleReadMoreLess() {
        isShowMore = !isShowMore;
    }

    let words = discription?.split(" ");
    let shouldDisplayReadMore = words?.length > 50;
</script>

{#if template_type === TEMPLATE_TYPE.BIG || template_type === TEMPLATE_TYPE.MEDIUM}
<div class="w-auto" style={cardStyle ?? ""}>
    <a data-sveltekit-reload target="_self" class="black" href={isAmp ? '/amp/'+link : '/' + link}>
        {#if isAmp}
            <amp-img
                src={imageUrl}
                {alt}
                width="1"
                height="1"
                layout="responsive"
                style={imgStyle}
            />
        {:else}
            <img
                src={imageUrl}
                {alt}
                decoding="async"
                data-nimg="fill"
                loading="lazy"
                style={imgStyle}
                {...imageDimension}
            />
        {/if}
    </a>
    <PageCardTitle
        {link}
        {isAmp}
            classes="font-title font-bold leading-9 overflow-hidden text-ellipsis line-clamp-3 mt-3 text-nowrap {classProperties ??
                ''}"
            style="color:{fontColor ?? ''}">{title}</PageCardTitle
        >
    {#if showDesignation}
        <PageCardTitle
            {link}
            {isAmp}
                classes="font-designation font-light overflow-hidden text-ellipsis {description_class_properties ??
                    ''}"
                style="color:{fontColor ?? ''}">{designation}</PageCardTitle
            >
    {/if}

    {#if link_text?.trim() !== ""}
        <PageCardFooter
            {link}
            {isAmp}
            {link_text}
                style="color:{fontColor ?? ''};{footerStyles}"
            {categoryLabel}
        />
    {/if}
</div>

{/if}

{#if template_type === TEMPLATE_TYPE.DEFAULT || template_type === TEMPLATE_TYPE.NO_IMAGE}
    <div
        class="hrcards horizontalImgCard relative overflow-hidden cardsHover w-full"
        style={borderStyle ?? ""}
    >
        <div
            class={`flex flex-wrap justify-between ${template_type === TEMPLATE_TYPE.FLIP ? "flex-row-reverse" : "flex-row"}`}
        >
            <div class="flex gap-3 w-full">
                <div
                    class={`${template_type === TEMPLATE_TYPE.NO_IMAGE ? "w-full" : " w-3/5"}`}
                >
                    <PageCardTitle
                        {link}
                        {isAmp}
                        classes="text-[17px] text-left font-medium leading-normal overflow-hidden text-ellipsis line-clamp-3"
                        style="color:{fontColor ?? ''}">{title}</PageCardTitle
                    >
                </div>
                {#if template_type !== TEMPLATE_TYPE.NO_IMAGE}
                    <div class="relative w-2/5">
                        <div class="cardImg ImgThumb innerThumRadius">
                            <a target="_self" class="black" href={isAmp ? '/amp/'+link : '/' + link}>
                                {#if isAmp}
                                    <amp-img
                                        src={imageUrl}
                                        {alt}
                                        width="1"
                                        height="1"
                                        layout="responsive"
                                    />
                                {:else}
                                    <img
                                        src={imageUrl}
                                        {alt}
                                        decoding="async"
                                        data-nimg="fill"
                                        loading="lazy"
                                        {...imageDimension}
                                    />
                                {/if}
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
            <PageCardFooter
                {link}
                {isAmp}
                style="color:{fontColor ?? ''}"
                {categoryLabel}
            />
        </div>
    </div>
{/if}
{#if template_type === TEMPLATE_TYPE.FLIP}
    <div
        class="hrcards horizontalImgCard relative overflow-hidden cardsHover w-full"
        style={borderStyle ?? ""}
    >
        <div class="topicTagWrap withTagDesc">
            <div class="topicTagImg w-2/5 w-[100px] desktop:w-[160px]">
                <div class="cardImg ImgThumb innerThumRadius">
                    <a target="_self" class="black" href={isAmp ? '/amp/'+link : '/' + link}>
                        {#if isAmp}
                            <amp-img
                                src={imageUrl}
                                {alt}
                                width="1"
                                height="1"
                                layout="responsive"
                            />
                        {:else}
                            <img
                                src={imageUrl}
                                {alt}
                                style={imgStyle}
                                decoding="async"
                                data-nimg="fill"
                                loading="lazy"
                                width="100%"
                            />
                        {/if}
                    </a>
                </div>
            </div>

            <div class="topicTagHead">
                <PageCardTitle
                    link={""}
                    {isAmp}
                    classes="font-bold leading-9 overflow-hidden text-ellipsis {classProperties ??
                        ''}"
                    style="color:{fontColor ?? ''};{envDetails?.language === "H" || envDetails?.language === "MH" ? "letter-spacing: 0;line-height: 155%;" : "" }">{title}</PageCardTitle
                >
                <PageCardTitle
                    {link}
                    {isAmp}
                    classes="text-[16px] font-medium overflow-hidden text-ellipsis {description_class_properties ??
                        ''}"
                    style="color:{fontColor ?? ''}"
                    >{designation ?? ""}</PageCardTitle
                >
            </div>
            <div class="topicTagDesc">
                <p
                    class="storyMoreContent text-[17px] font-light overflow-hidden pt-4 desktop:pt-0 text-ellipsis {description_class_properties ??
                        ''}"
                    style="color:{fontColor ?? ''}"
                >
                    {#if !isAmp && shouldDisplayReadMore}
                        {#if isShowMore}
                            {discription}
                        {:else}
                            {`${words.slice(0, 50).join(" ")}`}
                        {/if}
                        <span
                            style="font-weight: 600;"
                            class="moreLessText"
                            on:click={toggleReadMoreLess}
                        >
                            {#if isShowMore}
                                Less
                            {:else}
                                ...Read More
                            {/if}
                        </span>
                    {:else}
                        {discription}
                    {/if}
                </p>
                {#if link_text?.trim() !== ""}
                    <PageCardFooter
                        {link_text}
                        {link}
                        {isAmp}
                        style="color:{fontColor ?? ''}"
                        {categoryLabel}
                    />
                {/if}
            </div>
        </div>
    </div>
    <Divider classes="my-4" style="grid-column: 1 / -1;" />
{/if}

<style>
    .smThumbListing .horizontalImgCard .horicardRight .cardImg {
        aspect-ratio: 16/9;
        display: block;
        border-radius: 2px;
        position: relative;
        overflow: hidden;
    }
    .topicTagWrap.withTagDesc {
        display: grid;
        grid-template-columns: 160px calc(100% - 220px);
        grid-column-gap: 20px;
        -moz-column-gap: 20px;
        column-gap: 20px;
    }
    .topicTagImg {
        overflow: hidden;
        border-radius: 4px;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    @media screen and (max-width: 680px) {
        .topicTagWrap.withTagDesc {
            grid-template-columns: 100px calc(100% - 125px); /* For mobile */
        }
        .topicTagHead {
            grid-row-start: 1;
            text-align: left;
            align-items: flex-start;
            display: flex;
            width: 100%;
            flex-direction: column;
        }
        .topicTagDesc {
            grid-column-start: 1;
            grid-column-end: 3;
        }
        .topicTagHead h2 {
            font-size: var(--font24);
        }
    }
</style>
