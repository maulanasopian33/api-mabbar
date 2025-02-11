'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materis', {
      idmateri: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      judul: {
        type: Sequelize.STRING
      },
      materi: {
        type: Sequelize.STRING
      },
      featureimage: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.UUID,
        index: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'user_id'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('materis');
  }
};