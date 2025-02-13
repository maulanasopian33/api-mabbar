'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.materi, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      user.hasMany(models.siswa, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      user.hasMany(models.list_setoran, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
  }
  user.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
  });
  user.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  return user;
};