import { firstGen } from '../constants';

export function getRandomPokemon() {
  const randomNum = Math.floor(Math.random() * firstGen.length);
  return firstGen[randomNum];
}
