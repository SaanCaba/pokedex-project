import React, { useEffect, useState } from 'react';

import { useContextApp } from '../../context';
import PokemonCard from '../../components/PokemonCard';
import PokemonCarousel from '../../components/PokemonCarousel';

import './index.css';

function Favorites() {
  const { favoritesPokemon } = useContextApp();
  const [openCarousel, setOpenCarousel] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main id='fav-title' className='favorites-main'>
      <h1>Favorite Pokemons</h1>
      <section className='favorites-grid'>
        {favoritesPokemon === null || favoritesPokemon.length === 0 ? (
          <h1 className='favorites-nopokemons'>
            You don't have favorite Pokemons yet!
          </h1>
        ) : (
          favoritesPokemon.map((pokemon, index) => {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                setOpenCarousel={setOpenCarousel}
                setOpenIndex={setOpenIndex}
                index={index}
              />
            );
          })
        )}
      </section>
      {openCarousel && favoritesPokemon.length > 0 && (
        <PokemonCarousel
          setOpenCarousel={setOpenCarousel}
          openIndex={openIndex}
          pokemons={favoritesPokemon}
        />
      )}
    </main>
  );
}

export default Favorites;
