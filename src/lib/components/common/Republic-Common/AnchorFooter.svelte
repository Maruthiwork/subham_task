<script lang="ts">
    export let classProperties: any;
    export let author_anchor_name: string = "";
    export let author_anchor_link: string = "";
    export let style: string = "";
</script>

<div
    class="text-[12px] font-medium uppercase font-mulish line-clamp-3 desktop:text-[14px] {classProperties ??
        ''}"
>
    {#if author_anchor_name != "" && author_anchor_link != ""}
        <span class="cardLabel pr-[6px] mr-[6px]"
            ><a
                data-sveltekit-reload
                target="_self"
                href={"/anchors-and-authors/" + author_anchor_link}
                class="text-[#D10014] text-[12px] desktop:text-sm m_title"
                {style}>{author_anchor_name}</a
            ></span
        >
    {/if}
</div>

<style>
    a.m_title:first-letter {
        text-transform: uppercase;
    }
</style>
