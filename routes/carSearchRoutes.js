const express = require("express");
const { searchCarsController ,getCarDetailsByIdController } = require("../controllers/carSearchCon");

const router = express.Router();

router.get("/search", searchCarsController);

router.get('/:id', getCarDetailsByIdController); // New route

module.exports = router;
