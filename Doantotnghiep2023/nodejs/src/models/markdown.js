'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        static associate(models) {
            Markdown.belongsTo(models.user, { foreignKey: 'chefId' })
        }
    };
    Markdown.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        chefId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        restaurantId: DataTypes.INTEGER,
        description: DataTypes.TEXT('long')

    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};