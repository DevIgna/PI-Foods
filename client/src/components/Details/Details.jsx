import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getDetail } from '../../Redux/actions.js'
import { Link } from 'react-router-dom'
import '../../styles/Detail.css'

export default function Details(props) {

  const dispatch = useDispatch();
  const [cambio, setDetail] = useState(false);
  const detail = useSelector(state => state.detail);
  // console.log(detail)

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    setDetail(true);
  }, [props.match.params.id, dispatch])


  return (
    <div className='detail'>
      <Link to='/home'>
        <button>Volver a la Home</button>
      </Link>
      {detail ? (
        <div>
          <h1>Title: "{detail.title}"</h1>
          <img
            src={
              detail.image ? (
                detail.image
              ) : (
                <img
                  src='https://assets.unileversolutions.com/recipes-v2/233211.jpg'
                  alt='Plato'
                />
              )
            }
            alt='recipe'
          />
          <div className='h3-2'>
            {detail.createdInDB ? (
              <h2>
                Tipo de Dieta: {detail.diets.map((diet) => diet.name).join(', ')}
              </h2>
            ) : (
              <h2>
                {/* Tipo de Dieta: {
                  detail.vegetarian === true ?
                    " " + detail.diets.join(', ') + ', vegetarian'
                    : " " + detail.diets.join(', ')} */} vegetarian
              </h2>
            )}
            <div className='details'>
              {detail.healthScore !== 0 ? (
                <h3>Health Score: {detail.healthScore}</h3>
              ) : (
                <h3>Health Score: - </h3>
              )}

              <h3>Resumen:</h3>
              {/* <p>{detail.summary.replace(/<[^>]*>?/g, "")}</p> */}
              <p>{detail.summary}</p> 
              
              <h3>Paso a Paso:</h3>
              <ul>
              {detail.analyzedInstructions ? 
                detail.analyzedInstructions.map((e) => {
                  return e.steps.map((f) => <li key={f.number}> {f.step} </li>)
                })
                : detail.createdInDB}
              </ul>

              {/* {detail.analyzedInstructions ? (
                  <h3>Paso a Paso:</h3>
                ): (
                  <h3>Paso a Paso: -</h3>
                )}
                {detail.analyzedInstructions ? (
                  <ul>
                     {detail.createdInDB ? (
                      <li>aaaaaa</li>

                      <li>{detail.analyzedInstructions}</li>
                    ) : (
                      detail.analyzedInstructions[0].steps[0].map((el) => (
                        <li key={el.number} >{el.step}</li>
                      ))
                    )} 
                  </ul>
                ) : (
                  <p>ssadadaaadaaddaad</p>
                )} */}
                
              
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}
