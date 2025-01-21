<script lang="ts">
    import Divider from "../common/Republic-Common/Divider.svelte";
    import Sidebar from "../common/Sidebar/Sidebar.svelte";
    import PinCode from "../PinCode/PinCode.svelte";
    import { getHomeTextFromLanguage } from "../utils/utils";
    import SEO from "$lib/components/SEO/index.svelte";
    export let allStates;
    export let trending_stories;
    export let device;
    export let language;
    export let envDetails;
    export let rightSideBar: any = {};

    function chunkArray(array: any, size: number) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }
</script>

<SEO
    lang={language}
    title={"India Pin Code"}
    metadescription={"Find the pin code of any place in India"}
    keywords={"India Pin Code, India Pin Code State District Post Office Name"}
    pathname={"/india-pin-codes"}
    site_details={envDetails}
/>

<div class="contentWrapper">
    <div class="flex flex-wrap gap-5">
        <div
            class="mainArticle"
            style={device === "mobile" ? "width:100%;" : "width:64.66%"}
        >
            <div class="innerLeftBlock">
                <div class="breadcrumb my-3">
                    <ul>
                        <li>
                            <a href="/">
                                {getHomeTextFromLanguage(language)} /
                            </a>
                        </li>
                        <li>India Pin Code</li>
                    </ul>
                </div>
                <div
                    class="desktop:p-3 border-gray-300 mb-8 h-max desktop:border"
                >
                    <div class="text-center">
                        <h1 class="text-2xl font-bold">India Pin Code</h1>
                    </div>
                    <div class="text-center">
                        <p class="text-sm">
                            Find the pin code of any place in India
                        </p>
                    </div>

                    <PinCode {language} />

                    <div class="pageContent text-left">
                        <p>
                            All India Pin Code State District Post Office Name
                            India has 29 states with at least 720 districts
                            comprising of approximately 6 lakh villages, and
                            over 8200 cities and towns. Indian postal department
                            has allotted a unique postal code of pin code to
                            each district/village/town/city to ensure quick
                            delivery of postal services. A Postal Index Number
                            or PIN or PIN code is a code in the post office
                            numbering or post code system used by India Post,
                            the Indian postal administration. The code is six
                            digits long. The first three digits of the PIN
                            represent a specific geographical region called a
                            sorting district that is headquartered at the main
                            post office of the largest city and is known as the
                            sorting office. A state may have one or more sorting
                            districts depending on the volumes of mail handled.
                            The fourth digit represents the route on which a
                            delivery office is located in the sorting district.
                            The last two digits represent the delivery office
                            within the sorting district starting from 01 which
                            would be the GPO or HO.
                        </p>
                    </div>
                    <h2 class="text-[28px] leading-[35px] pt-[10px] pb-[10px]">
                        All India State Pin Code
                    </h2>
                    <!-- Create table with tailwind css iterate the allStates array in 3 columns -->
                    <table class="table-auto w-full">
                        <tbody>
                            {#each chunkArray(allStates, 3) as row}
                                <tr>
                                    {#each row as state}
                                        <td class="border px-4 py-2 bg-white">
                                            <a
                                                href={`india-pin-codes/${state.slug}`}
                                                class="text-blue-600 hover:underline"
                                            >
                                                {state.name}
                                            </a>
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {#if device === "mobile"}
            <Divider classes={"my-1"} />
        {/if}
        <div style={device === "mobile" ? "width:100%;" : "width:31.33%"}>
            {#if trending_stories}
                <Sidebar
                    {device}
                    {envDetails}
                    {language}
                    sideBarData={trending_stories}
                    {rightSideBar}
                    sidebarTop={envDetails.adsFile.Desktop.SIDEBARTOP.AP}
                />
            {/if}
        </div>
    </div>
    {#if device === "mobile"}
        <Divider classes={"my-3"} />
    {/if}
    <div id="migid-container" />
</div>

<style>
    .breadcrumb ul {
        display: flex;
        gap: 4px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: 400;
    }

    @media screen and (max-width: 680px) {
        .breadcrumb ul li {
            font-size: 12px;
        }
    }

    table tbody td {
        text-align: left;
        font-size: 16px;
    }

    @media screen and (max-width: 680px) {
        table tbody td {
            font-size: 14px;
        }
    }
</style>
