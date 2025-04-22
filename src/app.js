const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificatonRoutes = require("./routes/notificationRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const tokenMiddleware = require("./middlewares/tokenMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
// app.use('/product', productRoutes);
app.use("/cart", tokenMiddleware, cartRoutes);
app.use("/reviews", reviewRoutes);
app.use("/notifications", notificatonRoutes);
app.use("/refresh-token", tokenRoutes);

app.use(errorMiddleware);

module.exports = app;
