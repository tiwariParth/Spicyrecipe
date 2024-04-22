"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeController_1 = require("../controllers/recipeController");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const router = express_1.default.Router();
router.get("/", recipeController_1.getRecipes);
router.get("/:id", middleware_1.default, recipeController_1.getRecipe);
router.post("/", middleware_1.default, recipeController_1.createRecipe);
router.put("/:id", middleware_1.default, recipeController_1.updateRecipe);
router.delete("/:id", middleware_1.default, recipeController_1.deleteRecipe);
exports.default = router;
