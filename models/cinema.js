'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cinema = sequelize.define('Cinema', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Sala_de_cine.jpg'
    }
  }, {});
  Cinema.associate = function(models) {
    // associations can be defined here
    Cinema.belongsToMany(models.Movie, {through: 'Screening'})
  };
  return Cinema;
};