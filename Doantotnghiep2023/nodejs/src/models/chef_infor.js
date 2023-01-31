'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chef_Infor extends Model {
        static associate(models) {
            Chef_Infor.belongsTo(models.user, { foreignKey: 'chefId' });

            Chef_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' })
            Chef_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' })
            Chef_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' })
        }
    };

    Chef_Infor.init({
        chefId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        restaurantId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressRestaurant: DataTypes.STRING,
        nameRestaurant: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Chef_Infor',
        freezeTableName: true
    });
    return Chef_Infor;
};