'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'Carrier Admin',
        slug: 'carrier_admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carrier Driver',
        slug: 'carrier_driver',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
