<script lang="ts">

    import PollList from "$lib/components/PollList/PollList.svelte";
    export let data: any;
    const {
      pollList,
      trending_stories,
      rightSideBar,
      device,
      language,
      envDetails,
      getParentCategory
    } = data?.props;




  
  </script>
  
  <PollList pollList={pollList} trending_stories={trending_stories} {language} {envDetails} {device} {rightSideBar} siteNavigation={getParentCategory} />