import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";

import { getUser } from "../../../utils/getUser";
import jwt from 'jsonwebtoken';
import console from "console";
import { jwtVerify } from 'jose';
import { Category, Supplier, User } from "../../../models";
import { IProduct } from "../../../interfaces";
import Product from '../../../models/Product';
import mongoose from "mongoose";

//  interface RequestExt extends NextApiRequest{
//   user: string;

// }

type Data = { message: string } | { productSave: IProduct } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerProduct(req, res);

    case "GET":
      return getAllProducts(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name           = "",
    description    = "",
    purchase_price = 0,
    sale_price     = 0,
    inStock         = 0,
    isActive       = true,
    user           ="",
    category       ="",
    supplier        =""
  } = req.body as {
    name            : string;
    description?    : string;
    purchase_price  : number;
    sale_price      : number;
    inStock           : number;
    isActive       : boolean;
    category       : string;
    supplier        : string;
    user           : string;
  };


  const { token = "" } = req.cookies;

  if ([name, category,supplier, description].includes("")) {
    return res.status(400).json({
      message: "Hay campo vacio",
    });
  }


  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({
      message: "categoria no valida",
    });
  }


  if (!mongoose.Types.ObjectId.isValid(supplier)) {
    return res.status(400).json({
      message: "proveedor no valido",
    });
  }


  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({
      message: "Usuario no valido",
    });
  }

  //const user  = getUser(token) as unknown as string;

  await db.connect();
  const productName = await Product.findOne({ name });
  if (productName) {
    return res.status(400).json({
      message: "Nombre producto ya existe",
    });
  }


  const productCategory = await Category.findOne({ _id: category });
  if (!productCategory) {
    return res.status(400).json({
      message: "Categoria no existe",
    });
  }

  const productSupplier = await Supplier.findOne({ _id: supplier });
  if (!productSupplier) {
    return res.status(400).json({
      message: "proveedor no existe",
    });
  }


 
  const productUser = await User.findOne({ _id: user });
  if (!productUser) {
    return res.status(400).json({
      message: "usuario no existe",
    });
  }

  
  try {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.purchase_price = purchase_price;
    product.sale_price=sale_price;
    product.inStock=inStock;
    product.isActive=isActive;
    product.category=category;
    product.supplier=supplier;
    product.user=user;

    const productSave = await product.save();
    await db.disconnect();

    return res
      .status(201)
      .json({ productSave, message: "Agregado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  await db.connect();
  const products = await Product.find()
    .where("user")
   // .equals(req.body.user)
    .populate("user", "name email _id role")
    .populate("category", "name description _id ")
    .populate("supplier", "name email _id ")
    .lean();
  await db.disconnect();
  return res.status(200).json(products);
};



