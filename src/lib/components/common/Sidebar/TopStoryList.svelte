<!-- YourComponent.svelte -->
<script lang="ts">
  import Card from '../Republic-Common/Card.svelte';
  import CardHeader from '../Republic-Common/CardHeader.svelte';
    import type { Story, WidgetWithStory } from './Types';
  //props
  export let topStoriesData: WidgetWithStory;
  export let stories: Story[] = topStoriesData.story;
  const limitedStories = stories.slice(0, 5);
</script>

<Card>
  <CardHeader>{topStoriesData?.widget?.title}</CardHeader>
  <ol class="lstnewsList">
  {#each limitedStories as item}
    <li>
      <div class="lstnewsHead pl-6">
        <a target="_self" class="black" href={item?.completeSlug}>
          <p class="text-lg">{item?.long_heading}</p>
        </a>
        <div
            class="cardftr lightCardftr text-base leading-6 font-normal mt-2 font-mulish flex items-center flex-wrap"
        >
            <span class="cardLabel pr-[6px] mr-[6px]"
                ><a href={item?.categoryData?.completeSlug} class="text-[#D10014] text-sm">{item?.categoryData?.frontend_name || item?.categoryData?.name}</a></span
            >
        </div>
      </div>
    </li>
  {/each}
</ol>
</Card>

<style>
.lstnewsList {
    counter-reset: my-awesome-counter;
    margin-bottom: 30px;
}

.lstnewsList li {
    border-bottom: 1px solid rgba(0,0,0,.16);
    counter-increment: my-awesome-counter;
    position: relative;
    padding: 16px 0;
}
.lstnewsList li:last-child{
  border-bottom: none;
}
.lstnewsList li::before {
    content: counter(my-awesome-counter);
    font-weight: 900;
    position: absolute;
    font-size: 32px;
}
</style>