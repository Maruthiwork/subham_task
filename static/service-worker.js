// @ts-nocheck
const CACHE_NAME = 'my-site-cache-v1';
const preconnectUrls = [
  "https://www.googletagmanager.com",
  "https://pagead2.googlesyndication.com",
  "https://securepubads.g.doubleclick.net",
  "https://tpc.googlesyndication.com",
  "https://65cc29418dc0b7e989df7f8b9e2fc4c1.safeframe.googlesyndication.com",
  "https://cm.g.doubleclick.net",
  "https://cdn.jsdelivr.net",
  "https://static.criteo.net",
  "https://gum.criteo.com",
  "https://img.republicworld.com",
  "https://tags.crwdcntrl.net",
  "https://bcp.crwdcntrl.net",
  "https://oa.openxcdn.net",
  "https://google-bidout-d.openx.net",
  "https://us-u.openx.net",
  "https://oajs.openx.net",
  "https://jp-u.openx.net",
  "https://public-api-dot-republic-world-prod.el.r.appspot.com",
  "https://cdn-ima.33across.com",
  "https://www.gstatic.com",
  "https://cr-p3.ladsp.com",
  "https://www.google.com",
  "https://fonts.googleapis.com",
  "https://match.adsrvr.org",
  "https://tg.socdm.com",
  "https://www.google-analytics.com"
];

const urlsNotToCache = [
  '/'
];

// self.addEventListener('install', (event) => {
//   async function addResourcesToCache() {
//     const cache = await caches.open(CACHE_NAME);
//     try {
//       await cache.addAll(preconnectUrls);
//     } catch (error) {
//       console.error('Failed to cache resources:', error);
//     }
//   }

//   // @ts-ignore
//   event.waitUntil(addResourcesToCache());
  
//   // Set a timeout to clear the cache after 5 minutes
//   setTimeout(async () => {
//     const cache = await caches.open(CACHE_NAME);
//     await cache.keys().then(keys => {
//       keys.forEach(request => {
//         cache.delete(request);
//       });
//     });
//     console.log('Cache cleared after 5 minutes');
//   }, 300000); // 5 minutes in milliseconds
// });

// self.addEventListener('fetch', (event) => {
//   if (event.request.method !== 'GET') return;

//   async function respond() {
//     const url = new URL(event.request.url);
//     const cache = await caches.open(CACHE_NAME);

//     if (urlsNotToCache.includes(url.pathname)) {
//       return fetch(event.request);
//     }

//     if (preconnectUrls.includes(url.href)) {
//       const cachedResponse = await cache.match(event.request);
//       if (cachedResponse) return cachedResponse;
//     }

//     try {
//       const response = await fetch(event.request);
//       if (response.status === 200 && !urlsNotToCache.includes(url.pathname)) {
//         cache.put(event.request, response.clone());
//       }
//       return response;
//     } catch {
//       return cache.match(event.request);
//     }
//   }

//   event.respondWith(respond());
// });

// self.addEventListener('activate', (event) => {
//   async function deleteOldCaches() {
//     for (const key of await caches.keys()) {
//       if (key !== CACHE_NAME) {
//         await caches.delete(key);
//       }
//     }
//   }
//   event.waitUntil(deleteOldCaches());
// });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'observeAd') {
    const { adId, adslot, usageCount } = event.data;
    observeAd(adId, adslot, usageCount);
  }
});

function observeAd(adId, adslot, usageCount) {
  // @ts-ignore
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'initAd',
        adId,
        adslot,
        usageCount
      });
    });
  });
}
