import mongoose, { Schema, model, Model } from "mongoose";
import { ICustomer } from "../interfaces";

const customerSchema = new Schema(
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
  {timestamps: true,}
);

const Customer: Model<ICustomer> =
  mongoose.models.Customer || model("Customer", customerSchema);

export default Customer;