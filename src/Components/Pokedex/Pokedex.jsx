import React from 'react'
import { Search } from '../Search/Search'
import './pokedex.css'
import { PokemonList } from '../PokemonList/PokemonList'

export const Pokedex = () => {
  return (
    <div className='pokedex-wrapper'>
    <h1>Pokedex</h1>
    <Search />
    <PokemonList />
    </div>
  )
}
