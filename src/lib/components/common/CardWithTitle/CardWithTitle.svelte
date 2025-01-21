<script lang="ts">
    import { ConvertDateFormat } from "$lib/components/utils/utils";
    import { IMAGE_ASPECT_RATIO, ImageDimensions, generateAspectRatioImageURL } from "../HybridImage/Constants";
    import RepublicAnchorTag from "../RepublicAnchorTag/RepublicAnchorTag.svelte";

    export let title:string;
    export let isExternal:boolean;
    export let externalURL:string;
    export let images;
    export let label;
    export let updatedAt;
    export let story;
    export let alt;
    export let story_type;
    export let completeSlug;
    export let categorySlug;
    export let stickerData;
    export let device;


</script>

<RepublicAnchorTag
    {completeSlug}
    classes="cardImgWithtitle imgCardWithPlayicon cardpdRight cardsHover"
>
    <div class="cardwrap">
        <div class="cardImg ImgThumb imgHeight213">
            {#if stickerData}
                <span class="StoryTagOnImage font14" style="background-color: {stickerData.background_color}; font-style: {stickerData.font_style}; color: {stickerData.text_color}">
                    {stickerData.name}
                </span>
            {/if}
            <img
            src={generateAspectRatioImageURL(
              images,
              ImageDimensions?.[device]?.bannerImage,
              IMAGE_ASPECT_RATIO["16_9"]?.key,
            )}
            alt={images?.versions?.["16_9"]?.alt || "Small Story Card"}
            height="396px"
            width="704px"
            fetchpriority="high"
            loading="eager"
          />
        </div>
        <div class="cardTitle darkCardTitle absolute left-3 bottom-4 w-[96%] z-20 text-white">
            <h2>
                {title}
                {#if story_type === "VIDEO"}
                    <span class="playicon pl4">
                        <!-- <HybridImage src="/styles/images/Play.svg" alt="Play Button icon" width="26" height="26" style="object-fit: contain" /> -->
                    </span>
                {/if}
            </h2>
        </div>
    </div>
    <div class="cardftr lightCardftr">
        {#if label}
            <span class="cardLabel">
                <RepublicAnchorTag completeSlug={categorySlug} title={label}/>
            </span>
        {/if}
        {#if updatedAt}
            <span class="cardTime">
                {ConvertDateFormat(updatedAt)}
            </span>
        {/if}
    </div>
</RepublicAnchorTag>

<style>

.ImgThumb, .cardsHover {
    overflow: hidden;
}
.ImgThumb {
    overflow: hidden;
}
.cardImgWithtitle, .cardwrap {
    position: relative;
}

.cardpdRight {
    padding-right: 15px;
}
.cardImgWithtitle {
  position: relative;
}
.cardpdRight {
    padding-right: 15px;
}

.cardImgWithtitle,
.cardwrap {
  position: relative;
}

.cardImgWithtitle .cardTitle,
.imgCardWithPlayicon .cardTitle {
  position: absolute;
  bottom: 8px;
  left: 8px;
  color: var(--white);
  width: 96%;
  z-index: 1;
}

.cardImgWithtitle, .cardwrap {
    position: relative;
}

</style>
