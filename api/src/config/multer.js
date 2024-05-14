import multer from "multer";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationDirectory = path.resolve(
  __dirname,
  "../../public/images/uploads"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    if (
      path.extname(file.originalname) !== ".jpeg" &&
      path.extname(file.originalname) !== ".jpg" &&
      path.extname(file.originalname) !== ".png"
    ) {
      return new Error("Profile image should be jpeg, jpg or png");
    }

    crypto.randomBytes(12, (err, bytes) => {
      const updatedFileName =
        bytes.toString("hex") + path.extname(file.originalname);
      cb(null, updatedFileName);
    });
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 250000 },
});
