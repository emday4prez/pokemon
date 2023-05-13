import './App.css'
import { Mockup } from './components/mockup'
import { listPokemon, loadPokemon } from '../src/libs/pokeapi'
import { useState, useEffect } from 'react'
import Pokemon from './components/Pokemon'
/**
 * Instructions:
 *
 * Below are a list of tasks.  Don't focus on UI & design right away
 * as we'll be stylizing everything in Task 3.  We are not expecting
 * 100% completion and will leave a little bit of time for discussion.
 *
 * Task 1)
 *   - Load Pokémon & populate a select list
 *     (see `listPokemon` function in `src/libs/pokeapi.ts`)
 *   - Populate a `<select>` with pokemon
 *
 * Task 2)
 *   - When a user selects a Pokémon, load the selected pokemon
 *     and show its name & image
 *     (see `loadPokemon` function in `src/libs/pokeapi.ts`)
 *
 * Task 3)
 *   - Create the UI for what is requested.  Feel free to use
 *     TailwindCSS (already included), CSS modules, or however
 *     you prefer
 *
 * Task 4)
 *   - For some reason, the product team decided to order the pokemon
 *     based on what they defined as their strength based on the following
 *     criteria, listed in `src/libs/order.ts`
 */

function App() {
  const [pokemon, setPokemon] = useState<any>({})
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [loadedPokemon, setLoadedPokemon] = useState({})
  const onSelect = (e: any) => {
    setSelectedPokemon(e.target.value)
    console.log('selected pokemon', selectedPokemon)
  }
  useEffect(() => {
    listPokemon().then(data => {
      setPokemon(data)
      setSelectedPokemon(data.results?.[0].url)
    })
  }, [])

  useEffect(() => {
    if (selectedPokemon) {
      loadPokemon(selectedPokemon).then(loadedData => setLoadedPokemon(loadedData))
    }
  }, [selectedPokemon])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-[75%] flex flex-col items-center  border-4 border-indigo-500 p-8'>
        <h1 className='text-3xl font-bold underline'>Pokémon</h1>
        <div>
          <Pokemon name={loadedPokemon.name} img={loadedPokemon.image} />
          <select onChange={onSelect} className='w-1/3' name='pokemon' id='pokemon'>
            {pokemon?.results?.map((poke: any) => {
              return (
                <option value={poke.url} key={poke.name}>
                  {poke.name}
                </option>
              )
            })}
          </select>
        </div>
        {/* <Mockup name={loadedPokemon.name} image={loadedPokemon.image} /> */}
      </div>
    </div>
  )
}

export default App
