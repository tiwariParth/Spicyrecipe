import mongoose from "mongoose";

export interface Irecipe extends mongoose.Document {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  author: string;
}

const RecipeSchema = new mongoose.Schema<Irecipe>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  author: { type: String, required: true },
});

const Recipe = mongoose.model<Irecipe>("Recipe", RecipeSchema);

export default Recipe;
