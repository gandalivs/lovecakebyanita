import { CategoryRepository } from './repositories/category-repository.js';
import { FaqRepository } from './repositories/faq-repository.js';
import { GalleryRepository } from './repositories/gallery-repository.js';
import { PagesContentRepository } from './repositories/pages-content-repository.js';
import { SettingsRepository } from './repositories/settings-repository.js';
import { SocialMediaRepository } from './repositories/social-media-repository.js';
import { TestimonialRepository } from './repositories/testimonial-repository.js';

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const createWhatsappUrl = (settings) => `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message)}`;

const getPageKey = () => {
  const fileName = window.location.pathname.split('/').pop().replace('.html', '');
  return fileName || 'home';
};

const getCategoryMap = (categories) => new Map(categories.map((category) => [category.id, category]));

const createHero = ({ eyebrow, title, description }) => `
  <section class="mx-auto max-w-7xl px-4 pt-section sm:px-6 lg:px-8 md:pt-section-lg">
    <div class="mx-auto max-w-4xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${escapeHtml(eyebrow)}</p>
      <h1 class="mt-5 font-heading text-hero-mobile font-semibold leading-[1.05] text-darkBrown md:text-hero-tablet xl:text-hero-desktop">${escapeHtml(title)}</h1>
      <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-darkBrown/70 md:text-body-lg">${escapeHtml(description)}</p>
    </div>
  </section>
`;

const setupImageFallbacks = (container) => {
  container.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;

      if (fallback && image.src !== fallback) {
        image.src = fallback;
      }
    }, { once: true });
  });
};

const renderAbout = (content) => `
  ${createHero(content.about.hero)}
  <section class="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8 md:py-section-lg">
    <div class="grid items-center gap-10 lg:grid-cols-2">
      <div class="overflow-hidden rounded-3xl bg-white shadow-premium">
        <img src="${escapeHtml(content.about.story.image)}" alt="${escapeHtml(content.about.story.image_alt)}" class="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async">
      </div>
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-chocolate/70">${escapeHtml(content.about.story.eyebrow)}</p>
        <h2 class="mt-4 font-heading text-section-mobile font-semibold leading-tight text-darkBrown md:text-section-desktop">${escapeHtml(content.about.story.title)}</h2>
        <p class="mt-5 text-base leading-8 text-darkBrown/70 md:text-body-lg">${escapeHtml(content.about.story.description)}</p>
      </div>
    </div>
    <div class="mt-16 grid gap-5 md:grid-cols-3">
      ${content.about.values.map((item) => `
        <article class="rounded-3xl bg-white p-6 shadow-lg">
          <h3 class="font-heading text-2xl font-semibold text-chocolate">${escapeHtml(item.title)}</h3>
          <p class="mt-3 text-sm leading-7 text-darkBrown/65">${escapeHtml(item.description)}</p>
        </article>
      `).join('')}
    </div>
    <div class="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      ${content.about.why_choose_us.map((item) => `
        <article class="rounded-3xl bg-white p-6 shadow-lg">
          <h3 class="font-heading text-xl font-semibold text-darkBrown">${escapeHtml(item.title)}</h3>
          <p class="mt-3 text-sm leading-7 text-darkBrown/65">${escapeHtml(item.description)}</p>
        </article>
      `).join('')}
    </div>
  </section>
`;

const renderGallery = (content, gallery, categories) => {
  const categoryMap = getCategoryMap(categories);

  return `
    ${createHero(content.gallery.hero)}
    <section class="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8 md:py-section-lg">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        ${gallery.sort((a, b) => a.display_order - b.display_order).map((item) => {
          const category = categoryMap.get(item.category_id);
          const fallback = category?.thumbnail || '/assets/images/home/hero-cake.webp';

          return `
            <article class="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-2">
              <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" class="aspect-square w-full object-cover transition-all duration-300 ease-out group-hover:scale-105" data-fallback="${escapeHtml(fallback)}" loading="lazy" decoding="async">
              <div class="p-5">
                <p class="text-xs font-semibold uppercase tracking-[0.12em] text-chocolate/65">${escapeHtml(category?.name || content.gallery.category_label)}</p>
                <h2 class="mt-2 font-heading text-xl font-semibold text-darkBrown">${escapeHtml(item.title)}</h2>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
};

const renderTestimonials = (content, testimonials) => `
  ${createHero(content.testimonials.hero)}
  <section class="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8 md:py-section-lg">
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      ${testimonials.sort((a, b) => a.display_order - b.display_order).map((testimonial) => `
        <article class="rounded-3xl bg-white p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-softPink font-semibold text-chocolate">${escapeHtml(testimonial.name.slice(0, 1))}</div>
            <div>
              <h2 class="font-semibold text-darkBrown">${escapeHtml(testimonial.name)}</h2>
              <p class="text-sm text-chocolate" aria-label="${escapeHtml(`${testimonial.rating} dari 5 bintang`)}">${'★'.repeat(testimonial.rating)}</p>
              <p class="mt-1 text-xs text-darkBrown/55">${escapeHtml(testimonial.location)}</p>
            </div>
          </div>
          <p class="mt-5 text-sm leading-7 text-darkBrown/70">${escapeHtml(testimonial.review)}</p>
        </article>
      `).join('')}
    </div>
  </section>
`;

