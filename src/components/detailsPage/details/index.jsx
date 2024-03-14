import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NavBar } from "../navBar";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";
import { Footer } from "../../footer";
import { PokemonStats } from "../pokemonStats";
import { PokemonEvolution } from "../pokemonEvolution";
import { PokemonPanel } from "../pokemonPanel";
import { fetchPokemonByName } from "../../../services/fetchPokemonByName";

export const Details = () => {
    const { id } = useParams();
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <Container style={{ backgroundColor: theme.secondaryColor }}>
                <NavBar />
                <div className="content" style={{color: theme.color}}>
                    <PokemonPanel id={id} />
                    <PokemonStats />
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

    .content {
        max-width: 1080px;
        border: 1px solid;
        border-radius: 15px;
        padding: 20px;
    }

    @media(max-width: 460px) {
        padding: 10px;
    }
`