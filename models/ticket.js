'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    SeatId: DataTypes.INTEGER,
    ScreeningId: DataTypes.INTEGER,
    CinemaId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};