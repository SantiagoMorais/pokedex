import { useContext, useEffect, useState } from "react";
import { fetchPokemonBySpecie } from "../../../services/fetchPokemonBySpecie";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchPokemonByUrl } from "../../../services/fetchPokemonByUrl";
import { PokemonCard } from "../../homePage/pokemonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../contexts/themeContext";

export const PokemonEvolution = () => {
    const { theme } = useContext(ThemeContext)

    const [firstEvolution, setFirstEvolution] = useState(null)
    const [secondEvolution, setSecondEvolution] = useState([]);
    const [thirdEvolution, setThirdEvolution] = useState([]);
    const { id } = useParams();

    const getEvolutionData = async (id) => {
        setFirstEvolution(null);
        setSecondEvolution([]);
        setThirdEvolution([]);

        const res = await fetchPokemonBySpecie(id);
        const url = res.evolution_chain.url;
        const evolutionData = await fetchPokemonByUrl(url)

        const firstEvolutionsName = evolutionData.chain.species.name
        setFirstEvolution(firstEvolutionsName)

        const secondEvolutionsName = [];
        const thirdEvolutionsName = [];

        evolutionData.chain?.evolves_to.map(evolution => {
            const name = evolution.species.name;
            secondEvolutionsName.push(name)

            if (evolution.evolves_to.length > 0) {
                evolution.evolves_to.map(newEvolution => {
                    const name = newEvolution.species.name;
                    thirdEvolutionsName.push(name);
                })
            }
        })

        if (secondEvolutionsName.length > 0) setSecondEvolution(secondEvolutionsName)
        if (thirdEvolutionsName.length > 0) setThirdEvolution(thirdEvolutionsName)
    }

    useEffect(() => {
        getEvolutionData(id)
    }, [id])

    return (
        <Container style={{ color: theme.color }}>
            <h2 className="title"> Line of evolution </h2>

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
            width: 200px;

            .icon {
                font-size: 10px;
            }

            .text {
                font-size: 20px;
                text-align: center;
        
                .pokemonsName {
                    text-transform: capitalize;
                }
            }
        }
    }
`