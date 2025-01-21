<script lang="ts">
    import DistrictAndPostOffice from "$lib/components/DistrictAndPostOffice/DistrictAndPostOffice.svelte";


    export let data: any;
    const {
        allDistrict,
        postOffice,
        officeDetails,
        trending_stories,
        device,
        language,
        envDetails,
        rightSideBar,
        slug
    } = data?.props;


</script>

<DistrictAndPostOffice {allDistrict} {postOffice} {officeDetails} {trending_stories} {device} {language} {envDetails} {rightSideBar} {slug}/>
