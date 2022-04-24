const { Router } = require('express');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, aniadirCarta, removerCarta } = require('../controller/usuario.controller');
const router = Router();

router.get('/:id', usuarioGet)
router.post('/', usuarioPost)
router.put('/', usuarioPut)
router.put('/addcarta', aniadirCarta)
router.put('/removecarta', removerCarta)
router.delete('/:id', usuarioDelete)


module.exports = router;