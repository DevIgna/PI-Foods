import React from "react";
import { useDispatch } from "react-redux";
import '../../styles/Card.css'
import {getDetail} from '../../Redux/actions'


export default function Card({id, title, image, diets, vegetarian, healthScore}) {
  const dispatch = useDispatch();
  function handlerClick(){
    dispatch(getDetail(id));
  
  }
  return (
    <div className='cardComp' onClick={handlerClick}>
        <h3>{title}</h3>
        <img src={image} 
        alt="not Found" width='150px' height='150px'/>

        <h5 className="typeOfD">Tipo de Dieta:</h5>

        <h5 className="diets">
            {diets}
            {vegetarian}
        </h5>

        <h5 className="typeOfD">Health Score:{healthScore}</h5>
    </div>
  )
}
