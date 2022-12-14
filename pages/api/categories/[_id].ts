import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { ICategory } from "../../../interfaces";
import { Category } from "../../../models";


type Data =
  | { message: string }
  | { categoryUpdate: ICategory }
  | { category: ICategory }
  | { categoryDelete: ICategory };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateCategory(req, res);

    case "DELETE":
      return deleteCategory(req, res);

    case "GET":
      return getCategory(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const updateCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id="" } = req.query as { _id : string}
  const { name, description, isActive,user } = req.body;

  {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Categoria no valida",
      });
    }


    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        message: "Usuario no valido",
      });
    }

    await db.connect();
    const category = await Category.findOne({ _id });

    if (!category) {
      return res.status(400).json({
        message: "categoria no existe",
      });
    }

    try {
      category.name = name || category.name;
      category.description = description || category.description;
      category.isActive = isActive || category.isActive;
      category.user=user
      const categoryUpdate = await category.save();
      await db.disconnect();

      return res
        .status(200)
        .json({ categoryUpdate, message: "Editado con exito" });
    } catch (error) {
      console.log(error);
      
    }
  }
};

const deleteCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id="" } = req.query as { _id : string}
  {

    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Categoria no valido",
      });
    }

    await db.connect();
    const category = await Category.findOne({ _id });


    if (!category) {
      return res.status(400).json({
        message: "categoria no existe",
      });
    }

    try {
      await category.deleteOne()
      await db.disconnect();
      return res
        .status(200)
        .json({ message: "Eliminado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const getCategory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id="" } = req.query as { _id : string}
  {

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Categoria no valido",
      });
    }

    await db.connect();
    const category = await Category.findOne({ _id });
    await db.disconnect();
    if (!category) {
      return res.status(400).json({
        message: "categoria no existe",
      });
    }

    return res.status(200).json({ category });
  }
};
