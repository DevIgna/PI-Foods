const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   nameValidate(value) {
      //     if (value.length > 100) alert('No se permiten titulos de más de 100 carácteres');
      //   }
      // }
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   summValidate(value) {
      //     if (value.length > 2500) alert('No se permiten resumenes de más de 100 carácteres');
      //   }
      // }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      // validate:{
      //   hScoreValidate(value){
      //     if(!value > 1 && !value < 101) alert('El Health Score es invalido')
      //   }
      // }
    },
    analyzedInstructions: {
      type: DataTypes.TEXT, 

      // validate: {
      //   stepsValidate(value){
      //     if(value < 0 && value < 65535) alert('Numero de pasos invalidos')
      //   }
      // }
    },
    image:{
      type: DataTypes.STRING,
      // validate:{
      //   imgValidate(value){
      //     if(value.length > 65535) alert('La URL de la imagen es muy larga')
      //   }
      // },
      defaultValue: "https://i.pinimg.com/736x/03/d3/c6/03d3c6204a0adf2f65b7851020357432.jpg"
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
};

/* 

ID: *
Nombre *
Resumen del plato *
Nivel de "comida saludable" (health score)
Paso a paso

*/