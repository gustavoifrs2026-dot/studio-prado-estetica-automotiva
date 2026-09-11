const CACHE="studio-prado-v1";
const ASSETS=["./","index.html","styles.css","app.js","manifest.json","assets/logo.jpg",
"assets/trabalho-1.jpg","assets/trabalho-2.jpg","assets/trabalho-3.jpg","assets/trabalho-4.jpg",
"assets/trabalho-5.jpg","assets/trabalho-6.jpg","assets/trabalho-7.jpg","assets/trabalho-8.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
