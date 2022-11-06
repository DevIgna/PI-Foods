import React from "react";
import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {getNameRecipe} from '../../Redux/actions'
import '../../styles/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handlerInput(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handlerSubmit(e){
        e.preventDefault();
        dispatch(getNameRecipe(name))
        setName(''); //para que lo escrito, se vacie cuando aprete la acción
    }

    return (
        <div className="searchBar">
            <input 
            className='input' 
            type="text" 
            value={name} 
            placeholder='Buscar Receta' 
            onChange={(e) => handlerInput(e)}
            />
            <button className="btn" type="submit" onClick={(e) => handlerSubmit(e)}>
                Buscar
            </button>
        </div>
    )
}



