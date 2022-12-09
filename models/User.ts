import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "../interfaces";
import generateId from "../helpers/generateId";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: {type: String,default: null,trim: true },
    web: {type: String,default: null},
    rut: { type: String, unique: true },
    isActive: {type: Boolean, default: true, },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    phone:{type: String, unique: true },
    address2: {type: String},
    token: {type: String, default: generateId() },
    role: {type: String,
      enum: {
        values: ["admin", "client", "super-user", "SEO"],
        message: "{VALUE} no es un role válido",
        default: "client",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;
