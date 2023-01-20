"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Articulos", [
      {
        codigo: "A004",
        nombre: "Tienda de campaña",
        descripcion:
          "Tienda de campaña de dos personas con impermeabilización y ventilación",
        precio_venta: 120,
        stock: 10,
        estado: 1,
        categoriaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        img: "https://falabella.scene7.com/is/image/FalabellaCO/36778564_1?wid=800&hei=800&qlt=70",
      },
      {
        codigo: "A005",
        nombre: "Sleeping bag",
        descripcion:
          "Saco de dormir con forro polar y temperatura de confort de -5 grados",
        precio_venta: 80,
        stock: 15,
        estado: 1,
        categoriaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        img: "https://www.thundra.co/wp-content/uploads/2020/09/WhatsApp-Image-2022-07-27-at-4.01.58-PM-1-500x500.jpeg",
      },
      {
        codigo: "A006",
        nombre: "Chaqueta de senderismo",
        descripcion:
          "Chaqueta impermeable y transpirable con capucha ajustable",
        precio_venta: 90,
        stock: 20,
        estado: 1,
        categoriaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        img: "https://contents.mediadecathlon.com/p1630022/k$1eca7127fa75e30197ca763ef97482f6/chaqueta-impermeable-senderismo-naturaleza-nh500-imper-mujer.jpg?&f=800x800",
      },
      {
        codigo: "A007",
        nombre: "Pantalones de senderismo",
        descripcion:
          "Pantalones transpirables y resistentes al agua con bolsillos laterales",
        precio_venta: 70,
        stock: 15,
        estado: 1,
        categoriaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        img: "https://cf.shopee.com.co/file/84ea861ea5eebfdfa26089c6c2453c3f",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Articulos", null, {});
  },
};
