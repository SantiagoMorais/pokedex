import { useContext } from "react"
import { PokemonCard } from "../pokemonCard"
import styled from "styled-components"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUndoAlt, faX } from "@fortawesome/free-solid-svg-icons"
import { ThemeContext } from "../../../contexts/themeContext"
import { typesData } from "../pokemonTypes"

export const PokemonListByType = () => {
    const { typeList, setTypeList, setCurrentType, currentType } = useContext(PokemonListsContext)
    const { theme } = useContext(ThemeContext)
    const icon = typesData.find(type => type.type === currentType)?.icon;
    const color = typesData.find(type => type.type === currentType)?.color

    const handleReturnList = () => {
        setTypeList([]);
        setCurrentType('');
    }

    return (
        <Container style={{ color: theme.color }}>
            <div className="pokemons">
                <h2 className="typeTitle">
                    <img
                        src={icon}
                        alt={`${currentType} icon`}
                        className="icon"
                        style={{
                            filter: `drop-shadow(0 0 10px ${color})`
                        }}
                    />
                    {currentType}
                </h2>
                {typeList.length > 0 &&
                    <>
                        <button
                            className="return" style={{ color: theme.color }}
                            onClick={() => handleReturnList()}
                        >
                            <FontAwesomeIcon icon={faUndoAlt} />
                            <p className="returnText">Return</p>
                        </button>

                        {typeList.map((pokemon, index) =>
                            <PokemonCard key={index} pokemonUrl={pokemon.pokemon.url} />
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

    .typeTitle {
        text-transform: capitalize;
        transition: .3s;
        display: flex;
        align-items: center;
        gap: 15px;
        width: 100%;
        justify-content: center;

        .icon {
            height: 50px;
            transition: 1s;
        }
    }

    .return {
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 14px;
        position: absolute;
        right: 20px;
        top: 25px;
        padding: 5px;
        cursor: pointer;
        opacity: .6;
        transition: .3s;
        background: none;
        border: 1px solid transparent;
        border-radius: 8px;

        &:hover {
            box-shadow: 0 0 5px;
            border: 1px solid;
            opacity: 1;
        }
    }

        .returnText {
            transition: .3s;
            font-weight: 600;
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