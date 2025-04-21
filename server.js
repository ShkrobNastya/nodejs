require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Not able to connect to DB", err);
  });
