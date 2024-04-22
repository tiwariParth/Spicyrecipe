"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const recipeRouter_1 = __importDefault(require("./routes/recipeRouter"));
require("dotenv").config();
const app = (0, express_1.default)();
(0, database_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", authRoute_1.default);
app.use("/api/recipes", recipeRouter_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
