'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penilaian_setorans', {
      id_penilaian: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      id_setoran: {
        type: Sequelize.UUID,
        index: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'list_setorans',
          key: 'id_setoran'
        }
      },
      id_item: {
        type: Sequelize.UUID,
        index: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'item_setorans',
          key: 'id_item'
        }
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        index: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'siswas',
          key: 'id',
          as : 'id_siswa'
        }
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('penilaian_setorans');
  }
};