<!-- src/OrientationCheck.svelte -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let orientationAllowed = writable(true);

  const checkOrientation = () => {
    const orientation = window.screen.orientation.type;
    orientationAllowed.set(!orientation.startsWith('landscape'));
  };

  onMount(() => {
    checkOrientation();
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
    };
  });
</script>

<style>
  .orientation-warning {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 1);
    color: white;
    font-size: 1.5rem;
    text-align: center;
    z-index: 10000000;
  }
</style>

{#if $orientationAllowed === false}
  <div class="orientation-warning">
    Screen rotation not allowed. Please switch to portrait mode.
  </div>
{/if}
