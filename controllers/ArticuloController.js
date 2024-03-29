//import models from '../models';
const models = require("../models");
const Categoria = require("../models").Categoria;

module.exports = {
  add: async (req, res, next) => {
    try {
      const reg = await models.Articulo.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Articulo.findOne({
        id: req.query.id,
      }).populate("categoria", {
        nombre: 1,
      });
      if (!reg) {
        res.status(404).send({
          message: "El registro no existe",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  queryCodigo: async (req, res, next) => {
    try {
      const reg = await models.Articulo.findOne({
        codigo: req.query.codigo,
      }).populate("categoria", {
        nombre: 1,
      });
      if (!reg) {
        res.status(404).send({
          message: "El registro no existe",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await models.Articulo.findAll({
        include: [
          {
            model: Categoria,
            as: "categoria",
          },
        ],
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  listByCategorias: async (req, res, next) => {
    try {
      let result = [];

      const categorias = await models.Categoria.findAll({
        attributes: ["id", "nombre", "descripcion", "estado"],
      });

      for (const item of categorias) {
        let temp = await models.Articulo.findAll({
          where: {
            categoriaId: item.id,
          },
        });
        result.push({
          nombre: item.nombre,
          categoriaId: item.id,
          descripcion: item.descripcion,
          estado: item.estado,
          articulos: temp,
        });
      }

      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const reg = await models.Articulo.update(req.body, {
        where: {
          id: req.body.id,
        },
      });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Articulo.findByIdAndDelete({
        id: req.body.id,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Articulo.update(
        {
          estado: 1,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Articulo.update(
        {
          estado: 0,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
};
