'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        static associations(models) {

        }
    };
    History.init({
        patientId: DataTypes.INTEGER,
        chefId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        files: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};