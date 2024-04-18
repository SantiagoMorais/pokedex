import { useContext, useEffect, useState } from "react";
import { fetchPokemonList } from "../../../services/fetchPokemonList"
import styled from "styled-components";
import { PokemonCard } from "../pokemonCard";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../contexts/themeContext";
import { ShowMoreButtons } from "../showMoreButtons";
import { PokemonListsContext } from "../../../contexts/pokemonListsContext";

export const DefaultPokemonList = () => {
    const { defaultList, setDefaultList } = useContext(PokemonListsContext)
    const [listSize, setListSize] = useState(10);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useContext(ThemeContext)

    const loadMorePokemons = async (pokemonsNumber) => {
        setOffset(defaultList.length);
        setListSize(pokemonsNumber);
        setIsLoading(true);
    }

    useEffect(() => {
        const getPokemons = async () => {
            const response = await fetchPokemonList(listSize, offset);
            const newPokemons = response.results;
    
            //The code below checks if the getPokemons function is being called twice, to avoid duplicate Pokémon state data.
            setDefaultList(prevPokemons => {
                const updatedPokemons = [...prevPokemons];
                newPokemons.forEach(newPokemon => {
                    !updatedPokemons.some(pokemon => pokemon.url === newPokemon.url)
                        ? updatedPokemons.push(newPokemon)
                        : ''
                });
                return updatedPokemons;
            });
            setIsLoading(false);
        }
        getPokemons();
    }, [offset, setDefaultList, listSize])

    return (
        <Container>
            <div className="pokemons">
                {defaultList &&
                    <>
                        {defaultList.map((pokemon, index) =>
                            <PokemonCard key={index} pokemonUrl={pokemon.url} />
                        )}
                    </>
                }
            </div>
            {isLoading
                ? <p className="isLoading" style={{ color: theme.color }}>Loading <FontAwesomeIcon icon={faSpinner} spin /></p>
                : <ShowMoreButtons
                    showMore10={() => loadMorePokemons(10)}
                    showMore20={() => loadMorePokemons(20)}
                    showMore50={() => loadMorePokemons(50)}
                />}

        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;

    .pokemons {
        padding: 20px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }

    .showMore {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .label {
            text-align: center;
            font-weight: 600;
        }

        .buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;

            .icon {
                opacity: .6;
            }

            .showMoreButton {
                padding: 8px 15px;
                border-radius: 8px;
                border: 1px solid;
                font-weight: 700;
                cursor: pointer;
                transition: .3s;
                opacity: .6;

                &:hover {
                    box-shadow: 0 0 10px;
                    opacity: 1;
                }
            }
        }
    }

    .isLoading {
        height: 63px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    @media(max-width: 460px) {
        .pokemons {
            gap: 10px;
            padding: 10px;
        }
    }
`