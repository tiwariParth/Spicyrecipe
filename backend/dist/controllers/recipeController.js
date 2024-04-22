"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipe = exports.getRecipes = void 0;
const recipe_1 = __importDefault(require("../models/recipe"));
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.default.find();
        res.json(recipes);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getRecipes = getRecipes;
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.default.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getRecipe = getRecipe;
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = new recipe_1.default({
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            author: req.body.author,
        });
        yield recipe.save();
        res.json(recipe);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.createRecipe = createRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.default.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        recipe.title = req.body.title;
        recipe.description = req.body.description;
        recipe.ingredients = req.body.ingredients;
        recipe.instructions = req.body.instructions;
        yield recipe.save();
        res.json(recipe);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.default.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        yield recipe.remove({ _id: req.params.id });
        res.json({ message: "Recipe removed" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.deleteRecipe = deleteRecipe;
