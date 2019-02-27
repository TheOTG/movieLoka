'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: DataTypes.STRING,
    rating: DataTypes.REAL,
    trailer: DataTypes.STRING,
    image: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.Cinema, {through: 'Screening'})
  };
  return Movie;
};