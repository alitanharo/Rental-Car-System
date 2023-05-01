import React, { createContext } from "react";
import { rentalService } from "../services/rentalService";

export const RentalContext = createContext();

const RentalProvider = ({ children }) => {

  const registerPickUp = async (
    carRegistrationNumber,
    socialSecurityNumber
  ) => {
    try {
      const response = await rentalService.registerPickUp(
        carRegistrationNumber,
        socialSecurityNumber
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to register rental pick-up");
    }
  };

  const registerReturn = async (bookingNumber, returnDate, currentMileage) => {
    try {
      const response = await rentalService.registerReturn(
        bookingNumber,
        returnDate,
        currentMileage
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to register rental return");
    }
  };

  const getAllRentals = async () => {
    try {
      const response = await rentalService.getAllRentals();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get rentals");
    }
  };

  const getRentalByBookingNumber = async (bookingNumber) => {
    try {
      const response = await rentalService.getRentalByBookingNumber(
        bookingNumber
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to get rental with booking number ${bookingNumber}`
      );
    }
  };

  const deleteRental = async (bookingNumber) => {
    try {
      const response = await rentalService.deleteRental(bookingNumber);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to delete rental with booking number ${bookingNumber}`
      );
    }
  };

  const getRentalByPlate = async (carRegistrationNumber) => {
    try {
      const response = await rentalService.getRentalByPlate(
        carRegistrationNumber
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to get rental with car registration number ${carRegistrationNumber}`
      );
    }
  };

  const value = {
    registerPickUp,
    registerReturn,
    getAllRentals,
    getRentalByBookingNumber,
    deleteRental,
    getRentalByPlate,

  };

  return (
    <RentalContext.Provider value={value}>{children}</RentalContext.Provider>
  );
};

export default RentalProvider;
