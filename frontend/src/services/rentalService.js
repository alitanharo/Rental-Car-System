import axios from "axios";
const baseUrl = "/api/rental";

export const rentalService = {
  registerPickUp,
  registerReturn,
  getAllRentals,
  getRentalByBookingNumber,
  deleteRental,
  getRentalByPlate,
};

async function registerPickUp(carRegistrationNumber, socialSecurityNumber) {
  try {
    const response = await axios.post(`${baseUrl}/pickup`, {
      carRegistrationNumber,
      socialSecurityNumber,
    });
    return response.data.rental;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register rental pick-up");
  }
}

async function registerReturn(bookingNumber, returnDate, currentMileage) {
  try {
    const response = await axios.put(`${baseUrl}/return`, {
      bookingNumber,
      returnDate,
      currentMileage,
    });
    return response.data.rental;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register rental return");
  }
}

async function getAllRentals() {
  try {
    const response = await axios.get(`${baseUrl}/rentals`);
    return response.data.rental;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get rentals");
  }
}

async function getRentalByBookingNumber(bookingNumber) {
  try {
    const response = await axios.get(
      `${baseUrl}/rental/bookingNumber/${bookingNumber}`
    );
    return response.data.rental;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to get rental with booking number ${bookingNumber}`
    );
  }
}

async function deleteRental(bookingNumber) {
  try {
    const response = await axios.delete(`${baseUrl}/${bookingNumber}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to delete rental with booking number ${bookingNumber}`
    );
  }
}

async function getRentalByPlate(carRegistrationNumber) {
  try {
    const response = await axios.get(
      `${baseUrl}/plate/${carRegistrationNumber}`
    );
    return response.data.rental;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to get rental with car registration number ${carRegistrationNumber}`
    );
  }
}
