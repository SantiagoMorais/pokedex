import { ThemeTogglerButton } from "../../themeTogglerButton"
import pokemonLogo from "../../../assets/pokemon-logo.png"
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/themeContext"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const NavBar = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <Container >
            <Link to={`/`}>
                <img
                    src={pokemonLogo}
                    alt="pokemonLogo"
                    style={{ filter: theme.logoColor }}
                    className="pokemonLogo"
                />
            </Link>
            <div className="themeTogglerButton">
                <ThemeTogglerButton />
                <Link to={`/`}>
                    <div className="return">
                        <p style={{ color: theme.color }}>Return</p>
                    </div>
                </Link>
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
    margin-bottom: 10px;
    position: relative;
    height: 90px;
    
    .pokemonLogo {
        height: 80px;
        transition: .3s;
        opacity: .8;
        z-index: 1;

        &:hover {
            height: 90px;
            opacity: 1;
        };
    }

    .themeTogglerButton {
        position: absolute;
        right: 120px;
        top: 0px;
        display: flex;
        align-items: center;
        gap: 10px;
        height: 50px;

        .return {
            font-weight: 600;
            padding: 5px;
    
            &:hover > p {
                opacity: 1;
                filter: drop-shadow(0 0 10px);
            }
    
            p {
                opacity: .6;
                transition: .3s;
            }
        }
    }

    @media (max-width: 900px) {
        height: 120px;

        .return {
            font-weight: 500;
            right: 0px;
            padding: 3px;
    
            p {
                font-size: 14px;
            }
        }
        
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

