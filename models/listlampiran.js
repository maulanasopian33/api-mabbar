'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listlampiran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      listlampiran.belongsTo(models.materi, { foreignKey: 'idmateri', as: 'materi', onDelete: 'CASCADE' });
    }
  }
  listlampiran.init({
    idlampiran: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    idmateri: DataTypes.UUID,
    jenis: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'listlampiran',
  });
  return listlampiran;
};