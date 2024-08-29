const { createCar, getCarById, getAllCars, updateCar, deleteCar, getCarsByOwnerId ,updateCarStatus,getCarsByStatus  } = require('../models/car');

// Create a new car
const addCar = async (req, res) => {
  try {
    const { model, year, description,status, owner_id } = req.body;
    const image = req.file ? req.file.path : null;

    // Use the createCar function (assuming it's defined in the model)
    const newCar = await createCar(
      model,
      year,
      image,
      description,
      status,
      owner_id,
  );

    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (error) {
    console.error('Error while adding a car:', error);  // Log the error
    res.status(500).json({ error: 'An error occurred while adding the car' });
  }
};

// Get a car by ID
const getCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await getCarById(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a car
const editCar = async (req, res) => {
  const { id } = req.params;
  const { model, year, description, status, owner_id } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updated = await updateCar(id, model, year, image, description, status, owner_id);
    if (updated === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ id, model, year, image, description, status, owner_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editCarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Only extract the status from the request body
  try {
    const updated = await updateCarStatus(id, status);
    if (updated === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ id, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a car
const removeCar = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteCar(id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarsByOwner = async (req, res) => {
  const { owner_id } = req.params;
  try {
    const cars = await getCarsByOwnerId(owner_id);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarsByStatusController = async (req, res) => {
  const { status } = req.params; // Assuming the status is passed as a URL parameter
  try {
    const cars = await getCarsByStatus(status);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addCar,
  getCar,
  getCars,
  editCar,
  removeCar,
  getCarsByOwner,
  editCarStatus,
  getCarsByStatusController
};
