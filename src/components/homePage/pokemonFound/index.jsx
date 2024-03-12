import { useContext, useEffect, useState } from "react"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"
import { PokemonCard } from "../pokemonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faX } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../contexts/themeContext";
import styled from "styled-components";
import { fetchPokemonByName } from "../../../services/fetchPokemonByName";

export const PokemonFound = () => {
    const { searchedPokemon } = useContext(PokemonListsContext);
    const [pokemon, setPokemon] = useState(null);
    const { theme } = useContext(ThemeContext);
    const [itsLoading, setItsLoading] = useState(false);
    const [pokemonNotFound, setPokemonNotFound] = useState(false);

    const handleReturnList = () => {
        setPokemon(null);
        setPokemonNotFound(false);
    }

    const getPokemon = async (nameOrId) => {
        setItsLoading(true)
        const { data, error } = await fetchPokemonByName(nameOrId)
        if (error) {
            setPokemonNotFound(true);
        } else {
            setPokemon(data);
            setPokemonNotFound(false);
        }
        setItsLoading(false)
    }

    useEffect(() => {
        getPokemon(searchedPokemon);
    }, [searchedPokemon])

    return (
        <Container style={{color: theme.color}}>
            {itsLoading === true &&
                <p style={{ color: theme.color }}>Loading <FontAwesomeIcon icon={faSpinner} spin /></p>
            }
            
            {!itsLoading &&
                <>
                    {pokemonNotFound === true && (
                        <>
                            <button
                                style={{ color: theme.color }}
                                onClick={() => handleReturnList()}
                                className="returnButton"
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <p className="pokemonNotFound">Pokemon Not Found 🤔🔎</p>
                        </>
                    )}

                    {!pokemonNotFound && pokemon !== null && (
                        <div>
                            <button
                                style={{ color: theme.color }}
                                onClick={() => handleReturnList()}
                                className="returnButton"
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <PokemonCard className="pokemonCard" pokemonData={pokemon} />
                        </div>
                    )}
                </>
            }
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    justify-content: center;
    position: relative;
    width: 300px;

    .pokemonNotFound {
        margin: 10px 0 0 10px;
    }

    .returnButton {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 16px;
        padding: 10px;
        border: none;
        background: none;
        cursor: pointer;
        opacity: .6;
        transition: .3s;

        &:hover {
            opacity: 1;
        }
    }
`