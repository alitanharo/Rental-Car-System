# Car Rental System
This is a simple car rental system designed to allow users to rent cars from a fleet of available vehicles. The system is implemented as a Node.js server using the Express.js framework and MongoDB database for data storage. The system consists of three main components:

* Cars: The fleet of available vehicles that users can rent
* Users: The individuals who can rent cars from the system and also admin servises
* Rentals: The records of all rental transactions in the system

# Installation
Clone the repository to your local machine
Run npm install to install all the dependencies
Set up the environment variables by creating a .env file at the root directory of the project and adding the following variables:
makefile
Copy code
MONGO_URI=<your_mongo_uri>
PORT=<port_number>
JWT_SECRET=<your_secret_key>
Run npm start to start the server
Use a REST client like Postman to test the endpoints

# Start server in terminal:
* cd backend
* npm install
* npm start

# API Endpoints
Cars
* GET /api/car: Get all cars in the fleet
* POST /api/car: Add a new car to the fleet
* GET /api/car/:plate: Get a specific car by its plate number
* PUT /api/car/:plate: Update a specific car by its plate number
* DELETE /api/car/:plate: Delete a specific car by its plate number
Rentals
* POST /api/rental/pickup: Register a new rental pick-up
* PUT /api/rental/return: Register a rental return
* GET /api/rental/rentals: Get a list of all rentals
* GET /api/rental/bookingnumber/:bookingNumber: Get a specific rental record by its booking number
* GET /api/rental/plate/:plate: Get a specific rental record by its car plate number
* DELETE /api/rental/:bookingNumber: Delete a specific rental record by its booking number
Authentication/users
* POST /api/user/signup: Register a new user
* POST /api/user/signin: Log in an existing user
* POST /api/user/logout: Log out an existing user

# Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
# Future Improvements
There are several ways to improve this car rental system, including:
Adding more features like searching for available cars by location or category
Implementing a pricing system that adjusts rental prices based on demand and availability
Adding support for different languages and currencies
Improving security by implementing additional measures like rate limiting and two-factor authentication
