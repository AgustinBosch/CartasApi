const { Router } = require('express');
const { cartaGet, cartasGet, cartaPost, cartaPut, cartaDelete } = require('../controller/carta.controller');

const router = Router();


router.get('/', cartasGet)
router.get('/:id', cartaGet)
router.post('/', cartaPost)
router.put('/', cartaPut)
router.delete('/:id', cartaDelete)

module.exports = router;