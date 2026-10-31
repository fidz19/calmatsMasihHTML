/* CALMATS — interaksi ringan untuk header, keranjang, dan footer. */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const body = document.body;
  const mobileNav = $('#mobileNav');
  const cartDrawer = $('#cartDrawer');
  const overlayNav = $('.overlay[data-close-nav]');
  const overlayCart = $('.overlay[data-close-cart]');
  const toast = $('[data-toast]');
  let lastFocused = null;
  let toastTimer = null;

  /* ------------------------------------------------------------------ */
  /* Scroll lock                                                         */
  /* ------------------------------------------------------------------ */

  const lockScroll = (lock) => body.classList.toggle('is-locked', lock);

  /* ------------------------------------------------------------------ */
  /* Toast                                                               */
  /* ------------------------------------------------------------------ */

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                   */
  /* ------------------------------------------------------------------ */

  const setMobileNav = (open) => {
    if (!mobileNav) return;
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    $('[data-open-nav]')?.setAttribute('aria-expanded', String(open));

    if (open) {
      lastFocused = document.activeElement;
      overlayNav.hidden = false;
      requestAnimationFrame(() => overlayNav.classList.add('is-open'));
      lockScroll(true);
      $('[data-close-nav]', mobileNav)?.focus({ preventScroll: true });
    } else {
      overlayNav.classList.remove('is-open');
      setTimeout(() => { overlayNav.hidden = true; }, 250);
      $('[data-open-nav]')?.setAttribute('aria-expanded', 'false');
      if (!cartDrawer?.classList.contains('is-open')) lockScroll(false);
      lastFocused?.focus?.({ preventScroll: true });
    }
  };

  /* ------------------------------------------------------------------ */
  /* Cart drawer                                                         */
  /* ------------------------------------------------------------------ */

  const setCart = (open) => {
    if (!cartDrawer) return;
    cartDrawer.classList.toggle('is-open', open);
    cartDrawer.setAttribute('aria-hidden', String(!open));
    $('[data-open-cart]')?.setAttribute('aria-expanded', String(open));

    if (open) {
      lastFocused = document.activeElement;
      overlayCart.hidden = false;
      requestAnimationFrame(() => overlayCart.classList.add('is-open'));
      lockScroll(true);
      $('[data-close-cart]', cartDrawer)?.focus({ preventScroll: true });
    } else {
      overlayCart.classList.remove('is-open');
      setTimeout(() => { overlayCart.hidden = true; }, 250);
      $('[data-open-cart]')?.setAttribute('aria-expanded', 'false');
      if (!mobileNav?.classList.contains('is-open')) lockScroll(false);
      lastFocused?.focus?.({ preventScroll: true });
    }
  };

  $$('[data-open-nav]').forEach((btn) => btn.addEventListener('click', () => setMobileNav(true)));
  $$('[data-close-nav]').forEach((btn) => btn.addEventListener('click', () => setMobileNav(false)));
  $$('[data-open-cart]').forEach((btn) => btn.addEventListener('click', () => setCart(true)));
  $$('[data-close-cart]').forEach((btn) => btn.addEventListener('click', () => setCart(false)));

  /* ------------------------------------------------------------------ */
  /* Currency selector                                                   */
  /* ------------------------------------------------------------------ */

  const currency = $('[data-currency]');
  const currencyToggle = $('[data-currency-toggle]');
  const currencyMenu = $('[data-currency-menu]');

  const closeCurrency = () => {
    if (!currency || !currencyMenu) return;
    currency.classList.remove('is-open');
    currencyToggle.setAttribute('aria-expanded', 'false');
    setTimeout(() => { currencyMenu.hidden = true; }, 150);
  };

  const setCurrency = (code, flag, country) => {
    $$('[data-currency-code]').forEach((el) => { el.textContent = code; });
    $$('[data-currency-flag]').forEach((img) => { img.src = flag; });
    $$('[data-currency-option]').forEach((btn) => {
      const active = btn.dataset.code === code;
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-selected', String(active));
    });
    showToast(`Mata uang diubah ke ${code}${country ? ` · ${country}` : ''}`);
  };

  currencyToggle?.addEventListener('click', () => {
    if (!currencyMenu) return;
    const willOpen = currencyMenu.hidden;
    if (willOpen) {
      currencyMenu.hidden = false;
      currency.classList.add('is-open');
      currencyToggle.setAttribute('aria-expanded', 'true');
    } else {
      closeCurrency();
    }
  });

  $$('[data-currency-option]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const { code, flag, country } = btn.dataset;
      if (code && flag) setCurrency(code, flag, country);
      closeCurrency();
      setMobileNav(false);
    });
  });

  document.addEventListener('click', (event) => {
    if (currency && !currency.contains(event.target)) closeCurrency();
  });

  /* ------------------------------------------------------------------ */
  /* Footer accordions                                                   */
  /* ------------------------------------------------------------------ */

  const footerGroups = $$('.footer-group');
  const desktopFooter = window.matchMedia('(min-width: 640px)');

  const syncFooter = () => {
    footerGroups.forEach((group) => {
      if (desktopFooter.matches) {
        group.open = true;
      } else {
        group.open = false;
      }
    });
  };

  syncFooter();
  desktopFooter.addEventListener?.('change', syncFooter);

  /* ------------------------------------------------------------------ */
  /* Demo links                                                          */
  /* ------------------------------------------------------------------ */

  $$('[data-demo-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const label = link.dataset.demoLink;
      if (!label) return;
      event.preventDefault();
      setMobileNav(false);
      setCart(false);
      showToast(`${label} — halaman ini belum termasuk dalam demo statis.`);
    });
  });

  /* ------------------------------------------------------------------ */
  /* Global close / year                                                 */
  /* ------------------------------------------------------------------ */

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (currencyMenu && !currencyMenu.hidden) closeCurrency();
    if (mobileNav?.classList.contains('is-open')) setMobileNav(false);
    if (cartDrawer?.classList.contains('is-open')) setCart(false);
  });

  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
