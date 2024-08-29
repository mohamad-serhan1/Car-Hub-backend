// routes/serviceRoutes.js

const express = require("express");
const router = express.Router();
const {
  addServiceRequest,
  getServiceRequestsController,
  updateServiceRequestStatusController,
  deleteServiceRequestController,
} = require("../controllers/serviceRequestController");

router.post("/", addServiceRequest);
router.get("/", getServiceRequestsController);
router.patch("/:id/status", updateServiceRequestStatusController);
router.delete("/:id", deleteServiceRequestController);

module.exports = router;
