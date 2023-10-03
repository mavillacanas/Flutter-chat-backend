/*
    path: api/usuarios
*/
const {Router} = require('express');
const { validarJWT } = require('../midlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, getUsuarios);

// create user

module.exports = router;