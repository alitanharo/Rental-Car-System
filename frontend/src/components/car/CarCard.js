import React, { useState, useEffect, useContext } from "react";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { RentalContext } from "../../contexts/rentalContext";
import Rent from "../rental/Rent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../user/Login";

const defaultImage = image1;

const CarCard = ({ car }) => {
  const [image, setImage] = useState(defaultImage);
  const [error, setError] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [rental, setRental] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const { registerPickUp } = useContext(RentalContext);
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
  }, [car, user, login]);

  const handlePickup = async () => {
    try {
      if (selectedCar && selectedUser && selectedUser.role === "customer") {
        setShowModal1(true);
        const rent = await registerPickUp(
          selectedCar.plate,
          selectedUser.socialSecurityNumber
        );
        setRental(rent);
        setError("");
      } else if (selectedCar && selectedUser && selectedUser.role === "admin") {
        alert("you are logged in as admin!");
        navigate("/");
      } else {
        alert("Wait you have to log in befor countinue!")
        setShowModal2(true)


      }
    } catch (error) {
      toast.warning("Rent registrtion faild!");
      console.error(error);
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
            <p>Base Day Price {car?.baseDayPrice} $</p>
            {car.category === 'Small car' ?
              <p>Base Km Price is <b>Free!</b></p> :
              <p>Base Km Price {car?.baseKmPrice} $</p>}

            <p>Current Km {car?.currentKm} km</p>
            {!car?.rented ? (
              <span>

                <Button variant="primary" onClick={handlePickup}>
                  Pickup
                </Button>
              </span>
            ) : (
              <Button variant="secondary">Return </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      <Rent
        showModal={showModal1}
        setShowModal={setShowModal1}
        rental={rental}
        user={selectedUser}
        car={selectedCar}
      />
      <Login showModal={showModal2} setShowModal={setShowModal2} />
    </>
  );
};

export default CarCard;
