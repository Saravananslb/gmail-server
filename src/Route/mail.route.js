const express = require('express');
const { insertMail, getMail, updateEmail, forwardMail, replyMail } = require('../Controller/mail.controller');

const router = express.Router();

router.post('/new', insertMail);
router.get('/get', getMail);
router.put('/update', updateEmail);
router.post('/forward', forwardMail);
router.post('/reply', replyMail);

module.exports = router;