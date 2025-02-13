'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list_setoran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      list_setoran.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      list_setoran.hasMany(models.item_setoran, { foreignKey: 'id_setoran', onDelete: 'CASCADE' });
    }
  }
  list_setoran.init({
    id_setoran: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: DataTypes.UUID,
    tema: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'list_setoran',
  });
  return list_setoran;
};