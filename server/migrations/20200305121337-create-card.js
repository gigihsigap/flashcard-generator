'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      front: {
        type: Sequelize.STRING
      },
      subFront: {
        type: Sequelize.STRING
      },
      synFront: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      back: {
        type: Sequelize.STRING
      },
      subBack: {
        type: Sequelize.STRING
      },
      synBack: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cards');
  }
};