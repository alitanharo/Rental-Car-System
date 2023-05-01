const mongoose = require('mongoose');


const rentalSchema = new mongoose.Schema({
    bookingNumber: { type: String, required: true, unique: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickupDate: { type: Date, required: true},
    pickupMileage: { type: Number, required: true },
    returnDate: { type: Date },
    returnMileage: { type: Number },
    totalPrice: { type: Number },
});



module.exports = mongoose.model('Rental', rentalSchema);
