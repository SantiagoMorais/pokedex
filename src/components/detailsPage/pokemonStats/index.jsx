import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../../contexts/themeContext"
import { Radar } from "react-chartjs-2"
import { typesData } from "../../homePage/pokemonTypes"
import { useParams } from "react-router-dom"
import { fetchPokemonByName } from "../../../services/fetchPokemonByName"

export const PokemonStats = () => {
    const { theme } = useContext(ThemeContext)
    const [pokemon, setPokemon] = useState(null)
    const pokemonTypeColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color
    const [pokemonStats, setPokemonStats] = useState(null)
    const { id } = useParams();

    const getPokemon = async () => {
        const { data } = await fetchPokemonByName(id);
        setPokemon(data)
        const baseStat = data.stats.map(stat => stat.base_stat)

        const statLabels = data.stats.map(stat => {
            // setting the first letter of every stat to upper case
            return stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1);
        })

        setPokemonStats({ baseStat, statLabels })
    }

    useEffect(() => {
        getPokemon();
    }, [id])

    return (
        <Container style={{ color: theme.color }}>
            <div className="chart">
                {pokemon !== null &&
                    <>
                        <Radar
                            style={{ color: theme.color }}
                            data={{
                                labels: ["Hp", "Att", "Def", "Sp.Att", "Sp.Def", "Speed"],
                                datasets: [
                                    {
                                        label: "Stat",
                                        data: pokemonStats.baseStat,
                                        pointBackgroundColor: theme.color,
                                        pointBorderColor: theme.color,
                                        pointRadius: window.innerWidth <= 580 ? 4 : 6,
                                        borderColor: pokemonTypeColor,
                                    }
                                ],
                            }}
                            options={{
                                scales: {
                                    r: {
                                        suggestedMin: 0,
                                        suggestedMax: 200,
                                        ticks: {
                                            font: {
                                                size: window.innerWidth <= 580 ? 12 : 16,
                                            },
                                            count: 6,
                                        },
                                        grid: {
                                            color: "rgba(120,120,120,0.5)",
                                        },
                                        pointLabels: {
                                            font: {
                                                size: window.innerWidth <= 580 ? 12 : 16,
                                            },
                                            color: pokemonTypeColor,
                                        }
                                    },
                                },
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    title: {
                                        display: true,
                                        text: "Pokemon Stats:",
                                        font: {
                                            size: window.innerWidth <= 580 ? 20 : 28,
                                        },
                                    },
                                },
                            }}
                        />
                    </>
                }
            </div>
            <div className="pokemonStats">
                {pokemonStats?.statLabels?.map((stat, index) =>
                    <div className="stats" key={index}>
                        {stat}: <span style={{ color: pokemonTypeColor }}>{pokemonStats.baseStat[index]}</span>
                    </div>
                )}
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    margin-top: 20px;
    gap: 20px;
    width: 100%;

    .chart {
        width: 600px;
        height: auto;
        display: flex;
        justify-content: center;
    }

    .pokemonStats {
        display: flex;
        flex-direction: column;
        gap: 15px;
        glex-wrap: wrap;

        .stats {
            border: 1px solid;
            border-radius: 8px;
            padding: 5px;
            text-align: center;
            
            span {
                font-weight: 700;
            }
        }
    }

    @media(max-width: 900px) {
        flex-direction: column;
        align-items: center;

        .chart {
            width: 500px;
        }

        .pokemonStats {
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;

            .stats {
                font-size: 14px;
                width: 150px;
            }
        }

    }

    @media(max-width: 580px) {
        .chart {
            position: relative;
            width: 300px;
        }

    }
`