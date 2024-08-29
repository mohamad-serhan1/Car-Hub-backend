const express = require("express");
const {
  getCarsWithDetailsController,
  searchCarsController,
  getCarByStatus,
  getCarDetailsByIdController
} = require("../controllers/carDetailsController");


const router = express.Router();

router.get("/", getCarsWithDetailsController); 

router.get("/:status", getCarByStatus); 

router.get('/search', searchCarsController);

router.get('/:id', getCarDetailsByIdController); // New route

module.exports = router;

