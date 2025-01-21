<script lang="ts">
  import {
    loadMgidScript,
    removeLeadingSlash,
    useIntersectionObserver,
  } from "../utils/utils";
  import SEO from "$lib/components/SEO/index.svelte";

  export let envDetails: any = {};
  export let language: string = "E";
  export let nav_bar: any = {};
  export let canonicalUrl: string = "";
  export let isAmp: boolean = false;


  let navData: any[] = nav_bar;

  useIntersectionObserver(
    "migid-container",
    0.1,
    () => loadMgidScript(envDetails?.language)
  );
</script>

<SEO
  {isAmp}
  lang={language}
  {canonicalUrl}
  slug={"/500"}
  pathname={"/500"}
  title={"Internal Server Error"}
  site_details={envDetails}
  siteNavigation={nav_bar}
/>

<div style="border-bottom: 1px solid #d6d6d6;"></div>
<div>
  <center class="pagenotfoundContent">
    <h1>Error 500</h1>
    <div style={`font-size: 20px; color: "rgba(0,0,0,.64)"`}>
      Oops... Something went Wrong!
    </div>
    <p>Sorry for the inconvenience, we're working on it.</p>
    <div class="backbtn">
      <a href={envDetails.allDomainList?.[0]?.url}> Back </a>
    </div>
    <div class="quickLinks">
      <h2>Quick Links</h2>
      <div class="navbarDataWrapper pb16">
        {#each navData as item, i}
          <div>
            <a
              href={item?.frontend_name === "Trending 2024"
                ? item?.completeSlug
                : `${envDetails.allDomainList?.[0]?.url}/` +
                  removeLeadingSlash(item?.completeSlug ?? "")}
            >
              {item?.frontend_name ?? item?.name}
            </a>
          </div>
        {/each}
      </div>
    </div>
  </center>
  <div class="contentWrapper" style="border-bottom: 1px solid #d6d6d6;"></div>
  <div class="latestNewsData contentWrapper fourColFlex flexwrap gap16 pt16">
    <!-- Add your content here -->
  </div>
  <div class="contentWrapper">
    <div id="migid-container" />
  </div>
</div>
