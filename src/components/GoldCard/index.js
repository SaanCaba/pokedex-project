import React, { useEffect, useState } from 'react';

import './index.css';
import PokemonTypes from '../PokemonTypes';

function GoldCard({ pokemon }) {
  const [imgRendered, setImgRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setImgRendered(true);
    }, 2600);
  }, []);

  return (
    <div id='goldcard' className='goldcard-container'>
      <div className='goldcard-title'>
        <span>POKEMON</span>
        <span>OF THE</span>
        <span>MONTH</span>
      </div>
      <div className='goldcard-whiteline'>
        {imgRendered && pokemon !== null ? (
          <span className='goldcard-pokemonname'>
            {pokemon.name.toUpperCase()}
          </span>
        ) : (
          <span>???????</span>
        )}
      </div>
      <div className='goldcard-types'>
        {imgRendered && pokemon !== null && (
          <div>
            <PokemonTypes types={pokemon.types} />
          </div>
        )}
      </div>
      {pokemon !== null && (
        <img
          className='goldcard-img'
          src={pokemon.sprites.other.dream_world.front_default}
          alt='Pokemon-img'
        />
      )}
    </div>
  );
}

export default GoldCard;
