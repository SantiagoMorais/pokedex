import { createContext, useState } from "react"

export const PokemonListsContext = createContext({});

export const PokemonListsProvider = (props) => {
    const [typeList, setTypeList] = useState([])
    const [currentType, setCurrentType] = useState('');
    const [defaultList, setDefaultList] = useState([]);
    const [searchedPokemon, setSearchedPokemon] = useState('');

    return (
        <PokemonListsContext.Provider
            value={{
                typeList,
                setTypeList,
                currentType,
                setCurrentType,
                defaultList,
                setDefaultList,
                searchedPokemon,
                setSearchedPokemon
            }}>
            {props.children}
        </PokemonListsContext.Provider>
    )
}