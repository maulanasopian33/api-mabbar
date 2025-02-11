'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  media.init({
    user_id: DataTypes.UUID,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};