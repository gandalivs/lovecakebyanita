const MENU_SOURCE = '/assets/data/menu.json';

export const MenuRepository = {
  async getAll() {
    const response = await fetch(MENU_SOURCE);

    if (!response.ok) {
      throw new Error(`Menu data failed to load: ${response.status}`);
    }

    return response.json();
  }
};
