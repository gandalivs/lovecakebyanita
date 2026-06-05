import { CategoryRepository } from './repositories/category-repository.js';
import { ProductDetailPageRepository } from './repositories/product-detail-page-repository.js';
import { ProductRepository } from './repositories/product-repository.js';
import { SettingsRepository } from './repositories/settings-repository.js';

const state = {
  activeImage: ''
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

const getQueryValue = (key) => new URLSearchParams(window.location.search).get(key);

const replaceMessage = (template, product, settings) => template
  .replaceAll('{product_name}', product.name)
  .replaceAll('{product_price}', formatCurrency(product.price, settings.currency));

const getGalleryImages = (product) => [product.thumbnail, ...(product.gallery || [])]
  .filter(Boolean)
  .filter((image, index, images) => images.indexOf(image) === index);

const createImageFallback = (container, fallbackImage) => {
  container.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      if (image.src !== fallbackImage) {
        image.src = fallbackImage;
      }
    }, { once: true });
  });
};

const getCategoryName = (product, categories) => {
  const category = categories.find((item) => item.id === product.category_id);
  return category?.name || product.weight;
};

const renderEmptyState = (content) => {
  const detailContainer = document.querySelector('[data-product-detail]');
  const relatedContainer = document.querySelector('[data-related-products]');

  detailContainer.innerHTML = `
    <div class="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-premium">
      <h1 class="font-heading text-section-mobile font-semibold text-darkBrown md:text-section-desktop">${escapeHtml(content.empty_state.title)}</h1>
      <p class="mx-auto mt-4 max-w-xl text-base leading-8 text-darkBrown/65">${escapeHtml(content.empty_state.description)}</p>
      <a href="${escapeHtml(content.empty_state.button_url)}" class="mt-8 inline-flex rounded-full bg-chocolate px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2">${escapeHtml(content.empty_state.button_label)}</a>
    </div>
  `;
  relatedContainer.innerHTML = '';
};

const createBadge = (label) => `
  <span class="rounded-full bg-softPink px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-chocolate">${escapeHtml(label)}</span>
`;

const renderGallery = (product, content, images) => `
  <div aria-label="${escapeHtml(content.gallery.label)}">
    <div class="overflow-hidden rounded-3xl bg-white shadow-premium">
      <img src="${escapeHtml(state.activeImage)}" alt="${escapeHtml(product.name)}" class="aspect-square w-full object-cover lg:aspect-[4/5]" data-product-main-image data-fallback="${escapeHtml(product.thumbnail)}" fetchpriority="high">
    </div>
    <div class="mt-4 grid grid-cols-4 gap-3">
      ${images.map((image) => `
        <button type="button" class="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2 ${image === state.activeImage ? 'ring-2 ring-chocolate ring-offset-2 ring-offset-cream' : ''}" data-gallery-image="${escapeHtml(image)}" aria-label="${escapeHtml(content.gallery.thumbnail_label)}">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}" class="aspect-square w-full object-cover" data-fallback="${escapeHtml(product.thumbnail)}" loading="lazy" decoding="async">
        </button>
      `).join('')}
    </div>
  </div>
`;

const renderInformation = (product, categoryName, content, settings) => {
  const orderMessage = replaceMessage(content.cta.message_template, product, settings);
  const orderUrl = createWhatsappUrl(settings, orderMessage);

  return `
    <div class="lg:sticky lg:top-28">
      <a href="${escapeHtml(content.navigation.back_url)}" class="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-chocolate shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-softPink focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2">${escapeHtml(content.navigation.back_label)}</a>
      <div class="mt-8 flex flex-wrap gap-3">
        ${product.is_best_seller ? createBadge(content.information.best_seller_label) : ''}
        ${product.is_featured ? createBadge(content.information.featured_label) : ''}
      </div>
      <p class="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${escapeHtml(categoryName)}</p>
      <h1 class="mt-4 font-heading text-hero-mobile font-semibold leading-[1.05] text-darkBrown md:text-hero-tablet">${escapeHtml(product.name)}</h1>
      <p class="mt-5 text-base leading-8 text-darkBrown/70 md:text-body-lg">${escapeHtml(product.short_description)}</p>
      <p class="mt-8 font-heading text-4xl font-semibold text-chocolate">${escapeHtml(formatCurrency(product.price, settings.currency))}</p>
      <dl class="mt-8 grid gap-4 sm:grid-cols-3">
        <div class="rounded-3xl bg-white p-5 shadow-lg">
          <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-darkBrown/50">${escapeHtml(content.information.category_label)}</dt>
          <dd class="mt-2 font-semibold text-darkBrown">${escapeHtml(categoryName)}</dd>
        </div>
        <div class="rounded-3xl bg-white p-5 shadow-lg">
          <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-darkBrown/50">${escapeHtml(content.information.weight_label)}</dt>
          <dd class="mt-2 font-semibold text-darkBrown">${escapeHtml(product.weight)}</dd>
        </div>
        <div class="rounded-3xl bg-white p-5 shadow-lg">
          <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-darkBrown/50">${escapeHtml(content.information.stock_label)}</dt>
          <dd class="mt-2 font-semibold text-darkBrown">${escapeHtml(content.information.available_label)}</dd>
        </div>
      </dl>
      <div class="mt-8 rounded-3xl bg-white p-6 shadow-lg">
        <h2 class="font-heading text-2xl font-semibold text-darkBrown">${escapeHtml(content.information.description_title)}</h2>
        <p class="mt-4 text-sm leading-7 text-darkBrown/70">${escapeHtml(product.description)}</p>
      </div>
      <a href="${orderUrl}" class="mt-8 flex w-full items-center justify-center rounded-full bg-chocolate px-7 py-4 text-sm font-semibold text-white shadow-premium transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2">${escapeHtml(content.cta.label)}</a>
    </div>
  `;
};

