'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      materi.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      materi.hasMany(models.listlampiran, { foreignKey: 'idmateri', onDelete: 'CASCADE' });
    }
  }
  materi.init({
    idmateri: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    judul: DataTypes.STRING,
    materi: DataTypes.STRING,
    featureimage: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'materi',
  });
  return materi;
};