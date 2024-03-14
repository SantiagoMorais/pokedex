import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../../contexts/themeContext"
import { Chart as Chart } from "chart.js/auto"
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
        
        setPokemonStats({baseStat, statLabels})
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
                            labels: pokemonStats.statLabels,
                            datasets: [
                                {
                                    label: "Stat",
                                    data: pokemonStats.baseStat,
                                    pointBackgroundColor: theme.color,
                                    pointBorderColor: theme.color,
                                    pointRadius: 6,
                                    borderColor: pokemonTypeColor,
                                }
                            ],
                        }}
                        options={{
                            scales: {
                                r: {
                                    suggestedMin: 0,
                                    suggestedMax: 150,
                                    ticks: {
                                        font: {
                                            size: 16,
                                        }
                                    },
                                    grid: {
                                        color: "rgba(120,120,120,0.5)",
                                        
                                    },
                                    pointLabels: {
                                        font: {
                                            size: 16,
                                        }
                                    }
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false // Isso remove a legenda do gráfico
                                },
                                title: {
                                    display: true,
                                    text: "Pokemon Stats:",
                                    font: {
                                        size: 28, // Tamanho da fonte do título
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
                    <p>{stat}: <span style={{color: pokemonTypeColor}}>{pokemonStats.baseStat[index]}</span></p>
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
    }

    .pokemonStats {
        display: flex;
        flex-direction: column;
        gap: 15px;
        glex-wrap: wrap;

        p {
            border: 1px solid;
            border-radius: 8px;
            padding: 5px;
            text-align: center;
        }
    }
`