import axios from "axios"

export const fetchPokemonBySpecie = async (pokemonId) => {
    return await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(`Error to fetch pokemon details data from pokeapi: ${err}`)
        })
}