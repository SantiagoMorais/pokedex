import styled from "styled-components"
import pokemonLogo from "../../images/pokemon-logo.png"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/themeContext"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt } from "@fortawesome/free-solid-svg-icons"

export const Footer = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <Container style={{ color: theme.color, backgroundColor: theme.footerColor }}>
            <div className="footer">
                <img
                    className="pokemonLogo"
                    src={pokemonLogo}
                    alt="Pokemon logo"
                    style={{ filter: theme.logoColor }}
                />
                <div className="creator">
                    <p>Created by: <span className="creatorsName">Felipe Santiago Morais</span></p>
                    <p>Find me on my social media:</p>
                </div>
                <ul className="social">
                    <li>
                        <a href="https://www.linkedin.com/in/felipe-santiago-morais/" target="_blank" title="Linkedin">
                            <FontAwesomeIcon icon={faLinkedin} style={{ color: theme.color }} className="socialIcon" />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/SantiagoMorais" target="_blank" title="Github">
                            <FontAwesomeIcon icon={faGithub} style={{ color: theme.color }} className="socialIcon" />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:contatofelipesantiago@gmail.com" target="_blank" title="Email">
                            <FontAwesomeIcon icon={faAt} style={{ color: theme.color }} className="socialIcon" />
                        </a>
                    </li>
                </ul>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    
    .footer {
        max-width: 1080px;
        font-size: 50px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 30px;
        justify-content: center;
        align-items: center;

        .pokemonLogo {
            height: 50px;
        }

        .creator {
            font-size: 16px;
            display: flex;
            flex-direction: column;
            gap: 5px;

            .creatorsName {
                font-weight:600;
            }
        }

        .social {
            display: flex;
            gap: 10px;
            font-size: 26px;
            justify-content: center;

            .socialIcon {
                transition: .3s;
                &:hover {
                    filter: drop-shadow(0 0 10px);
                }
            }
        }
    }

    @media(max-width: 768px) {
        .footer {
            flex-direction: column;
            gap: 15px;

            .creator {
                text-align: center;
            }
        }
    }

    @media(max-width: 300px) {
        .footer {
            .pokemonLogo {
                height: 40px;
            }

            .creator {
                font-size: 12px;
            }

            .social {
                font-size: 24px;
            }
        }
    }
`