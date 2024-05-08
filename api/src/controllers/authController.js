import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password, address, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    res.send(hashedPassword);
  } catch (error) {}
};
export const login = async (req, res) => {
  res.send("hi");
};
