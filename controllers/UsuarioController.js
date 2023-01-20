var bcrypt = require('bcryptjs');
const models = require('../models');
const token = require('../services/token');


module.exports = {
    login: async (req, res, next) => {
        try {
            let user = await models.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);

                if (match) {

                    let tokenReturn = await token.encode(user.id, user.rol, user.nombre, user.email);

                    res.status(200).json({
                        user,
                        tokenReturn
                    });
                } else {
                    res.status(401).send({
                        auth: false,
                        accessToken: null,
                        reason: "Invalid Password!"
                    });
                }
            } else {
                res.status(404).send({
                    message: 'User Not Found.'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            /* console.log(req.body); */
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({
                id: req.query.id
            });
            if (!reg) {
                res.status(404).send({
                    message: 'User Not Found.'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.findAll();
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },

    listRoles: async (req, res, next) => {
        try {
            res.status(200).json({
                Administrador: {
                    usuarios: {
                        list: true,
                        add: true,
                        edit: true,
                        active: true
                    },
                    categorias: {
                        list: true,
                        add: true,
                        edit: true,
                        active: true
                    },
                    articulos: {
                        list: true,
                        add: true,
                        edit: true,
                        active: true
                    },
                    alertas: {
                        list: true,
                        add: false,
                        edit: true,
                        active: true
                    },

                },
                Almacenero: {
                    usuarios: {
                        list: false,
                        add: false,
                        edit: false,
                        active: false
                    },
                    categorias: {
                        list: true,
                        add: true,
                        edit: true,
                        active: true
                    },
                    articulos: {
                        list: true,
                        add: true,
                        edit: true,
                        active: true
                    },
                    alertas: {
                        list: true,
                        add: false,
                        edit: true,
                        active: true
                    },
                },
                Vendedor: {
                    usuarios: {
                        list: false,
                        add: false,
                        edit: false,
                        active: false
                    },
                    categorias: {
                        list: true,
                        add: false,
                        edit: false,
                        active: false
                    },
                    articulos: {
                        list: true,
                        add: false,
                        edit: false,
                        active: true
                    },
                    alertas: {
                        list: false,
                        add: false,
                        edit: false,
                        active: false
                    },

                }
            });

        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    listTypeRoles: async (req, res, next) => {
        try {

            res.status(200).send([
                'Administrador',
                'Almacenero',
                'Vendedor',
            ]);

        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    listTypeDocumento: async (req, res, next) => {
        try {

            res.status(200).send([
                'Cédula de ciudadanía',
                'Tarjeta de identidad',
                'Cédula de extranjería',
                'Pasaport',
                'Registro Civil'
            ]);

        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({
                where: {
                    id: req.body.id
                }
            });
            if (pas != reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({
                id: req.body.id
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.update({
                estado: 1
            }, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.update({
                estado: 0
            }, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },

    describe: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.describe();
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    }
}