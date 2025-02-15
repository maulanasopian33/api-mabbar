'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class latihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      latihan.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      latihan.hasMany(models.soal_pg, { foreignKey: 'id_latihan', onDelete: 'CASCADE' });
      latihan.hasMany(models.soal_essay, { foreignKey: 'id_latihan', onDelete: 'CASCADE' });
    }
  }
  latihan.init({
    id_latihan: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_latihan: DataTypes.STRING,
    materi: DataTypes.STRING,
    jenis: DataTypes.STRING,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'latihan',
  });
  return latihan;
};