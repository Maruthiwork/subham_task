<script>
    //@ts-nocheck

    let selectedChannel = null;
    let dropdownOpen = false;
    export let envDetails;

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    function selectChannel(channel) {
        selectedChannel = channel;
        dropdownOpen = false;
    }
</script>

<div class="dropdown-container">
    <div class="dropdown-button" on:click={toggleDropdown}>
        {selectedChannel ? selectedChannel : "Change Channel"}
    </div>
    <div
        class="dropdown-content"
        style="display: {dropdownOpen ? 'block' : 'none'};"
    >
        {#each envDetails.allDomainList as { name, url }, index}
         <a style={`color: ${index === 0 ? "#D10014" : "#000"}`} data-sveltekit-reload href={url}>
            <div class:selected={name === selectedChannel}  on:click={() => selectChannel(name)}>{name}</div>
        </a>
        {/each}
    </div>
</div>

<select bind:value={selectedChannel}>
    {#each envDetails.allDomainList  as { name, url }}
        <option value={name}>{name}</option>
    {/each}
</select>

<style>
    .dropdown-container {
        position: relative;
        margin-bottom: 24px;
    }

    .dropdown-button {
        padding: 10px 10px 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        cursor: pointer;
        font-size: 16px;
    }
    .dropdown-button::after {
        content: "";
        background: url($lib/assets/images/arrow-down.svg)
            no-repeat 50%;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 19px;
        right: 8px;
        transition: all 0.2s linear;
        transform: rotate(0);
    }
    .dropdown-content {
        position: relative;
        min-width: 100%;
        z-index: 9;
    }
    .dropdown-content div.selected {
    color: #D10014;
  }
  .dropdown-content div {
    padding-left: 0px !important;
  }
    .dropdown-content div {
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    }

    .dropdown-content div:hover {
        background-color: #f1f1f1;
    }

    /* Hide the native select tag */
    select {
        display: none;
    }
</style>
