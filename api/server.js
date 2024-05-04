import app from "./src/app";
import config from "./src/config/config";

app.listen(config.PORT || 8080, () => {
  console.log("server started on " + config.PORT);
});
