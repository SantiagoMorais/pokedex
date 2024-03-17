import { Link } from "react-router-dom"
import styled from "styled-components"
import { typesData } from "../../homePage/pokemonTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/themeContext";

export const ChangePokemonPage = ({ pokemon }) => {
    const { theme } = useContext(ThemeContext)
    let previousPage = pokemon?.id - 1;
    let nextPage = pokemon?.id + 1;
    const pokemonTypeColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;
    
    return (
        <Container>
            {previousPage >= 1
                ?
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
                :
                <button
                    style={{
                        color: theme.color,
                        backgroundColor: theme.secondaryColor,
                    }}
                    className="firstPokemon">
                    <FontAwesomeIcon icon={faCaretLeft} />
                    <p>Previous Pokemon</p>
                </button>
            }

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
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;

    .previousPokemon, .nextPokemon, .firstPokemon {
        padding: 10px;
        display: flex;
        gap: 10px;
        align-items: center;
        border: 1px solid;
        border-radius: 8px;
        font-size: 16px;
    }

    .previousPokemon, .nextPokemon {
        cursor: pointer;
        opacity: .8;
        transition: .3s;

        &:hover {
            box-shadow: 0 0 10px;
            opacity: 1;
        }
    }

    .firstPokemon {
        opacity: .6;
    }

    .name {
        text-transform: capitalize;
        font-size: 28px;
        transition: .3s;
        text-align: center;

        .id {
            opacity: .6;
            font-size: 20px;
        }
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


            .description {
                width: 235px;
                order: 3;
            }

        }
    }

    @media(max-width: 450px) {
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;

        .previousPokemon, .nextPokemon, .firstPokemon {
            width: 120px;
        }

        .name {
            order: 3;
        }
    }

`