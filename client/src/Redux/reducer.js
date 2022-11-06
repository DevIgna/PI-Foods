import {
  GET_RECIPES,
  GET_TYPES_OF_DIET,
  GET_NAME_RECIPE,
  GET_DIETS,
  GET_DETAIL,
  POST_RECIPE,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  HEALTH_SCORE,
} from './actions'


const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: {} //{}
}


export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }
    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload
      }
    case GET_NAME_RECIPE:
      return {
        ...state,
        recipes: action.payload
      }
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      }
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
        recipes: action.payload
      }

    case POST_RECIPE:
      return {
        ...state
      }
    case ORDER_BY_NAME:
      let ordenados = action.payload === 'A-Z'?
      state.recipes.sort((a,b) => {
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if(b.title.toLowerCase() > a.title.toLowerCase()) return -1;
        return 0; 
      })
      : state.recipes.sort((a,b) => {
        if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        if(b.title.toLowerCase() < a.title.toLowerCase()) return -1;
        return 0;
      })
      return {
        ...state,
        recipes: action.payload === 'default' ? state.allRecipes : ordenados
      };

    case FILTER_BY_DIET:
      let allRecipes = state.allRecipes;
      const recipesApi = allRecipes.filter((r) => !r.createdInDB);
      const filteredRecipApi = recipesApi.filter((r) => r.diets.includes(action.payload));

      const recipeDB = allRecipes.filter((r) => r.createdInDB);
      const filteredRecipDB = recipeDB.filter((r) => r.diets.name === action.payload);

      const filtered = filteredRecipDB.concat(filteredRecipApi);
      
      const vegetarianApi = allRecipes.filter((r) => r.vegetarian === true);
      const vegetarianDB = recipeDB.filter((r) => r.diets.name === 'vegetarian');
      const vegetarian = vegetarianDB.concat(vegetarianApi);

      const result = action.payload === 'vegetarian' ? vegetarian : filtered
      return {
        ...state,
        recipes: action.payload === 'default' ? allRecipes : result 
      }
    case HEALTH_SCORE:
      let recipesOrdn = action.payload === 'Desc' ?
      state.recipes.sort((a,b) => a.healthScore - b.healthScore)
      : state.recipes.sort((a,b) => b.healthScore - a.healthScore)
      return{
        ...state,
        recipes: action.payload === 'All' ? state.allRecipes : recipesOrdn
      }
    default:
      return state
  }
}

