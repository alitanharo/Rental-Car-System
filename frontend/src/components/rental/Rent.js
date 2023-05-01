import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { RentalContext } from "../../contexts/rentalContext";

const Rent = ({ rental, showModal, setShowModal, user, car }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { deleteRental, registerReturn } = useContext(RentalContext);

  const handleRent = () => {
    toast.success("Your rent is ready !");
    setError("");
    setShowModal(false);
    setTimeout(() => {
      navigate('/return')
    }, 5000)
  };
  const handleCancel = async () => {
    try {
      await registerReturn(rental.bookingNumber, rental.returnDate, rental.currentMileage)
      await deleteRental(rental.bookingNumber);

      toast.info("Your Order Canceld!");
      setError("");
      setShowModal(false);
    } catch (error) {
      toast.warning("Somthing wet worng! try again!");
      console.error();
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm your oreder</Modal.Title>
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
              <Form.Control type="text" value={car?.currentKm} readOnly />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price per day & Price per Km</Form.Label>
              <Form.Control
                type="text"
                value={` $${car?.baseDayPrice}/ $${car?.category === 'Small car' ? "Free" : car?.baseKmPrice}/ ${car?.category}`}
                readOnly
              />
            </Form.Group>

            {error && (
              <div>
                <ToastContainer />
                {toast.error(error)}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRent}>
            Rent
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Rent;
