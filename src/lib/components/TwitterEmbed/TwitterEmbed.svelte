<script>
    import { onMount } from 'svelte';
    export let twitterHandle = 'banglarepublic'  // for kanaada send kannadarepublic
  
    onMount(() => {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.charset = "utf-8";
      script.defer = true;
      document.body.appendChild(script);
    });
  </script>
  
  <style>
    .tweet-wrapper {
      width: 100%;
      max-width: 400px;
      min-width: 250px;
      margin: 0 auto;
      border: 1px solid #dddddd;
      box-shadow: 2px 2px 10px rgba(221, 221, 221, 0.5);
      background-color: white;
      min-height: 365px;
      max-height: 890px;
      overflow-y: auto;
    }

  </style>
  
  <!-- Twitter Timeline Embed -->
  <div class="tweet-wrapper">
    <a class="twitter-timeline" href="https://twitter.com/{twitterHandle}">Tweets by {twitterHandle}</a>
  </div>
  