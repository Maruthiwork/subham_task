<script lang="ts">
    import DesktopCategories from "./DesktopCategories.svelte";
    export let nav_bar: any = [];
    export let envDetails;
    
</script>

<div id="fixedOnScroll">
        <DesktopCategories nav_bar={nav_bar} {envDetails}  />
</div>
