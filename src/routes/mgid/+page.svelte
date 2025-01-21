<script lang="ts">
  export let data: any;

  const { envDetails } = data.props;

  let widgetAttributes: any = {};

  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, key) => {
      widgetAttributes[`${key}`] = value;
    });
  }
</script>

<svelte:head>
  {#if envDetails?.language == "E"}
    <script
      type="text/javascript"
      src="https://jsc.mgid.com/site/958314.js"
      async
      defer
    ></script>
  {:else if envDetails?.language == "RB"}
    <script
      type="text/javascript"
      src="https://jsc.mgid.com/site/960470.js"
      async
      defer
    ></script>
  {/if}
</svelte:head>

<div class="contentWrapper">
  <div data-type="_mgwidget" {...widgetAttributes}></div>
  <script>
    (function (w, q) {
      w[q] = w[q] || [];
      w[q].push(["_mgc.load"]);
    })(window, "_mgq");
  </script>
</div>
