import { CategoryRepository } from './repositories/category-repository.js';
import { FaqRepository } from './repositories/faq-repository.js';
import { HomepageRepository } from './repositories/homepage-repository.js';
import { InstagramFeedRepository } from './repositories/instagram-feed-repository.js';
import { ProductRepository } from './repositories/product-repository.js';
import { SettingsRepository } from './repositories/settings-repository.js';
import { TestimonialRepository } from './repositories/testimonial-repository.js';

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(value);

const createWhatsappUrl = (settings, message) => {
  const text = message || settings.whatsapp_message;
  return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(text)}`;
};

const resolveCtaUrl = (url, settings, message) => {
  if (url.startsWith('https://wa.me/')) {
    return createWhatsappUrl(settings, message);
  }

  return url;
};

const createSectionHeader = ({ eyebrow, title, description }) => `
  <div class="mx-auto max-w-3xl text-center">
    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${eyebrow}</p>
    <h2 class="mt-4 font-heading text-section-mobile font-semibold leading-tight text-darkBrown md:text-section-desktop">${title}</h2>
    <p class="mt-4 text-base leading-8 text-darkBrown/70 md:text-body-lg">${description}</p>
  </div>
`;

const renderHero = (hero, settings) => {
  const container = document.querySelector('[data-home-hero]');
  const primaryUrl = resolveCtaUrl(hero.primary_cta_url, settings, settings.whatsapp_message);

  container.innerHTML = `
    <div class="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${hero.eyebrow}</p>
        <h1 class="mt-5 max-w-4xl font-heading text-hero-mobile font-semibold leading-[1.05] text-darkBrown md:text-hero-tablet xl:text-hero-desktop">${hero.headline}</h1>
        <p class="mt-6 max-w-xl text-base leading-8 text-darkBrown/75 md:text-body-lg">${hero.description}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="${primaryUrl}" class="rounded-full bg-chocolate px-7 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2 focus:ring-offset-cream">${hero.primary_cta_label}</a>
          <a href="${hero.secondary_cta_url}" class="rounded-full border border-chocolate/30 bg-white/50 px-7 py-4 text-center text-sm font-semibold text-chocolate transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2 focus:ring-offset-cream">${hero.secondary_cta_label}</a>
        </div>
      </div>
      <div class="relative">
        <div class="overflow-hidden rounded-3xl bg-white shadow-premium">
          <img src="${hero.image}" alt="${hero.image_alt}" class="aspect-[4/5] w-full object-cover" fetchpriority="high">
        </div>
        <div class="absolute -bottom-6 left-5 rounded-3xl bg-white/95 px-5 py-4 shadow-soft backdrop-blur md:left-8">
          <p class="font-heading text-2xl font-semibold text-chocolate">${hero.highlight_title}</p>
          <p class="mt-1 text-sm text-darkBrown/70">${hero.highlight_description}</p>
        </div>
      </div>
    </div>
  `;
};

const renderCategories = (content, categories) => {
  const container = document.querySelector('[data-home-categories]');
  const featured = categories.filter((category) => category.is_featured).slice(0, 4);

  container.innerHTML = `
    ${createSectionHeader(content)}
    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      ${featured.map((category) => `
        <a href="/pages/products.html?category=${category.slug}" class="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-4 focus:ring-offset-cream">
          <img src="${category.thumbnail}" alt="${category.name}" class="aspect-square w-full object-cover transition-all duration-300 ease-out group-hover:scale-105">
          <div class="p-6">
            <p class="font-heading text-2xl font-semibold text-darkBrown">${category.name}</p>
            <p class="mt-3 text-sm leading-6 text-darkBrown/65">${category.description}</p>
          </div>
        </a>
      `).join('')}
    </div>
  `;
};

const renderBestSellers = (content, products, categories, settings) => {
  const container = document.querySelector('[data-home-best-sellers]');
  const categoryById = new Map(categories.map((category) => [category.id, category.name]));
  const createProductMessage = (product) => content.order_message_template.replace('{product_name}', product.name);

  container.innerHTML = `
    ${createSectionHeader(content)}
    <div class="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0" aria-label="${content.carousel_label}">
      ${products.map((product) => `
        <article class="min-w-[78%] snap-start overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 sm:min-w-[42%] lg:min-w-0">
          <img src="${product.thumbnail}" alt="${product.name}" class="aspect-square w-full object-cover">
          <div class="p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-chocolate/65">${categoryById.get(product.category_id) || product.weight}</p>
            <h3 class="mt-3 font-heading text-2xl font-semibold leading-tight text-darkBrown">${product.name}</h3>
            <p class="mt-3 text-sm leading-6 text-darkBrown/65">${product.short_description}</p>
            <div class="mt-5 flex items-center justify-between gap-4">
              <p class="font-semibold text-chocolate">${formatCurrency(product.price)}</p>
              <a href="${createWhatsappUrl(settings, createProductMessage(product))}" class="rounded-full bg-chocolate px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2" aria-label="${content.order_label} ${product.name}">${content.order_label}</a>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;
};

const renderAbout = (content, reasons) => {
  const container = document.querySelector('[data-home-about]');

  container.innerHTML = `
    <div class="grid items-center gap-10 lg:grid-cols-2">
      <div class="overflow-hidden rounded-3xl bg-white shadow-premium">
        <img src="${content.image}" alt="${content.image_alt}" class="aspect-[4/3] w-full object-cover">
      </div>
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-chocolate/70">${content.eyebrow}</p>
        <h2 class="mt-4 font-heading text-section-mobile font-semibold leading-tight text-darkBrown md:text-section-desktop">${content.title}</h2>
        <p class="mt-5 text-base leading-8 text-darkBrown/70 md:text-body-lg">${content.description}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          ${reasons.map((reason) => `
            <div class="rounded-3xl bg-white p-5 shadow-lg">
              <h3 class="font-heading text-xl font-semibold text-chocolate">${reason.title}</h3>
              <p class="mt-2 text-sm leading-6 text-darkBrown/65">${reason.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

const renderInstagram = (content, posts) => {
  const container = document.querySelector('[data-home-instagram]');

  container.innerHTML = `
    ${createSectionHeader(content)}
    <div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
      ${posts.slice(0, 8).map((post) => `
        <a href="${post.url}" class="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-4 focus:ring-offset-cream" aria-label="${post.caption}">
          <img src="${post.image}" alt="${post.alt}" class="aspect-square w-full object-cover transition-all duration-300 ease-out group-hover:scale-105">
        </a>
      `).join('')}
    </div>
  `;
};

const renderTestimonials = (content, testimonials) => {
  const container = document.querySelector('[data-home-testimonials]');

  container.innerHTML = `
    ${createSectionHeader(content)}
    <div class="mt-12 grid gap-5 md:grid-cols-3">
      ${testimonials.slice(0, 6).map((testimonial) => `
        <article class="rounded-3xl bg-white p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-softPink font-semibold text-chocolate">${testimonial.name.slice(0, 1)}</div>
            <div>
              <h3 class="font-semibold text-darkBrown">${testimonial.name}</h3>
              <p class="text-sm text-chocolate" aria-label="${testimonial.rating} dari 5 bintang">${'★'.repeat(testimonial.rating)}</p>
              <p class="mt-1 text-xs text-darkBrown/55">${testimonial.location}</p>
            </div>
          </div>
          <p class="mt-5 text-sm leading-7 text-darkBrown/70">${testimonial.review}</p>
        </article>
      `).join('')}
    </div>
  `;
};

const renderFaq = (content, faqs) => {
  const container = document.querySelector('[data-home-faq]');

  container.innerHTML = `
    ${createSectionHeader(content)}
    <div class="mx-auto mt-10 max-w-3xl space-y-4">
      ${faqs.slice(0, 4).map((faq) => `
        <details class="group rounded-3xl bg-white p-5 shadow-lg">
          <summary class="cursor-pointer list-none font-semibold text-darkBrown transition-all duration-300 ease-out group-open:text-chocolate">${faq.question}</summary>
          <p class="mt-3 text-sm leading-7 text-darkBrown/70">${faq.answer}</p>
        </details>
      `).join('')}
    </div>
  `;
};

const renderWhatsappCta = (homepage, settings) => {
  const container = document.querySelector('[data-home-whatsapp]');
  const message = homepage.whatsapp_cta.message || settings.whatsapp_message;
  const url = createWhatsappUrl(settings, message);

  container.innerHTML = `
    <section class="mx-auto max-w-7xl px-4 pb-section sm:px-6 lg:px-8 md:pb-section-lg" aria-label="${homepage.whatsapp_cta.label}">
      <div class="overflow-hidden rounded-3xl bg-chocolate px-6 py-12 text-center shadow-premium sm:px-10 lg:px-16 lg:py-16">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-softPink">${homepage.whatsapp_cta.eyebrow}</p>
        <h2 class="mx-auto mt-4 max-w-3xl font-heading text-section-mobile font-semibold leading-tight text-white md:text-section-desktop">${homepage.whatsapp_cta.title}</h2>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-body-lg">${settings.tagline}</p>
        <a href="${url}" class="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-chocolate shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-softPink focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-chocolate">${homepage.whatsapp_cta.label}</a>
      </div>
    </section>
    <a href="${url}" class="fixed bottom-5 right-5 z-40 rounded-full bg-chocolate px-5 py-4 text-sm font-semibold text-white shadow-premium transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2 focus:ring-offset-cream" aria-label="${homepage.whatsapp_cta.label}">
      ${homepage.whatsapp_cta.label}
    </a>
  `;
};

const initHomepage = async () => {
  const [homepage, categories, bestSellers, instagramPosts, testimonials, faqs, settings] = await Promise.all([
    HomepageRepository.getAll(),
    CategoryRepository.getAll(),
    ProductRepository.getBestSellers(8),
    InstagramFeedRepository.getAll(),
    TestimonialRepository.getAll(),
    FaqRepository.getAll(),
    SettingsRepository.getAll()
  ]);

  renderHero(homepage.hero, settings);
  renderCategories(homepage.sections.categories, categories);
  renderBestSellers(homepage.sections.best_seller, bestSellers, categories, settings);
  renderAbout(homepage.sections.about_preview, homepage.why_choose_us);
  renderInstagram(homepage.sections.instagram, instagramPosts);
  renderTestimonials(homepage.sections.testimonials, testimonials);
  renderFaq(homepage.sections.faq, faqs);
  renderWhatsappCta(homepage, settings);
};

document.addEventListener('DOMContentLoaded', () => {
  initHomepage().catch((error) => console.error(error));
});
