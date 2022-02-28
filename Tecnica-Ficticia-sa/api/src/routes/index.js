const { Router } = require('express');
const axios = require ('axios');
const products = require ('./products');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', products)

module.exports = router;
