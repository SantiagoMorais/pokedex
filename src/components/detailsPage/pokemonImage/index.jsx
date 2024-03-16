import { faStar, faSyncAlt, faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import pokeballBackgroundIcon from '../../../images/pokeball-background-icon.png'
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/themeContext"

export const PokemonImage = ({ listImages, pokemon, currentImage, setCurrentImage }) => {
    const { theme } = useContext(ThemeContext)

    const rotateImage = () => {
        if (currentImage === null) return;
        let newImage = null;

        if (currentImage === listImages.front_default || currentImage === listImages.back_default) {
            newImage =
                currentImage === listImages.front_default
                    ? listImages.back_default
                    : listImages.front_default;
        } else if (currentImage === listImages.front_female || currentImage === listImages.back_female) {
            newImage =
                currentImage === listImages.front_female
                    ? listImages.back_female
                    : listImages.front_female;
        } else if (currentImage === listImages.front_shiny || currentImage === listImages.back_shiny) {
            newImage =
                currentImage === listImages.front_shiny
                    ? listImages.back_shiny
                    : listImages.front_shiny;
        } else {
            newImage =
                currentImage === listImages.front_shiny_female
                    ? listImages.back_shiny_female
                    : listImages.front_shiny_female;
        }

        setCurrentImage(newImage);
    }

    const changeGender = () => {
        if (currentImage === null) return;
        let newImage = null;

        if (currentImage === listImages.front_default || currentImage === listImages.front_female) {
            newImage =
                currentImage === listImages.front_default
                    ? listImages.front_female
                    : listImages.front_default;
        } else if (currentImage === listImages.front_shiny || currentImage === listImages.front_shiny_female) {
            newImage =
                currentImage === listImages.front_shiny
                    ? listImages.front_shiny_female
                    : listImages.front_shiny;
        } else if (currentImage === listImages.back_default || currentImage === listImages.back_female) {
            newImage =
                currentImage === listImages.back_default
                    ? listImages.back_female
                    : listImages.back_default;
        } else {
            newImage =

                currentImage === listImages.back_shiny
                    ? listImages.back_shiny_female
                    : listImages.back_shiny;
        }

        setCurrentImage(newImage);
    }

    const changeToShiny = () => {
        if (currentImage === null) return;

        let newImage = null;

        if (currentImage === listImages.front_default || currentImage === listImages.front_shiny) {
            newImage =
                currentImage === listImages.front_default
                    ? listImages.front_shiny
                    : listImages.front_default;
        } else if (currentImage === listImages.back_default || currentImage === listImages.back_shiny) {
            newImage =
                currentImage === listImages.back_default
                    ? listImages.back_shiny
                    : listImages.back_default;
        } else if (currentImage === listImages.front_female || currentImage === listImages.front_shiny_female) {
            newImage =
                currentImage === listImages.front_female
                    ? listImages.front_shiny_female
                    : listImages.front_female;
        } else {
            newImage =
                currentImage === listImages.back_female
                    ? listImages.back_shiny_female
                    : listImages.back_female;
        }

        setCurrentImage(newImage);
    }


    return (
        <Container style={{backgroundColor: theme.secondaryColor}}>
            {currentImage &&
                <>
                    <img
                        className="backgroundPokeball"
                        src={pokeballBackgroundIcon}
                        alt="pokeball icon"
                        style={{ filter: theme.logoColor }}
                    />
                    <img
                        className="pokemonImage"
                        src={currentImage}
                        alt={`Pokemon ${pokemon.name}`} 
                        />
                    <div className="buttons">
                        {listImages?.front_female !== null &&
                            <button onClick={() => { changeGender() }} title="Gender" style={{ color: theme.color, backgroundColor: "#59D5E0" }}>
                                <FontAwesomeIcon icon={faVenusMars} />
                            </button>
                        }
                        {listImages?.back_default &&
                            <button onClick={() => { rotateImage() }} title="Rotate" style={{ color: theme.color, backgroundColor: "#9BCF53" }}>
                                <FontAwesomeIcon icon={faSyncAlt} />
                            </button>
                        }
                        {listImages?.front_shiny !== null &&
                            <button onClick={() => { changeToShiny() }} title="Shiny" style={{ color: theme.color, backgroundColor: "#FAA300" }}>
                                <FontAwesomeIcon icon={faStar} />
                            </button>
                        }
                    </div>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    border: 1px solid;
    border-radius: 8px;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative;
    z-index: 2;

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

    .pokemonImage {
        z-index: 1;
    }

    .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 10px;
        z-index: 1;
        
        button {
            padding: 8px;
            border-radius: 8px;
            border: 1px solid;
            opacity: .6;
            transition: .3s;
            font-size: 16px;
            cursor: pointer;
            background: none;

            &:hover {
                opacity: 1;
                box-shadow: 0 0 10px;
            }
        }
    }
`