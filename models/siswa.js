'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      siswa.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
  }
  siswa.init({
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'siswa',
  });
  siswa.beforeCreate(async (siswa) => {
    siswa.password = await bcrypt.hash(siswa.password, 10);
  });
  return siswa;
};