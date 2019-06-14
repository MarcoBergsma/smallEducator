'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('courses', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: type.STRING,
                allowNull: false
            },
            description: {
                type: type.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: type.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: type.DATE,
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('courses');
    }
};
