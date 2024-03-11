import styled from "styled-components"
import pokemonLogo from "../../../images/pokemon-logo.png"
import { useContext, useEffect, useState } from "react"
import { ThemeContext, themes } from "../../../contexts/themeContext"
import { PokemonTypes } from "../pokemonTypes"
import { ThemeTogglerButton } from "../../themeTogglerButton"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PokemonListsContext } from "../../../contexts/pokemonListsContext"

export const NavBar = () => {
    const { theme } = useContext(ThemeContext)
    const logoStyle = (theme === themes.light ? { filter: "invert(0%)" } : { filter: "invert(100%)" });
    const [searchField, setSearchField] = useState('')
    const {setSearchedPokemon, searchedPokemon} = useContext(PokemonListsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const refetch = searchField === searchedPokemon ? '' : searchField;
        setSearchedPokemon(refetch);
    }

    const handleSubmitChange = (e) => {
        setSearchField(e.target.value)
    }

    useEffect(() => {
        setSearchedPokemon(searchField)
    }, [searchedPokemon])

    return (
        <Container style={{ color: theme.color }}>
            <img
                src={pokemonLogo}
                alt="pokemonLogo"
                style={{filter: theme.logoColor}}
                className="pokemonLogo"
            />
            <div className="search">
                <div className="searchByName">
                    <label htmlFor="pokemonName">Find your pokemon!</label>
                    <form className="searchField" onSubmit={handleSubmit}>
                        <input
                            onChange={handleSubmitChange}
                            type="text"
                            name="pokemonName"
                            id="pokemonName"
                            placeholder="Search by name or #id"
                            style={{ color: theme.color }}
                            pattern="^[a-z0-9]+$"
                            title="Only lowercase letters and numbers are allowed."
                        />
                        <button
                            type="submit"
                            className="submitButton"
                            style={{color: theme.color}}
                        >
                            <FontAwesomeIcon className="searchIcon" icon={faCaretRight} />
                        </button>
                    </form>
                </div>

                <div className="searchByType">
                    <p className="pokemonTypeLabel">Find it by it's type:</p>
                    <div className="pokemonType">
                        <div
                            className="window"
                            style={{ backgroundColor: theme.secondaryColor }}
                        >
                            <p className="placeHolder">Search by type</p>
                            <div className="types">
                                <PokemonTypes />
                            </div>
                        </div>
                    </div>
                </div>
                <ThemeTogglerButton className="themeButton" />
            </div>
        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    display: flex;
    max-width: 1440px;
    padding: 20px 40px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .pokemonLogo {
        height: 60px;
        transition: .3s;
    }

    .search {
        display: flex;
        gap: 20px;
        position: relative;
    }

    .searchByName, .searchByType {
        display: flex;
        flex-direction: column;
        width: 200px;
        gap: 10px;
        text-align: center;
        font-weight: 600;
        font-size: 14px;

        label, .pokemonTypeLabel {
            transition: .3s;
        }
    }

    .searchByName {
        .searchField {
            height: 35px;
            display: flex;
            width: 100%;

            #pokemonName, .submitButton {
                height: 100%;
                transition: .3s;
                border: 1px solid;
            }

            #pokemonName {
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                border-radius: 8px 0 0 8px;
                background: none;
                fit-content;
                width: 100%;
            }

            .submitButton {
                padding: 0 5px;
                border-width: 1px 1px 1px 0;
                border-radius: 0 8px 8px 0;
                font-size: 20px;
                cursor: pointer;
                background:none;

                &:hover {
                    padding: 0 10px;
                }
            }
        }
    }

    .searchByType {
        cursor: default;
        position: relative;

        .pokemonType {
            position: relative;
            width: 100%;
            height: 35px;

            .window {
                padding: 7px;
                position: absolute;
                width: 100%;
                height: 35px;
                border-radius: 8px;
                border: 1px solid;
                transition: .3s;
                overflow: hidden;
                z-index: 2;

                .types {
                    margin-top: 10px;
                }

                &:hover {
                    height: 140px;
                }
            }
        }
    }

    @media(max-width: 900px) {
        flex-direction: column;
        gap: 10px;

        .pokemonLogo {
            height: 40px;
        }

        .searchByName, .searchByType, input {
            font-size: 12px;
        }

        .search {
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .searchByType {
            .pokemonType {
                .window {
                    padding-top: 9px;
        }
    }
`