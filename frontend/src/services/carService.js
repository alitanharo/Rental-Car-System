import axios from 'axios';

const baseUrl = '/api/car';

export const getAllCars = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data.cars;
    } catch (error) {
        console.error(error);
    }
};

export const addCar = async (plate, category, baseDayPrice, baseKmPrice, imgUrl, currentKm) => {
    try {
        const car = { plate, category, baseDayPrice, baseKmPrice, imgUrl, currentKm };
        const response = await axios.post(baseUrl, car);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCarByPlate = async (plate) => {
    try {
        const response = await axios.get(`${baseUrl}/${plate}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateCarByPlate = async (plate, category, baseDayPrice, baseKmPrice, imgUrl, currentKm) => {
    try {
        const updatedCar = { category, baseDayPrice, baseKmPrice, imgUrl, currentKm };
        const response = await axios.put(`${baseUrl}/${plate}`, updatedCar);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteCarByPlate = async (plate) => {
    try {
        const response = await axios.delete(`${baseUrl}/${plate}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
