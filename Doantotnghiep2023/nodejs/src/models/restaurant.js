'use strict';
const {
    Model, Sequelize, DataTypesRestaurant
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Restaurant extends Model {
        static associations(models) {

        }
    };
    Restaurant.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        descriptionMarkdown: DataTypes.TEXT,
        descriptionHTML: DataTypes.TEXT,
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Restaurant',
    });
    return Restaurant;
};