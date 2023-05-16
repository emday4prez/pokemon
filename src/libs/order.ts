export function orderPokemon(pokemon: any): string[] {
  if (!pokemon.results) {
    return []
  }

  const pokemonNames: string[] = pokemon.results.map((poke: any) => poke.name)

  const saurEndNames: string[] = pokemonNames.filter((name: string) => name.endsWith('saur'))
  saurEndNames.forEach((name: string) => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemonName = pokemonNames.splice(index, 1)[0]
      pokemonNames.splice(2, 0, pokemonName)
    }
  })

  const remainingNames: string[] = pokemonNames.filter(
    (name: string) => !name.startsWith('char') && !name.endsWith('saur')
  )
  remainingNames.forEach((name: string) => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemonName = pokemonNames.splice(index, 1)[0]
      pokemonNames.push(pokemonName)
    }
  })

  const chuEndNames: string[] = pokemonNames.filter((name: string) => name.endsWith('chu'))
  chuEndNames.forEach((name: string) => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemonName = pokemonNames.splice(index, 1)[0]
      pokemonNames.push(pokemonName)
    }
  })

  const pikachuIndex = pokemonNames.indexOf('pikachu')
  if (pikachuIndex !== -1) {
    const pikachu = pokemonNames.splice(pikachuIndex, 1)[0]
    pokemonNames.unshift(pikachu)
  }

  const charStartNames: string[] = pokemonNames.filter((name: string) => name.startsWith('char'))
  charStartNames.forEach((name: string) => {
    const index = pokemonNames.indexOf(name)
    if (index !== -1) {
      const pokemonName = pokemonNames.splice(index, 1)[0]
      pokemonNames.splice(1, 0, pokemonName)
    }
  })

  return pokemonNames
}
