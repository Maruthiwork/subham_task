<script lang='ts'>
    export let link: string;
    export let style: string = "color:#000"
    export let categoryLabel: string = "color:#D10014"
    export let link_text = '';
    export let isAmp: boolean = false

</script>
 
 <div
            class="cardftr lightCardftr text-base leading-6 font-normal mt-2 font-mulish flex items-center flex-wrap w-full"
            style={style}
        >
            <span class="cardLabel pr-[6px] mr-[6px]"
                ><a data-sveltekit-reload target="_self" href={isAmp ? '/amp/'+link : '/' + link} class="text-sm" style='color:{categoryLabel ?? ''}'>{link_text}</a></span
            >
        </div>