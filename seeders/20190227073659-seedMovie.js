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
   return queryInterface.bulkInsert('Movies', [{
     name: 'The Lego Movie 2',
     trailer: 'https://www.youtube.com/watch?v=11K013qpRR4',
     rating: '7.1',
     image: 'https://i1.wp.com/www.ageofthenerd.com/wp-content/uploads/2018/11/TLM2_INSTA_MAIN_DOM_1936x1936_master.jpg?fit=600%2C600&ssl=1',
     synopsis: `It's been five years since everything was awesome and the citizens are facing a huge new threat: LEGO DUPLO invaders from outer space, wrecking everything faster than they can rebuild.`,
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Alita: Battle Angel',
     trailer: 'https://www.youtube.com/watch?v=w7pYhpJaJW8',
     rating: '7.6',
     image: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5c1c19404d7a9cecaf8a1606/1545345358661/slick-new-poster-for-alita-battle-angel1?format=1500w',
     synopsis: `Set several centuries in the future, the abandoned Alita is found in the scrapyard of Iron City by Ido, a compassionate cyber-doctor who takes the unconscious cyborg Alita to his clinic. When Alita awakens, she has no memory of who she is, nor does she have any recognition of the world she finds herself in. As Alita learns to navigate her new life and the treacherous streets of Iron City, Ido tries to shield her from her mysterious past.`,
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Mobile Suit Gundam Narrative',
     trailer: 'https://www.youtube.com/watch?v=ac_yRqcNsnw',
     rating: '7.4',
     image: 'https://fesapusewebsite.blob.core.windows.net/fathom/gundam-cr-02cf8346f443586b36b8424410e619ed.jpg',
     synopsis: `U.C. 0097, one year after the opening of "Laplace's Box." Despite the revelation of the Universal Century Charter that acknowledges the existence and rights of Newtypes, the framework of the world has not been greatly altered. The conflict later dubbed the "Laplace Incident" is thought to have ended with the downfall of the Neo Zeon remnants known as the Sleeves. In its final battle, two full psycho-frame mobile suits displayed power beyond human understanding.`,
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Extreme Job',
     trailer: 'https://www.youtube.com/watch?v=L8JbXBxeEkk',
     rating: '7.5',
     image: 'https://cdn.cgv.id/uploads/movie/compressed/19003600.jpg',
     synopsis: `A team of narcotics detectives goes undercover in a fried chicken joint to stake out an organized crime gang. But things take an unexpected turn when the detectives’ chicken recipe suddenly transforms the rundown restaurant into the hottest eatery in town. `,
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
   return queryInterface.bulkDelete('Movies', null)
  }
};
