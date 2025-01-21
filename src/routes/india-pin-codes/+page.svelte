<script lang="ts">
    import AllStates from "$lib/components/AllStates/AllStates.svelte";

    export let data: any;
    const {
        allStates,
        trending_stories,
        device,
        language,
        envDetails,
        rightSideBar,
    } = data?.props;


</script>

<AllStates {allStates} {trending_stories} {device} {language} {envDetails} {rightSideBar}/>
