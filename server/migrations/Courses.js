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
            inviteCode: {
                type: type.STRING,
                allowNull: false,
                unique: true
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
