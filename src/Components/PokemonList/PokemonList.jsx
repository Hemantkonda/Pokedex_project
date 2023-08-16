import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "./Pokemon";
import './pokemon.css';

export const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`)
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');

  async function fetchPokemon() {
    // Download 20 pokemons in list
    let response = await axios.get(pokedexUrl);
    // we get the array of results
    const pokemonResult = response.data.results;
    console.log(response);
    setLoading(true)
    setPrev(response.data.previous);
    console.log(response.data.previous);
    setNext(response.data.next);
    console.log(response.data.next);
    // itrating over the arry of pokemon and using their url to create an array
    //  of promise that will download the 20 pokemons
    const pokePromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokePromise);

    console.log(pokemonData);
    // iterate each data of pokemon
    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.other.dream_world.front_default}`,
        types: pokemon.types,
      };
    });
    setPokemonList(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchPokemon();
  }, [pokedexUrl]);


  return (
    <>
      <h1>Pokemon List</h1>
      <div className="pokemon-wrapper">
      {!isLoading
        ? pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} type={p.types}/>)
        : <img src={`https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921`} />}
        </div>

        <div className="buttons">
            <button disabled={prev == null} onClick={()=>setPokedexUrl(prev)}>Prev</button>
            <button disabled={next == null} onClick={()=>setPokedexUrl(next)}>Next</button>
        </div>
    </>
  );
};
