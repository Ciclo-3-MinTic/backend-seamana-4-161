const routerx = require('express-promise-router');
/* const categoriaRouter = require('./articulo'); */
const categoriaRouter = require('./categoria');




const router = routerx();

/* router.use('/articulo', articuloRouter); */
router.use('/categoria', categoriaRouter);

module.exports = router;