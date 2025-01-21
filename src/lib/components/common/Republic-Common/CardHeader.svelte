<script lang="ts">
    export let classes = "";
    export let style = "";
    export let enforceH1: boolean = false;
    export let textStyle: any = "";
</script>

<div
    class={`articleHead blackArticleHead flex items-center justify-between ${classes}`}
    {style}
>
    {#if enforceH1}
        <h1
            style={textStyle}
            class="flexwrap flex items-center gap-2 text-[22px] font-black leading-6 tracking-tight w-full desktop:text-[28px]"
        >
            <slot></slot>
        </h1>
    {:else}
        <h2
            style={textStyle}
            class="flexwrap flex items-center gap-2 text-[22px] font-black leading-6 tracking-tight w-full desktop:text-[28px]"
        >
            <slot></slot>
        </h2>
    {/if}

  
</div>
