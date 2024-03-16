import { useContext } from "react"
import { ThemeContext } from "../../../contexts/themeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw, faPlus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

export const ShowMoreButtons = (props) => {
    const { theme } = useContext(ThemeContext)

    const buttonStyle = {
        color: theme.color,
        backgroundColor: theme.secondaryColor,
    }

    return (
        <>
            <Container
                style={{ color: theme.color }}
            >
                <p className="label">Show more:</p>
                <div
                    className="buttons"
                    style={{
                        color: theme.color,
                    }}
                >
                    <FontAwesomeIcon
                        className="icon"
                        icon={faPlus}
                    />
                    <button
                        className="showMoreButton"
                        style={buttonStyle}
                        onClick={props.showMore10}
                    >
                        10
                    </button>
                    <button
                        className="showMoreButton"
                        style={buttonStyle}
                        onClick={props.showMore20}
                    >
                        20
                    </button>
                    <button
                        className="showMoreButton"
                        style={buttonStyle}
                        onClick={props.showMore50}
                    >
                        50
                    </button>
                    <FontAwesomeIcon
                        className="icon"
                        icon={faPaw}
                    />
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    .label {
        text-align: center;
        font-weight: 600;
    }

    .buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;

        .icon {
            opacity: .6;
        }

        .showMoreButton {
            padding: 8px 15px;
            border-radius: 8px;
            border: 1px solid;
            font-weight: 700;
            cursor: pointer;
            transition: .3s;
            opacity: .6;

            &:hover {
                box-shadow: 0 0 10px;
                opacity: 1;
            }
        }
    }

`