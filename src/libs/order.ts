/**
 * Order Pokemon, strongest to weakest:
 *
 *  - Pikachu (always #1)
 *  - Pokemon whos name starts with "char"
 *  - Pokemon whos name ends with "saur"
 *  - All pokemon who don't match any criteria
 *  - Pokemon whos name ends in "chu"
 */
export function orderPokemon(pokemon: any) {
  if (!pokemon.results) {
    return [] // Return an empty array if pokemonData.results is undefined or null
  }
  const pokemonNames = pokemon?.results?.map((poke: any) => poke.name)

  // Pikachu (always #1)
  const pikachuIndex = pokemonNames?.indexOf('pikachu')
  console.log(pikachuIndex)
  if (pikachuIndex !== -1) {
    const pikachu = pokemonNames.splice(pikachuIndex, 1)
    pokemonNames.unshift(pikachu[0])
  }

  // Pokemon whose name starts with "char"
  const charStartNames = pokemonNames.filter(name => name.startsWith('char'))
  charStartNames.forEach(name => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemon = pokemonNames.splice(index, 1)
      pokemonNames.splice(1, 0, pokemon[0])
    }
  })

  // Pokemon whose name ends with "saur"
  const saurEndNames = pokemonNames.filter(name => name.endsWith('saur'))
  saurEndNames.forEach(name => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemon = pokemonNames.splice(index, 1)
      pokemonNames.splice(2, 0, pokemon[0])
    }
  })

  // All pokemon who don't match any criteria
  const remainingNames = pokemonNames.filter(
    name => !name.startsWith('char') && !name.endsWith('saur')
  )
  remainingNames.forEach(name => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemon = pokemonNames.splice(index, 1)
      pokemonNames.push(pokemon[0])
    }
  })

  // Pokemon whose name ends in "chu"
  const chuEndNames = pokemonNames.filter(name => name.endsWith('chu'))
  chuEndNames.forEach(name => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemon = pokemonNames.splice(index, 1)
      pokemonNames.push(pokemon[0])
    }
  })

  return pokemonNames
}
