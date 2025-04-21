const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificatonRoutes = require("./routes/notificationRoutes");
const tokenMiddleware = require("./middlewares/tokenMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
// app.use('/product', productRoutes);
app.use("/cart", tokenMiddleware, cartRoutes);
app.use("/reviews", reviewRoutes);
app.use("/notifications", notificatonRoutes);

app.use(errorMiddleware);

module.exports = app;
