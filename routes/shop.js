const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get(['/','/shops','/shop'], (request, response, next) => {
    console.log(adminData.products);
    response.sendFile(path.join(rootDir,'views', 'shop.html'));
});

module.exports = router;
