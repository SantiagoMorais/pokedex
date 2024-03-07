import styled from "styled-components"
import pokemonLogo from "../../images/pokemon-logo.png"
import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/themeContext"
import { PokemonTypes } from "../pokemonTypes"
import { ThemeTogglerButton } from "../themeTogglerButton"

export const NavBar = () => {
    const { theme } = useContext(ThemeContext)
    const logoStyle = (theme === themes.light ? { filter: "invert(0%)" } : { filter: "invert(100%)" });

    return (
        <Container style={{ color: theme.color }}>
            <img src={pokemonLogo} alt="pokemonLogo" style={logoStyle} className="pokemonLogo" />
            <div className="search">
                <div className="searchByName">
                    <label htmlFor="pokemonName">Find your pokemon!</label>
                    <input type="text" name="pokemonName" id="pokemonName" placeholder="Search by name or id" style={{ color: theme.color }} />
                </div>

                <div className="searchByType">
                    <p className="pokemonTypeLabel">Find it by it's type:</p>
                    <div className="pokemonType">
                        <div className="window" style={{backgroundColor: theme.secondaryColor}}>
                            <p className="placeHolder">Search by type</p>
                            <div className="types">
                                <PokemonTypes />
                            </div>
                        </div>
                    </div>
                </div>
                <ThemeTogglerButton className="themeButton"/>
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

    input {
        height: 35px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        border-radius: 8px;
        border: 1px solid;
        background: none;
        transition: .3s;
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