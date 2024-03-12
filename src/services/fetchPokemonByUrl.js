import axios from "axios"

export const fetchPokemonByUrl = async (url) => {
    return await axios
        .get(url)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(`Error to fetch pokemon details data from pokeapi: ${err}`)
        })
}
