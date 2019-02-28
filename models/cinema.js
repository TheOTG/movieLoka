'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cinema = sequelize.define('Cinema', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 15],
          msg: 'Cinema name must be between 2 to 15 characters'
        }
      }
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Sala_de_cine.jpg'
    }
  }, {});
  Cinema.associate = function(models) {
    // associations can be defined here
    Cinema.belongsToMany(models.Movie, {through: 'Screening'})
    Cinema.hasMany(models.Seat)
  };
  return Cinema;
};