import { useEffect } from "react"
import { useState } from "react"

export const App = () => {
  //se va a guardar un array
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)


  const fetchGetPokemon = async (page) => {
    const limit = 8
    const offset = (page - 1) * limit

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    const results = data.results.map(result => {
      //'https://pokeapi.co/api/v2/pokemon/1'
      //0 /1/2        /3   /4/5        /6

      //en results.url traemos una url ; lo vamos a dividir por slash y vamos a usar el ultimo digito que es el id
      const id = result.url.split('/')[6]
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
      return {
        nombre: result.name,
        id,
        image
      }
    })
    console.log(results)
    setPokemons(results)
  }
  //se va a usar useEffect para que solo haga el llamado 1 vez !!!

  const handleNextPage = () => {

    setPage(page + 1)
  }
  const handlePreviewPage = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    fetchGetPokemon(page)
  }, [page])




  //fetchGetPokemon()
  return (
    <div>
      <h1 className="title">Pokemon List</h1>

      <div className='pokemons'>
        {pokemons.map(pokemon => {

          return (
            <div className='pokemon' key={pokemon.id}>
              <img src={pokemon.image} />
              <h3>{pokemon.name}</h3>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={handlePreviewPage}>Preview</button>
        <span>{page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>

  )
}

export default App
