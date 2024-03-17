import { useContext, useEffect, useState } from "react";
import { fetchPokemonData } from "../../../services/fetchPokemonData"
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/themeContext";
import { useParams } from "react-router-dom";
import { typesData } from "../../homePage/pokemonTypes";

export const PokemonAbilities = ({ url, pokemon }) => {
    const [ability, setAbility] = useState(null)
    const { theme } = useContext(ThemeContext)
    const { id } = useParams()
    const pokemonTypeColor = typesData.find((typeData) => typeData.type === pokemon?.types[0].type.name)?.color;

    const getPokemonAbilities = async () => {

        const { data } = await fetchPokemonData('', url);
        setAbility(data)
    }

    useEffect(() => {
        getPokemonAbilities();
    }, [id])

    return (
        <Container style={{ color: theme.color }}>
            {ability !== null &&
                <>
                    <div className="backgroundColor" style={{backgroundColor: pokemonTypeColor}}></div>
                    <div className="ability">
                        <h3 className="name">{ability.name}: </h3>
                        <p className="abilityDescription">
                            {ability.flavor_text_entries.find(language => language.language.name === 'en')?.flavor_text}
                        </p>
                    </div>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 3px;
    position: relative;
    transition: .3s;

    &:nth-child(odd) {
        .backgroundColor {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .4;
            transition: .3s;
        }
    }
    
    .ability {
        display: flex;
        align-items: center;
        gap: 5px;

        .name {
            text-transform: capitalize;
            font-size: 16px;
            z-index: 2;
        }

        .abilityDescription {
            z-index: 2;
        }
    }

    @media(max-width: 580px) {
        .ability {
            .name {
                font-size: 14px;
            }

            .abilityDescription {
                font-size: 14px;
            }
        }
    }
`