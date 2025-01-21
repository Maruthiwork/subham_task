<script lang="ts">
     import { onMount } from "svelte";
     import BannerAd from "../common/BannerAd/BannerAd.svelte";


     export let device: "desktop" | "mobile" = "desktop";
     export let envDetails: any = "";
     let adsDevice = device.charAt(0).toUpperCase() + device.slice(1);
     let adSlots: any = [];

     onMount(() => {
          generateAdSlots();
     });

     function generateAdSlots() {
          let j = 1; // Initialize the ad slot counter
          let usageCount = 0; // Keep track of usage count

          adSlots = Array.from({ length: 79 })
               .map((_, i) => {
                    if ((i + 1) % 1 === 0 && i > 0) {
                         let adslotIndex = j;

                         if (j > 4) {
                              // If the counter exceeds 5, reset to 5
                              adslotIndex = 4;
                         } else {
                              usageCount++;
                         }

                         j++; // Increment j to move to the next ad slot

                         return {
                              usageCount,
                              adslot: envDetails.adsFile?.[adsDevice]?.[
                                   `ADS_SLOT${adslotIndex}`
                              ]?.ads_page,
                         };
                    }
                    return null;
               })
               .filter(Boolean); // Remove null values
     }

     function goToHomePage() {
          if (typeof window !== "undefined" && envDetails?.language === "E") {
               window.location.href = "https://www.republicworld.com/?utm_source=button&utm_medium=back";
          }else if(typeof window !== "undefined" && envDetails?.language === "H"){
               window.location.href = "https://www.republicbharat.com/?utm_source=button&utm_medium=back";
          }
     }
</script>

<div class="adsPage">
     <button class="back-button" on:click={goToHomePage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               ><path
                    d="M15.5 3.5a.75.75 0 0 1 0 1.06L7.56 12.5l7.94 7.94a.75.75 0 1 1-1.06 1.06L6.5 12.53a.75.75 0 0 1 0-1.06L14.44 3.5a.75.75 0 0 1 1.06 0z"
               /></svg
          >
          <span>Back to Home</span>
     </button>
     <div class="contentWrapper">
          {#if device === "mobile"}
          <div class="mb-6">
               <BannerAd
                    adslot={envDetails.adsFile?.Mobile?.ATF?.ads_page}
               />
          </div>
          {/if}
          <div class="contentMainWrap">
               <div class="adunitWrapper">
                    {#each adSlots as adSlot, i}
                         <div class="adSlot">
                              <BannerAd
                                   usageCount={adSlot.usageCount}
                                   adslot={adSlot.adslot}
                              />
                         </div>
                    {/each}
               </div>
          </div>
          {#if device === "desktop"}
          <div class="sticky bottom-0">
               <BannerAd
                    adslot={envDetails.adsFile?.Desktop?.BOTTOM?.ads_page}
               />
          </div>
          {/if}
     </div>
</div>

<style>
     .adsPage {
          margin-top: 8px;
     }
     .adsPage .contentWrapper {
          max-width: 1230px;
     }

     .adsPage .contentMainWrap {
          grid-template-columns: calc(75% - 10px) calc(25.3% - 10px);
     }
     .adunitWrapper {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
     }
     .adSlot {
          width: 28.333333%;
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
          padding: 0 10px 0 0;
     }

     .back-button {
          display: inline-flex;
          align-items: center;
          margin: 10px;
          padding: 10px 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 16px;
          border-radius: 5px;
     }

     .back-button svg {
          fill: #fff;
          width: 24px;
          height: 24px;
     }

     @media screen and (min-width: 681px) and (max-width: 1024px) {
          .adSlot {
               width: 100%;
               display: flex;
               justify-content: center;
               margin-bottom: 15px;
               padding: 0 10px 0 0;
          }
     }

     @media (max-width: 680px) {
          .adSlot {
               width: 100%;
               display: flex;
               justify-content: center;
               margin-bottom: 15px;
               padding: 0 10px 0 0;
          }
     }
</style>
