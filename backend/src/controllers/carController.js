const Car = require('../models/car.model');

exports.addCar = async (req, res) => {
    try {
        const { plate, category, baseDayPrice, baseKmPrice,imgUrl,currentKm } = req.body;
        const car = new Car({ plate, category, baseDayPrice, baseKmPrice, imgUrl, currentKm });
        await car.save();
        res.status(201).json({ car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getCarByPlate = async (req, res) => {
    try {
        const car = await Car.findOne({ plate: req.params.plate });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findOneAndUpdate(
            { plate: req.params.plate },
            req.body,
            { new: true }
        );
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findOneAndDelete({ plate: req.params.plate });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ car });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({ cars });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.isAvailableForRent = async (req, res) => {
    try {
        const car = await Car.findOne({ plate: req.params.plate });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        if (car.isRentable()) {
            return res.status(200).json({ message: "Car is available for rent" });
        }
        res.status(204).json({ message: "Car is not available for rent" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
