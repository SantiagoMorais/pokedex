import { useContext, useEffect, useState } from "react";
import { fetchPokemonBySpecie } from "../../../services/fetchPokemonBySpecie";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchPokemonByUrl } from "../../../services/fetchPokemonByUrl";
import { PokemonCard } from "../../homePage/pokemonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../contexts/themeContext";
import { fetchPokemonByName } from "../../../services/fetchPokemonByName";
import axios from "axios";

export const PokemonEvolution = () => {
    const { theme } = useContext(ThemeContext);

    const [firstEvolution, setFirstEvolution] = useState(null);
    const [secondEvolution, setSecondEvolution] = useState([]);
    const [thirdEvolution, setThirdEvolution] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const getEvolutionData = async (id) => {
        setIsLoading(true);
        setFirstEvolution(null);
        setSecondEvolution([]);
        setThirdEvolution([]);

        const res = await fetchPokemonBySpecie(id);
        if (!res) {
            setIsLoading(false);
            return
        }

        const url = res.evolution_chain.url;
        const evolutionData = await fetchPokemonByUrl(url)

        const firstEvolutionName = evolutionData.chain.species.name;
        setFirstEvolution(firstEvolutionName)

        const getsecondEvolutionName = async () => {
            const secondEvolutionsPromises = evolutionData.chain?.evolves_to.map(async (evolution) => {
                const url = evolution.species.url;
                const species = await fetchPokemonBySpecie('', url);
                const id = species.id;
                const { data } = await fetchPokemonByName(id);

                if (evolution?.evolves_to.length > 0) {
                    const getthirdEvolutionName = async () => {
                        const thirdEvolutionsPromises = evolution?.evolves_to.map(async (evolution) => {
                            const url = evolution.species.url;
                            const species = await fetchPokemonBySpecie('', url);
                            const id = species.id;
                            const { data } = await fetchPokemonByName(id);
                            return data.name;
                        });

                        try {
                            const thirdEvolution = await axios.all(thirdEvolutionsPromises);
                            setThirdEvolution(thirdEvolution);
                        } catch (err) {
                            console.log(`error to getting the name of Pokémon evolutions: ${err}`);
                        }
                    };

                    getthirdEvolutionName();
                }

                return data.name;
            });

            try {
                const secondEvolution = await axios.all(secondEvolutionsPromises);
                setSecondEvolution(secondEvolution);
            } catch (err) {
                console.log(`error to getting the name of Pokémon evolutions: ${err}`);
            }
        }

        getsecondEvolutionName();
        setIsLoading(false);
    }

    useEffect(() => {
        getEvolutionData(id)
    }, [id])

    if (!firstEvolution) return
    
    return (
        <Container style={{ color: theme.color }}>
            <h2 className="title"> Line of evolution </h2>

            {isLoading &&
                <p className="isLoading" style={{ color: theme.color }}>Loading <FontAwesomeIcon icon={faSpinner} spin /></p>
            }

            <div className="cards">
                {firstEvolution !== null &&
                    <div className="pokemon">
                        <div className="label">
                            <FontAwesomeIcon icon={faCircle} className="icon" />
                            <p className="text">First evolution</p>
                            <FontAwesomeIcon icon={faCircle} className="icon" />
                        </div>
                        <div className="evolution">
                            <PokemonCard pokemonName={firstEvolution} />
                        </div>
                    </div>
                }

                {secondEvolution.length > 0 &&
                    <div className="pokemon">
                        <div className="label">
                            <FontAwesomeIcon icon={faCircle} className="icon" />
                            <p className="text">Second</p>
                            <FontAwesomeIcon icon={faCircle} className="icon" />
                        </div>
                        <div className="evolution">
                            {secondEvolution.map((evolution, index) =>
                                <div key={index}>
                                    <PokemonCard pokemonName={evolution} />
                                </div>
                            )}
                        </div>
                    </div>
                }

                {thirdEvolution.length > 0 &&
                    <div className="pokemon">
                        <div className="label">
                            <FontAwesomeIcon icon={faCircle} className="icon" />
                            <p className="text">Third</p>
                            <FontAwesomeIcon icon={faCircle} className="icon" />
                        </div>
                        <div className="evolution">
                            {thirdEvolution.map((evolution, index) =>
                                <PokemonCard key={index} pokemonName={evolution} />
                            )}
                        </div>
                    </div>
                }

            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 20px 0;

    .title {
        margin: 10px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        font-weight: 500;
    }

    .isLoading {
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 38px;
        height: 370px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    .cards {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .pokemon {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            border: 1px solid;
            padding: 15px;
            border-radius: 15px;
        }

        .evolution {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            align-items: center;
        }

        .label {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 100%;

            .icon {
                font-size: 10px;
            }

            .text {
                font-size: 20px;
                text-align: center;
            }
        }
    }

    @media(max-width: 460px) {
        .title {
            font-size: 26px;
        }

        .cards {
            .label {
                .icon {
                    font-size: 8px;
                }
                .text {
                    font-size: 14px;
                }
            }
        }
    }
`