const Port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRoutes");
const { connectDB } = require("./config/db");

// app.use(
//   cors({
//     // origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(cors());
app.listen(Port, () => {
  console.log(`server is running ${Port}`);
});


connectDB();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);
