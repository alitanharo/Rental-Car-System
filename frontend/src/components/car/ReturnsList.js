import React, { useContext } from "react";
import { CarContext } from "../../contexts/carContext";
import CarCard from "./CarCard";

const ReturnsList = () => {
  const { cars } = useContext(CarContext);
  const returnedCars = cars?.filter((c) => c.rented);
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4  container">
      {returnedCars?.map((car) => (
        <div key={car._id} className="col mb-4">
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );
};

export default ReturnsList;
