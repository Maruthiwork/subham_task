<!-- RepublicAnchorTag.svelte -->
<script lang="ts">
  export let completeSlug: string;
  export let externalURL: string = ''; 
  export let storyType: string  = ''; 
  export let classes: string = 'black'; 
  export let style: any = ''; 
  export let title: any = '';

  
    let slug = completeSlug ?? '';
  
    const checkWeatherToAttachBaseURL = (slug: any) => {
      if (slug === '/') {
        return slug;
      }
      return !!slug.startsWith('http');
    }
    let completeURL = checkWeatherToAttachBaseURL(slug) ? slug : `${'/' + slug}`;
  
    const extractDomain = (url: any) => {
      const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
      return match ? match[1] : null;
    };
  
    let targetAttribute = (() => {
      if (completeSlug && externalURL) {
        const externalDomain = extractDomain(externalURL);
        const republicDomain = extractDomain(import.meta.env.VITE_REPUBLIC_URL);
  
        if (storyType === 'WEB_STORY' || (externalDomain && republicDomain && externalDomain !== republicDomain)) {
          return "_blank";
        }
      } else if (storyType === 'WEB_STORY') {
        return "_blank";
      }
  
      return "_self";
    })();
  </script>
  
  {#if completeSlug}
    <a data-sveltekit-reload href={completeURL} target={targetAttribute} style={style} class={classes} title={title}> 
      <slot></slot>
    </a>
 
  {:else}
  <slot></slot>
  {/if}
  