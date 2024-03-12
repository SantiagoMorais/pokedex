import { useContext } from "react";
import { useParams } from "react-router-dom"
import { NavBar } from "../navBar";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";
import { Footer } from "../../footer";
import { StatsAndMeasures } from "../statsAndMeasures";
import { PokemonEvolution } from "../pokemonEvolution";
import { PokemonPanel } from "../pokemonPanel";

export const Details = () => {
    const { id } = useParams();
    const { theme } = useContext(ThemeContext)

    return (
        <div>
            <Container style={{ backgroundColor: theme.secondaryColor }}>
                <NavBar />
                <div className="content">
                    <PokemonPanel id={id} />
                    <StatsAndMeasures />
                    <PokemonEvolution />
                </div>
            </Container>
            <Footer />
        </div>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    transition: background-color .3s;
    padding: 20px;

    .content {
        max-width: 1080px;
    }

    @media(max-width: 460px) {
        padding: 10px;
    }
`