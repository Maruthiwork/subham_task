<script lang="ts">
    export let language:string = 'E';
    export let trending: any = [];

</script>

{#if trending?.length}
<div class="trendingHeader thmt min-h-[47px]">
    <div class="contentWrapper">
        <div class="trendingHeadSlider flex overflow-auto">
            <span class="trending"> TRENDING/ </span>
            {#each trending as trendingkeyWord}
                <a target="_self" data-sveltekit-reload href={trendingkeyWord?.url} class="trendingkeyword whitespace-nowrap h-fit {language === 'H' || language === 'MH' && 'leading-[150%]'}" style="font-display: optional;">
                    {trendingkeyWord?.keyword}  |
                </a>
            {/each}
        </div>
    </div>
</div>
{/if}
<style>
    .trendingHeader {
        padding: 11px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        margin: 0 auto 10px;
    }

    .trendingHeadSlider a,
    .trendingHeader ul li a {
        font-size: 16px;
        font-weight: 500;
        color: var(--darkred);
    }

    .trendingHeadSlider > span {
        font-size: 16px;
        line-height: 1.2;
        font-weight: 700;
        margin-right: 10px;
        color: var(--darkred);
    }

    .trendingHeadSlider a:hover {
        color: var(--black);
    }

    .trendingHeadSlider a.trending,
    .trendingHeader ul li a.trending {
        font-weight: 700;
        margin-right: 10px;
    }

    .trendingkeyword {
        margin-right: 10px;
    }

    .trendingHeader {
        padding-right: 8px;
        margin-bottom: 0px!important;
    }

    .trendingHeader :first-child,
    .trendingHeader :last-child {
        border-right: none;
    }
      .trendingHeadSlider::-webkit-scrollbar {
        display: none;
    }
</style>
