// useInViewport.ts
import { beforeUpdate, onDestroy } from 'svelte';
import { writable } from 'svelte/store';

export function useInViewport(node: HTMLElement) {
  const isVisible = writable(false);

  const observer = new IntersectionObserver((entries) => {
    const isVisibleNow = entries.some(entry => entry.isIntersecting);
    isVisible.set(isVisibleNow);
  });

  beforeUpdate(() => {
    observer.observe(node);
  });

  onDestroy(() => {
    observer.disconnect();
  });

  return isVisible;
}
