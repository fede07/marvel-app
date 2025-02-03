import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import {fetchData} from "../api/marvelApi";

const DetailPage = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true)
      const data = await fetchData(`characters/${id}`)
      setCharacter(data.results[0])
      setLoading(false)
    }

    fetchCharacterDetails().then(r => {
      console.log(r)
    })
  }, [id])
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <p>{character.description || 'No description available'}</p>
    </div>
  )
}

export default DetailPage
