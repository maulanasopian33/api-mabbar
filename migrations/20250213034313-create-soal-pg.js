'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('soal_pgs', {
      id_soal: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      id_latihan: {
        type: Sequelize.UUID,
        index: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'latihans',
          key: 'id_latihan'
        }
      },
      soal: {
        type: Sequelize.STRING
      },
      lampiran: {
        type: Sequelize.STRING
      },
      pilihan_a: {
        type: Sequelize.STRING
      },
      pilihan_b: {
        type: Sequelize.STRING
      },
      pilihan_c: {
        type: Sequelize.STRING
      },
      pilihan_d: {
        type: Sequelize.STRING
      },
      kunci_jawaban: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('soal_pgs');
  }
};