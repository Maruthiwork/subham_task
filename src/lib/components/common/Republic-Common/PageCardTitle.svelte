<script lang="ts">
    export let link: string;
    export let classes;
    export let style: string = "#000";
    export let isAmp: boolean = false;
</script>

{#if link?.length > 0}
    <div class={classes} {style}>
        <a target="_self" data-sveltekit-reload href={isAmp ? '/amp/'+link : '/' + link}>
            <slot></slot>
        </a>
    </div>
{:else}
    <h1 class={classes} {style}>
        <slot></slot>
    </h1>
{/if}

<style>
    .font-title {
        font-size: 18px;
    }

    .font-designation {
        font-size: 16px;
    }

    @media (max-width: 660px) {
        .font-title {
            font-size: 16px;
        }

        .font-designation {
            font-size: 12px;
        }
    }
</style>
