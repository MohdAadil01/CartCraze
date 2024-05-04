import app from "./src/app.js";
import config from "./src/config/config.js";

app.listen(config.PORT || 8080, () => {
  console.log("server started on " + config.PORT);
});
