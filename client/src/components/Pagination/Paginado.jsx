import React from 'react'
import '../../styles/Paginado.css'

export default function Paginado({recipesPerPage, allRecipes, paginado}) {
  let pageNumbers = [];



  for(let i = 1; i < Math.ceil(allRecipes / recipesPerPage); i++){
    pageNumbers.push(i);
  };

  return (
    <nav className='btnPag'>

      {pageNumbers?.map((num) => (
        <button key={num} onClick={() => paginado(num)}> 
        {num}
        </button>
      ))}

    </nav>
  );
}
