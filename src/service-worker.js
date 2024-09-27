// 서비스 워커 전용 스코프에서 실행되는 이벤트 리스너 등록
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(fetch(event.request));
});
