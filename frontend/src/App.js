import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./common/NavBar";
import Home from "./pages/Home";
import ReturnCar from "./pages/ReturnCar";
import PickupList from "./pages/PickupList";
import Login from "./components/user/Login";
import SignIn from "./pages/SignIn";
import Logout from "./components/user/Logout";
import CarProvider from "./contexts/carContext";
import RentalProvider from "./contexts/rentalContext";
import UserProvider from "./contexts/userContext";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <UserProvider>
      <CarProvider>
        <RentalProvider>
          <BrowserRouter>
            <NavBar />
            <Container>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/pickup" element={<PickupList />} />
                <Route exact path="/return" element={<ReturnCar />} />
                <Route exact path="/signIn" element={<SignIn />} />
                <Route exact path="/logIn" element={<Login />} />
                <Route exact path="/logOut" element={<Logout />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </RentalProvider>
      </CarProvider>
    </UserProvider>
  );
}

export default App;
