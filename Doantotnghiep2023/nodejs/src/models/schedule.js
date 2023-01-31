'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        static associate(models) {
            Schedule.belongsTo(models.Allcode,
                {
                    foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData'
                })
            Schedule.belongsTo(models.user,
                {
                    foreignKey: 'chefId', targetKey: 'id', as: 'chefData'
                })



        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        chefId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};