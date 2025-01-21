<script lang="ts">
  import AuthorsList from "$lib/components/AnchorsAuthors/AuthorsList.svelte";
    export let data: any;
    const {
      author_list,
      trending_stories,
      rightSideBar,
      device,
      language,
      envDetails,
      getParentCategory
    } = data?.props;

  </script>

  {#if author_list}
    <AuthorsList authorList={author_list.data} trending_stories={trending_stories} language={language} device={device} {envDetails} {rightSideBar} siteNavigation={getParentCategory}  />
  {/if}

  