import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../../Redux/actions';
import {useDispatch, useSelector } from 'react-redux';
import '../../styles/Recipe_Created.css'

function validate(input) {
  let errors = {};
  input.title
    ? (errors.title = "")
    : (errors.title = "Debes nombrar la receta");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "Es necesario proveer el resumen de la receta");
  input.diets.length < 1
    ? (errors.diets = "Elige aunque sea una receta")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "Esta dirección de imagen no es válida";
  } else {
    errors.image = "";
  }
  return errors;
}


export default function Created() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({})
  const diets = useSelector((state) => state.diets)

  useEffect(() =>{
    dispatch(getDiets())
  },[dispatch])

  const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    analyzedInstructions: '',
    image: '',
    diets: []
  });

  
  function handlerChange(e){
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  function handlerSelectDiet(e){ //funcion para seleccionar dietas
    setInput((input) =>({ //seteo el estado de input, con el estado actual + el array de dietas que contenga, el estado actual de input.diets, y lo que yo ponga a traves del valor del evento.
      ...input,
      diets: [...input.diets, e.target.value]
    }));

    if(input.diets.includes(e.target.value)){//verifico si dentro de este input existe la dieta seleccionada, si es true, seteo el estado en array vacío
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      });
    }
    setErrors(
      validate({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    )
  }
  function handlerSubmit(e){
    if(input.title && input.summary && input.image && input.diets.length > 0){
      e.preventDefault();
      dispatch(postRecipe(input))
      alert('Receta creada correctamente :)');
      setInput({
        title: '',
        summary: '',
        healthScore: 0,
        analyzedInstructions: '',
        image: '',
        diets: []
      });

      history.push('/home')
    }else{
      e.preventDefault();
      alert('Debes completar los campos...')
    }
  }
  function handlerDelete(e, d){
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== d)
    });
  }














  return (
    <div className='create'>
      <Link to='/home'>
        <button className='buttonToHome'>Volver a la Home</button>
      </Link>
      <h1>Crea tu propia receta:</h1>
      <div className='form'>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div>
            <label>Nombre del Plato:</label>
            <input className='inputCreate' type="text" name="title" placeholder='Nombre...' value={input.title} id="inputid1"  onChange={(e) => handlerChange(e)}/>
            {errors.title && <p>{errors.title}</p>}
          </div>
          <div>
            <label>Resumen:</label>
            <input className='inputCreate' type="text" placeholder='Resumen...' value={input.summary} id='inputid2' name='summary' onChange={(e) => handlerChange(e)}/>
            {errors.summary && <p>{errors.summary}</p>}
          </div>
          <div>
            <label>Puntos Salubres: </label>
            <input className='inputCreate' type="text" name="healthScore" value={input.healthScore} id="inputid3" placeholder='Puntos de salud...' onChange={(e) => handlerChange(e)}/>
          </div>
          <div>
            <label className='labelInstr'>Pasos a seguir:</label>
            <textarea className='instruction'  rows='5' type="text" name="analyzedInstructions" value={input.analyzedInstructions} id="inputid4" placeholder='Pasos...' onChange={(e) => handlerChange(e)}/>
   
          </div>
          <div>
            <label>Imagen:</label>
            <input type="text" className='inputCreate' name='image' value={input.image} id='inputid5' placeholder='https://...' onChange={(e) => handlerChange(e)}/>
          {errors.image && <p>{errors.image}</p>}
          </div>
          <div className='dietsCreate'>
            <label>Tipo de Dieta:</label>
            <select onChange={(e) => handlerSelectDiet(e)}>
            {diets.map((diet) => (

              <option value={diet.name} key={diet.name}> {diet.name}</option>
            ))}
            </select>
            {input.diets.map((diet, index) =>(
              <ul key={index}>
                <li>{diet}</li>
                <button onClick={(e) => handlerDelete(e, diet)}>x</button>
              </ul>
            ))}
            {errors.diets && <p>{errors.diets}</p>}
          </div>
          <button type='submit' className='btnCreate'>Crear Receta</button>
        </form>

      </div>

    </div>
  )
}
