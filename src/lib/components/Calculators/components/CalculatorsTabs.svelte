<script>
    // @ts-nocheck
    export let tabs = [];
    export let language = 'E'
    export let title = '';
    export let textColor = '';
    export let imagePath = '';

    let activeTab = tabs[0]?.value || ""; // Set default to first tab if available
    let activeComponent = null;

    const loadComponent = async (tabValue) => {
        const tab = tabs.find((t) => t.value === tabValue);
        if (tab) {
            activeTab = tabValue;
            activeComponent = await tab.component();
        }
    };

    $: loadComponent(activeTab);
</script>

{#if activeComponent}
    <svelte:component this={activeComponent.default} tabs={tabs} {title} textColor={textColor} imagePath={imagePath} language={language} />
{:else}
    <p>Loading...</p>
{/if}



