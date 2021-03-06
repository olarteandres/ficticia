const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Products', {
  image:{
      type:DataTypes.STRING,
      allowNull: true
  },
  name:{
      type: DataTypes.STRING,
      allowNull:false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  });
};
