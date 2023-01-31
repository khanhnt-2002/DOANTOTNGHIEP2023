'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class chef_restaurant_specialty extends Model {
        static associations(models) {

        }
    };
    chef_restaurant_specialty.init({
        chefId: DataTypes.INTEGER,
        restaurantId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'chef_restaurant_specialty',
    });
    return chef_restaurant_specialty;
};