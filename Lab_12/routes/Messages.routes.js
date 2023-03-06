const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require('path');


const router = express.Router();


router.get('/Messages', (request, response, next) => {
    let AboutMe = require('./AboutMe.routes.js')
    let messages = AboutMe.messages;
    response.render('Messages', {array: messages});
})



module.exports = router;