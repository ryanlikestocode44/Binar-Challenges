console.log("Implement servermu disini yak 😝!");

// import packages
import express from "express";
import 'dotenv/config';
// import path from "path";
// import { fileURLToPath } from 'url';
import fileUpload from "express-fileupload";
import { router } from "./routes/index.js";
import { errorHandler } from "./middleware/errors.js";

// Menggunakan express js dan port 5000
const app = express();
const PORT = process.env.PORT || 5500;

// Aktivasi express json
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))

app.use("/", router);

app.use(errorHandler);

// Referensi path folder public
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const PUBLIC_DIR = path.join(__dirname, "../public");

// Function untuk Cek Content Type
/*
const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    default:
      return "text/plain";
  }
};
*/

// Serving file static dari direktori public
// app.use(express.static(PUBLIC_DIR));

// Ping API dan Kirim rent.html
app.get("/", (req, res) => {
  // const filePath = path.join(PUBLIC_DIR, "rent.html");
  // const contentType = getContentType(filePath);
  // res.sendFile(filePath, { headers: { 'Content-type': contentType }});
  res.send("Ping Successfully!");
});

// Jalankan server di port 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});