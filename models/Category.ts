import mongoose, { Schema, model, Model } from "mongoose";
import { ICategory } from "../interfaces";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: {type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
  },
  {timestamps: true,}
);

const Category: Model<ICategory> =
  mongoose.models.Category || model("Category", categorySchema);

export default Category;
