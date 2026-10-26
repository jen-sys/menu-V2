export type Category = 'Mie' | 'Dimsum' | 'Minuman' | 'Snack' | 'Paket Hemat'
export type Badge = 'Best Seller' | 'Baru' | 'Pedas'
export interface MenuItem { id: string; name: string; desc: string; price: number; category: Category; image: string; badge?: Badge; available: boolean }
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`
export const CATEGORIES: Category[] = ['Mie', 'Dimsum', 'Minuman', 'Snack', 'Paket Hemat']
// Foto = placeholder Unsplash. Jika ada yang tidak muncul, ganti URL-nya (ada fallback otomatis).
export const MENU: MenuItem[] = [
  { id: 'm1', name: 'Mie Signature Burgundy', desc: 'Mie telur kenyal, saus cabai rempah, ayam cincang, daun bawang.', price: 28000, category: 'Mie', image: u('photo-1569718212165-3a8278d5f624'), badge: 'Best Seller', available: true },
  { id: 'm2', name: 'Mie Gold Truffle', desc: 'Mie gurih dengan minyak jamur, telur onsen, dan bawang goreng.', price: 38000, category: 'Mie', image: u('photo-1555126634-323283e090fa'), badge: 'Baru', available: true },
  { id: 'm3', name: 'Mie Api Level Naga', desc: 'Untuk penantang pedas: cabai rawit, bubuk cabai, minyak bawang.', price: 27000, category: 'Mie', image: u('photo-1552611052-33e04de081de'), badge: 'Pedas', available: true },
  { id: 'd1', name: 'Dimsum Ayam Udang', desc: 'Lembut dan juicy, dikukus segar, 4 pcs.', price: 22000, category: 'Dimsum', image: u('photo-1563245372-f21724e3856d'), badge: 'Best Seller', available: true },
  { id: 'd2', name: 'Siomay Mentai', desc: 'Siomay dengan saus mentai dibakar ringan, 3 pcs.', price: 25000, category: 'Dimsum', image: u('photo-1496116218417-1a781b1c416c'), badge: 'Baru', available: true },
  { id: 'k1', name: 'Es Teh Melati', desc: 'Teh melati dingin, harum dan ringan.', price: 10000, category: 'Minuman', image: u('photo-1556679343-c7306c1976bc'), available: true },
  { id: 'k2', name: 'Es Jeruk Madu', desc: 'Jeruk peras segar dengan madu.', price: 14000, category: 'Minuman', image: u('photo-1621263764928-df1444c5e859'), available: true },
  { id: 's1', name: 'Pangsit Goreng Renyah', desc: 'Pangsit isi ayam, saus asam manis, 5 pcs.', price: 16000, category: 'Snack', image: u('photo-1541696432-82c6da8ce7bf'), available: true },
  { id: 'p1', name: 'Paket Mahasiswa', desc: 'Mie signature + es teh melati. Hemat dan mengenyangkan.', price: 34000, category: 'Paket Hemat', image: u('photo-1585032226651-759b368d7246'), badge: 'Best Seller', available: true },
  { id: 'p2', name: 'Paket Keluarga', desc: '3 mie, 2 dimsum, 3 minuman. Cukup untuk berempat.', price: 129000, category: 'Paket Hemat', image: u('photo-1547592180-85f173990554'), available: true }
]
export interface Topping { id: string; name: string; price: number }
export const TOPPINGS: Topping[] = [
  { id: 't1', name: 'Telur onsen', price: 6000 }, { id: 't2', name: 'Keju leleh', price: 4000 },
  { id: 't3', name: 'Ayam ekstra', price: 8000 }, { id: 't4', name: 'Bakso', price: 6000 }
]
export const hasOptions = (i: MenuItem) => i.category === 'Mie'
