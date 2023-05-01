const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Small car', 'Estate car', 'Truck']
    },
    baseDayPrice: {
        type: Number,
        required: true,
        trim: true
    },
    baseKmPrice: {
        type: Number,
        required: function () {
            return this.category !== 'Small car';
        }
    },
    rented: {
        type: Boolean,
        default: false
    },
    imgUrl:  {
    type: String,
    required: false
},
    currentKm: {
        type: Number,
        required: true
    }
});

carSchema.methods.isRentable = function () {
    return !this.rented;
};

module.exports = mongoose.model('Car', carSchema);
