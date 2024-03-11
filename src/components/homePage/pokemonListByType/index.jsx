import { useContext } from "react"
import { PokemonCard } from "../pokemonCard"
import styled from "styled-components"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUndoAlt, faX } from "@fortawesome/free-solid-svg-icons"
import { ThemeContext } from "../../../contexts/themeContext"

export const PokemonListByType = () => {
    const { typeList, setTypeList, setCurrentType } = useContext(PokemonListsContext)
    const { theme } = useContext(ThemeContext)

    const handleReturnList = () => {
        setTypeList([]);
        setCurrentType('');
    }

    return (
        <Container>
            <div className="pokemons">
                {typeList.length > 0 &&
                    <>
                        <div className="return" style={{ color: theme.color }}>
                            <button
                                style={{ color: theme.color }}
                                onClick={() => handleReturnList()} 
                            ><FontAwesomeIcon icon={faUndoAlt} /></button>
                            <p>Return</p>
                        </div>
                        {typeList.map((pokemon, index) =>
                            <PokemonCard key={index} data={pokemon.pokemon.url} />
                        )}
                    </>
                }
            </div>
        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;

    .return {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;

        button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            border: 1px solid transparent;
            background: none;
            font-size: 18px;
            opacity: .6;
            transition: .3s;

            &:hover {
                box-shadow: 0 0 10px;
                border: 1px solid;
                opacity: 1;
            }

            &:hover + p {
                opacity: 1;
            }
        }

        p {
            transition: .3s;
            font-weight: 600;
            opacity: .6;
        }
    }

    .pokemons {
        padding: 20px 0;

        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }

    @media(max-width: 460px) {
        .pokemons {
            gap: 10px;
            padding: 0;
        }
    }
`