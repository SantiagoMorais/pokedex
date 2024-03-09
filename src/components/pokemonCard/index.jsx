import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../contexts/themeContext"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { typesData } from "../pokemonTypes"

export const PokemonCard = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const [pokemon, setPokemon] = useState(null);
    const [frontImage, setFrontImage] = useState(true)
    const cardColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;

    const getPokemonData = () => {
        const response = axios
            .get(data)
            .then(response => {
                const data = response.data;
                setPokemon(data);
            })
            .catch(error => {
                throw new error(`Error to fetch pokemon data from pokeapi: ${error}`)
            })
        return response
    }

    useEffect(() => {
        getPokemonData();
    }, [])

    const rotatePokemon = () => {
        frontImage ? setFrontImage(false) : setFrontImage(true);
    }

    return (
        <Container
            style={{
                color: theme.color,
                background: `linear-gradient(0deg, ${cardColor} 0%, ${theme.secondaryColor} 90%)`,
            }}>
            {pokemon &&
                <>
                    <button
                        className="rotate"
                        style={{ color: theme.color }}
                        onClick={() => rotatePokemon()}
                    >
                        <FontAwesomeIcon icon={faRotateLeft} />
                    </button>
                    <div className="image">
                        <img
                            src={
                                frontImage
                                    ? pokemon.sprites.front_default
                                    : pokemon.sprites.back_default
                            }
                            alt={`Pokemon ${pokemon.name}`} />
                    </div>
                    <h3 className="name">{pokemon.name} <span className="id">#{pokemon.id}</span></h3>

                    <div className="types">
                        {pokemon.types.map((type, index) => {
                            const typeName = type.type.name;
                            const typeColor = typesData.find((typeData) => typeData.type === typeName)?.color;
                            return (
                                <div className="type" key={index} style={{ backgroundColor: typeColor }}>
                                    <p>{typeName}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="measures">
                        <div className="height">
                            <p>Height:</p>
                            <p>{pokemon.height / 10}m</p>
                        </div>
                        <div className="weight">
                            <p>Weight:</p>
                            <p>{pokemon.weight / 10}kg</p>
                        </div>
                    </div>
                    <button
                        style={{
                            color: theme.color,
                            backgroundColor: theme.secondaryColor,
                            transition: ".3s"
                        }}
                        className="moreDetails"
                    >
                        More details <FontAwesomeIcon icon={faPlus} />
                    </button>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 200px;
    border-radius: 8px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    gap: 5px;
    position: relative;

    .rotate {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        border: none;
        cursor: pointer;
        transition: .3s;
        background: none;
        opacity: .6;
        font-size: 16px;

        &:hover {
            box-shadow: 0 0 10px;
            opacity: 1;
        }
    }

    .image {
        transition: .3s;
    }

    .name {
        text-transform: capitalize;
        text-align: center;
    }

    .id {
        opacity: .5;
        font-weight: 600;
        font-size: 14px;
    }

    .types {
        display: flex;
        gap: 10px;
        text-transform: capitalize;

        .type {
            padding: 3px;
            border-radius: 8px;
            border: 1px solid;
        }
    }

    .measures {
        width: 100%;
        padding: 0 20px;

        .height, .weight {
            display:flex;
            justify-content: space-between;
        }
    }

    .moreDetails {
        border-radius: 8px;
        padding: 3px 6px;
        border: 1px solid;
        background: none;
        cursor: pointer;
        opacity: .6;
        transition: .3s;
        margin-top: 10px;

        &:hover {
            opacity: 1;
            box-shadow: 0 0 5px;
        }
    }

    @media(max-width: 460px) {
        width: 135px;
        padding: 10px;

        .name {
            font-size: 16px;
        }

        .types {
            font-size: 14px;
            .type {
                padding: 2px;
            }
        }

        .measures {
            padding: 0;
            font-size: 14px;
        }

        .moreDetails {
            font-size: 12px;
        }
    }
`