// sw.js
self.addEventListener('install', event => {
  // 即時アクティベート
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// 通知クリック時の挙動
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        // 既存ウィンドウがあればフォーカス
        return clientList[0].focus();
      }
      // なければルートを開く
      return clients.openWindow('/');
    })
  );
});