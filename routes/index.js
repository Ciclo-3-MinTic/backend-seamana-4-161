const routerx = require('express-promise-router');
/* const categoriaRouter = require('./articulo'); */
const categoriaRouter = require('./categoria');
const usuarioRouter = require('./usuario');




const router = routerx();

/* router.use('/articulo', articuloRouter); */
router.use('/categoria', categoriaRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;