<script lang="ts">
    export let category: any;
    // export let time: string;
    export let envDetails: any = "";
    export let link: any;
    export let style: string = "color:#000";
    export let categoryLabel: string = "color:#D10014";
    export let className: string = "";
    export let isAmp: boolean = false;
</script>

<div
    style="font-family: {envDetails.secondaryFont ?? ''};"
    class={`cardftr lightCardftr text-base pt-2 leading-6 font-normal font-mulish flex items-center flex-wrap w-full ${className}`}
>
    {#if category?.name?.length > 0}
        <span class="cardLabel pr-[6px] mr-[6px]"
            ><a
                data-sveltekit-reload
                target="_self"
                href={isAmp ? '/amp/'+category?.completeSlug : '/' + category?.completeSlug}
                class="text-[#D10014] capitalize {envDetails?.language === "MH" || envDetails?.language === "MH"  ?"text-sm":"text-xs"} m_title desktop:text-sm"
                style={style ?? ""}>{category?.frontend_name || category?.name}</a
            >
        </span>
    {/if}
    <!-- {#if time}
        <span class="cardLabel pr-[6px] mr-[6px]" {style}>
            {ConvertDateFormat(time)}
        </span>
    {/if} -->
</div>

<style>
    a.m_title:first-letter {
        text-transform: uppercase;
    }
</style>
