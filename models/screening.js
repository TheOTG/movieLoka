'use strict';
module.exports = (sequelize, DataTypes) => {
  const Screening = sequelize.define('Screening', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    MovieId: DataTypes.INTEGER,
    CinemaId: DataTypes.INTEGER,
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 20,
          msg: `Minimum 20 seats!`
        }
      }
    }
  }, {});
  Screening.associate = function(models) {
    // associations can be defined here
    Screening.hasMany(models.Seat)
    Screening.hasMany(models.Ticket)
  };
  return Screening;
};