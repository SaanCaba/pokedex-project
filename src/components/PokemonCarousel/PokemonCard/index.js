import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { getBackgroundColorByType } from '../../../utils/getBgByType';
import PokemonTypes from '../../PokemonTypes';
import PokemonStatistic from '../../PokemonStatistics';
import { FaStar, FaRegStar } from 'react-icons/fa';

function PokemonCarouselCard({
  pokemon,
  addPokemonsToFavorite,
  deletePokemonFromFavs,
  setCurrentIndex,
  isTheLast
}) {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const statisticRef = useRef(null);
  const [isFav, setIsFav] = useState(pokemon.isFav);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    ref.current.style.background = `linear-gradient(90deg, ${getBackgroundColorByType(
      pokemon.types[0].type.name
    )} 60%,
    #ffffff 100%)`;
    const observer = new IntersectionObserver(updateIsVisible, {
      root: null,
      rootMargin: '0px',
      threshold: 1
    });
    if (statisticRef.current) {
      observer.observe(statisticRef.current);
    }
    return () => {
      if (statisticRef.current) {
        observer.unobserve(statisticRef.current);
      }
    };
  }, [pokemon, isVisible]);

  const updateIsVisible = (entries) => {
    const [entry] = entries;
    if (!isVisible) {
      setIsVisible(entry.isIntersecting);
    }
  };
  const handleClick = () => {
    setIsFav(!isFav);
    if (!isFav) {
      pokemon.isFav = true;
      addPokemonsToFavorite(pokemon);
    } else {
      if (setCurrentIndex !== undefined && isTheLast !== undefined) {
        if (isTheLast) {
          setCurrentIndex((current) => current - 1);
        }
      }
      if (isTheLast) {
        document.body.style.overflowY = 'scroll';
      }
      deletePokemonFromFavs(pokemon);
    }
  };

  return (
    <li ref={containerRef} className='cardcarousel-container'>
      <div className='cardcarousel-flex'>
        <div ref={ref} className='cardcarousel-info'>
          <div className='cardcarousel-name'>
            {isFav ? (
              <FaStar
                onClick={() => handleClick()}
                className='fav-icon'
                color='#e8e100'
              />
            ) : (
              <FaRegStar
                onClick={() => handleClick()}
                className='nofav-icon'
                color='#e8e100'
              />
            )}

            <span className='cardcarousel-name'>
              {pokemon.name.toUpperCase()}
            </span>
            <span className='cardcarousel-id'>#{pokemon.id}</span>
          </div>
          <div className='cardcarousel-types'>
            <PokemonTypes types={pokemon.types} />
          </div>
          <div className='cardcarousel-img-container'>
            <img
              className='cardcarousel-img'
              src={pokemon.sprites.other.dream_world.front_default}
              alt='Pokemon-img'
            />
          </div>
        </div>

        <div className='cardcarousel-stats'>
          <span ref={statisticRef} className='cardcarousel-stats-title'>
            Statistics
          </span>
          {isVisible && (
            <div className='cardcarousel-stats-container'>
              {pokemon.stats.map(({ stat, base_stat }, i) => {
                return (
                  <PokemonStatistic
                    key={i}
                    statistic={stat.name}
                    number={base_stat}
                    isVisible={isVisible}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default PokemonCarouselCard;
