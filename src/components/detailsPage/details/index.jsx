import { useContext } from "react";
import { useParams } from "react-router-dom"
import { NavBar } from "../navBar";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";
import { Footer } from "../../footer";
import { PokemonStats } from "../pokemonStats";
import { PokemonEvolution } from "../pokemonEvolution";
import { PokemonPanel } from "../pokemonPanel";
import backgroundPokeballs from '../../../assets/background-pokeballs.png'
import { MovementsAndAbilities } from "../movementsAndAbilities";

export const Details = () => {
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Container>
                <div className="backgroundImage" style={{ filter: theme.logoColor }}></div>
                <NavBar />
                <div className="content" style={{ color: theme.color, backgroundColor: theme.secondaryColor }}>
                    <PokemonPanel id={id} />
                    <PokemonStats />
                    <MovementsAndAbilities />
                    <PokemonEvolution />
                </div>
            </Container>
            <Footer />
        </>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    transition: background-color .3s;
    padding: 20px;
    position: relative;

    .backgroundImage {
        position: absolute;
        background: url(${backgroundPokeballs}) repeat;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: .3s
    }

    .content {
        max-width: 1080px;
        border: 1px solid;
        border-radius: 15px;
        padding: 20px;
        z-index: 2;
        transition: .3s;
    }

    @media(max-width: 460px) {
        padding: 10px;
    }
`