import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { PokemonListsContext } from '../../../contexts/pokemonListsContext'
import { fetchPokemonByType } from '../../../services/fetchPokemonByType'
import { typesData } from './typesData'

export const PokemonTypes = () => {
    const {setTypeList, currentType, setCurrentType} = useContext(PokemonListsContext);

    const handleCurrentType = (type) => {
        if (type !== currentType) {
            setTypeList([]);
            setCurrentType(type);
        }
    };

    useEffect(() => {
        const getPokemonsByType = async (type) => {
            const res = await fetchPokemonByType(type);
            const pokemonList = res.pokemon;
            setTypeList(pokemonList);
        };
        currentType ? getPokemonsByType(currentType) : ''
    }, [currentType, setTypeList]);

    return (
        <Icons>
            {typesData.map((data, index) => {
                return (
                    <button
                        className='typeButton'
                        key={index}
                        onClick={() => handleCurrentType(data.type)}
                        >
                        <img
                            src={data.icon}
                            style={{ color: data.color }}
                            title={data.type}
                        />
                    </button>
                )
            })}
        </Icons>
    )
}

const Icons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    align-items: center;

    .typeButton {
        border: none;
        background: none;
        border-radius: 50%;
        cursor: pointer;

        &:hover > img {
            box-shadow: 0 0 15px;
            opacity: 1;
        }

        img {
            width: 25px;
            max-height: 25px;
            transition: .3s;
            border-radius: 50%;
            opacity: .6;
    }
}
`