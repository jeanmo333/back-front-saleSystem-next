import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import console from "console";
import {Supplier, User } from "../../../models";
import { ISupplier } from "../../../interfaces";
import mongoose from "mongoose";


type Data = { message: string } | { supplierSave: ISupplier } | ISupplier[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerSupplier(req, res);

    case "GET":
      return getAllSupplier(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerSupplier = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name= "",
    rut= "",
    phone="",
    email="",
    web= "",
    address2="",
    user=""
  } = req.body as {
    name: string;
    rut: string;
    phone: string;
    email: string;
    web: string;
    address2:string;
    user:string
  };


  const { token = "" } = req.cookies;

  if ([name,rut,phone,email,address2, user].includes("")) {
    return res.status(400).json({
      message: "Hay campo vacio",
    });
  }

  //const user  = getUser(token) as unknown as string;

  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({
      message: "usuario no valida",
    });
  }


  await db.connect();
  const supplierName = await Supplier.findOne({ name });
  if (supplierName) {
    return res.status(400).json({
      message: "Nombre proveedor ya existe",
    });
  }


  const supplierRut = await Supplier.findOne({ rut });
  if (supplierRut) {
    return res.status(400).json({
      message: "rut proveedor ya existe",
    });
  }


  const supplierPhone = await Supplier.findOne({ phone });
  if (supplierPhone) {
    return res.status(400).json({
      message: "telefono proveedor ya existe",
    });
  }


  const supplierEmail = await Supplier.findOne({ email });
  if (supplierEmail) {
    return res.status(400).json({
      message: "Email proveedor ya existe",
    });
  }


  
  const supplierweb = await Supplier.findOne({ web });
  if (supplierweb) {
    return res.status(400).json({
      message: "Web proveedor ya existe",
    });
  }

  const supplierUser = await User.findOne({ _id: user });
  if (!supplierUser) {
    return res.status(400).json({
      message: "usuario no existe",
    });
  }

  try {
    const supplier    = new Supplier();
    supplier.name     = name;
    supplier.rut      = rut;
    supplier.phone    = phone;
    supplier.email    = email;
    supplier.web      = web;
    supplier.address2 = address2;
    supplier.user     = user;

    const supplierSave = await supplier.save();
    await db.disconnect();

    return res
      .status(201)
      .json({ supplierSave, message: "Agregado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

const getAllSupplier = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  await db.connect();
  const suppliers = await Supplier.find()
    .where("user")
    .populate("user", "name email _id role")
    .lean();
  await db.disconnect();
  return res.status(200).json(suppliers);
};



