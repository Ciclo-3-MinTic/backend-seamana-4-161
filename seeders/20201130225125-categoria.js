"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categoria", [
      {
        nombre: "Ropa",
        descripcion: "lorem limsus test",
        estado: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Otros",
        descripcion: "lorem limsus test",
        estado: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categoria", null, {});
  },
};
