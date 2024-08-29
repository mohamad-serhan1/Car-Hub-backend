const express = require("express");
const {
  addSale,
  getSale,
  getSales,
  editSale,
  removeSale,
  removeSaleByCar,
} = require("../controllers/saleController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new car (restricted to certain roles)
router.post("/", addSale);

// Get a car by ID
router.get("/:id", authenticateToken, getSale);

// Get all cars
router.get("/", getSales);

// Update a car (restricted to certain roles)
router.put("/:id", authenticateToken, editSale);

// Delete a car (restricted to certain roles)
router.delete("/:car_id", removeSale);

router.delete("/carId/:car_id", removeSaleByCar);

module.exports = router;
