import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../../contexts/themeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons"
import pokeballIcon from "../../../assets/pokeball-icon.png"
import { Link } from "react-router-dom"
import { fetchPokemonData } from "../../../services/fetchPokemonData"
import PropTypes from "prop-types"
import { typesData } from "../pokemonTypes/typesData"

export const PokemonCard = ({ pokemonData, pokemonName, pokemonUrl }) => {
    const { theme } = useContext(ThemeContext);
    const [pokemon, setPokemon] = useState(null);
    const [isHovered, setIsHovered] = useState(false)
    const cardColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;

    useEffect(() => {
        const getPokemonData = async () => {
            if (pokemonUrl) {
                const { data } = await fetchPokemonData('', pokemonUrl);
                setPokemon(data);
            } else if (pokemonName) {
                const { data } = await fetchPokemonData(pokemonName);
                setPokemon(data)
            } else if (pokemonData) {
                setPokemon(pokemonData);
            }
        }

        getPokemonData();
    }, [pokemonData, pokemonName, pokemonUrl])

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
        <Link to={`/pokemon/${pokemon?.id}`}>
            <Container
                style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
                onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => { setIsHovered(false) }}
            >
                <div className="image">
                    {pokemon?.sprites.front_default
                        ? <img
                            src={pokemon?.sprites.front_default}
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
                        <p>{pokemon?.height ? pokemon.height / 10 + 'm' : <FontAwesomeIcon icon={faSpinner} spin />}</p>
                    </div>
                    <div className="weight">
                        <p>Weight:</p>
                        <p>{pokemon?.weight ? pokemon.weight / 10 + 'kg' : <FontAwesomeIcon icon={faSpinner} spin />}</p>
                    </div>
                </div>

                <div
                    style={{
                        color: theme.color,
                        backgroundColor: theme.secondaryColor,
                    }}
                    className="moreDetails"
                >
                    <FontAwesomeIcon icon={faPlus} /> Click to details
                </div>
            </Container>
        </Link>
    )
}

PokemonCard.propTypes = {
    pokemonUrl: PropTypes.string,
    pokemonName: PropTypes.string,
    pokemonData: PropTypes.object
}

const Container = styled.div`
    width: 200px;
    min-height: 300px;
    border-radius: 8px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    cursor: pointer;

    .image {
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
        margin-top: 10px;

        .type {
            padding: 3px;
            border-radius: 8px;
            border: 1px solid;
        }
    }

    .measures {
        width: 100%;
        padding: 0 20px;
        margin-top: 10px;

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
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    &:hover > .moreDetails {
        opacity: .8;
        box-shadow: 0 0 10px;
    }

    @media(max-width: 460px) {
        width: 150px;
        min-height: 250px;
        gap:5px;
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