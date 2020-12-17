var bcrypt = require('bcryptjs');
const models = require('../models');
const token = require('../services/token');


module.exports = {
    login: async (req, res, next) => {
        try {
            console.log(req.body.email)
            let user = await models.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log(user.rol);
                    let tokenReturn = await token.encode(user.id, user.rol);
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
            const reg = await models.Usuario.update({
                rol: req.body.rol,
                nombre: req.body.nombre,
                tipo_documento: req.body.tipo_documento,
                num_documento: req.body.num_documento,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password
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
    }
}

/* exports.login =  (req, res) => {
    db.Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send('User Not Found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password,
            user.password);
        console.log(passwordIsValid);
        
        if (!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                accessToken: null,
                reason: "Invalid Password!"
            });
        } else {
            var tokenReturn = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                user,
                tokenReturn
            })

        }

    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
} */