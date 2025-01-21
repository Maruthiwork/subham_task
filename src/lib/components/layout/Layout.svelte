<script lang="ts">
    //@ts-nocheck
    import type {
    Navigation,
        RepublicShow,
        SmallStoryData,
        Story,
    } from "../common/Footer/Types";
    import Header from "../common/Header/Header.svelte";
    import type { MEGA_MENU } from "../common/Header/Types";
    import Footer from "../common/Footer/Footer.svelte";
    export let shows: RepublicShow[];
    export let latestnews: Story[];
    export let most_followed: SmallStoryData[];
    export let mostshared:Story[];
    export let mostwatched:Story[];
    export let trendingtopics:SmallStoryData[];
    export let navbar:Navigation[];
    export let mega_menu: MEGA_MENU;
</script>

<Header {mega_menu}/>
<slot />
<Footer
    {shows}
    {latestnews}
    {most_followed}
    {mostshared}
    {mostwatched}
    {trendingtopics}
    {navbar}
    {mega_menu}
/>
