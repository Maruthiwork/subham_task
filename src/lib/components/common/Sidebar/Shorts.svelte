<script lang="ts">
  import CardHeader from "../Republic-Common/CardHeader.svelte";
  import Card from "../Republic-Common/Card.svelte";
  import type { Story, WidgetWithStory } from "./Types";
  import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";

  //props
  export let shorts: WidgetWithStory;

  export let stories: Story[] = shorts.story;
</script>

<Card>
  <CardHeader>{shorts?.widget?.title}</CardHeader>
  <div class="smThumbContainer" role="region" aria-label="Carousel">
    <amp-carousel height="325" layout="fixed-height" role="region">
      {#each stories as item, index}
        <div>
          <a href="/{item?.completeSlug}">
            <img
              src={`${item?.images?.versions?.["9_16"] ? EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + item.images.versions["9_16"].filePath : EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL + item.images.versions["16_9"].filePath}`}
              alt=""
              class="videoThumbImg"
              width="149px"
              height="265px"
            />
            <div class="videoThumbTitle iconImg relative">
              {#if item.story_type === "SHORT" || item.story_type === "VIDEO"}
                <span class="playIcon playTopLeftsm"></span>
              {:else if item.story_type === "GALLERY"}
                <span class="cameraIcon shortsCameraIcon"></span>
              {:else if item.story_type === "WEB-STORIES"}
                <span class="webstoriesIco"></span>
              {/if}
              <h2 class="lightCardTitle">{item?.small_heading}</h2>
            </div>
          </a>
        </div>
      {/each}
    </amp-carousel>
  </div>
</Card>

<style>
  .videoThumbTitle h2 {
    font-size: 22px;
    font-weight: 900;
    color: #fff;
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    line-height: normal;
    letter-spacing: normal;
    width: 90%;
    z-index: 1;
    margin: 0 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    font-weight: 700;
    font-size: 22px;
    white-space: normal;
  }
  .videoThumbCard .videoThumbImg {
    aspect-ratio: 9/16;
    display: block;
    border-radius: 5px;
  }
</style>
