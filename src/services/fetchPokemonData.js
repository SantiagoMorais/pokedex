import axios from "axios"

export const fetchPokemonData = async (nameOrId, url) => {
    return await axios
        .get(nameOrId ? `https://pokeapi.co/api/v2/pokemon/${nameOrId}/` : url)
        .then(res => {
            return { data: res.data, error: false}
        })
        .catch(err => {
            console.log(`Error to fetch pokemon details data from pokeapi: ${err}`)
            return { data: null, error: true }
        })
}