import { useContext } from "react"
import { PokemonList } from "../pokemonList"
import { PokemonListByType } from "../pokemonListByType"
import { PokemonListsContext } from "../../contexts/pokemonListsContext"

export const Lists = () => {
    const {defaultList, typeList} = useContext(PokemonListsContext)

    return (
        <>
            {typeList.length > 0 ?
                <PokemonListByType />
                : <PokemonList />
            }
        </>
    )
}