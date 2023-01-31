'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        static associate(models) {
            Allcode.hasMany(models.user, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.user, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })
            Allcode.hasMany(models.Chef_Infor, { foreignKey: 'provinceId', as: 'provinceTypeData' })
            Allcode.hasMany(models.Chef_Infor, { foreignKey: 'priceId', as: 'priceTypeData' })
            Allcode.hasMany(models.Chef_Infor, { foreignKey: 'paymentId', as: 'paymentTypeData' })
            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataPatient' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};