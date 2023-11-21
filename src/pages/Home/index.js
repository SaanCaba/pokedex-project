import React, { useRef, useState } from 'react';
import usePokemon from '../../hooks/usePokemon';
import './index.css';
import GoldCard from '../../components/GoldCard';
import PokemonCard from '../../components/PokemonCard';
import Loading from '../../components/Loading';
import PokemonCarousel from '../../components/PokemonCarousel';
import PokedexImg from '../../assets/pokedex.png';
import { IoSearchSharp } from 'react-icons/io5';

function Home() {
  const {
    currentPokemons,
    loading,
    pokemonOfTheMonth,
    loadMorePokemons,
    loadMoreLoading,
    searchPokemonByName,
    errMsg,
    setErrMsg,
    getAllPokemons
  } = usePokemon();

  const [openCarousel, setOpenCarousel] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const inputRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchPokemonByName(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <main className='main-home'>
      <section>
        <GoldCard pokemon={pokemonOfTheMonth} />
      </section>
      <section className='search-section'>
        <h2>Pokédex</h2>
        <form onSubmit={(e) => handleSubmit(e)} className='form'>
          <input
            onChange={() => errMsg.length > 0 && setErrMsg('')}
            ref={inputRef}
            type='text'
          />
          <button>
            <IoSearchSharp className='button-icon' />
          </button>
        </form>
      </section>
      {errMsg.length > 0 && <h1 className='err-msg'>{errMsg}</h1>}
      <section className='pokedex-section'>
        {loading ? (
          <Loading />
        ) : (
          currentPokemons.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.id}
                setOpenCarousel={setOpenCarousel}
                setOpenIndex={setOpenIndex}
                pokemon={pokemon}
              />
            );
          })
        )}
      </section>
      {!loading && (
        <section className='loadmore-section'>
          {loadMoreLoading ? (
            <Loading />
          ) : currentPokemons.length === 1 ? (
            <button
              onClick={() => {
                setErrMsg('');
                getAllPokemons();
              }}
            >
              <img className='pokedex-img' src={PokedexImg} alt='pokedex' />
              Reset...
            </button>
          ) : (
            <button onClick={() => loadMorePokemons()}>
              <img className='pokedex-img' src={PokedexImg} alt='pokedex' />
              Load more...
            </button>
          )}
        </section>
      )}

      {openCarousel && (
        <PokemonCarousel
          setOpenCarousel={setOpenCarousel}
          openIndex={openIndex}
          pokemons={currentPokemons}
        />
      )}
    </main>
  );
}

export default Home;