const renderProductDetail = (product, categories, content, settings) => {
  const container = document.querySelector('[data-product-detail]');
  const images = getGalleryImages(product);
  const categoryName = getCategoryName(product, categories);

  state.activeImage = state.activeImage || images[0] || product.thumbnail;

  container.innerHTML = `
    <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
      ${renderGallery(product, content, images)}
      ${renderInformation(product, categoryName, content, settings)}
    </div>
  `;

  createImageFallback(container, product.thumbnail);
};

const createRelatedCard = (product, categoryName, content, settings) => {
  const orderMessage = replaceMessage(content.related.order_message_template, product, settings);

  return `
    <article class="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-2">
      <img src="${escapeHtml(product.thumbnail)}" alt="${escapeHtml(product.name)}" class="aspect-square w-full object-cover transition-all duration-300 ease-out group-hover:scale-105" loading="lazy" decoding="async">
      <div class="flex flex-1 flex-col p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.12em] text-chocolate/65">${escapeHtml(categoryName)} • ${escapeHtml(product.weight)}</p>
        <h3 class="mt-3 font-heading text-2xl font-semibold leading-tight text-darkBrown">${escapeHtml(product.name)}</h3>
        <p class="mt-3 flex-1 text-sm leading-6 text-darkBrown/65">${escapeHtml(product.short_description)}</p>
        <div class="mt-6 flex items-center justify-between gap-4">
          <p class="font-semibold text-chocolate">${escapeHtml(formatCurrency(product.price, settings.currency))}</p>
          <a href="${createWhatsappUrl(settings, orderMessage)}" class="rounded-full bg-chocolate px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2" aria-label="${escapeHtml(`${content.related.order_label} ${product.name}`)}">${escapeHtml(content.related.order_label)}</a>
        </div>
      </div>
    </article>
  `;
};

const renderRelatedProducts = (products, categories, content, settings) => {
  const container = document.querySelector('[data-related-products]');

  if (!products.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${escapeHtml(content.related.eyebrow)}</p>
      <h2 class="mt-4 font-heading text-section-mobile font-semibold leading-tight text-darkBrown md:text-section-desktop">${escapeHtml(content.related.title)}</h2>
      <p class="mt-4 text-base leading-8 text-darkBrown/70 md:text-body-lg">${escapeHtml(content.related.description)}</p>
    </div>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${products.map((product) => createRelatedCard(product, getCategoryName(product, categories), content, settings)).join('')}
    </div>
  `;
};

const bindGallery = (product, categories, content, settings) => {
  const container = document.querySelector('[data-product-detail]');

  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-gallery-image]');

    if (!button) {
      return;
    }

    state.activeImage = button.dataset.galleryImage;
    renderProductDetail(product, categories, content, settings);
  });
};

const loadProductFromUrl = async () => {
  const id = getQueryValue('id');
  const slug = getQueryValue('slug');

  if (id) {
    return ProductRepository.getById(id);
  }

  if (slug) {
    return ProductRepository.getBySlug(slug);
  }

  return null;
};

const initProductDetailPage = async () => {
  const [content, categories, settings, product] = await Promise.all([
    ProductDetailPageRepository.getAll(),
    CategoryRepository.getAll(),
    SettingsRepository.getAll(),
    loadProductFromUrl()
  ]);

  if (!product) {
    renderEmptyState(content);
    return;
  }

  const relatedProducts = await ProductRepository.getRelated(product, 4);

  renderProductDetail(product, categories, content, settings);
  renderRelatedProducts(relatedProducts, categories, content, settings);
  bindGallery(product, categories, content, settings);
};

document.addEventListener('DOMContentLoaded', () => {
  initProductDetailPage().catch((error) => console.error(error));
});
