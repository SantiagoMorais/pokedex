import styled from "styled-components"
import { NavBar } from "../navBar"
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/themeContext"
import { Lists } from "../lists"
import { Footer } from "../../footer"
import backgroundPokeballs from '../../../images/background-pokeballs.png'


export const Home = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Container style={{ backgroundColor: theme.secondaryColor }}>
                <div className="backgroundImage" style={{filter: theme.logoColor}}></div>
                <NavBar />
                <Lists />
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

    @media(max-width: 460px) {
        padding: 10px;
    }
`