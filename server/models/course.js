'use strict';
module.exports = (sequelize, type) => {
    const Course = sequelize.define('course', {
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
            allowNull: false
        }
    })

    return Course;
}
