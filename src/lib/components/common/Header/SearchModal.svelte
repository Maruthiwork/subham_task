<script lang="ts">
    import { onMount } from "svelte";
    import { fetchPreSearchList } from "../../../../routes/api/fetchData";
    let search_stories_list: any = [];
    export let isSearchOpen;
    export let searchQuery: any;
    export let language:string = 'E';
    onMount(fetchData); // Fetch data when component mounts

    async function fetchData() {
        try {
            const response = await fetchPreSearchList(language, searchQuery);
            // Update search_stories_list reactively using the reactive assignment operator '='
            search_stories_list = response?.data?.data?.section?.search_stories;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    $: if (searchQuery) {
        fetchData();
    }
</script>

<div class="relative w-full text-black">
    <ul id="searchSuggestion" class="searchSuggestion">
        {#if search_stories_list?.length > 0}
            {#each search_stories_list as story}
                <li>
                    <a
                        data-sveltekit-reload
                        href={`/${story.completeSlug}`}
                    >
                        <span>{story.long_heading}</span>
                    </a>
                </li>
            {/each}
        {/if}
    </ul>
</div>

<style>
    .searchSuggestion {
        margin-top: 8px;
        max-height: 225px;
        overflow: auto;
        border: none;
        padding: 0;
        border-radius: 0;
    }
    .searchSuggestion li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    }
    .searchSuggestion li a {
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.25px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 400;
        padding: 8px 0;
    }
</style>
