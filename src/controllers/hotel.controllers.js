const catchError = require('../utils/catchError');
const Hotel = require('../models/Hotel');
const City = require('../models/City');
const {Op} = require('sequelize');
const Image = require('../models/Image');
const Review = require('../models/Review');

const getAll = catchError(async(req, res) => {
    const { cityId, name } = req.query;

    const where = {}
    if (cityId) where.cityId = cityId;
    if (name) where.name = { [Op.iLike]: `%${name}%`}

    const results = await Hotel.findAll({
        include: [City, Image, Review],
        where: where
    });
    const hotelsWithRating = results.map(hotels=> {
        console.log(hotels.toJSON());
        const hotelsjson = hotels.toJSON();
        //SUMA
        let sum = 0
        hotelsjson.reviews.forEach(review => {
            sum += review.rating
        })
        const totalReviews = hotelsjson.reviews.length;
        const average = totalReviews > 0 ? sum / totalReviews: 0;

        delete hotelsjson.reviews;

        console.log(average)
        return {...hotelsjson, rating: average}
    })

    return res.json(hotelsWithRating);
});

const create = catchError(async(req, res) => {
    const result = await Hotel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.findByPk(id, {include: [City, Image, Review]});
    if(!result) return res.sendStatus(404);

    
    const hotelsjson = result.toJSON();
    //SUMA
    let sum = 0
    hotelsjson.reviews.forEach(review => {
        sum += review.rating
    })
    const totalReviews = hotelsjson.reviews.length;
    const average = totalReviews > 0 ? sum / totalReviews: 0;

    delete hotelsjson.reviews;

    console.log(average)
    return res.json({...hotelsjson, rating: average})
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Hotel.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}