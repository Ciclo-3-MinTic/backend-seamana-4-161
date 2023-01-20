"use strict";
var bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Usuarios", [
      {
        nombre: "admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin1234", 10),
        rol: "Administrador",
        estado: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "almacenero",
        email: "almacenero@gmail.com",
        password: await bcrypt.hash("almacenero1234", 10),
        rol: "Almacenero",
        estado: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "vendedor",
        email: "vendedor@gmail.com",
        password: await bcrypt.hash("vendedor1234", 10),
        rol: "Vendedor",
        estado: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Usuarios", null, {});
  },
};
