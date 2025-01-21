<script lang="ts">
  import type { TopNavBar } from "./Types";

  export let topNavBar: TopNavBar[];
</script>

<div class="flex justify-center">
  <div class="customTopNavBar flex">
    {#each topNavBar.slice(0, 10) as item, i}
      <div class="topnavbarlist mr-4">
        <a
          data-sveltekit-reload
          href={`/${item.completeSlug}`}
          title={item.frontend_name}
        >
          <span
            class={item.frontend_name === "Trending 2024"
              ? "blink menu-items"
              : "menu-items"}>{item.frontend_name}</span
          >
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .blink {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>
