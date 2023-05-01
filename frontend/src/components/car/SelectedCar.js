import React, { useContext, useState } from "react";
import { CarContext } from "../../contexts/carContext";
import ReturnCard from "./ReturnCard";

const SelectedCar = ({ carId, rental }) => {
  const { cars } = useContext(CarContext);
  const returnedCars = cars?.filter((c) => c.rented);
  const selectedCar = returnedCars?.find((c) => c._id === carId);
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4  container">
      {selectedCar && (
        <div key={selectedCar._id} className="col mb-4">
          <ReturnCard car={selectedCar} rent={rental} />
        </div>
      )}
    </div>
  );
};

export default SelectedCar;
