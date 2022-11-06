import React from "react";
import {Link} from 'react-router-dom';
import '../../styles/Landing.css'


//Esta es mi pagina inicial, para luego ingresar a Home y mostrar las recetas

export default function Landing() {
  return (
    
    <div className="landing">


      <h1>¡Bienvenida/o a mi S.P.A de Food!</h1>

      <h2>¡Toca el boton de abajo para ingresar a la Home!</h2>
    <Link to='/home' className="btnLan">
        <button>Ingresar</button>
    </Link>

    </div>
  )
}
