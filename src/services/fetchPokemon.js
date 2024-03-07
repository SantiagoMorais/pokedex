import axios from "axios"

export const fetchPokemon = (listLimit, offset) => {
    const data = axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=${listLimit}&offset=${offset}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw new error(`Error to fetch pokemon data from pokeapi: ${error}`)
        })
    return data
}
