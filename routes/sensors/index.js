const express = require('express');
const router = express.Router();
const controller = require('./sensors.controller');

router.get('/temp',controller.temp);
router.get('/humi',controller.humi);
router.get('/lumi',controller.lumi);
module.exports = router;
