'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_setoran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      item_setoran.belongsTo(models.list_setoran, { foreignKey: 'id_setoran', onDelete: 'CASCADE' });
    }
  }
  item_setoran.init({
    id_item: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_setoran: DataTypes.UUID,
    arab: DataTypes.STRING,
    latin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'item_setoran',
  });
  return item_setoran;
};