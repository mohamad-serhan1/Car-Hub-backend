const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, updateUser } = require("../models/user");
const { secretKey, allowedRoles } = require("../config");

// Registration controller
const register = async (req, res) => {
  const { firstName,lastName, email, password, phone, role } = req.body;

  // Validate the role
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const userId = await createUser(firstName,lastName, email, password, phone, role);
    res.status(201).json({ id: userId, firstName,lastName, email, phone, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from request parameters
  const updates = req.body; // Get the updates from the request body

  try {
    // Call the model's updateUser function
    const affectedRows = await userModel.updateUser(userId, updates);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};
module.exports = {
  register,
  login,
  editUser,
};
