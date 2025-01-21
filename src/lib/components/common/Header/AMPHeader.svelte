<script lang="ts">
  import AmpHamburgerModal from "./AmpHamburgerModal.svelte";

  export let nav_bar: any = [];
  export let envDetails;
  export let searchSlug: string = "";
  export let trendingbarData: any = [];

  let searchInput = searchSlug;
</script>

<AmpHamburgerModal {nav_bar} {envDetails} {searchSlug} {trendingbarData} />

<div
  style={`background-color:${envDetails.bgColor}; width:100%; max-width:1022px;align-items:center;`}
  class="topheader top-0 p-3 flex justify-between sticky z-50 max-w-full mx-auto my-0 desktop:max-w-5xl h-20 desktop:w-full"
>
  <div>
    <div class="flex items-center justify-between gap-2">
      <a href="/amp">
        <div class="logo">
          <amp-img
            src={envDetails.siteLogo}
            alt="Republic TV Logo"
            width="172"
            height="62"
            style="object-fit: contain;"
            layout="responsive"
          />
        </div>
      </a>
      <div class="custom-select">
        <select
          style="width: 17px; background: transparent;padding:0px 8px;"
          on="change:AMP.navigateTo(url=event.value, target='_top')"
        >
          {#if envDetails?.allDomainList.length > 0}
            {#each envDetails?.allDomainList as { name, url }, index}
              <option
                value={`${url}amp`}
                style={`color: ${index === 0 ? "#D10014" : "#000"};`}
              >
                {name}
              </option>
            {/each}
          {/if}
        </select>
      </div>
    </div>
  </div>
  <button
    on="tap:sidebar.toggle"
    class="ampstart-navbar-trigger leading-[3.5rem] text-[2rem] float-right"
    style="background-image: url('https://img.republicworld.com/icons/icons/menu-icon.svg');width:26px;height:28px;"
  >
  </button>
</div>
