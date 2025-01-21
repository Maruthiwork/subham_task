const adDomains = [
    "https://www.googletagmanager.com",
    "https://securepubads.g.doubleclick.net",
    "https://pagead2.googlesyndication.com",
    "https://adservice.google.com",
    "https://tpc.googlesyndication.com",
    "https://partner.googleadservices.com",
    "https://googleads.g.doubleclick.net",
];


self.addEventListener('install', event => {
    console.log('Service Worker installed.');
});

self.addEventListener('fetch', event => {
    const requestUrl = event.request.url;
  
    if (event.request.url.includes('/ads') || adDomains.some(domain => requestUrl.startsWith(domain))) {
        // Intercept ad requests
        event.respondWith(
            fetch(event.request).then(response => {
                // You can process the response here if needed
                return response;
            }).catch(error => {
                console.error('Failed to fetch ad:', error);
                return new Response('Ad fetch failed', { status: 503 });
            })
        );
    } 
});