const renderFaqList = (content, faqs, keyword = '') => {
  const normalized = keyword.toLowerCase().trim();
  const filtered = faqs.filter((faq) => !normalized || `${faq.question} ${faq.answer}`.toLowerCase().includes(normalized));

  if (!filtered.length) {
    return `
      <div class="rounded-3xl bg-white p-8 text-center shadow-lg">
        <h2 class="font-heading text-3xl font-semibold text-darkBrown">${escapeHtml(content.faq.empty_title)}</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-darkBrown/65">${escapeHtml(content.faq.empty_description)}</p>
      </div>
    `;
  }

  return filtered.sort((a, b) => a.display_order - b.display_order).map((faq) => `
    <details class="group rounded-3xl bg-white p-6 shadow-lg">
      <summary class="cursor-pointer list-none font-semibold text-darkBrown transition-all duration-300 ease-out group-open:text-chocolate">${escapeHtml(faq.question)}</summary>
      <p class="mt-4 text-sm leading-7 text-darkBrown/70">${escapeHtml(faq.answer)}</p>
    </details>
  `).join('');
};

const renderFaq = (content, faqs) => `
  ${createHero(content.faq.hero)}
  <section class="mx-auto max-w-4xl px-4 py-section sm:px-6 lg:px-8 md:py-section-lg">
    <label class="block">
      <span class="text-sm font-semibold text-darkBrown">${escapeHtml(content.faq.search_label)}</span>
      <input type="search" placeholder="${escapeHtml(content.faq.search_placeholder)}" class="mt-3 h-14 w-full rounded-2xl border border-chocolate/10 bg-white px-5 text-base text-darkBrown shadow-sm outline-none transition-all duration-300 ease-out placeholder:text-darkBrown/40 focus:border-chocolate focus:ring-2 focus:ring-chocolate/20" data-faq-search>
    </label>
    <div class="mt-8 space-y-4" data-faq-list>
      ${renderFaqList(content, faqs)}
    </div>
  </section>
`;

const renderContact = (content, settings, socials) => {
  const instagram = socials.find((item) => item.platform === 'instagram' && item.is_active);
  const whatsappUrl = createWhatsappUrl(settings);

  return `
    ${createHero(content.contact.hero)}
    <section class="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8 md:py-section-lg">
      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="rounded-3xl bg-white p-6 shadow-premium sm:p-8">
          <h2 class="font-heading text-section-mobile font-semibold text-darkBrown md:text-section-desktop">${escapeHtml(content.contact.cta_title)}</h2>
          <p class="mt-4 text-base leading-8 text-darkBrown/70">${escapeHtml(content.contact.cta_description)}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="${whatsappUrl}" class="rounded-full bg-chocolate px-7 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2">${escapeHtml(content.contact.whatsapp_label)}</a>
            <a href="${escapeHtml(instagram?.url || '#')}" class="rounded-full border border-chocolate/30 bg-white px-7 py-4 text-center text-sm font-semibold text-chocolate transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-softPink focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2">${escapeHtml(content.contact.instagram_label)}</a>
          </div>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <article class="rounded-3xl bg-cream p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.12em] text-chocolate/65">${escapeHtml(content.contact.email_label)}</p>
              <p class="mt-2 text-sm font-semibold text-darkBrown">${escapeHtml(settings.email)}</p>
            </article>
            <article class="rounded-3xl bg-cream p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.12em] text-chocolate/65">${escapeHtml(content.contact.address_label)}</p>
              <p class="mt-2 text-sm font-semibold text-darkBrown">${escapeHtml(settings.address)}</p>
            </article>
          </div>
        </div>
        <div class="rounded-3xl bg-chocolate p-6 text-white shadow-premium sm:p-8">
          <h2 class="font-heading text-3xl font-semibold">${escapeHtml(content.contact.hours_title)}</h2>
          <div class="mt-6 space-y-4">
            ${settings.business_hours.map((item) => `
              <div class="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
                <p class="font-semibold">${escapeHtml(item.day)}</p>
                <p class="text-sm text-white/75">${escapeHtml(item.hours)}</p>
              </div>
            `).join('')}
          </div>
          <a href="${escapeHtml(settings.google_maps_url)}" class="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-chocolate shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-softPink focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-chocolate">${escapeHtml(content.contact.maps_label)}</a>
        </div>
      </div>
    </section>
  `;
};

const bindFaqSearch = (content, faqs) => {
  const search = document.querySelector('[data-faq-search]');
  const list = document.querySelector('[data-faq-list]');

  if (!search || !list) {
    return;
  }

  search.addEventListener('input', () => {
    list.innerHTML = renderFaqList(content, faqs, search.value);
  });
};

const initStaticPage = async () => {
  const pageKey = getPageKey();
  const container = document.querySelector('[data-page-content]');

  if (!container) {
    return;
  }

  const [content, categories, gallery, testimonials, faqs, settings, socials] = await Promise.all([
    PagesContentRepository.getAll(),
    CategoryRepository.getAll(),
    GalleryRepository.getAll(),
    TestimonialRepository.getAll(),
    FaqRepository.getAll(),
    SettingsRepository.getAll(),
    SocialMediaRepository.getAll()
  ]);

  const renderers = {
    about: () => renderAbout(content),
    gallery: () => renderGallery(content, gallery, categories),
    testimonials: () => renderTestimonials(content, testimonials),
    faq: () => renderFaq(content, faqs),
    contact: () => renderContact(content, settings, socials)
  };

  container.innerHTML = renderers[pageKey]?.() || renderAbout(content);
  setupImageFallbacks(container);

  if (pageKey === 'faq') {
    bindFaqSearch(content, faqs);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initStaticPage().catch((error) => console.error(error));
});
