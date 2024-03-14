import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPokemonByName } from "../../../services/fetchPokemonByName";
import { ThemeContext } from "../../../contexts/themeContext";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { typesData } from "../../homePage/pokemonTypes";
import { PokemonImage } from "../pokemonImage";
import { fetchPokemonBySpecie } from "../../../services/fetchPokemonBySpecie";
import { Measures } from "../measures";

export const PokemonPanel = () => {
    const { theme } = useContext(ThemeContext)
    const [pokemon, setPokemon] = useState(null)
    const [listImages, setListImages] = useState([])
    const [currentImage, setCurrentImage] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [speciesData, setSpeciesData] = useState(null);
    const { id } = useParams();

    const previousPage = pokemon?.id > 1 ? pokemon?.id - 1 : pokemon?.id;
    const nextPage = pokemon?.id + 1;
    const pokemonTypeColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;

    const getPokemon = async () => {
        const { data } = await fetchPokemonByName(id);
        setPokemon(data);
        setListImages(data.sprites)
        setCurrentImage(data.sprites.front_default)
    }

    const getSpeciesData = async () => {
        const response = await fetchPokemonBySpecie(id)
        const englishDescription = response.flavor_text_entries.find(en => en.language.name === 'en')?.flavor_text
        setPokemonDescription(englishDescription)
        setSpeciesData(response);
    }

    useEffect(() => {
        getPokemon();
        getSpeciesData();
    }, [id])

    return (
        <Container style={{ color: theme.color }}>
            {pokemon !== null &&
                <>
                    <div className="changePokemonsPage">
                        <Link to={`/pokemon/${previousPage}`}>
                            <button
                                style={{
                                    color: theme.color,
                                    backgroundColor: pokemonTypeColor,
                                }}
                                className="previousPokemon">
                                <FontAwesomeIcon icon={faCaretLeft} />
                                <p>Previous Pokemon</p>
                            </button>
                        </Link>
                        <h1 className="name" >{pokemon.name} <span className="id">#{pokemon.id}</span></h1>
                        <Link to={`/pokemon/${nextPage}`}>
                            <button
                                style={{
                                    color: theme.color,
                                    backgroundColor: pokemonTypeColor,
                                }}
                                className="nextPokemon">
                                <p>Next Pokemon</p>
                                <FontAwesomeIcon icon={faCaretRight} />
                            </button>
                        </Link>
                    </div>
                    <div className="details">
                        <div className="image">
                            <PokemonImage
                                listImages={listImages}
                                pokemon={pokemon}
                                image={pokemon.sprites.front_default}
                                setCurrentImage={setCurrentImage}
                                currentImage={currentImage}
                            />
                        </div>
                        <div className="description">
                            <p>{pokemonDescription}</p>
                        </div>
                        <Measures pokemon={pokemon} speciesData={speciesData}/>
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
    

    .changePokemonsPage {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        margin-bottom: 20px;

        .previousPokemon, .nextPokemon {
            cursor: pointer;
            padding: 10px;
            display: flex;
            gap: 10px;
            align-items: center;
            border: 1px solid;
            border-radius: 8px;
            font-size: 16px;
            opacity: .8;
            transition: .3s;

            &:hover {
                box-shadow: 0 0 10px;
                opacity: 1;
            }
        }

            .name {
                text-transform: capitalize;
                font-size: 28px;
                transition: .3s;

                .id {
                    opacity: .6;
                    font-size: 20px;
                }
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

        .description {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            text-align: center;

            p {
                font-size: 20px;
            }
        }
    }
`