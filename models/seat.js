'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    ScreeningId: DataTypes.INTEGER,
    status: DataTypes.ENUM('empty', 'booked')
  }, {});
  Seat.associate = function(models) {
    // associations can be defined here
    Seat.belongsTo(models.Ticket)
  };
  return Seat;
};