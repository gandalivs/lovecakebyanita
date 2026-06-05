import { CategoryRepository } from './repositories/category-repository.js';
import { ProductPageRepository } from './repositories/product-page-repository.js';
import { ProductRepository } from './repositories/product-repository.js';
import { SettingsRepository } from './repositories/settings-repository.js';

const state = {
  search: '',
  categoryId: 'all',
  sortBy: 'featured',
  page: 1
};

const formatCurrency = (value, currency) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency,
  maximumFractionDigits: 0
}).format(value);

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const createWhatsappUrl = (settings, message) => `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(message)}`;

const replaceTemplate = (template, replacements) => Object.entries(replacements).reduce(
  (output, [key, value]) => output.replaceAll(`{{${key}}}`, escapeHtml(value)),
  template
);

const getQueryValue = (key) => new URLSearchParams(window.location.search).get(key);

const updateUrl = () => {
  const params = new URLSearchParams();

  if (state.search) {
    params.set('search', state.search);
  }

  if (state.categoryId !== 'all') {
    params.set('category', state.categoryId);
  }

  if (state.sortBy !== 'featured') {
    params.set('sort', state.sortBy);
  }

  if (state.page > 1) {
    params.set('page', String(state.page));
  }

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, '', nextUrl);
};

const renderHero = (pageContent) => {
  const container = document.querySelector('[data-products-hero]');

  container.innerHTML = `
    <div class="mx-auto max-w-4xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${escapeHtml(pageContent.hero.eyebrow)}</p>
      <h1 class="mt-5 font-heading text-hero-mobile font-semibold leading-[1.05] text-darkBrown md:text-hero-tablet xl:text-hero-desktop">${escapeHtml(pageContent.hero.title)}</h1>
      <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-darkBrown/70 md:text-body-lg">${escapeHtml(pageContent.hero.description)}</p>
    </div>
  `;
};

const createCategoryButton = (categoryId, label) => `
  <button type="button" class="rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2 ${String(state.categoryId) === String(categoryId) ? 'bg-chocolate text-white shadow-lg' : 'bg-cream text-chocolate hover:bg-softPink'}" data-category-filter="${escapeHtml(categoryId)}">
    ${escapeHtml(label)}
  </button>
`;

const renderControls = (pageContent, categories) => {
  const container = document.querySelector('[data-products-controls]');

  container.innerHTML = `
    <div class="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <label class="block">
        <span class="text-sm font-semibold text-darkBrown">${escapeHtml(pageContent.controls.search_label)}</span>
        <input type="search" value="${escapeHtml(state.search)}" placeholder="${escapeHtml(pageContent.controls.search_placeholder)}" class="mt-3 h-14 w-full rounded-2xl border border-chocolate/10 bg-white px-5 text-base text-darkBrown shadow-sm outline-none transition-all duration-300 ease-out placeholder:text-darkBrown/40 focus:border-chocolate focus:ring-2 focus:ring-chocolate/20" data-products-search>
      </label>
      <label class="block lg:min-w-64">
        <span class="text-sm font-semibold text-darkBrown">${escapeHtml(pageContent.controls.sort_label)}</span>
        <select class="mt-3 h-14 w-full rounded-2xl border border-chocolate/10 bg-white px-5 text-base font-medium text-darkBrown shadow-sm outline-none transition-all duration-300 ease-out focus:border-chocolate focus:ring-2 focus:ring-chocolate/20" data-products-sort>
          ${pageContent.sort_options.map((option) => `
            <option value="${escapeHtml(option.value)}" ${state.sortBy === option.value ? 'selected' : ''}>${escapeHtml(option.label)}</option>
          `).join('')}
        </select>
      </label>
    </div>
    <div class="mt-6">
      <p class="sr-only">${escapeHtml(pageContent.controls.category_label)}</p>
      <div class="flex gap-3 overflow-x-auto pb-2" role="list" aria-label="${escapeHtml(pageContent.controls.category_label)}">
        ${createCategoryButton('all', pageContent.controls.all_categories_label)}
        ${categories.map((category) => createCategoryButton(category.id, category.name)).join('')}
      </div>
    </div>
  `;
};

const createProductCard = (template, product, context) => {
  const category = context.categoryById.get(product.category_id);
  const categoryName = category?.name || product.weight;
  const fallbackThumbnail = category?.thumbnail || product.thumbnail;
  const badgeLabel = product.is_best_seller
    ? context.pageContent.product_card.best_seller_label
    : context.pageContent.product_card.featured_label;
  const badgeClass = product.is_best_seller || product.is_featured ? '' : 'hidden';
  const orderMessage = context.pageContent.product_card.order_message_template.replace('{product_name}', product.name);

  return replaceTemplate(template, {
    thumbnail: product.thumbnail,
    fallback_thumbnail: fallbackThumbnail,
    name: product.name,
    badge_class: badgeClass,
    badge_label: badgeLabel,
    category_name: categoryName,
    weight: product.weight,
    short_description: product.short_description,
    price: formatCurrency(product.price, context.settings.currency),
    order_url: createWhatsappUrl(context.settings, orderMessage),
    order_aria_label: `${context.pageContent.product_card.order_label} ${product.name}`,
    order_label: context.pageContent.product_card.order_label
  });
};

const activateImageFallbacks = (container) => {
  container.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;

      if (fallback && image.src !== fallback) {
        image.src = fallback;
      }
    }, { once: true });
  });
};

const renderSummary = (pageContent, catalog) => {
  const container = document.querySelector('[data-products-summary]');
  const noun = catalog.total_items === 1 ? pageContent.controls.result_singular : pageContent.controls.result_plural;

  container.innerHTML = `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm font-semibold text-darkBrown/70">${catalog.total_items} ${escapeHtml(noun)}</p>
      <p class="text-sm text-darkBrown/55">${catalog.current_page} / ${catalog.total_pages}</p>
    </div>
  `;
};

