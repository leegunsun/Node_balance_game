'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Likes', 'option', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

