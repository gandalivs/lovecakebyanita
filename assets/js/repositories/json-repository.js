export const createJsonRepository = (source) => ({
  async getAll() {
    const response = await fetch(source);

    if (!response.ok) {
      throw new Error(`${source} failed to load: ${response.status}`);
    }

    return response.json();
  }
});