const renderProducts = (pageContent, catalog, template, context) => {
  const container = document.querySelector('[data-products-grid]');

  if (!catalog.products.length) {
    container.className = 'mt-8';
    container.innerHTML = `
      <div class="rounded-3xl bg-white p-8 text-center shadow-lg">
        <h2 class="font-heading text-3xl font-semibold text-darkBrown">${escapeHtml(pageContent.controls.empty_title)}</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-darkBrown/65">${escapeHtml(pageContent.controls.empty_description)}</p>
        <button type="button" class="mt-6 rounded-full bg-chocolate px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2" data-products-reset>${escapeHtml(pageContent.controls.reset_label)}</button>
      </div>
    `;
    return;
  }

  container.className = 'mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  container.innerHTML = catalog.products.map((product) => createProductCard(template, product, context)).join('');
  activateImageFallbacks(container);
};

const createPaginationButton = (label, page, isActive = false, isDisabled = false) => `
  <button type="button" class="min-h-11 min-w-11 rounded-full px-4 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2 ${isActive ? 'bg-chocolate text-white shadow-lg' : 'bg-white text-chocolate shadow-sm hover:bg-softPink'} disabled:cursor-not-allowed disabled:bg-white/60 disabled:text-darkBrown/35 disabled:shadow-none" data-page="${page}" ${isDisabled ? 'disabled' : ''} aria-current="${isActive ? 'page' : 'false'}">
    ${escapeHtml(label)}
  </button>
`;

const renderPagination = (pageContent, catalog) => {
  const container = document.querySelector('[data-products-pagination]');

  if (catalog.total_pages <= 1) {
    container.innerHTML = '';
    return;
  }

  const pages = Array.from({ length: catalog.total_pages }, (_, index) => index + 1);

  container.innerHTML = `
    <nav class="flex flex-wrap items-center justify-center gap-3" aria-label="${escapeHtml(pageContent.controls.pagination_label)}">
      ${createPaginationButton(pageContent.controls.previous_label, catalog.current_page - 1, false, catalog.current_page === 1)}
      ${pages.map((page) => createPaginationButton(String(page), page, page === catalog.current_page)).join('')}
      ${createPaginationButton(pageContent.controls.next_label, catalog.current_page + 1, false, catalog.current_page === catalog.total_pages)}
    </nav>
  `;
};

const bindEvents = (pageContent, categories, render) => {
  const controls = document.querySelector('[data-products-controls]');
  const grid = document.querySelector('[data-products-grid]');
  const pagination = document.querySelector('[data-products-pagination]');

  controls.addEventListener('input', (event) => {
    if (!event.target.matches('[data-products-search]')) {
      return;
    }

    state.search = event.target.value.trim();
    state.page = 1;
    render();
  });

  controls.addEventListener('change', (event) => {
    if (!event.target.matches('[data-products-sort]')) {
      return;
    }

    state.sortBy = event.target.value;
    state.page = 1;
    render();
  });

  controls.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category-filter]');

    if (!button) {
      return;
    }

    state.categoryId = button.dataset.categoryFilter;
    state.page = 1;
    render();
  });

  grid.addEventListener('click', (event) => {
    if (!event.target.matches('[data-products-reset]')) {
      return;
    }

    state.search = '';
    state.categoryId = 'all';
    state.sortBy = pageContent.sort_options[0].value;
    state.page = 1;
    render();
  });

  pagination.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');

    if (!button || button.disabled) {
      return;
    }

    state.page = Number(button.dataset.page);
    render();
  });
};

const hydrateStateFromUrl = (categories, pageContent) => {
  const categoryQuery = getQueryValue('category');
  const categoryMatch = categories.find((category) => String(category.id) === categoryQuery || category.slug === categoryQuery);
  const sortQuery = getQueryValue('sort');
  const sortMatch = pageContent.sort_options.some((option) => option.value === sortQuery);

  state.search = getQueryValue('search') || '';
  state.categoryId = categoryMatch ? String(categoryMatch.id) : 'all';
  state.sortBy = sortMatch ? sortQuery : pageContent.sort_options[0].value;
  state.page = Number(getQueryValue('page')) || 1;
};

const initProductsPage = async () => {
  const [pageContent, categories, settings, cardTemplate] = await Promise.all([
    ProductPageRepository.getAll(),
    CategoryRepository.getAll(),
    SettingsRepository.getAll(),
    fetch('/components/product-card.html').then((response) => response.text())
  ]);

  const orderedCategories = [...categories].sort((a, b) => a.display_order - b.display_order);
  const context = {
    pageContent,
    settings,
    categoryById: new Map(orderedCategories.map((category) => [category.id, category]))
  };

  hydrateStateFromUrl(orderedCategories, pageContent);
  renderHero(pageContent);

  const render = async () => {
    const catalog = await ProductRepository.getCatalog({
      search: state.search,
      categoryId: state.categoryId,
      sortBy: state.sortBy,
      page: state.page,
      perPage: pageContent.pagination.items_per_page
    });

    state.page = catalog.current_page;
    renderControls(pageContent, orderedCategories);
    renderSummary(pageContent, catalog);
    renderProducts(pageContent, catalog, cardTemplate, context);
    renderPagination(pageContent, catalog);
    updateUrl();
  };

  bindEvents(pageContent, orderedCategories, render);
  render();
};

document.addEventListener('DOMContentLoaded', () => {
  initProductsPage().catch((error) => console.error(error));
});
