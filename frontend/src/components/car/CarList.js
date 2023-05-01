import React, {useContext } from 'react';
import CarCard from './CarCard';
import { CarContext } from '../contexts/carContext';
const CarList = () => {
    const { cars } = useContext(CarContext);

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4  container">
            {cars?.map((car) => (
                <div key={car._id} className="col mb-4">
                    <CarCard car={car}  />
                </div>
            ))}
        </div>
    );
};

export default CarList;

