'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    rating: DataTypes.REAL,
    release: DataTypes.STRING,
    trailer: DataTypes.STRING,
    runtime: DataTypes.STRING,
    genre: DataTypes.STRING,
    image: DataTypes.STRING,
    synopsis: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: (movie, options) => {
        movie.trailer = 'https://www.youtube.com/embed/' + movie.trailer
      }
    }
  });
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.Cinema, {through: 'Screening'})
  };
  return Movie;
};