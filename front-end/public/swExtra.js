import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('fetch', event => {
  if (event.request.url.includes('tile.openstreetmap.org')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('/offline.jpeg')
      )
    )
  }
})


self.addEventListener('push', event => {
  const data = event.data?.json() || {}

  event.waitUntil(
    self.registration.showNotification(data.title || "Weather Alert",{
      body: data.body || "Severe weather warning!",
      icon: "/pwa-192x192.png"
    })
  )

})