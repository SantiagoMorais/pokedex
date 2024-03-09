import styled from "styled-components"
import { NavBar } from "../navBar"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/themeContext"
import { PokemonList } from "../pokemonList"

export const Home = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <Container
            style={{
                backgroundColor: theme.secondaryColor,
            }}
        >
            <NavBar />
            <PokemonList />
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    transition: background-color .3s;
    padding: 20px;
`