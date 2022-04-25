const { Router } = require('express');
const { infoGetAll } = require('../controller/info.controller');

const router = Router();


router.get('/', infoGetAll);

module.exports = router;