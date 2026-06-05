import { createJsonRepository } from './json-repository.js';

const repository = createJsonRepository('/assets/data/products.json');

const normalize = (value) => String(value || '').toLowerCase().trim();

const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  const sorters = {
    featured: (a, b) => Number(b.is_featured) - Number(a.is_featured) || Number(b.is_best_seller) - Number(a.is_best_seller) || a.id - b.id,
    name_asc: (a, b) => a.name.localeCompare(b.name),
    price_asc: (a, b) => a.price - b.price,
    price_desc: (a, b) => b.price - a.price
  };

  return sorted.sort(sorters[sortBy] || sorters.featured);
};

export const ProductRepository = {
  async getAll() {
    return repository.getAll();
  },

  async getById(id) {
    const products = await repository.getAll();
    return products.find((product) => product.id === Number(id)) || null;
  },

  async getBySlug(slug) {
    const products = await repository.getAll();
    return products.find((product) => product.slug === slug) || null;
  },

  async getBestSellers(limit = 8) {
    const products = await repository.getAll();
    return products.filter((product) => product.is_best_seller).slice(0, limit);
  },

  async getRelated(product, limit = 4) {
    const products = await repository.getAll();

    return products
      .filter((item) => item.id !== product.id && item.category_id === product.category_id)
      .sort((a, b) => Number(b.is_best_seller) - Number(a.is_best_seller) || Number(b.is_featured) - Number(a.is_featured) || a.id - b.id)
      .slice(0, limit);
  },

  async getCatalog({
    search = '',
    categoryId = 'all',
    sortBy = 'featured',
    page = 1,
    perPage = 12
  } = {}) {
    const products = await repository.getAll();
    const keyword = normalize(search);
    const selectedCategory = categoryId === 'all' ? 'all' : Number(categoryId);

    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
      const searchableText = normalize([
        product.name,
        product.short_description,
        product.description,
        product.weight
      ].join(' '));
      const matchesSearch = !keyword || searchableText.includes(keyword);

      return matchesCategory && matchesSearch;
    });

    const sorted = sortProducts(filtered, sortBy);
    const totalItems = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
    const start = (currentPage - 1) * perPage;

    return {
      products: sorted.slice(start, start + perPage),
      total_items: totalItems,
      total_pages: totalPages,
      current_page: currentPage,
      per_page: perPage
    };
  }
};
