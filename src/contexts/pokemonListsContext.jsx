import { createContext, useState } from "react"
import PropTypes from 'prop-types';

export const PokemonListsContext = createContext({});

export const PokemonListsProvider = ({children}) => {
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
            {children}
        </PokemonListsContext.Provider>
    )
}

PokemonListsProvider.propTypes = {
    children: PropTypes.node
}