const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authCtrl');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logoff', authCtrl.logoff);

module.exports = router;