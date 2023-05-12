/**
 * Returns Pokémon in format: `{ name, url }`
 */
import {useState, useEffect} from 'react'

export async function listPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0";

      const response = await fetch(url)
      const json = await response.json()

      return json
 
}

/**
 * Returns Pokémon in format: `{ name, image: { src } }`
 *
 * "name" is `name` in response
 * "image" is `sprites.other['official-artwork'].front_default`
 *    * fallback to `sprites.front_default` if above does not exist.
 */
export async function loadPokemon(url:string) {

  const response = await fetch(url)
  const json = await response.json()
  console.log('load poke',json)
  const name = json.name
  const image = json.sprites.other['official-artwork'].front_default || json.sprites.front_default
  return { name, image}



}
