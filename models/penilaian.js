'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penilaian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      penilaian.belongsTo(models.latihan, { foreignKey: 'id_latihan', onDelete: 'CASCADE' });
      penilaian.belongsTo(models.siswa, { foreignKey: 'id_siswa', sourceKey: 'id', onDelete: 'CASCADE' });
    }
  }
  penilaian.init({
    id_penilaian: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_latihan: DataTypes.UUID,
    id_siswa: DataTypes.INTEGER,
    nilai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'penilaian',
  });
  return penilaian;
};