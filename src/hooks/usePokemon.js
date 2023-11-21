import { useEffect, useState } from 'react';
import api from '../api';
import { getRandomPokemon } from '../utils/getRandomPokemon';

const usePokemon = () => {
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [pokemonOfTheMonth, setPokemonOfTheMonth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    (async () => {
      await getPokemonOfTheMonth();
      await getAllPokemons();
    })();
  }, []);

  const getPokemonOfTheMonth = async () => {
    const pokemonName = getRandomPokemon();
    const pokemon = await api.getPokemonByName(pokemonName);
    setPokemonOfTheMonth(pokemon);
  };

  const loadMorePokemons = async () => {
    setLoadMoreLoading(true);
    const pokemonsResult = await api.getPokemons(offset);
    setCurrentPokemons((currents) => currents.concat(pokemonsResult));
    setLoadMoreLoading(false);

    setOffset((offset) => offset + 20);
  };

  const searchPokemonByName = async (pokemonName) => {
    if (pokemonName.length === 0) {
      setErrMsg('You must put a name.');
      return;
    }
    try {
      setLoading(true);
      const pokemon = await api.getPokemonByName(pokemonName.toLowerCase());
      setCurrentPokemons([pokemon]);
      setOffset(0);
      setLoading(false);
    } catch (error) {
      setErrMsg('There are no pokemons with that name.');
      setLoading(false);
    }
  };

  const getAllPokemons = async () => {
    setLoading(true);
    const pokemonsResult = await api.getPokemons(offset);
    setCurrentPokemons((currentPokemons) => {
      if (currentPokemons.length > 20) {
        currentPokemons.pop();
      }
      return pokemonsResult;
    });
    setLoading(false);
    setOffset((offset) => offset + 20);
  };

  return {
    currentPokemons,
    loading,
    loadMoreLoading,
    pokemonOfTheMonth,
    loadMorePokemons,
    searchPokemonByName,
    errMsg,
    setErrMsg,
    getAllPokemons
  };
};

export default usePokemon;
