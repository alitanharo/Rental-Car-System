import React, { useContext } from "react";
import CarCard from "../components/car/CarCard";
import { CarContext } from "../contexts/carContext";

const PickupList = () => {
  const { cars } = useContext(CarContext);
  const returnedCars = cars?.filter((c) => !c.rented);
  return (
    <div className=" justify-content-center mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-auto w-auto border border-start-0  rounded p-3">
        {returnedCars?.map((car) => (
          <div key={car?._id} className="col mb-5">
            <CarCard car={car} className="m-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupList;
