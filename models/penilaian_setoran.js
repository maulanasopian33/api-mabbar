'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penilaian_setoran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      penilaian_setoran.belongsTo(models.siswa, { foreignKey: 'id_siswa', sourceKey: 'id', onDelete: 'CASCADE' });
      penilaian_setoran.belongsTo(models.list_setoran, { foreignKey: 'id_setoran', onDelete: 'CASCADE' });
      penilaian_setoran.belongsTo(models.item_setoran, { foreignKey: 'id_item', onDelete: 'CASCADE' });
    }
  }
  penilaian_setoran.init({
    id_penilaian: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_setoran: DataTypes.UUID,
    id_item: DataTypes.UUID,
    id_siswa: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'penilaian_setoran',
  });
  return penilaian_setoran;
};