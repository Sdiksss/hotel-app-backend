const express = require('express');
const userRouter = require('./user.router');
const cityRouter = require('./city.router');
const hotelRouter = require('./hotel.router');
const imageRouter = require('./image.router');
const reviewRouter = require('./review.router');
const bookingRouter = require('./booking.router');
const router = express.Router();

// colocar las rutas aquí
router.use(bookingRouter)
router.use(reviewRouter)
router.use(imageRouter)
router.use(hotelRouter)
router.use(cityRouter)
router.use(userRouter)
module.exports = router;