import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data =
  | { message: string }
  | { productUpdate: IProduct }
  | { product: IProduct }
  | { productDelete: IProduct };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateProduct(req, res);

    case "DELETE":
      return deleteProduct(req, res);

    case "GET":
      return getProduct(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id="" } = req.query as { _id : string}

  const { name, description, purchase_price, sale_price, inStock, category, user,suplier, isActive } = req.body;
  {

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Cliente no valido",
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        message: "Usuario no valido",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(suplier)) {
      return res.status(400).json({
        message: "proveedor no valido",
      });
    }


    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        message: "categoria no valido",
      });
    }
    
    await db.connect();
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(400).json({
        message: "producto no existe",
      });
    }
 
    try {
      product.name = name || product.name;
      product.description = description || product.description;
      product.isActive = isActive || product.isActive;
      product.purchase_price = purchase_price || product.purchase_price;
      product.sale_price = sale_price || product.sale_price;
      product.inStock = inStock || product.inStock;
      product.category = category || product.category;
      product.user = user || product.user;
      product.supplier = suplier || product.supplier;

      const productUpdate = await product.save();
      await db.disconnect();

      return res
        .status(200)
        .json({ productUpdate, message: "Editado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id } = req.query;
  {
    await db.connect();
    const product = await Product.findOne({ _id });

    if (!product) {
      return res.status(400).json({
        message: "Producto no existe",
      });
    }

    try {
      await product.deleteOne();
      await db.disconnect();
      return res.status(200).json({ message: "Eliminado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id } = req.query;
  {
    await db.connect();
    const product = await Product.findOne({ _id });
    await db.disconnect();
    if (!product) {
      return res.status(400).json({
        message: "producto no existe",
      });
    }

    return res.status(200).json({ product });
  }
};
