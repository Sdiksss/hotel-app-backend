const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cityRouter = express.Router();

cityRouter.route('/cities')
    .get(verifyJWT, getAll)
    .post(create);

cityRouter.route('/cities/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cityRouter;