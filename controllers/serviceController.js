const {  createService,
  getAllServices,
  updateService,
  deleteService, } = require('../models/services');

// Create a new service
const addService = async (req, res) => {
  const {  service_name, description, price } = req.body;
  try {
    const serviceId = await createService( service_name, description, price);
    res.status(201).json({ id: serviceId,  service_name, description, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Get a car by ID
// const getCar = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const car = await getCarById(id);
//     if (!car) {
//       return res.404).json({ error: 'Car not found' });
//     }
//     res.200).json(car);
//   } catch (error) {
//     res.500).json({ error: error.message });
//   }
// };

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service
const editService = async (req, res) => {
  const { id } = req.params;
  const {  service_name, description, price, } = req.body;
  try {
    const updated = await updateService(id,  service_name, description, price);
    if (updated === 0) {
      return res.status(404).json({ error: 'service not found' });
    }
    res.status(200).json({ id,  service_name, description, price });
  } catch (error) {
    res.status  (500).json({ error: error.message });
  }
};

// Delete a service
const removeService = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteService(id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addService,
  getServices,
  editService,
  removeService,
};
