export function isFavorite(name) {
  let isFavorite = false;
  const favoritesPokemons = JSON.parse(localStorage.getItem('favorites'));
  if (favoritesPokemons === null) {
    return isFavorite;
  }
  const filteredArr = favoritesPokemons.filter((fav) => fav.name === name);
  if (filteredArr.length > 0) {
    isFavorite = true;
    return isFavorite;
  }
  return isFavorite;
}
