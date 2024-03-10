import { createContext, useState } from "react"

export const PokemonListsContext = createContext({});

export const PokemonListsProvider = (props) => {
    const [typeList, setTypeList] = useState([])
    const [currentType, setCurrentType] = useState('');
    const [defaultList, setDefaultList] = useState([]);

    return (
        <PokemonListsContext.Provider
            value={{
                typeList,
                setTypeList,
                currentType,
                setCurrentType,
                defaultList,
                setDefaultList,
            }}>
            {props.children}
        </PokemonListsContext.Provider>
    )
}