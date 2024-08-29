const express = require("express");
const {
  addCar,
  getCar,
  getCars,
  editCar,
  removeCar,
  getCarsByOwner,
  editCarStatus,
  getCarsByStatusController, // Ensure this is imported
} = require("../controllers/carController");

const upload = require("../middleware/upload");

const router = express.Router();

// Add a new car (restricted to certain roles)
router.post("/", upload.single("image"), addCar);

// Get a car by ID
router.get("/:id", getCar);

// Get all cars
router.get("/", getCars);

// Update a car (restricted to certain roles)
router.patch("/:id", upload.single("image"), editCar);

router.patch("/status/:id", upload.single("image"), editCarStatus);

router.get("/status/:status", getCarsByStatusController);

// Delete a car (restricted to certain roles)
router.delete("/:id", removeCar);

// Get cars by owner
router.get("/owner/:owner_id", getCarsByOwner);

module.exports = router;
