const {
  createSales,
  getSalesById,
  getAllSales,
  updateSales,
  deleteSales,
  deleteSalesByCarId
} = require("../models/sales");

// Create a new Sale
const addSale = async (req, res) => {
  const { car_id, user_id, price, status } = req.body;
  try {
    const SaleId = await createSales(car_id, user_id, price, status);
    res.status(201).json({ id: SaleId, car_id, user_id, price, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Sale by ID
const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await getSalesById(id);
    if (!car) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Sales
const getSales = async (req, res) => {
  try {
    const Sales = await getAllSales();
    res.status(200).json(Sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Sale
const editSale = async (req, res) => {
  const { id } = req.params;
  const { car_id, user_id, price, status } = req.body;
  try {
    const updated = await updateSales(id, car_id, user_id, price, status);
    if (updated === 0) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.status(200).json({ id, car_id, user_id, price, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Sale
const removeSale = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteSales(id);
    if (deleted === 0) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeSaleByCar = async (req, res) => {
  const { car_id } = req.params;
  try {
    const deleted = await deleteSalesByCarId(car_id);
    if (deleted === 0) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSale,
  getSale,
  getSales,
  editSale,
  removeSale,
  removeSaleByCar
};
