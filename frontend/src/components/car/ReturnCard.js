import React, { useState, useEffect, useContext } from "react";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

import Return from "../rental/Return";
import "react-toastify/dist/ReactToastify.css";
import Login from '../user/Login'

const defaultImage = image1;

const ReturnCard = ({ car, rent }) => {
  
  const [image, setImage] = useState(defaultImage);
  const [error, setError] = useState("");
  const [showModal1, setShwoModal1] = useState(false)
  const [showModal2, setShowModal2] = useState(false);
  const [rental, setRental] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setSelectedUser(user);
    setSelectedCar(car);
    if (car?.category === "Small car") {
      setImage(image1);
    } else if (car?.category === "Estate car") {
      setImage(image2);
    } else {
      setImage(image3);
    }
  }, [car, user]);

  const handleReturn = async () => {
    if (rent && selectedUser && selectedUser.role === "customer") {
      setRental(rent);
      setShowModal2(true);
      setError("");
    } else if (selectedUser && selectedUser.role === "admin") {
      alert("you are logged in as admin!");
      navigate("/admin");
    } else {
      setShwoModal1(true)
    }
  };

  return (
    <>
      <Card
        style={{ width: "18rem" }}
        className="mt-5 shadow bg-body-tertiary rounded"
      >
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "10rem", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{car.plate}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {car?.category}
          </Card.Subtitle>
          <Card.Text>
            <p>Base Day Price: {car.baseDayPrice}</p>
            {car.category !== "Small car" &&
              <p>Base Km Price: {car.pickupMileage}</p>
            }

            <p>Current Km: {car.currentKm}</p>
            {!car.rented ? (
              <span>
                Rent
              </span>
            ) : (
              <Button variant="secondary" onClick={handleReturn}>
                Return
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* modal for renting a car */}

      <Return
        showModal={showModal2}
        rental={rental}
        user={user}
        car={car}
        setShowModal={setShowModal2}
      />
      <Login showModal={showModal1} setShowModal={setShwoModal1} />
    </>
  );
};

export default ReturnCard;
