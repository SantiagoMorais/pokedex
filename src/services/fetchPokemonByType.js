import axios from "axios"

export const fetchPokemonByType = async (type) => {
    return await axios
        .get(`https://pokeapi.co/api/v2/type/${type}/`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(`Error to fetch pokemon list data from pokeapi: ${err}`)
        })
}

