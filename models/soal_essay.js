'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soal_essay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      soal_essay.belongsTo(models.latihan, { foreignKey: 'id_latihan', onDelete: 'CASCADE' });
    }
  }
  soal_essay.init({
    id_soal: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_latihan: DataTypes.UUID,
    soal: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'soal_essay',
  });
  return soal_essay;
};