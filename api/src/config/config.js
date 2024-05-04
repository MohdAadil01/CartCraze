import { config } from "dotenv";

config();

let _config = {
  PORT: process.env.PORT,
};

export default _config = Object.freeze(_config);
