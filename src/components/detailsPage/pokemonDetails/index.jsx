import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";

export const PokemonDetails = () => {
    const {name} = useParams();
    const {theme} = useContext(ThemeContext)
    const [pokemon, setPokemon] = useState(null)

    const getPokemonData = () => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then(res => {
                const data = res.data;
                console.log(data);
                setPokemon(data)
            })
            .catch(err => {
                console.log(`Error to fetch pokemon data from pokeapi: ${err}`);
            })
    }

    useEffect(() => {
        getPokemonData();
    },[name])
    
    return (
        <Container style={{color: theme.color}}>
            {pokemon !== null &&
                <>
                    <img className="image" src={pokemon.sprites.front_default} alt={`Pokemon ${pokemon.name}`} />
                    <h1 className="name">{pokemon.name}</h1>
                </>
            }
        </Container>
    )
}

const Container = styled.section`
    .name {
        text-transform: capitalize;
    }

`