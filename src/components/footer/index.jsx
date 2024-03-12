import styled from "styled-components"

export const Footer = () => {
    return (
        <Container>
            <div className="footer">
                footer
            </div>
        </Container>
    )
}

const Container = styled.div`
    border: 1px solid;
    background-color: red;
    display: flex;
    justify-content: center;
    
    .footer {
        max-width: 1080px;
        font-size: 50px;
    }
`