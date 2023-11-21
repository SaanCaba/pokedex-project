import { isFavorite } from '../utils/isFavorite';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const api = {
  getPokemons: async (offset) => {
    const response = await fetch(`${API_URL}?offset=${offset}`);
    const { results } = await response.json();
    const pokemonAllInfo = await Promise.all(
      results.map(async (pokemon, i) => {
        const response = await fetch(`${API_URL}${offset + i + 1}`);
        const { name, sprites, types, stats, weight, id } =
          await response.json();
        const isFav = isFavorite(name);
        return { name, sprites, types, stats, weight, id, isFav };
      })
    );
    return pokemonAllInfo;
  },
  getPokemonByName: async (name) => {
    const response = await fetch(`${API_URL}${name}`);
    const result = await response.json();
    return result;
  }
};

export default api;
