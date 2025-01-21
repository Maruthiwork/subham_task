<script lang="ts">
    import CardHeader from "../Republic-Common/CardHeader.svelte";
    import Card from "../Republic-Common/Card.svelte";
    import type { WidgetWithStory } from "./Types";
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
  
    export let anchors: WidgetWithStory;
  
    let stories: any[] = anchors.story;
  </script>

  <Card>
    <CardHeader classes='anchors'>{anchors?.widget?.title ?? 'Anchors'}</CardHeader>
    <div class="smThumbContainer" role="region" aria-label="Carousel">
      <amp-carousel
        height="325"
        layout="fixed-height"
        type="carousel"
        role="region"
      >
        {#each stories as item, index}
          <div>
            <a href={"/anchors" + "/" + item?.slug}>
              <img
                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}${item?.image?.versions?.["9_16"]?.filePath}`}
                alt=""
                class="videoThumbImg"
                width="149px"
                height="265px"
              />
              <div class="videoThumbTitle iconImg relative">
                <h2 class="lightCardTitle">{item?.firstName}</h2>
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
  