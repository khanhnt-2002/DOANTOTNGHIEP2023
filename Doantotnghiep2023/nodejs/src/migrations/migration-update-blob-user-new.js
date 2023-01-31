module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all9[
            queryInterface.changeColumn('Users', 'image', {
                ype: Sequelize.STRING,
                allowNull: true,
            })
        ]
    }
}