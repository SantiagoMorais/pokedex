import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../../contexts/themeContext"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faPlus, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { typesData } from "../pokemonTypes"
import pokeballIcon from "../../../images/pokeball-icon.png"
import { Link } from "react-router-dom"

export const PokemonCard = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const [pokemon, setPokemon] = useState(null);
    const [frontImage, setFrontImage] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const cardColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;
    const backImage = pokemon?.sprites.back_default;

    const rotatePokemon = () => {
        frontImage ? setFrontImage(false) : setFrontImage(true);
    }

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

    const hoverStyle = {
        boxShadow: `0 0 15px ${cardColor}`
    }

    const baseStyle = {
        color: theme.color,
        background: `linear-gradient(0deg, ${cardColor} 0%, ${theme.secondaryColor} 90%)`,
        border: `1px solid ${cardColor}`,
        transition: `.3s`
    }

    return (
        <Container
            style={ isHovered ? {...baseStyle, ...hoverStyle} : baseStyle}
            onMouseEnter={() => {setIsHovered(true)}}
            onMouseLeave={() => {setIsHovered(false)}}
            >
                    {backImage &&
                        <button
                            className="rotate"
                            style={{ color: theme.color }}
                            onClick={() => rotatePokemon()}
                        >
                            <FontAwesomeIcon icon={faRotateLeft} />
                        </button>
                    }

                    <div className="image">
                        {pokemon?.sprites.front_default
                            ? <img
                                src={
                                    frontImage
                                        ? pokemon?.sprites.front_default
                                        : (backImage ? backImage : pokemon?.sprites.front_default)
                                }
                                alt={`Pokemon ${pokemon?.name}`} />
                            : <div className="pokemonImageNotFound">
                                <img src={pokeballIcon} alt={`Pokemon ${pokemon?.name} not found`} />
                                <p>Image not found <FontAwesomeIcon icon={faMagnifyingGlass} /></p>
                            </div>
                        }

                    </div>
                    <h3 className="name">{pokemon?.name} <span className="id">#{pokemon?.id}</span></h3>

                    <div className="types">
                        {pokemon?.types.map((type, index) => {
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
                            <p>{pokemon?.height / 10}m</p>
                        </div>
                        <div className="weight">
                            <p>Weight:</p>
                            <p>{pokemon?.weight / 10}kg</p>
                        </div>
                    </div>
                    <Link to={`/pokemon/${pokemon?.name}`}>
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
                    </Link>
        </Container>
    )
}

const Container = styled.div`
    width: 200px;
    min-height: 340px;
    border-radius: 8px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
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

        .pokemonImageNotFound {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px; 

            img {
                width: 50%;
            }
        }
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
        width: 150px;
        min-height: 300px;
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