'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Cinemas', [{
     name: 'CeGeVe',
     logo: 'https://vignette.wikia.nocookie.net/logopedia/images/9/9f/Cgv_logo.png/revision/latest?cb=20180828170655',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'eXeXI',
     logo: 'https://vignette.wikia.nocookie.net/logopedia/images/8/87/XXI.png/revision/latest?cb=20180729144655',
     createdAt: new Date(),
     updatedAt: new Date()
   }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Cinemas', null)
  }
};
