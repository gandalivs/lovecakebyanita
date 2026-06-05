import { MenuRepository } from './repositories/menu-repository.js';

const linkClasses = [
  'rounded-full',
  'px-4',
  'py-2',
  'text-sm',
  'font-medium',
  'text-darkBrown/80',
  'transition-all',
  'duration-300',
  'ease-out',
  'hover:bg-white',
  'hover:text-chocolate',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-chocolate',
  'focus:ring-offset-2',
  'focus:ring-offset-cream'
].join(' ');

const mobileLinkClasses = [
  'block',
  'rounded-2xl',
  'px-4',
  'py-3',
  'text-base',
  'font-medium',
  'text-darkBrown',
  'transition-all',
  'duration-300',
  'ease-out',
  'hover:bg-cream',
  'hover:text-chocolate',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-chocolate',
  'focus:ring-offset-2',
  'focus:ring-offset-white'
].join(' ');

const createMenuLink = (item, className) => {
  const link = document.createElement('a');
  link.href = item.url;
  link.textContent = item.name;
  link.className = className;
  return link;
};

const renderDesktopMenu = (items) => {
  const desktopMenu = document.querySelector('[data-menu-desktop]');

  if (!desktopMenu) {
    return;
  }

  desktopMenu.innerHTML = '';
  items.forEach((item) => desktopMenu.appendChild(createMenuLink(item, linkClasses)));
};

const renderMobileMenu = (items) => {
  const mobileMenu = document.querySelector('[data-menu-mobile]');

  if (!mobileMenu) {
    return;
  }

  mobileMenu.innerHTML = '';
  items.forEach((item) => mobileMenu.appendChild(createMenuLink(item, mobileLinkClasses)));
};

const setupMobileMenuToggle = () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-menu-mobile]');

  if (!toggle || !mobileMenu) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.hidden = isExpanded;
  });
};

const initNavbar = async () => {
  try {
    const menuItems = await MenuRepository.getAll();

    renderDesktopMenu(menuItems);
    renderMobileMenu(menuItems);
    setupMobileMenuToggle();
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', initNavbar);
