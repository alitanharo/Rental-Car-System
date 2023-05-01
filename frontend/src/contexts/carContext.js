import React, { createContext, useState, useEffect } from 'react';
import { getAllCars, addCar, getCarByPlate, updateCarByPlate, deleteCarByPlate } from '../services/carService';

export const CarContext = createContext();

const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const carsData = await getAllCars();
            setCars(carsData);
        };

        fetchData();
    }, []);

    const createCar = async (carData) => {
        const newCar = await addCar(carData);
        setCars([...cars, newCar]);
    };

    const updateCar = async (plate, carData) => {
        const updatedCar = await updateCarByPlate(plate, carData);
        const updatedCars = cars.map((car) => (car.plate === plate ? updatedCar : car));
        setCars(updatedCars);
    };

    const deleteCar = async (plate) => {
        await deleteCarByPlate(plate);
        const updatedCars = cars.filter((car) => car.plate !== plate);
        setCars(updatedCars);
    };

    return (
        <CarContext.Provider value={{ cars, createCar, updateCar, deleteCar, getCarByPlate }}>
            {children}
        </CarContext.Provider>
    );
};

export default CarProvider;
