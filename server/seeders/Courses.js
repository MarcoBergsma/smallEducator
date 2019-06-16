'use strict';

const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        for (let i = 0; i < 100; i++) {
            const seedData = {
                title: faker.random.word(),
                description: faker.random.words(),
                inviteCode: faker.lorem.word(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('courses', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('courses', null, {});
    }
};
