// src/index.ts

import express from "express";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoute";
import recipeRoutes from "./routes/recipeRouter";
require("dotenv").config();
const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
