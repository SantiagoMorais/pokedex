import styled from "styled-components"

export const StatsAndMeasures = (props) => {
    
    return (
        <Container>
            <>
                <div className="measures">
                    <ul>
                        <li>height</li>
                        <li>weight</li>
                        <li>locale</li>
                        <li>types</li>
                    </ul>
                </div>
                <div className="stats">
                    stats
                </div>
            </>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 


    .measures {
        width: 300px;
        border: 1px solid;
        height: 250px;
    }

    .stats {
        width: 450px;
        border: 1px solid;
        border-left: none;
        height: 250px;
    }
`