import { useContext, useEffect, useState } from "react"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"
import axios from "axios";
import { PokemonCard } from "../pokemonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faX } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../contexts/themeContext";
import styled from "styled-components";

export const PokemonFound = () => {
    const { searchedPokemon, setSearchedPokemon } = useContext(PokemonListsContext);
    const [pokemon, setPokemon] = useState(null);
    const { theme } = useContext(ThemeContext);
    const [itsLoading, setItsLoading] = useState(false);
    const [pokemonNotFound, setPokemonNotFound] = useState(false);

    const handleReturnList = () => {
        setPokemon(null);
        setPokemonNotFound(false);
    }

    const getPokemon = () => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${searchedPokemon}/`.replace(/,/g, '');
        console.log(pokemonUrl);
        const response = () => {
            setItsLoading(true);
            axios
                .get(pokemonUrl)
                .then(() => {
                    setPokemon(pokemonUrl);
                    setPokemonNotFound(false);
                })
                .catch(() => {
                    setPokemonNotFound(true);
                    console.log('entrou no ".catch" do axios, identificou um erro');
                })
                .finally(() => {
                    setItsLoading(false)
                })
        }
        if (pokemon) {
            setPokemon(null)
            response()
        } else {
            response()
        }
    }

    useEffect(() => {
        getPokemon();
    }, [searchedPokemon])

    return (
        <Container>
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
                            <PokemonCard className="pokemonCard" data={pokemon} />
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