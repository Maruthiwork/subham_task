<script>
    // ** Props
    export const title = "";
    export let logo = "";
    export const shareable = false;
</script>

<div class="flex items-center justify-between">
    <div class="flex gap-3 items-center justify-start">
        {logo}
        <h3 class="text-[28px] text-black">{title}</h3>
    </div>
    {#if shareable}
        <!-- Share Icon -->
    {/if}
</div>
