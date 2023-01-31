'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class specilties extends Model {
        static associate(models) {

        }
    };
    specilties.init({
        name: DataTypes.STRING,
        descriptionMarkdown: DataTypes.TEXT,
        descriptionHTML: DataTypes.TEXT,
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'specilties',
        freezeTableName: true

    });
    return specilties;
}; 
