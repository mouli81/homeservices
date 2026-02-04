import User from "../models/User.js";

//  Save user
export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // prevent duplicate users
    const exists = await User.findOne({ email });
    if (exists) return res.json(exists);

    const user = await User.create({ name, email, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
