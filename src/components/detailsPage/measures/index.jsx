import styled from "styled-components"
import pokeballBackgroundIcon from '../../../images/pokeball-background-icon.png'
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/themeContext"
import { typesData } from "../../homePage/pokemonTypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faGem, faTree } from "@fortawesome/free-solid-svg-icons"

export const Measures = ({ pokemon, speciesData }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <Container style={{backgroundColor: theme.secondaryColor}}>
            <img
                className="backgroundPokeball"
                src={pokeballBackgroundIcon}
                alt="pokeball icon"
                style={{ filter: theme.logoColor }}
            />
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
            <ul className="data">
                <li className="measures">
                    <div className="height">
                        <p>Height:</p>
                        <p>{pokemon?.height / 10}m</p>
                    </div>
                    <div className="weight">
                        <p>Weight:</p>
                        <p>{pokemon?.weight / 10}kg</p>
                    </div>
                </li>
                {speciesData?.habitat &&
                    <li className="locate">
                        <FontAwesomeIcon icon={faTree} className="locateIcon" />
                        Habitat: {speciesData?.habitat.name}
                    </li>
                }
                {speciesData?.is_legendary &&
                    <li className="isLegendary">
                        <FontAwesomeIcon icon={faBolt} className="legendaryIcon" />
                        LEGENDARY
                        <FontAwesomeIcon icon={faBolt} className="legendaryIcon" />
                    </li>
                }
                {speciesData?.is_mythical &&
                    <li className="isMythical">
                        <FontAwesomeIcon icon={faGem} className="mythicalIcon" />
                        MYTHICAL
                        <FontAwesomeIcon icon={faGem} className="mythicalIcon" />
                    </li>
                }
            </ul>
        </Container>
    )
}

const Container = styled.div`
    border: 1px solid;
    border-radius: 8px;
    min-width: 200px;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative;
    height: 235px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    .backgroundPokeball {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        opacity: .2;
        transition: .3s;
    }

    .types {
        display: flex;
        gap: 10px;
        text-transform: capitalize;
        z-index: 1;

        .type {
            padding: 3px;
            border-radius: 8px;
            border: 1px solid;
        }
    }

    .data {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;

        .measures {
            width: 100%;

            .height, .weight {
                display:flex;
                justify-content: space-between;
                width: 100%;
                gap: 0;
            }
        }

        .locate {
            text-transform: capitalize;
            text-align: center;
            display: flex;
            gap: 5px;
            align-items: center;
    
            .locateIcon {
                color: #87A922;
            }
        }
    
        .isLegendary, .isMythical {
            font-weight: 800;
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .isLegendary {
            .legendaryIcon {
                color: #FDA403;
                filter: drop-shadow(0 0 5px);
            }
        }

        .isMythical {
            .mythicalIcon {
                color: #B80000;
                filter: drop-shadow(0 0 5px);
            }
        }
    }

    @media(max-width: 750px) {
        min-width: 45%;
        max-width: 45%;

        .backgroundPokeball {
            width: 200px;
        }
    }

    @media(max-width: 523px) {
        min-width: 100%;
        max-width: 100%;

        .backgroundPokeball {
            width: 200px;
        }

        .data {
            width: 200px;
        }
    }
`