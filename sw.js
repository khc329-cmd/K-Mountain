const CACHE='kp-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.add('/')));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(res=>{try{const u=new URL(e.request.url);if(res&&res.ok&&u.origin===location.origin&&(u.pathname==='/'||u.pathname==='/index.html')){const copy=res.clone();caches.open(CACHE).then(c=>c.put('/',copy));}}catch(err){}return res;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/'))));return;}e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
