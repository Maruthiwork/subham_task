<script lang="ts">
    import { onMount } from "svelte";
    import {
        fetchAllDistrict,
        fetchAllStates,
        fetchPostOffices,
    } from "../../../routes/api/fetchData";
    import { reverseSlug, toSlug } from "../utils/utils";
    import { goto } from "$app/navigation";

    export let language: string = "E";
    let allStates: any = [];
    let selectedStateName: string = "Select State";
    let selectedDistrictName: string = "Select District";
    let selectedOfficeName: string = "Select Post Office Name";
    let districts: any = [];
    let postOffices: any = [];
    let initialized = false;
    let previousOfficeName: string = "";
    let urlStack: any = [];

    onMount(async () => {
        allStates = await fetchAllStates(language);
        sortArray(allStates?.data?.data); // Sort allStates alphabetically by name

        const segments = window?.location?.pathname?.split("/")?.filter(Boolean);

        if (segments?.length >= 2) {
            const [_, stateSlug, districtSlug, officeSlug] = segments;

            if (stateSlug) {
                selectedStateName = stateSlug;
                await handleStateChange(stateSlug);
            }

            if (districtSlug) {
                selectedDistrictName = districtSlug;
                await handleDistrictChange(stateSlug, districtSlug);
            }

            if (officeSlug) {
                selectedOfficeName = reverseSlug(officeSlug);
                previousOfficeName = selectedOfficeName;
            }
        }

        resetDropdownValues();
        initialized = true;
    });

    async function handleStateChange(stateNameSlug: string) {
        districts = await fetchAllDistrict(
            language,
            reverseSlug(stateNameSlug),
        );
        sortArray(districts?.data?.data); // Sort districts alphabetically by name
        resetDropdownValues();
        updateUrlStack();
    }

    async function handleDistrictChange(
        stateNameSlug: string,
        districtNameSlug: string,
    ) {
        postOffices = await fetchPostOffices(
            language,
            reverseSlug(districtNameSlug),
            reverseSlug(stateNameSlug),
        );
        sortArray(postOffices?.data?.data, 'officeName'); // Sort post offices alphabetically by office name
        resetDropdownValues();
        updateUrlStack();
    }

    function resetDropdownValues() {
        if (
            !allStates?.data?.data.some(
                (state: any) => state?.slug === selectedStateName,
            )
        ) {
            selectedStateName = "Select State";
            selectedDistrictName = "Select District";
            selectedOfficeName = "Select Post Office Name";
            districts = [];
            postOffices = [];
        } else if (
            districts?.data?.data?.length &&
            !districts?.data?.data.some(
                (district: any) => district?.slug === selectedDistrictName,
            )
        ) {
            selectedDistrictName = "Select District";
            selectedOfficeName = "Select Post Office Name";
            postOffices = [];
        } else if (
            postOffices?.data?.data?.length &&
            !postOffices?.data?.data?.some(
                (office: any) => office?.officeName === selectedOfficeName,
            )
        ) {
            selectedOfficeName = "Select Post Office Name";
        }
    }

    function updateUrlStack() {
        urlStack = [
            "/india-pin-codes",
            selectedStateName !== "Select State" ? selectedStateName : null,
            selectedDistrictName !== "Select District"
                ? selectedDistrictName
                : null,
        ].filter(Boolean);
    }

    function resetAllValues() {
        // Reset all the dropdown values to defaults
        selectedStateName = "Select State";
        selectedDistrictName = "Select District";
        selectedOfficeName = "Select Post Office Name";
        districts = [];
        postOffices = [];
        updateUrlStack(); // Update URL stack accordingly
    }

    // Sorting function for arrays
    function sortArray(arr: any[], key: string = 'name') {
        arr.sort((a, b) => {
            if (a?.[key]?.toLowerCase() < b?.[key]?.toLowerCase()) return -1;
            if (a?.[key]?.toLowerCase() > b?.[key]?.toLowerCase()) return 1;
            return 0;
        });
    }

    $: if (initialized && selectedOfficeName !== "Select Post Office Name") {
        const finalUrl = [...urlStack, toSlug(selectedOfficeName)].join("/");

        if (finalUrl !== window?.location?.pathname) {
            previousOfficeName = selectedOfficeName;
            goto(finalUrl, { replaceState: true }).then(() => {
                window?.location?.reload();
            });
        }
    }
</script>

<div
    class="inline-block p-4 border border-gray-300 rounded-md bg-white w-full h-[268px]"
>
    <div
        class="flex flex-col justify-center items-center space-y-4 h-full w-full"
    >
        <select
            class="w-full p-2 border border-gray-300 rounded-md"
            bind:value={selectedStateName}
            on:change={() => handleStateChange(selectedStateName)}
        >
            <option value="Select State">Select State</option>
            {#if allStates?.data?.data?.length > 0}
                {#each allStates?.data?.data as state}
                    <option value={state?.slug}>{state?.name}</option>
                {/each}
            {/if}
        </select>
        <select
            class="w-full p-2 border border-gray-300 rounded-md"
            bind:value={selectedDistrictName}
            on:change={() =>
                handleDistrictChange(selectedStateName, selectedDistrictName)}
        >
            <option value="Select District">Select District</option>
            {#if districts?.data?.data?.length > 0}
                {#each districts?.data?.data as district}
                    <option value={district?.slug}>{district?.name}</option>
                {/each}
            {/if}
        </select>
        <select
            class="w-full p-2 border border-gray-300 rounded-md"
            bind:value={selectedOfficeName}
        >
            <option value="Select Post Office Name">Select Post Office Name</option>
            {#if postOffices?.data?.data?.length > 0}
                {#each postOffices?.data?.data as office}
                    <option value={office?.officeName}>{office?.officeName}</option>
                {/each}
            {/if}
        </select>

        <!-- Reset Button -->
        <button 
            class="w-full p-2 mt-4 bg-blue-700 text-white rounded-md"
            on:click={resetAllValues} 
            >
            Reset
        </button>
    </div>
</div>
