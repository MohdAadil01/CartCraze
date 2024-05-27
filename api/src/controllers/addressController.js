// const addressSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     addressLine1: { type: String, required: true },
//     addressLine2: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     country: { type: String, required: true },
//     postalCode: { type: String, required: true },
//   });

export const createAddress = async (req, res, next) => {
  res.send("create");
};
export const getAddress = async (req, res, next) => {
  res.send("get address");
};
export const updateAddress = async (req, res, next) => {
  res.send("update");
};
export const deleteAddress = async (req, res, next) => {
  res.send("delete");
};
