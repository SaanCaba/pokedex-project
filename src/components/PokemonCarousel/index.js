import React from 'react';
import './index.css';
import PokemonCarouselCard from './PokemonCard';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useContextApp } from '../../context';

function PokemonCarousel({ setOpenCarousel, pokemons, openIndex }) {
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(openIndex - 1);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { addPokemonsToFavorite, deletePokemonFromFavs } = useContextApp();

  useEffect(() => {
    const listNode = listRef.current;
    const pokemonNode = listNode.querySelectorAll('li > div')[currentIndex];
    if (pokemonNode) {
      pokemonNode.scrollIntoView({
        behavior: isFirstTime ? 'auto' : 'smooth'
      });
    }
    if (isFirstTime) {
      setIsFirstTime(false);
    }
  }, [currentIndex, isFirstTime]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      if (currentIndex !== 0) {
        setCurrentIndex((current) => current - 1);
      }
    } else {
      if (currentIndex !== pokemons.length - 1) {
        setCurrentIndex((current) => current + 1);
      }
    }
  };

  const handleClick = () => {
    setOpenCarousel(false);
    document.body.style.overflowY = 'scroll';
  };
  return (
    <div className='main-container'>
      <div className='slider-container'>
        <button onClick={() => handleClick()} className='close-btn'>
          X
        </button>
        {currentIndex !== 0 && pokemons.length > 1 && (
          <FaChevronLeft
            onClick={() => scrollToImage('prev')}
            className='pokemoncarousel-btn-left'
          />
        )}

        <div className='pokemoncarousel-container'>
          <ul ref={listRef}>
            {pokemons.map((pokemon, i) => {
              return (
                <PokemonCarouselCard
                  addPokemonsToFavorite={addPokemonsToFavorite}
                  deletePokemonFromFavs={deletePokemonFromFavs}
                  setCurrentIndex={setCurrentIndex}
                  isTheLast={pokemons[i + 1] === undefined}
                  key={pokemon.id}
                  pokemon={pokemon}
                />
              );
            })}
          </ul>
        </div>
        {currentIndex + 1 !== pokemons.length && pokemons.length > 1 && (
          <FaChevronRight
            onClick={() => scrollToImage('next')}
            className='pokemoncarousel-btn-right'
          />
        )}
      </div>
    </div>
  );
}

export default PokemonCarousel;
