import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/themeContext"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const changeTheme = () => {
        theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light);
    }

    return (
        <>
            <Button
                onClick={() => changeTheme()}
                style={{ color: theme.color }}
            >
                <FontAwesomeIcon className="icon" icon={faSun} style={{ color: themes.light.color }} />
                <div className="changeTheme">
                    <img
                        src={theme.icon}
                        alt="themeIcon"
                        style={theme.themeTogglerButtonStyle}
                        className="themeIcon"
                    />
                    <div className="bar"></div>
                </div>
                <FontAwesomeIcon className="icon" style={{ color: themes.dark.color }} icon={faMoon} flip="horizontal" />
            </Button>
        </>
    )
}

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    cursor: pointer;
    height: 50px;
    background: none;
    margin-top: 18px;
    
    &:hover > .icon {
        box-shadow: 0 0 15px;
    }

    .icon {
        box-shadow: 0 0 5px;
        border-radius: 50%;
        padding: 3px;
        width: 20px;
        height: 20px;
        transition: .3s;
    }

    .changeTheme {
        position: relative;

        .themeIcon {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 1;
            transition: .3s;
            height: 80px;
        }

        .bar {
            width: 50px;
            height: 15px;
            border-radius: 8px;
            border: 2px solid;
            transition: .3s;
        }
    }

    @media(max-width: 900px) {
        margin-top: 0;

        .icon {
            box-shadow: 0 0 5px;
            border-radius: 50%;
            padding: 3px;
            width: 15px;
            height: 15px;
            transition: .3s;
        }

        .changeTheme {
            .themeIcon {
                height: 60px;
            }
            
            .bar {
                width: 35px;
            }
        }
    }
`