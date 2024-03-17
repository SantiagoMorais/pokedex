import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPokemonData } from "../../../services/fetchPokemonData";
import { ThemeContext } from "../../../contexts/themeContext";
import { Link, useParams } from "react-router-dom";
import { typesData } from "../../homePage/pokemonTypes";
import { PokemonImage } from "../pokemonImage";
import { fetchPokemonBySpecie } from "../../../services/fetchPokemonBySpecie";
import { Measures } from "../measures";
import { ChangePokemonPage } from "../changePokemonPage";

export const PokemonPanel = () => {
    const { theme } = useContext(ThemeContext)
    const [pokemon, setPokemon] = useState(null)
    const [listImages, setListImages] = useState([])
    const [currentImage, setCurrentImage] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [speciesData, setSpeciesData] = useState(null);
    const [lastPokemon, setLastPokemon] = useState(false)
    const { id } = useParams();

    const pokemonTypeColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;

    const getPokemon = async () => {
        const { data } = await fetchPokemonData(id);
        setLastPokemon(false);
        setPokemon(data);
        setListImages(data.sprites)
        setCurrentImage(data.sprites.front_default)
    }

    const getSpeciesData = async () => {
        setLastPokemon(false);
        await fetchPokemonBySpecie(id)
            .then((res) => {
                const englishDescription = res.flavor_text_entries.find(en => en.language.name === 'en')?.flavor_text
                setPokemonDescription(englishDescription)
                setSpeciesData(res);
            })
            .catch(() => {
                setLastPokemon(true);
            })
    }

    useEffect(() => {
        getPokemon();
        getSpeciesData();
    }, [id])

    return (
        <Container style={{ color: theme.color }}>
            {lastPokemon &&
                <>
                    <p className="lastPokemon">We found an error searching the Pokémon #{id} 🤔🔎</p>
                    <Link to={`/`}>
                        <p className="lastPokemon return" style={{ color: theme.color }}>Return to the first page</p>
                    </Link>
                </>
            }
            {pokemon !== null &&
                <>
                    <ChangePokemonPage pokemon={pokemon} />
                    <div className="details">
                        <div className="backgroundColor" style={{ backgroundColor: pokemonTypeColor }}></div>
                        <div className="image" style={{ backgroundColor: theme.secondaryColor }}>
                            <PokemonImage
                                listImages={listImages}
                                pokemon={pokemon}
                                image={pokemon.sprites.front_default}
                                setCurrentImage={setCurrentImage}
                                currentImage={currentImage}
                            />
                        </div>
                        <div className="description">
                            <div>{pokemonDescription
                                ?
                                <>
                                    <h3 className="descriptionTitle">Description: </h3>
                                    {pokemonDescription}
                                </>
                                : <p>No Description 🤷🏽‍♂️</p>}</div>
                        </div>
                        <Measures pokemon={pokemon} speciesData={speciesData} />
                    </div>
                </>
            }
        </Container >
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    gap: 20px;

    .lastPokemon {
        font-size: 20px;
        max-width: 450px;
        text-align: center;
    }

    .lastPokemon.return {
        opacity: .6;
        font-weight: 600;
        transition: .3s;
        padding: 8px;

        &:hover {
            opacity: 1;
            filter: drop-shadow(0 0 10px);
        }
    }

    .details {
        border: 1px solid;
        width: 100%;
        display: flex;
        padding: 10px;
        gap: 20px;
        align-items: center;
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        transition: .3s;
        justify-content: space-between;

        .image {
            border-radius: 8px;
        }

        .description {
            display: flex;
            justify-content: center;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            height: 100%;
            text-align: center;
            min-width: 235px;
            margin-bottom: 15px;

            div {
                font-size: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
    }

    .backgroundColor {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .3;
        transition: .3s;
    }

    @media(max-width: 750px) {
        .changePokemonsPage {
            .name {
                font-size: 20px;
            }
        }

        .details {
            width: fit-content;
            flex-wrap: wrap;
            justify-content: center;

            .image {
                width: 50%;
            }

            .description {
                order: 3;
            }
        }
    }

    @media(max-width: 523px) {
        .details {
            .image {
                width: 100%;
            }
        }
    }
`