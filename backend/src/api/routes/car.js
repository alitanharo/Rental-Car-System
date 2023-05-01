

const express = require('express')
const router = express.Router()
const carController = require('../../controllers/carController');


router.get('/', carController.getAllCars);
router.post('/', carController.addCar);
router.get('/:plate', carController.getCarByPlate);
router.put('/:plate', carController.updateCar);
router.delete('/:plate', carController.deleteCar);




module.exports = router