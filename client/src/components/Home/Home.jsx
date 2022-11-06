import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getTypesOfDiets, filterByDiet, orderByName, healthScore} from '../../Redux/actions'
import { Link } from 'react-router-dom'
import Card from '../Card/Card.jsx'
import Paginado from '../Pagination/Paginado.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import '../../styles/Home.css'





export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  const [orderName, setOrderName] = useState('');
  const [score, setScore] = useState('')
  const diets = useSelector((state) => state.diets)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypesOfDiets())
  }, [dispatch]);

  function handlerClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handlerSelectTypeOfDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value))
  }

  function handlerSelectName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName('Orden' + e.target.value);
  }

  function handlerSelecthealthScore(e) {
    e.preventDefault();
    dispatch(healthScore(e.target.value));
    setCurrentPage(1);
    setScore('Orden' + e.target.value)
  }



  return (
    <div className='home'>
      <h1>¡Busca alguna Receta!</h1>
      <SearchBar />
      <Link className='linkCreate' to='/create-recipe'>
        <button className='btnCreate'>Crea tu Receta 😍</button>
      </Link>
      <div className='showAll'>
        <button className='btnSA' onClick={(e) => handlerClick(e)}>Mostrar Todas las Recetas</button>
      </div>
      <div className='select'>
        <span className='span'>Ordenar por Nombre de Receta</span>
        <select onChange={(e) => handlerSelectName(e)}>
          <option value="default">Todos</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <span className='span'>Ordenar por Puntaje</span>
        <select onChange={(e) => handlerSelecthealthScore(e)}>
          <option value="All">Todos</option>
          <option value="Asc">Score Ascendente</option>
          <option value="Desc">Score Descendente</option>
        </select>
        <span className='span'>Filtrar por Tipo de Dieta</span>
        <select onChange={(e) => handlerSelectTypeOfDiet(e)}>
          <option value="default">Todas las dietas</option>
          {diets.map((diet) => (
            <option value={diet.name} key={diet.id}>{diet.name}</option>
          ))}
        </select>
        
      </div>
      <div className='paginado'>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
      <div className='cards'>
        {currentRecipes?.map((curr) => (
          <div key={curr.id}>
            <Link to={'/home/' + curr.id} className='linkCard'>
              <Card
                id={curr.id}
                title={curr.title}
                image={curr.image ? (
                  curr.image
                ) : (
                  <img src='https://img.freepik.com/vector-premium/fondo-pantalla-alimentos-bebidas_87190-15.jpg' alt='Sin imagen' />
                )
                }
                diets={curr.createdInDB ? curr.diets.map((diet) => (
                  <p key={diet.name} className='dietsMap'>{diet.name}</p>
                )) :
                  curr.diets.map((diet) => (
                    <p key={diet} className='dietsMap'>{diet}</p>
                  ))
                }
                vegetarian={
                  curr.vegetarian === true ? (
                    <p className='dietsMap'>Vegetariano</p>
                  ) : (
                    <p></p>
                  )
                }
                healthScore={curr.healthScore}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className='paginado'>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
    </div>
  )
}
