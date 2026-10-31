(() => {
  'use strict';
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('[data-product]'));
  const search = document.querySelector('[data-search]');
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-empty]');
  const sort = document.querySelector('[data-sort]');
  const filterPanel = document.querySelector('#catalogFilters');
  const filterToggle = document.querySelector('[data-filter-toggle]');

  const selectedValue = (selector) => document.querySelector(`${selector}:checked`)?.value || 'all';
  const applyFilters = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const type = selectedValue('[data-type-filter]');
    const price = selectedValue('[data-price-filter]');
    const inStock = document.querySelector('[data-availability]')?.checked;
    const sizes = Array.from(document.querySelectorAll('[data-size-filter]:checked'), (input) => input.value);
    let shown = 0;

    cards.forEach((card) => {
      const amount = Number(card.dataset.price);
      const inPriceRange = price === 'all'
        || (price === 'under' && amount < 690000)
        || (price === 'mid' && amount >= 690000 && amount <= 780000)
        || (price === 'high' && amount > 780000 && amount <= 870000)
        || (price === 'top' && amount > 870000);
      const matches = card.dataset.name.toLocaleLowerCase().includes(query)
        && (type !== 'featured' || card.dataset.featured === 'true')
        && (!inStock || card.dataset.available === 'true')
        && inPriceRange
        && (!sizes.length || sizes.some((size) => card.dataset.sizes.split(' ').includes(size)));
      card.hidden = !matches;
      if (matches) shown += 1;
    });

    count.textContent = String(shown);
    empty.hidden = shown !== 0;
  };

  const sortCards = () => {
    const mode = sort.value;
    const ordered = [...cards].sort((a, b) => {
      const nameOrder = a.dataset.name.localeCompare(b.dataset.name);
      switch (mode) {
        case 'recent': return Number(a.dataset.order) - Number(b.dataset.order);
        case 'oldest': return Number(b.dataset.order) - Number(a.dataset.order);
        case 'popular': return a.dataset.featured === b.dataset.featured ? Number(a.dataset.order) - Number(b.dataset.order) : a.dataset.featured === 'true' ? -1 : 1;
        case 'price-asc': return Number(a.dataset.price) - Number(b.dataset.price);
        case 'price-desc': return Number(b.dataset.price) - Number(a.dataset.price);
        case 'name-asc': return nameOrder;
        case 'name-desc': return -nameOrder;
        default: return Number(a.dataset.order) - Number(b.dataset.order);
      }
    });
    ordered.forEach((card) => grid.append(card));
  };

  document.querySelectorAll('[data-search], [data-type-filter], [data-price-filter], [data-availability], [data-size-filter]')
    .forEach((control) => control.addEventListener('input', applyFilters));
  sort.addEventListener('change', sortCards);
  document.querySelector('[data-reset-filters]').addEventListener('click', () => {
    search.value = '';
    document.querySelector('[data-type-filter][value="all"]').checked = true;
    document.querySelector('[data-price-filter][value="all"]').checked = true;
    document.querySelector('[data-availability]').checked = false;
    document.querySelectorAll('[data-size-filter]').forEach((input) => { input.checked = false; });
    applyFilters();
  });
  filterToggle.addEventListener('click', () => {
    const open = filterPanel.classList.toggle('is-open');
    filterToggle.setAttribute('aria-expanded', String(open));
  });
})();
