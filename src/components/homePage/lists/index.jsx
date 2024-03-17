import { useContext } from "react"
import { DefaultPokemonList } from "../defaultPokemonList"
import { PokemonListByType } from "../pokemonListByType"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { ThemeContext } from "../../../contexts/themeContext"
import styled from "styled-components"
import { PokemonFound } from "../pokemonFound"

export const Lists = () => {
    const { typeList, searchedPokemon } = useContext(PokemonListsContext)
    const { theme } = useContext(ThemeContext)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',   
        });
    }

    return (
        <Container>
            {searchedPokemon &&
                <div className="search">
                    <PokemonFound />
                </div>
            }
            {typeList?.length > 0 ?
                <PokemonListByType />
                : <DefaultPokemonList />
            }

            <button
                className="scrollToTop"
                onClick={() => scrollToTop()}
                style={{
                    color: theme.color
                }}>
                <FontAwesomeIcon className="upArrowIcon" icon={faArrowCircleUp} />
            </button>
        </Container>
    )
}

const Container = styled.section`
    position: relative;
    max-width: 1080px;

    .search {

        display: flex;
        justify-content: center;
    }

    .scrollToTop {
        background: none;
        font-size: 40px;
        width: 50px;
        height: 75px;
        display:flex;
        justify-content: center;
        opacity: .6;
        transition: .3s;
        cursor: pointer;
        position: fixed;
        right: 10px;
        bottom: 0px;
        background: none;
        border: none;

        .upArrowIcon {
            align-self: flex-end;
            margin-bottom: 10px;
        }

        &:hover {
            opacity: 1;
        }
    }
`