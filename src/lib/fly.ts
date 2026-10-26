// Animasi "terbang" ke ikon keranjang (Web Animations API, GPU-friendly)
export function flyToCart(from: HTMLElement) {
  const to = document.getElementById('cart-btn')
  if (!to || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const a = from.getBoundingClientRect(), b = to.getBoundingClientRect()
  const dot = document.createElement('div')
  Object.assign(dot.style, { position: 'fixed', left: `${a.left + a.width / 2 - 10}px`, top: `${a.top + a.height / 2 - 10}px`, width: '20px', height: '20px', borderRadius: '50%', background: '#D4A24C', zIndex: '999', pointerEvents: 'none', boxShadow: '0 0 16px #D4A24C' })
  document.body.appendChild(dot)
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2)
  dot.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(.3)`, opacity: 0.4 }], { duration: 650, easing: 'cubic-bezier(.5,-0.2,.7,.4)' }).onfinish = () => {
    dot.remove(); to.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 300 })
  }
}
