# Restoku
npm install && npm run dev  -> http://localhost:5173  (admin: /admin, PIN default 1234, ubah lewat .env: VITE_ADMIN_PIN)

## Audio notifikasi
Ganti file `public/sounds/payment-success.mp3` (atau ubah PAYMENT_SOUND di src/hooks/useAudioNotification.ts).
Dipicu: customer klik "Saya sudah bayar" dan admin saat pesanan baru masuk. Jika file kosong/diblokir browser -> bunyi bell sintetis.

## Catatan
Data (pesanan, logs, keranjang) disimpan di localStorage dan tersinkron antar-tab lewat polling. Untuk multi-perangkat, ganti src/store/useOrders.ts & useLogs.ts dengan Supabase (tabel: menus, orders, order_items, logs + Realtime).
