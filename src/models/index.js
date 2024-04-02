const Booking = require("./Booking");
const City = require("./City");
const Hotel = require("./Hotel");
const Image = require("./Image");
const Review = require("./Review");
const User = require("./User");

Hotel.belongsTo(City)
City.hasMany(Hotel)

Hotel.hasMany(Image)
Image.belongsTo(Hotel)
// booking
User.hasMany(Booking)
Booking.belongsTo(User)

Hotel.hasMany(Booking)
Booking.belongsTo(Hotel)
//review
Review.belongsTo(Hotel)
Hotel.hasMany(Review)

User.hasMany(Review)
Review.belongsTo(User)