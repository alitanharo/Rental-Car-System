const Rental = require("../models/rental.model");
const Car = require("../models/car.model");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

/**
 * POST a new rental to the database
 * Request body must contain `carRegistrationNumber` and `socialSecurityNumber`
 */
exports.registerPickUp = async (req, res) => {
  try {
    const { carRegistrationNumber, socialSecurityNumber } = req.body;

    // Check if car exists
    const car = await Car.findOne({ plate: carRegistrationNumber });

    if (!car) {
      return res.status(400).json({ message: "Car not found" });
    }

    // Check if car is available for rent
    if (car.rented) {
      return res.status(400).json({ message: "Car is not available for rent" });
    }

    // Check if user exists
    const user = await User.findOne({ socialSecurityNumber });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Set up default rental values
    const pickupMileage = car.currentKm;
    const returnDate = 0;
    const returnMileage = 0;
    const totalPrice = 0;

    // Generate a unique 5-digit booking number
    const chars = "123456789";
    let bookingNumber = "";

    while (bookingNumber.length < 5) {
      const randomChar = uuidv4()[0];

      if (chars.includes(randomChar)) {
        bookingNumber += randomChar;
      }
    }

    // Create new rental object
    const rental = new Rental({
      bookingNumber,
      car,
      user,
      pickupDate: new Date(),
      pickupMileage,
      returnDate,
      returnMileage,
      totalPrice,
    });

    // Save rental object
    await rental.save();

    // Update car status to rented
    car.rented = true;
    await car.save();

    res
      .status(200)
      .json({ message: "Rental pick-up registered successfully", rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register rental pick-up" });
  }
};

// Find the rental with the given booking number and update its return date and mileage
exports.registerReturn = async (req, res) => {
  try {
    const { bookingNumber, returnDate, currentMileage } = req.body;
    const rental = await Rental.findOneAndUpdate(
      { bookingNumber },
      { returnDate, returnMileage: currentMileage },
      { new: true }
    ).populate("car");

    if (!rental) {
      return res.status(400).json({ message: "Rental not found" });
    }

    const { car, pickupDate, pickupMileage } = rental;

    // Calculate rental price based on category
    let rentalPrice = 0;
    const baseDayPrice = car.baseDayPrice;
    const baseKmPrice = car.baseKmPrice;
    const rentalDays = Math.ceil(
      (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
    );
    const rentalKm = currentMileage - pickupMileage;
    switch (car.category) {
      case "Small car":
        rentalPrice = baseDayPrice * rentalDays;
        break;
      case "Estate car":
        rentalPrice = baseDayPrice * rentalDays * 1.3 + baseKmPrice * rentalKm;
        break;
      case "Truck":
        rentalPrice =
          baseDayPrice * rentalDays * 1.5 + baseKmPrice * rentalKm * 1.5;
        break;
      default:
        break;
    }

    rental.totalPrice = rentalPrice;
    rental.car.rented = false;
    await Promise.all([rental.save(), rental.car.save()]);

    res
      .status(200)
      .json({ message: "Rental return registered successfully", rental });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all rentals
exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({});
    res.status(200).json({ rentals });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get a specific rental record by bookingNumber
exports.getRentalByBookingNumber = async (req, res) => {
  const { bookingNumber } = req.params;

  try {
    const rental = await Rental.findOne({ bookingNumber });

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({ rental });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete a rental by bookingNumber
exports.deleteRental = async (req, res) => {
  try {
    const { bookingNumber } = req.params;
    const rental = await Rental.findOneAndDelete({ bookingNumber });
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    await Car.findOneAndUpdate(
      { plate: rental.car.plate },
      { status: "available" }
    );
    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get a specific rental record by car plate number

exports.getRentalByPlate = async (req, res) => {
  try {
    const { plate } = req.params;

    // Find the car with the given plate number
    const car = await Car.findOne({ plate });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Find the rental associated with the car
    const rental = await Rental.findOne({ car: car._id });

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({ rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get rental by plate" });
  }
};
