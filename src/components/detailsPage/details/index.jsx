import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { NavBar } from "../navBar";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";
import { PokemonDetails } from "../pokemonDetails";

export const Details = () => {
    const {name} = useParams();
    const {theme} = useContext(ThemeContext)

    return (
        <Container style={{backgroundColor: theme.secondaryColor}}>
            <NavBar />
            <PokemonDetails />
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

    @media(max-width: 460px) {
        padding: 10px;
    }
`