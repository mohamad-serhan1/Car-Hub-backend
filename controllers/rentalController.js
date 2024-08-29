const {  createRental,
    getRentaLById,
    getAllRentals,
    updateRental,
    deleteRental,
    deleteRentalByCarId } = require('../models/rentals');

// Create a new rental
const addRental = async (req, res) => {
  const {  car_id, user_id, price_per_day, status } = req.body;
  try {
    const rentalId = await createRental( car_id, user_id, price_per_day, status);
    res.status(201).json({ id: rentalId,  car_id, user_id, price_per_day, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Rental by ID
const getRental = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await getRentaLById(id);
    if (!car) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rentals
const getRentals = async (req, res) => {
  try {
    const rentals = await getAllRentals();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a rental
const editRental = async (req, res) => {
  const { id } = req.params;
  const {  car_id, user_id, price_per_day, status, } = req.body;
  try {
    const updated = await updateRental(id,  car_id, user_id, price_per_day, status);
    if (updated === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.status(200).json({ id,  car_id, user_id, price_per_day, status });
  } catch (error) {
    res.status  (500).json({ error: error.message });
  }
};

// Delete a rental
const removeRental = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteRental(id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeRentalByCar = async (req, res) => {
  const { car_id } = req.params;
  try {
    const deleted = await deleteRentalByCarId(car_id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addRental,
  getRental,
  getRentals,
  editRental,
  removeRental,
  removeRentalByCar
};
