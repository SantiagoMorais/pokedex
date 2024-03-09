import axios from "axios"
import { typesData } from "../pokemonTypes"
import { useEffect, useState } from "react"
import { PokemonCard } from "../pokemonCard"
import styled from "styled-components"

export const PokemonListByType = () => {
    const [pokemons, setPokemons] = useState([])

    const getPokemonsByType = (typeName) => {
        axios
            .get(`https://pokeapi.co/api/v2/type/${typeName}/`)
            .then((res) => {
                const pokemonsList = res.data.pokemon;
                setPokemons(pokemonsList)
                console.log(pokemons);
            })
    }

    useEffect(() => {
        getPokemonsByType("normal")
    }, [])

    return (
        <Container>
            <div className="pokemons">
            {pokemons &&
                <>
                    {pokemons &&
                        <>
                            {pokemons.map((pokemon, index) =>
                                <PokemonCard key={index} data={pokemon.pokemon.url} />
                            )}
                        </>
                    }
                </>
            }
            </div>
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

    @media(max-width: 460px) {
        .pokemons {
            gap: 10px;
            padding: 0;
        }
    }
`