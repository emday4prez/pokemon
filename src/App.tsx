import './App.css'

import { listPokemon, loadPokemon } from '../src/libs/pokeapi'
import { useState, useEffect } from 'react'
import Pokemon from './components/Pokemon'
import { orderPokemon } from './libs/order'

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
      setSelectedPokemonURL(orderedPokemonData[0]?.url)
    })
  }, [])

  useEffect(() => {
    if (selectedPokemonURL) {
      loadPokemon(selectedPokemonURL).then(loadedData => {
        setLoadedPokemon({
          name: loadedData.name,
          sprites: { front_default: loadedData.image },
        })
      })
    }
  }, [selectedPokemonURL])

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

  return (
    <div className='flex flex-col items-center bg-slate-200 justify-center min-h-screen'>
      <div className='w-[75%] flex flex-col items-center rounded-xl shadow-xl border-4 border-indigo-300 bg-zinc-100 p-8'>
        <h1 className='text-3xl font-bold underline'>Pokémon</h1>
        <div className='flex flex-col text-center items-center'>
          <Pokemon
            setSelectedPokemonURL={setSelectedPokemonURL}
            handlePreviousOption={handlePreviousOption}
            handleNextOption={handleNextOption}
            name={loadedPokemon.name}
            img={loadedPokemon.sprites.front_default}
          />
          <select
            onChange={e => setSelectedPokemonURL(e.target.value)}
            className='w-1/3 cursor-pointer'
            name='pokemon'
            id='pokemon'
          >
            {orderedPokemonData.map(poke => (
              <option value={poke.url} key={poke.name}>
                {poke.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default App
