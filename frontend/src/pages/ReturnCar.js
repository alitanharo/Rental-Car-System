import { useContext, useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RentalContext } from "../contexts/rentalContext";
import SelectedCar from "../components/car/SelectedCar";

function ReturnCar() {
  const [searchMethod, setSearchMethod] = useState("bookingNumber");
  const [inputValue, setInputValue] = useState("");
  const { getRentalByBookingNumber, getRentalByPlate } =
    useContext(RentalContext);
  const [rental, setRental] = useState(null);
  const [carId, setCarId] = useState(0);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSearchMethodChange = useCallback((event) => {
    setSearchMethod(event.target.value);
  }, []);

  const searchRental = async (searchMethod, inputValue) => {
    if (searchMethod === "bookingNumber") {
      return await getRentalByBookingNumber(inputValue);
    } else {
      return await getRentalByPlate(inputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue) {
      const rentalResponse = await searchRental(searchMethod, inputValue);
      if (rentalResponse) {
        setRental(rentalResponse);
      }
      if (rentalResponse) {
        setCarId(rentalResponse.car);
      }
    }

    setInputValue("");
  };

  return (
    <Container className="p-3 my-3 border shadow">
      <h2 className="mb-4 text-center">Search for a Booking</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Check
              type="radio"
              label="Booking number"
              name="searchMethod"
              value="bookingNumber"
              checked={searchMethod === "bookingNumber"}
              onChange={handleSearchMethodChange}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Plate number"
              name="searchMethod"
              value="plateNumber"
              checked={searchMethod === "plateNumber"}
              onChange={handleSearchMethodChange}
            />
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>
            {searchMethod === "bookingNumber"
              ? "Booking number"
              : "Plate number"}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter ${
              searchMethod === "bookingNumber"
                ? "booking number"
                : "plate number"
            }`}
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </div>
      </Form>
      {rental && <SelectedCar carId={carId} rental={rental} />}
    </Container>
  );
}

export default ReturnCar;
