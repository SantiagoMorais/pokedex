import { useContext } from "react"
import { PokemonCard } from "../pokemonCard"
import styled from "styled-components"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons"
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
            {typeList.length > 0 &&
                <div className="pokemons">
                    <div className="title">
                        <h2 className="typeTitle">
                            <img
                                src={icon}
                                alt={`${currentType} icon`}
                                className="typeIcon"
                                style={{
                                    filter: `drop-shadow(0 0 10px ${color})`
                                }}
                            />
                            {currentType}
                        </h2>
                        <button
                            className="return" style={{ color: theme.color }}
                            onClick={() => handleReturnList()}
                        >
                            <FontAwesomeIcon icon={faUndoAlt} />
                            <p className="returnText">Return</p>
                        </button>
                    </div>
                    {typeList.map((pokemon, index) =>
                        <PokemonCard key={index} pokemonUrl={pokemon.pokemon.url} />
                    )}
                </div>
            }
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
    
    .pokemons {
        padding: 20px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: center;
        justify-content: center;
        
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;
            width: 100%;

            .typeTitle {
                text-transform: capitalize;
                transition: .3s;
                display: flex;
                align-items: center;
                gap: 15px;
                justify-content: center;
                
                .typeIcon {
                    height: 50px;
                    transition: 1s;
                }
            }
        }
    
        .return {
            font-size: 14px;
            border: none;
            padding: 8px;
            cursor: pointer;
            opacity: .6;
            transition: .3s;
            background: none;
    
                .returnText {
                    transition: .3s;
                    font-weight: 600;
                }

            &:hover {
                filter: drop-shadow(0 0 5px);
                opacity: 1;
            }    
        }
    }
    
    @media(max-width: 460px) {
        .pokemons {
            gap: 10px;

            .title {
                margin-bottom: 10px;
            }
        }
    }
`