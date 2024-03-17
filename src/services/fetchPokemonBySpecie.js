import axios from "axios"

export const fetchPokemonBySpecie = async (pokemonId, url) => {
    return await axios
        .get(pokemonId ? `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/` : url)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(`Error to fetch pokemon details data from pokeapi: ${err}`)
        })
}