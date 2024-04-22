import { Request, Response } from "express";
import Recipe from "../models/recipe";

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      author: req.body.author,
    });
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await recipe.remove({ _id: req.params.id });
    res.json({ message: "Recipe removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
