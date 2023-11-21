import React, { useEffect, useRef } from 'react';
import { getBackgroundColorByType } from '../../utils/getBgByType';
import GrayPokeball from '../../assets/pokeballgris.png';
import PokemonTypes from '../PokemonTypes';
import './index.css';

function PokemonCard({ pokemon, setOpenCarousel, setOpenIndex, index }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.style.background = `linear-gradient(90deg, ${getBackgroundColorByType(
      pokemon.types[0].type.name
    )} 60%,
    #ffffff 100%)`;
  }, [pokemon]);

  const handleClick = () => {
    setOpenCarousel(true);
    setOpenIndex(index !== undefined ? index + 1 : pokemon.id);
    document.body.style.overflow = 'hidden';
  };
  return (
    <div
      ref={ref}
      className='pokemoncard-container'
      onClick={() => handleClick()}
    >
      <div className='pokemoncard-name-container'>
        <span className='pokemoncard-name'>{pokemon.name.toUpperCase()}</span>
      </div>
      <div className='pokemoncard-img-container'>
        <img
          className='pokemoncard-img'
          src={pokemon.sprites.other.dream_world.front_default}
          alt='Pokemon-img'
        />
      </div>
      <div className='pokemoncard-footer'>
        <div className='pokemoncard-types'>
          <PokemonTypes types={pokemon.types} />
        </div>
      </div>
      <div className='pokemoncard-pokeball-container'>
        <img
          className='pokemoncard-pokeball'
          src={GrayPokeball}
          alt='pokeball'
        />
      </div>
    </div>
  );
}

export default PokemonCard;
