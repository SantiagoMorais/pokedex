import axios from "axios"

export const fetchPokemonByName = async (nameOrId) => {
    return await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`)
        .then(res => {
            return { data: res.data, error: false}
        })
        .catch(err => {
            console.log(`Error to fetch pokemon details data from pokeapi: ${err}`)
            return { data: null, error: true }
        })
}