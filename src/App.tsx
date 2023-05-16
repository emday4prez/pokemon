import './App.css'

import { listPokemon, loadPokemon } from '../src/libs/pokeapi'
import { useState, useEffect, useMemo } from 'react'
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
  const [loading, setLoading] = useState(true)
  const [loadedPokemon, setLoadedPokemon] = useState<LoadedPokemon>({
    name: '',
    sprites: { front_default: null },
  })

  const orderedPokemonData = useMemo(() => {
    return orderPokemon(pokemon).map((name: string) => {
      const pokemonObject = pokemon.results.find(
        (poke: { name: string; url: string }) => poke.name === name
      )
      return {
        name: pokemonObject.name,
        url: pokemonObject.url,
      }
    })
  }, [pokemon])

  useEffect(() => {
    setLoading(true)
    listPokemon().then(data => {
      setPokemon(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (orderedPokemonData.length > 0) {
      setSelectedPokemonURL(orderedPokemonData[0]?.url)
    }
  }, [orderedPokemonData])

  useEffect(() => {
    if (selectedPokemonURL) {
      loadPokemon(selectedPokemonURL).then(loadedData => {
        setLoadedPokemon({
          name: loadedData.name,
          sprites: { front_default: loadedData.image || null },
        })
      })
    }
  }, [selectedPokemonURL])

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPokemonURL(e.target.value)
  }

  const handleNextOption = () => {
    const currentIndex = orderedPokemonData.findIndex(
      (pokemon: (typeof orderedPokemonData)[number]) => pokemon.url === selectedPokemonURL
    )
    const nextIndex = (currentIndex + 1) % orderedPokemonData.length
    setSelectedPokemonURL(orderedPokemonData[nextIndex].url)
  }

  const handlePreviousOption = () => {
    const currentIndex = orderedPokemonData.findIndex(
      (pokemon: (typeof orderedPokemonData)[number]) => pokemon.url === selectedPokemonURL
    )
    const previousIndex = (currentIndex - 1 + orderedPokemonData.length) % orderedPokemonData.length
    setSelectedPokemonURL(orderedPokemonData[previousIndex].url)
  }

  return (
    <div className='flex flex-col items-center bg-slate-200 justify-center min-h-screen'>
      <div className='w-[75%] flex flex-col items-center rounded-xl shadow-xl border-4 border-indigo-300 bg-zinc-100 p-8'>
        <h1 className='text-3xl font-bold underline'>Pokémon</h1>
        <div className='flex flex-col text-center items-center'>
          {loading ? (
            <div className='text-4xl'>loading...</div>
          ) : (
            <Pokemon
              setSelectedPokemonURL={setSelectedPokemonURL}
              handlePreviousOption={handlePreviousOption}
              handleNextOption={handleNextOption}
              name={loadedPokemon.name}
              img={loadedPokemon.sprites.front_default || ''}
            />
          )}
          <select
            onChange={onSelect}
            className='w-1/3 cursor-pointer'
            name='pokemon'
            id='pokemon'
            value={selectedPokemonURL}
          >
            {orderedPokemonData.map((poke: { name: string; url: string }) => (
              <option value={poke.url} key={poke.name}>
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default App
