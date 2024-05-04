import config from "dotenv";

config();

const _config = {
  PORT: process.env.PORT,
};

export default _config = Object.freeze(_config);
