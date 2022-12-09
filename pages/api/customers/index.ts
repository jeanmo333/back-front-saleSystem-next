import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";

import { getUser } from "../../../utils/getUser";
import jwt from 'jsonwebtoken';
import console from "console";
import { jwtVerify } from 'jose';
import { Customer } from "../../../models";
import { ICustomer } from "../../../interfaces";

type Data = { message: string } | { customerSave: ICustomer } | ICustomer[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerCustomer(req, res);

    case "GET":
      return getAllCustomers(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerCustomer = async (
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

  await db.connect();
  const customerName = await Customer.findOne({ name });
  if (customerName) {
    return res.status(400).json({
      message: "Nombre cliente ya existe",
    });
  }


  const customerRut = await Customer.findOne({ rut });
  if (customerRut) {
    return res.status(400).json({
      message: "rut cliente ya existe",
    });
  }


  const customerPhone = await Customer.findOne({ phone });
  if (customerPhone) {
    return res.status(400).json({
      message: "telefono cliente ya existe",
    });
  }


  const customerEmail = await Customer.findOne({ email });
  if (customerEmail) {
    return res.status(400).json({
      message: "Email cliente ya existe",
    });
  }


  
  const customerweb = await Customer.findOne({ web });
  if (customerweb) {
    return res.status(400).json({
      message: "Web Cliente ya existe",
    });
  }

  try {
    const customer = new Customer();
    customer.name = name;
    customer.rut = rut;
    customer.phone = phone;
    customer.email=email;
    customer.web=web;
    customer.address2=address2;
    customer.user=user;

    const customerSave = await customer.save();
    await db.disconnect();

    return res
      .status(201)
      .json({ customerSave, message: "Agregado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

const getAllCustomers = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  await db.connect();
  const customers = await Customer.find()
    .where("user")
    .populate("user", "name email _id role")
    .lean();
  await db.disconnect();
  return res.status(200).json(customers);
};



