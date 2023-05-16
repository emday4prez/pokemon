import './App.css'

import { listPokemon, loadPokemon } from '../src/libs/pokeapi'
import { useState, useEffect } from 'react'
import Pokemon from './components/Pokemon'
import { orderPokemon } from './libs/order'
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
type LoadedPokemon = {
  name: string
  sprites: {
    front_default: string | null
  }
}

function App() {
  const [pokemon, setPokemon] = useState<any>({})
  const [selectedPokemonURL, setSelectedPokemonURL] = useState('')
  const [loadedPokemon, setLoadedPokemon] = useState<LoadedPokemon>({
    name: '',
    sprites: { front_default: null },
  })
  const [orderedPokemonData, setOrderedPokemonData] = useState<{ name: string; url: string }[]>([])

  const onSelect = (e: any) => {
    setSelectedPokemonURL(e.target.value)
  }
  useEffect(() => {
    listPokemon().then(data => {
      setPokemon(data)
      const orderedPokemonNames = orderPokemon(data)
      const orderedPokemonData = orderedPokemonNames.map(name => {
        const pokemonObject = data.results.find((poke: any) => poke.name === name)
        return {
          name: pokemonObject.name,
          url: pokemonObject.url,
        }
      })
      setOrderedPokemonData(orderedPokemonData)

      const selectedURL = orderedPokemonData.find(
        pokemon => pokemon.url === selectedPokemonURL
      )?.url
      if (selectedURL) {
        setSelectedPokemonURL(selectedURL)
      } else {
        setSelectedPokemonURL(orderedPokemonData[0]?.url)
      }
    })
  }, [])

  useEffect(() => {
    if (selectedPokemonURL) {
      loadPokemon(selectedPokemonURL).then(loadedData => {
        const pokemonData = orderedPokemonData.find(pokemon => pokemon.url === selectedPokemonURL)
        setLoadedPokemon({
          name: loadedData.name,
          sprites: { front_default: loadedData.image },
        })
      })
    }
  }, [selectedPokemonURL, orderedPokemonData])

  useEffect(() => {
    const orderedPokemonNames = orderPokemon(pokemon) // Ordered names
    console.log(orderedPokemonNames)
    const orderedPokemonData = orderedPokemonNames.map(name => {
      // Find the corresponding Pokémon object from the original data
      const pokemonObject = pokemon.results.find((poke: any) => poke.name === name)

      // Return a new object with the ordered Pokémon data
      return {
        name: pokemonObject.name,
        url: pokemonObject.url,
      }
    })
    setOrderedPokemonData(orderedPokemonData)
    // Find the URL of the selected Pokemon in the ordered list
    const selectedURL = orderedPokemonData.find(pokemon => pokemon.url === selectedPokemonURL)?.url

    if (selectedURL) {
      // If the selected Pokemon URL exists in the ordered list, update the state
      setSelectedPokemonURL(selectedURL)
    } else {
      // If the selected Pokemon URL doesn't exist, select the first Pokemon in the ordered list
      setSelectedPokemonURL(orderedPokemonData[0]?.url)
    }
  }, [pokemon])

  const handleNextOption = () => {
    const currentIndex = orderedPokemonData.findIndex(pokemon => pokemon.url === selectedPokemonURL)
    const nextIndex = (currentIndex + 1) % orderedPokemonData.length
    setSelectedPokemonURL(orderedPokemonData[nextIndex].url)
  }

  const handlePreviousOption = () => {
    const currentIndex = orderedPokemonData.findIndex(pokemon => pokemon.url === selectedPokemonURL)
    const previousIndex = (currentIndex - 1 + orderedPokemonData.length) % orderedPokemonData.length
    setSelectedPokemonURL(orderedPokemonData[previousIndex].url)
  }

  const selectedPokemon = orderedPokemonData.find(pokemon => pokemon.url === selectedPokemonURL)
  const pokemonName = selectedPokemon ? selectedPokemon.name : ''
  const pokemonURL = selectedPokemon ? selectedPokemon.url : ''

  return (
    <div className='flex flex-col items-center bg-slate-200 justify-center min-h-screen'>
      <div className='w-[75%] flex flex-col items-center rounded-xl shadow-xl border-4 border-indigo-300 bg-zinc-100 p-8'>
        <h1 className='text-3xl font-bold underline'>Pokémon</h1>
        <div className='flex flex-col text-center items-center'>
          <Pokemon
            setSelectedPokemonURL={setSelectedPokemonURL}
            handlePreviousOption={handlePreviousOption}
            handleNextOption={handleNextOption}
            name={pokemonName}
            img={loadedPokemon.sprites.front_default}
          />
          <select onChange={onSelect} className='w-1/3 cursor-pointer' name='pokemon' id='pokemon'>
            {orderedPokemonData.map((poke: any) => {
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
