'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    ScreeningId: DataTypes.INTEGER,
    status: DataTypes.ENUM('empty', 'booked'),
    seatNum: DataTypes.INTEGER,
    CinemaId: DataTypes.INTEGER
  }, {});
  Seat.associate = function(models) {
    // associations can be defined here
  };
  return Seat;
};