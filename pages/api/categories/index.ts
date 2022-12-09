import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { ICategory } from "../../../interfaces/category";
import console from "console";
import { Category } from "../../../models";

type Data = { message: string } | { categorySave: ICategory } | ICategory[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerCategory(req, res);

    case "GET":
      return getAllCategories(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    description = "",
    user = "",
  } = req.body as {
    name: string;
    description: string;
    user: string;
  };


  const { token = "" } = req.cookies;
 
  if (name === "" && description === "" && user === "") {
    return res.status(400).json({
      message: "Hay campo vacio",
    });
  }

  //const user  = getUser(token) as unknown as string;

  await db.connect();
  const categoryName = await Category.findOne({ name });

  if (categoryName) {
    return res.status(400).json({
      message: "Categoria ya existe",
    });
  }

  try {
    const category = new Category();
    category.name = name;
    category.description = description;
    category.user = user;

    const categorySave = await category.save();
    await db.disconnect();

    return res
      .status(201)
      .json({ categorySave, message: "Agregado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

const getAllCategories = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  await db.connect();
  const categories = await Category.find()
    .where("user")
    .populate("user", "name email _id role")
    .lean();
  await db.disconnect();
  return res.status(200).json(categories);
};



