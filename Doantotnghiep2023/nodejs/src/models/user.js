'use strict';
const {
  Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      user.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      user.hasOne(models.Markdown, { foreignKey: 'chefId' })
      user.hasOne(models.Chef_Infor, { foreignKey: 'chefId' })
      user.hasMany(models.Schedule, { foreignKey: 'chefId', as: 'chefData' })
      user.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' })
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};