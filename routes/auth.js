/*
    path: api/login
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../midlewares/validar-campos');
const { validarJWT } = require('../midlewares/validar-jwt');

const router = Router();

// create user
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);

// login
router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], login);

// Renovación de token
// validarJWT
router.post('/renew', validarJWT, renewToken);

module.exports = router;