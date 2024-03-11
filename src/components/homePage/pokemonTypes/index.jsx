import styled from 'styled-components'
import bugType from '../../../images/typeIcons/Pokemon_Type_Icon_Bug.png'
import darkType from '../../../images/typeIcons/Pokemon_Type_Icon_Dark.png'
import dragonType from '../../../images/typeIcons/Pokemon_Type_Icon_Dragon.png'
import electricType from '../../../images/typeIcons/Pokemon_Type_Icon_Electric.png'
import fairyType from '../../../images/typeIcons/Pokemon_Type_Icon_Fairy.png'
import fightingType from '../../../images/typeIcons/Pokemon_Type_Icon_Fighting.png'
import fireType from '../../../images/typeIcons/Pokemon_Type_Icon_Fire.png'
import flyingType from '../../../images/typeIcons/Pokemon_Type_Icon_Flying.png'
import ghostType from '../../../images/typeIcons/Pokemon_Type_Icon_Ghost.png'
import grassType from '../../../images/typeIcons/Pokemon_Type_Icon_Grass.png'
import groundType from '../../../images/typeIcons/Pokemon_Type_Icon_Ground.png'
import iceType from '../../../images/typeIcons/Pokemon_Type_Icon_Ice.png'
import normalType from '../../../images/typeIcons/Pokemon_Type_Icon_Normal.png'
import poisonType from '../../../images/typeIcons/Pokemon_Type_Icon_Poison.png'
import psychicType from '../../../images/typeIcons/Pokemon_Type_Icon_Psychic.png'
import rockType from '../../../images/typeIcons/Pokemon_Type_Icon_Rock.png'
import steelType from '../../../images/typeIcons/Pokemon_Type_Icon_Steel.png'
import waterType from '../../../images/typeIcons/Pokemon_Type_Icon_Water.png'
import { useContext, useEffect, useState } from 'react'
import { PokemonListsContext } from '../../../contexts/pokemonListsContext'
import axios from 'axios'

export const typesData = [
    { type: "bug", icon: bugType, color: '#90C12C' },
    { type: "dark", icon: darkType, color: '#5A5366' },
    { type: "dragon", icon: dragonType, color: '#096DC4' },
    { type: "electric", icon: electricType, color: '#ddbc00' },
    { type: "fairy", icon: fairyType, color: '#EC8FE6' },
    { type: "fighting", icon: fightingType, color: '#CE4069' },
    { type: "fire", icon: fireType, color: '#fd6119' },
    { type: "flying", icon: flyingType, color: '#92AADE' },
    { type: "ghost", icon: ghostType, color: '#5269AC' },
    { type: "grass", icon: grassType, color: '#63BB5B' },
    { type: "ground", icon: groundType, color: '#c78a6b' },
    { type: "ice", icon: iceType, color: '#74CEC0' },
    { type: "normal", icon: normalType, color: '#9099A1' },
    { type: "poison", icon: poisonType, color: '#AB6AC8' },
    { type: "psychic", icon: psychicType, color: '#F97176' },
    { type: "rock", icon: rockType, color: '#C7B78B' },
    { type: "steel", icon: steelType, color: '#5A8EA1' },
    { type: "water", icon: waterType, color: '#4D90D5' },
]

export const PokemonTypes = () => {
    const {setTypeList, currentType, setCurrentType} = useContext(PokemonListsContext)

    const handleCurrentType = (type) => {
        if (type !== currentType) {
            setTypeList([]);
            setCurrentType(type);
        }
    }

    const getPokemonsByType = (type) => {
        axios
            .get(`https://pokeapi.co/api/v2/type/${type}/`)
            .then((res) => {
                const results = res.data.pokemon;
                setTypeList(results);
            })
            .catch((err) => {
                throw new Error(`Failed to fetch data from poke api: ${err}`)
            })
    }

    useEffect(() => {
        currentType ? getPokemonsByType(currentType) : ''
    }, [currentType])

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