import axios from "axios"

export const fetchPokemonList = async (listLimit, offset) => {
    return await axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=${listLimit}&offset=${offset}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(`Error to fetch pokemon list data from pokeapi: ${err}`)
        })

}
