
<script lang="ts">
  export let width: string = '18';
  export let height: string = '13';
  export let color: string = 'black';
  export let outlined: boolean = false;
  export let bgcolor: string = "none";
</script>


<svg
  width={width}
  height={height}
  viewBox="0 0 28 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if bgcolor === "none"}
    <path d="M17.131 5.98543V0.0610352L27.625 10.4287L17.131 20.7964V14.7239C9.63535 14.7239 4.38837 17.0937 0.640528 22.2775C2.13967 14.872 6.63708 7.46653 17.131 5.98543Z" fill={color} />
  {:else if bgcolor && outlined}
    <div class="shareIconBox" style="border-color: {color ?? ''}">
      <svg width={width} height={height} viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.131 5.98543V0.0610352L27.625 10.4287L17.131 20.7964V14.7239C9.63535 14.7239 4.38837 17.0937 0.640528 22.2775C2.13967 14.872 6.63708 7.46653 17.131 5.98543Z" fill={color} />
      </svg>
    </div>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 29 28" fill="none">
      <rect x="0.5" width={width} height={height} rx="2.30829" fill={bgcolor}/>
      <path d="M15.9455 10.9831V7L23.0009 13.9704L15.9455 20.9409V16.8582C10.906 16.8582 7.37835 18.4514 4.85859 21.9366C5.8665 16.9578 8.89021 11.9789 15.9455 10.9831Z" fill={color} />
    </svg>
  {/if}
</svg>

<style>
  /* You can define styles for .shareIconBox here if needed */
</style>
