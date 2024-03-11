import { ThemeTogglerButton } from "../../themeTogglerButton"
import pokemonLogo from "../../../images/pokemon-logo.png"
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/themeContext"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const NavBar = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <Container>
            <Link to={`/`}>
                <img
                    src={pokemonLogo}
                    alt="pokemonLogo"
                    style={{ filter: theme.logoColor }}
                    className="pokemonLogo"
                />
            </Link>
            <div className="themeTogglerButton">
                <ThemeTogglerButton className="themeTogglerButton"/>
            </div>
        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    display: flex;
    max-width: 1440px;
    padding: 0px 40px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    
    .pokemonLogo {
        height: 80px;
        transition: .3s;
        opacity: .6;

        &:hover {
            height: 90px;
            opacity: 1;
        };
    }

    .themeTogglerButton {
        position: absolute;
        right: 20px;
        top: 10px;
    }

    @media (max-width: 900px) {
        .pokemonLogo {
            height: 60px;
            transition: .3s;
            opacity: .6;
    
            &:hover {
                height: 70px;
                opacity: 1;
            };
        }
        
        .themeTogglerButton {
            right: 50%;
            transform: translateX(50%);
            top: 70px;
        }
    }
`

