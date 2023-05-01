import { useState, useContext } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { RentalContext } from "../../contexts/rentalContext";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-date-picker";
import PriceModal from "../../common/PriceModal";
import { useNavigate } from "react-router";

const Renturn = ({ user, car, showModal, setShowModal, rental }) => {
  const { registerReturn, deleteRental } = useContext(RentalContext);
  const [price, setPrice] = useState(0);
  const [returnDate, setReturnDate] = useState(new Date());
  const [returnMileage, setReturnMileage] = useState("");
  const [error, setError] = useState(null);
  const [resultModal, setResultModal] = useState(false);
const navigate =useNavigate()
  const handleClose = () => {
    setShowModal(false);
  };

  const handleRegister = async () => {
    try {
      if (!returnDate || !returnMileage) {
        setError("Please fill out all fields");
        return;
      }

      const currentRent = await registerReturn(
        rental.bookingNumber,
        returnDate,
        returnMileage
      );
      setPrice(currentRent.totalPrice);
      setResultModal(true);
      handleClose();
      deleteRental(currentRent.bookingNumber)
      setTimeout(() => {
        navigate('/')
      }, 10000)
    } catch (error) {
      setError("Failed to renturn the car");
    }
  };

  return (
    <div>
      {resultModal && (
        <PriceModal price={price} resultModal={resultModal} setResultModal={setResultModal}/>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rent a car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Pickup Date</Form.Label>
              <Form.Control type="text" value={rental?.pickupDate} readOnly />
            </Form.Group>
            <Form.Group controlId="formBookingnumber">
              <Form.Label>Booking number</Form.Label>
              <Form.Control
                type="text"
                value={rental?.bookingNumber}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formRenter">
              <Form.Label>Renter personal number</Form.Label>
              <Form.Control
                type="text"
                value={user?.socialSecurityNumber}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formplate">
              <Form.Label>Car Plate</Form.Label>
              <Form.Control type="text" value={car?.plate} readOnly />
            </Form.Group>
            <Form.Group controlId="formpickupMileage">
              <Form.Label>Current km</Form.Label>
              <Form.Control
                type="text"
                value={rental?.pickupMileage}
                readOnly
              />
            </Form.Group>

            {car?.category !== "Small car" && (
              <Form.Group controlId="formPrice">
                <Form.Label>Price per day & Price per Km</Form.Label>
                <Form.Control
                  type="text"
                  value={`Day: $${car?.baseDayPrice}/Km: $${car?.baseKmPrice}`}
                  readOnly
                />
              </Form.Group>
            )}

            <Form.Group controlId="formReurnDate">
              <Form.Label>Return Date</Form.Label>

              <DatePicker
                onChange={setReturnDate}
                value={returnDate}
                calendarClassName="p-2 rounded-lg"
                className="p-2 rounded-lg"
                locale="en"
              />
            </Form.Group>
            <Form.Group controlId="formReurnKm">
              <Form.Label>Return Km</Form.Label>
              <Form.Control
                type="text"
                value={returnMileage}
                onChange={(e) => setReturnMileage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTotalPrice">
              <Form.Label>Final price</Form.Label>
              <Form.Control
                type="number"
                value={`$${rental?.totalPrice}`}
                readOnly
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Renturn;
