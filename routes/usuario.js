const routerx = require('express-promise-router');
const usersController = require('../controllers/UsuarioController');
const router = routerx();

router.post('/login', usersController.login);

module.exports = router;