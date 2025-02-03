import {useEffect, useState} from "react"
import {fetchData} from "../api/marvelApi"
import Loader from "../components/Loader"
import Pagination from "../components/Pagination"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const data = await fetchData("characters", {limit: 12, offset: page * 10})
        if (data) {
          setCharacters(data.results)
        } else {
          setError("No data available\n. Please try again later.")
          setCharacters([])
        }
      } catch (err) {
        setError(err)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [page])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Marvel DB</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="character-list">
          {characters.map(character => (
            <Link
              key={character.id}
              to={`/character/${character.id}`}
              className="character-card"
            >
              <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`
              } alt={character.name}/>
              <h3>{character.name}</h3>
            </Link>
          ))}
        </div>
      )}
      <Pagination page={page} setPage={setPage}/>
    </div>
  )
}

export default HomePage
