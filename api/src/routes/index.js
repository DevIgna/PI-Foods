const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const fetch = require("node-fetch");
require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Recipe, Diet } = require('../db')
// const arrRecipe = require('./arrRecipe.js');
const router = Router();

const getRecipesApi = async () => {
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    //!Esta es buena opcion porque de la misma forma que me traigo el map, lo voy a tener que hacer en el front
    // const resultApi = await recipesApi.data?.results.map(el => {
    //     return{
    //         id: el.id,
    //         title: el.title,
    //         summary: el.summary,
    //         healthScore: el.healthScore,
    //         steps: el.steps.map(e => {return e.step}),
    //         image: el.image,
    //         diets: el.diets,
    //     };

    // });
    // return resultApi;
    //? opcion 2 luego del axios: return recipesApi.data.results;
    // return arrRecipe;
    //? opcion 3 
    return recipesApi.data.results;
}



const getRecipesBD = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
}

const allInfo = async () => {
     const [resultsAPI, recipesDB] = await Promise.all([getRecipesApi(), getRecipesBD()])
     return [...resultsAPI, ...recipesDB];

    //! EL RESULTADO DE ESTAS OPERACIONES ME MUESTRA EL ARRAY CREADO.
    // const resultsAPI = await getRecipesApi();
    // const resultsDB = await getRecipesBD();
    // const allResults = resultsDB.concat(resultsAPI);
    // return allResults;

    //! EL RESULTADO DE ESTAS OPERACIONES ME MUESTRA LA API Y BD
    
    // const resultsAPI = await getRecipesApi();
    // const resultsDB = await getRecipesBD();
    // const allResults = resultsAPI.concat(resultsDB);
    // return allResults;
    
}


router.get('/recipes', async (req, res, next) => {
    /* ¿Que hacer? */
    /* 
    Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
    Si no existe ninguna receta mostrar un mensaje adecuado
    */
    /*Pseudocódigo: ¿Como hacerlo?
    2. que estas contengan la palabra por query
    3. verificar si no existe y mostrar un mensaje
    */

    try {
        const { name } = req.query;
        const allRecipes = await allInfo();
        if (name) {
            let recipes = await allRecipes.filter((el) => el.title.toLowerCase().includes(name.toLowerCase()));
            recipes.length ? res.json(recipes) : '';

        } else {
            res.json(allRecipes);
        }
    } catch (error) {
        next(error);
    }


})
router.get('/recipes/:id', async (req, res, next) => {
    /* 
    Cosas a hacer:
    GET /recipes/{idReceta}:
    Obtener el detalle de una receta en particular
    Debe traer solo los datos pedidos en la ruta de detalle de receta
    Incluir los tipos de dieta asociados
    */
    /* Pseudocódigo: 
    1.Inicio
    2. Desde la DB, traerme el id por params
    3. Verificar si existe(opcional)
    4. Hacer un try catch
    5. Filtrar con el objetivo de obtener solo el dato/id pedido (con un findByPk)
    6. Guardar en una variable lo filtrado
    7. Retornarlo
    8.Fin
    */
    try {
        const {id} = req.params;
        const allReceta = await allInfo();
        if (id) {
            let filtrado = await allReceta.find(el => el.id == id)
            filtrado ?
                res.json(filtrado)
                : res.json({ msg: 'No se encontró el id de receta' })
        }
    } catch (error) {
        next(error);
    }



})
router.post('/create-recipe', async (req, res, next) => {
    /* 
    Cosas a hacer:
    POST /recipes:
    Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
    Crea una receta en la base de datos relacionada con sus tipos de dietas.
    */

    /* Pseudocódigo:
    1. Inicio
    2. Recibir los datos de la db para utilzarlos en el formulario por body
    3. Fin
    */

    try {
        let { title, summary, healthScore, analyzedInstructions, image, diets } = req.body;
        if (!(title || summary)) res.json({ msg: 'Faltan parámetros' });
        //forma 1:
        /* 
        try{
            const newObj = {name, summary, healthScore, steps, image}
            const newRecipe = await Recipe.create(newObj);
            Relacionarlo:
            Recipe.addDiet(newRecipe);
        }catch (error){
            console.log(error)
        }
        
        */
        //forma 2:
        let newRecipe = await Recipe.create({
            title, summary, healthScore, analyzedInstructions, image
        });

        //Relacionarlo:
        let dietsDB = await Diet.findAll({ where: { name: diets } });
            newRecipe.addDiet(dietsDB);
            res.send('Creado Satisfactoriamente!');

    } catch (error) {
        next(error);
    }
})
router.get('/diets', async (req, res, next) => {
    /* 
    Cosas a hacer:
    Obtener todos los tipos de dieta posibles
    En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular ac
    */
    /* 
    Pseudocódigo:
    1. Inicio 
    2. Obtener names de dietas: const name = req.body.name
    3. Validar si existe, si no existe ninguna, se deberá precargar la base de datos con los tipos de datos indicados por la api
    4. Fin
    */
    try {
        const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const types = await recipesApi.data.results.map((el) => el.diets);
        //prueba 1:
        const diets = types.flat();
        //prueba 2:
        /* 
        const types = await dietTypesApi.data.results.flatMap((el) => el.diets)
        */
        const typesDiets = [...new Set(diets), 'vegetarian'];
        typesDiets.forEach((diet) => {
            Diet.findOrCreate({
                where: { name: diet }
            });
        });
        const allDiets = await Diet.findAll();
        res.json(allDiets)


    } catch (error) {
        next(error)
    }


})





module.exports = router;
