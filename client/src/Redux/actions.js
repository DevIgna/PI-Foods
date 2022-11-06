import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_TYPES_OF_DIET = "GET_TYPES_OF_DIET";
export const GET_NAME_RECIPE = "GET_NAME_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_DETAIL = "GET_DETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const HEALTH_SCORE = 'HEALTH_SCORE'




export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}



export function getTypesOfDiets() {
    return async function (dispatch) {

        try {
            var json = await axios.get('http://localhost:3001/diets');
            return dispatch({
                type: GET_TYPES_OF_DIET,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getNameRecipe(name) {

    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/recipes?name=' + name);
            return dispatch({
                type: GET_NAME_RECIPE,
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/diets')
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
};

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/recipes/' + id)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            });
        } catch (error) {
            alert('El id de la receta no fue encontrado');
        }
        
    }
};

export function postRecipe(payload) {
    return async function () {
        const json = await axios.post('http://localhost:3001/create-recipe', payload)
        return {
            type: POST_RECIPE,
            json
        };
    }
}
export function filterByDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

/* 
*Si quiero crear algo nuevo, me vengo a las actions
*Exporto una funcion con el nombre apropiado, también el const type lo hago acá y lo exporto 
*Dentro de esta funcion creo la logica, si tiene una propiedad en específico (por ej: name
*id, nickname, etc.) la guardo dentro de los argumentos de la funcion exportadora
*retorno la function dispatch con el tipo de constante que hice arriba y el payload va a ser
*lo pasado como argumento de la funcion exportadora
*/
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function healthScore(payload) {
    return {
        type: HEALTH_SCORE,
        payload,
    }
}

/* 
*Aca es donde voy a crear la lógica para los filtros que me 
*pidan, donde luego en home les daré su select con options
*y values.
*Aunque la lógica es mejor hacerla en reducer o en componentes,
*no acá.
*Los payloads son los values de las options, como hago para
*acceder a esos options y realicen algo? Es accediendo a ese
*mismo value con e.target.value
*/

