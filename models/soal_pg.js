'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soal_pg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      soal_pg.belongsTo(models.latihan, { foreignKey: 'id_latihan', onDelete: 'CASCADE' });
      // define association here
    }
  }
  soal_pg.init({
    id_soal: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_latihan: DataTypes.UUID,
    soal: DataTypes.STRING,
    lampiran: DataTypes.STRING,
    pilihan_a: DataTypes.STRING,
    pilihan_b: DataTypes.STRING,
    pilihan_c: DataTypes.STRING,
    pilihan_d: DataTypes.STRING,
    kunci_jawaban: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'soal_pg',
  });
  return soal_pg;
};