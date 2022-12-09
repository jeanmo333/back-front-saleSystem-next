import mongoose, { Schema, model, Model } from "mongoose";
import { ISupplier } from "../interfaces";


const supplierSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    rut: { type: String, required: true, unique: true },
    isActive: {type: Boolean, default: true, },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    phone:{type: String, required: true, unique: true },
    email:{type: String, required: true, unique: true },
    web: {type: String, required: false, unique: true },
    address2: {type: String, required: true},
  },
  {timestamps: true}
);

const Supplier: Model<ISupplier> =
  mongoose.models.Supplier || model("Supplier", supplierSchema);

export default Supplier;