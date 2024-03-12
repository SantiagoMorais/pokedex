import { useEffect, useState } from "react";
import { fetchPokemonBySpecie } from "../../../services/fetchPokemonBySpecie";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { PokemonPanel } from "../pokemonPanel"
import { fetchPokemonByUrl } from "../../../services/fetchPokemonByUrl";
import { PokemonCard } from "../../homePage/pokemonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircle } from "@fortawesome/free-solid-svg-icons";

export const PokemonEvolution = () => {
    const [firstEvolution, setFirstEvolution] = useState(null)
    const [secondEvolution, setSecondEvolution] = useState(null);
    const [thirdEvolution, setThirdEvolution] = useState(null);
    const { id } = useParams();

    const getSpecieData = async (id) => {
        const res = await fetchPokemonBySpecie(id);
        const url = res.evolution_chain.url;
        const evolutionData = await fetchPokemonByUrl(url)

        const firstEvolutionsName = evolutionData.chain.species.name
        const thereIsASecondEvolution = evolutionData.chain?.evolves_to[0]?.species;
        const thereIsAThirdEvolution = evolutionData.chain?.evolves_to[0]?.evolves_to[0]?.species;

        setFirstEvolution(firstEvolutionsName)
        if (thereIsASecondEvolution) setSecondEvolution(thereIsASecondEvolution.name)
        if (thereIsAThirdEvolution) setThirdEvolution(thereIsAThirdEvolution.name)
    }

    useEffect(() => {
        getSpecieData(id)
    }, [id])

    return (
        <Container>
            <div className="cards">
                {firstEvolution !== null &&
                    <PokemonCard pokemonName={firstEvolution} />
                }
                {secondEvolution !== null &&
                    <PokemonCard pokemonName={secondEvolution} />
                }
                {thirdEvolution !== null &&
                    <PokemonCard pokemonName={thirdEvolution} />
                }
            </div>
            <p className="lineOfEvolution">
                <FontAwesomeIcon icon={faCircle} className="icon" />
                Line of evolution
                <FontAwesomeIcon icon={faCircle} className="icon" />
            </p>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 20px 0;

    .cards {
        display: flex;
        gap: 20px;
        justify-content: center;
    }

    .lineOfEvolution {
        margin-top: 10px;
        display: flex;
        gap: 10px;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        font-weight: 500;

        .icon {
            font-size: 14px;
        }
    }

`