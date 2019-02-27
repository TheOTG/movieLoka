'use strict';
module.exports = (sequelize, DataTypes) => {
  const Screening = sequelize.define('Screening', {
    MovieId: DataTypes.INTEGER,
    CinemaId: DataTypes.INTEGER,
    time: DataTypes.DATE,
    seatNumber: {
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