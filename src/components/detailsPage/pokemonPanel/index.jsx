import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPokemonByName } from "../../../services/fetchPokemonByName";
import { ThemeContext } from "../../../contexts/themeContext";
import { Link, useParams } from "react-router-dom";

export const PokemonPanel = (props) => {
    const { theme } = useContext(ThemeContext)
    const [pokemon, setPokemon] = useState(null)
    const { id } = useParams();

    const getPokemon = async () => {
        const { data } = await fetchPokemonByName(props.id);
        setPokemon(data);
    }

    useEffect(() => {
        getPokemon();
    }, [])

    return (
        <Container style={{ color: theme.color }}>
            <Link to={`/pokemon/${id}`}>
                <div className="previousPokemon">
                    previous Pokemon
                </div>
            </Link>
            {pokemon !== null &&
                <div className="panel">
                    <h1 className="name">{pokemon.name}</h1>
                    <div className="pokemonDescription">
                        <div className="image">
                            image
                            <div className="buttons">buttons</div>
                        </div>
                        <div className="description">description</div>
                    </div>
                </div>
            }
            <Link to={`/pokemon/${id}`}>
                <div className="nextPokemon">
                    next Pokemon
                </div>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    gap: 20px;

    .name {
        text-transform: capitalize;
        font-size: 24px;
    }

    .pokemonDescription {
        display: flex;
        margin-bottom: 20px;

        .image {
            height: 200px;
            border: 1px solid;
            width: 250px;
            border-right: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .buttons {
                border-top: 1px solid;
                height: 50px;
            }
        }

        .description {
            height: 200px;
            border: 1px solid;
            width: 500px;
        }
    }
`