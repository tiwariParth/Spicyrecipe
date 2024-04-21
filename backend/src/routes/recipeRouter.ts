import express from "express";

import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController";
import authMiddleware from "../middleware/middleware";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", authMiddleware, getRecipe);
router.post("/", authMiddleware, createRecipe);
router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);
