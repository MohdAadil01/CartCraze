import { config } from "dotenv";

config();

let _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

export default _config = Object.freeze(_config);
