import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchPokemonData } from "../../../services/fetchPokemonData";
import styled from "styled-components";
import { PokemonAbilities } from "../pokemonAbilities";
import { PokemonMoves } from "../pokemonMoves";

export const MovementsAndAbilities = () => {
    const { id } = useParams();
    const [moves, setMoves] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const getPokemonAbilities = async () => {
            const { data } = await fetchPokemonData(id);
            setPokemon(data);
            setMoves(data.moves);
            setAbilities(data.abilities);
        }

        getPokemonAbilities();
    }, [id])

    return (
        <Container>
            {moves.length > 0 && abilities.length > 0 &&
                <>
                    <div className="section">
                        <h3 className="title">Abilities:</h3>
                        <div className="abilities">
                            {abilities.map((ability, index) =>
                                <PokemonAbilities key={index} url={ability.ability.url} pokemon={pokemon} />
                            )}
                        </div>
                    </div>
                    <div className="section">
                        <h3 className="title">Moves:</h3>
                        <div className="moves">
                            {moves.map((move, index) =>
                                <PokemonMoves key={index} url={move.move.url} pokemon={pokemon}/>
                            )}
                        </div>
                    </div>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .section {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
    }

    .abilities, .moves {
        width: 100%;
        max-width: 720px;
        max-height: 150px;
        border-radius: 8px;
        border: 1px solid;
        overflow-Y: scroll;
    }
`