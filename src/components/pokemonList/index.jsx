import { useContext, useEffect, useState } from "react";
import { fetchPokemon } from "../../services/fetchPokemon"
import styled from "styled-components";
import { PokemonCard } from "../pokemonCard";
import { faPaw, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../contexts/themeContext";

export const PokemonList = () => {
    const [pokemons, setPokemons] = useState(null)
    const {theme} = useContext(ThemeContext);

    const getPokemons = async () => {
        const response = await fetchPokemon(10, 0);
        const results = response.results;
        setPokemons(results)
    }

    useEffect(() => {
        getPokemons();
    }, [])

    return (
        <Container>
            <div className="pokemons">
                {pokemons &&
                    <>
                        {pokemons.map((pokemon, index) =>
                            <PokemonCard key={index} data={pokemon.url} />
                        )}
                    </>
                }
            </div>
            <button 
                className="showMore"
                style={{color: theme.color}}>
                <FontAwesomeIcon icon={faPlus} />
                Show more
                <FontAwesomeIcon icon={faPaw} />
            </button>
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
        max-width: 640px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }

    .showMore {
        padding: 5px 15px;
        transition: .3s;
        background: none;
        border: 1px solid;
        border-radius: 8px;
        display: flex;
        align-items: center;
        font-weight: 600; 
        gap: 5px;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 10px;
        }
    }

    @media(max-width: 460px) {
        .pokemons {
            gap: 10px;
            padding: 0;
        }
    }
`