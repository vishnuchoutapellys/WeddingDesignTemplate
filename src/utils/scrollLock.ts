let _scrollY = 0;
const _touchHandler = (e: TouchEvent) => {
  if (e.touches && e.touches.length > 0) e.preventDefault();
};

export function lockBodyScroll() {
  _scrollY = window.scrollY || window.pageYOffset || 0;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.addEventListener('touchmove', _touchHandler, { passive: false });
}

export function unlockBodyScroll() {
  document.removeEventListener('touchmove', _touchHandler);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.documentElement.style.overflow = '';
  window.scrollTo(0, _scrollY);
}

export default { lockBodyScroll, unlockBodyScroll };
