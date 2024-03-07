import { useEffect, useState } from "react";
import { fetchPokemon } from "../../services/fetchPokemon"
import styled from "styled-components";
import { PokemonCard } from "../pokemonCard";

export const PokemonList = () => {
    const [pokemons, setPokemons] = useState(null)

    const getPokemons = async () => {
        const response = await fetchPokemon();
        const results = response.results;
        setPokemons(results)
    }

    useEffect(() => {
        getPokemons();
    }, [])

    return (
        <Container>
            {pokemons &&
                <>
                    {pokemons.map((pokemon, index) =>
                        <PokemonCard key={index} data={pokemon.url} />
                    )}
                </>
            }
        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
`