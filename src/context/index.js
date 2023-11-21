import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

export const useContextApp = () => {
  return useContext(AppContext);
};

export function Context({ children }) {
  const [favoritesPokemon, setFavoritesPokemon] = useState([]);

  useEffect(() => {
    const favorites = getFavoritesPokemons();
    if (favorites !== null) {
      setFavoritesPokemon(favorites);
    }
  }, []);

  const getFavoritesPokemons = () => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites'));
    return favoritesLocalStorage;
  };

  const addPokemonsToFavorite = (pokemon) => {
    if (favoritesPokemon.length > 0) {
      const filteredArr = favoritesPokemon.filter(
        (fav) => fav.name === pokemon.name
      );
      if (filteredArr.length > 0) {
        return null;
      }
      const favoritesPokemons = favoritesPokemon.concat(pokemon);
      setFavoritesPokemon(favoritesPokemons);
      localStorage.setItem('favorites', JSON.stringify(favoritesPokemons));
    } else {
      const arr = [];
      arr.push(pokemon);
      setFavoritesPokemon(arr);
      localStorage.setItem('favorites', JSON.stringify(arr));
    }
  };

  const deletePokemonFromFavs = (pokemon) => {
    const filteredArr = favoritesPokemon.filter(
      (fav) => fav.name !== pokemon.name
    );
    localStorage.setItem('favorites', JSON.stringify(filteredArr));
    setFavoritesPokemon(filteredArr);
  };

  return (
    <AppContext.Provider
      value={{
        favoritesPokemon,
        addPokemonsToFavorite,
        deletePokemonFromFavs,
        getFavoritesPokemons
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
