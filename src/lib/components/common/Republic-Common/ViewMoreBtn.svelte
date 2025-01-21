<script>
    import Arrow from "$lib/assets/svg/arrow.svelte";
    import { getViewMoreLabel } from "$lib/components/utils/utils";

    export let moreUrl;
    export let styles = "";
    export let className = "";
    export let backgroundColor = "";
    export let fontColor = "";
    export let language = "E";
</script>

{#if moreUrl?.length}
    <div
        class={`w-full flex items-center justify-center ${className}`}
        style={styles}
    >
        <a
            data-sveltekit-reload
            href={"/" + moreUrl?.toLowerCase()}
            class={`shadow-[-4px_4.008px_0px_0px_#000] border-[3px] border-black px-6 py-2 text-base font-medium text-white cursor-pointer flex gap-1 items-center`}
            style={`background-color:${backgroundColor || "#D10014"}; color:${fontColor || "white"}`}
        >
            <div class="flex items-center justify-center gap-2">
                {getViewMoreLabel(language)}
                <Arrow />
            </div>
        </a>
    </div>
{/if}
