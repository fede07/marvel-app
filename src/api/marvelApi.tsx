import axios from "axios"
import { Md5 } from "ts-md5"

const BASE_URL = 'https://gateway.marvel.com/v1/public/'
const API_KEY = process.env.REACT_APP_PUBLIC_KEY
const API_SECRET = process.env.REACT_APP_PRIVATE_KEY

const ts = Date.now()
const hash = Md5.hashStr(ts + API_SECRET + API_KEY)

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        ...params,
        apikey: API_KEY,
        ts: ts,
        hash: hash,
      }
    })
    console.log("Response: ", response)
    return response.data.data
  } catch (error) {
    console.log("Error fetching data: ", error)
    return null
  }
}
