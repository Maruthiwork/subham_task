<script lang="ts">
  import vimalLogo from "$lib/assets/images/404.png";
  import SEO from "$lib/components/SEO/index.svelte";
  import {
    loadMgidScript,
    removeLeadingSlash,
    useIntersectionObserver,
  } from "../utils/utils";

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
  slug={"/404"}
  pathname={"/404"}
  title={"Page Not Found"}
  site_details={envDetails}
/>

<div style="border-bottom: 1px solid #d6d6d6;"></div>
<div>
  <center class="pagenotfoundContent">
    <div style="font-size: 20px; color: rgba(0,0,0,.64);">
      Oops... Something went Wrong!
    </div>
    <h4>PAGE NOT FOUND</h4>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src={vimalLogo}
      width={200}
      height={150}
      style="object-fit: contain;"
      alt="404 Image"
    />
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
