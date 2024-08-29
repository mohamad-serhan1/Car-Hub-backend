const { getCarsWithDetails ,searchCars, getCarsByStatus,getCarDetailsById} = require("../models/carDetail");

// Create a new car
const getCarsWithDetailsController = async (req, res) => {
  console.log("getCarsWithDetailsController called");
  try {
    const carsWithDetails = await getCarsWithDetails();
    res.status(200).json(carsWithDetails);
  } catch (error) {
    console.error("Error while fetching cars with details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching cars with details" });
  }
};
const searchCarsController = async (req, res) => {
  console.log("searchCarsController called with query:", req.query.q);
  try {
    const searchQuery = req.query.q || ''; // Get the search query from request parameters
    const results = await searchCars(searchQuery);
    console.log("Search results:", results); // Log the results
    res.json(results);
  } catch (error) {
    console.error("Error while searching for cars:", error);
    res.status(500).json({ error: 'An error occurred while searching for cars.' });
  }
};

const getCarByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const cars = await getCarsByStatus(status);
    res.status(200).json(cars);
  } catch (err) {
    console.error(`Error fetching cars with status ${status}:`, err);
    res.status(500).json({ error: `Failed to fetch cars with status ${status}` });
  }
};
const getCarDetailsByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const carDetails = await getCarDetailsById(id);
    if (!carDetails) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(carDetails);
  } catch (err) {
    console.error(`Error fetching car details with ID ${id}:`, err);
    res.status(500).json({ error: `Failed to fetch car details with ID ${id}` });
  }
};
module.exports = {
  getCarsWithDetailsController,
  searchCarsController,
  getCarByStatus,
  getCarDetailsByIdController
};
