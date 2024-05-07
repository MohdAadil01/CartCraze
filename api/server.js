import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDb } from "./src/config/connectDB.js";

connectDb();

app.listen(config.PORT || 8080, () => {
  console.log("server started on " + config.PORT);
});
