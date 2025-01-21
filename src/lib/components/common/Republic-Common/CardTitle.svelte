<script lang='ts'>
    export let link: string;
    export let classes: any;
    export let style: string = "#000";
    export let isAmp: boolean = false
</script>

<div class={classes} style={style}>
    <a data-sveltekit-reload href={isAmp ? '/amp/'+link : '/' + link}>
    <slot></slot>
    </a>
</div>