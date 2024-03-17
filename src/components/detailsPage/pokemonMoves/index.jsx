import { useContext, useEffect, useState } from "react";
import { fetchPokemonData } from "../../../services/fetchPokemonData"
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";
import { useParams } from "react-router-dom";
import { typesData } from "../../homePage/pokemonTypes";

export const PokemonMoves = ({ url, pokemon }) => {
    const [move, setMove] = useState(null)
    const { theme } = useContext(ThemeContext);
    const textDescription = move !== null ? move.flavor_text_entries.find(language => language.language.name === 'en')?.flavor_text : ""
    const { id } = useParams()
    const pokemonTypeColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;


    const getPokemonMoves = async () => {

        const { data } = await fetchPokemonData('', url);
        setMove(data)
    }

    useEffect(() => {
        getPokemonMoves();
    }, [id])

    return (
        <Container style={{ color: theme.color }}>
            {move !== null &&
                <>
                    <div className="backgroundColor" style={{ backgroundColor: pokemonTypeColor }}></div>
                    <div className="move">
                        <h3 className="name">{move.name ? move.name : "No name 🤷🏽‍♂️"}: </h3>
                        <p className="moveDescription">
                            {textDescription ? textDescription : "No Description 🤷🏽‍♂️"}
                        </p>
                    </div>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 3px;
    position: relative;
    transition: .3s;

    &:nth-child(odd) {
        .backgroundColor {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .4;
            transition: .3s;
        }
    }

    .move {
        display: flex;
        align-items: center;
        gap: 5px;

        .name {
            text-transform: capitalize;
            font-size: 16px;
            z-index: 2;
        }

        .moveDescription {
            z-index: 2;
        }
    }

    @media(max-width: 580px) {
        .move {
            .name {
                font-size: 14px;
            }

            .moveDescription {
                font-size: 14px;
            }
        }
    }
`