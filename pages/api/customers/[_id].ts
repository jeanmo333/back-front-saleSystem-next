import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { ICustomer } from "../../../interfaces";
import { Customer } from "../../../models";

type Data =
  | { message: string }
  | { customerUpdate: ICustomer }
  | { customer: ICustomer }
  | { customerDelete: ICustomer };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateCustomer(req, res);

    case "DELETE":
      return deleteCustomer(req, res);

    case "GET":
      return getCustomer(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const updateCustomer = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id } = req.query;
  const { name, rut, phone, email, web, address2, user, isActive } = req.body;
  {
    await db.connect();
    const customer = await Customer.findOne({ _id });
    if (!customer) {
      return res.status(400).json({
        message: "cliente no existe",
      });
    }

    try {
      customer.name = name || customer.name;
      customer.rut = rut || customer.rut;
      customer.isActive = isActive || customer.isActive;
      customer.phone = phone || customer.phone;
      customer.email = email || customer.email;
      customer.web = web || customer.web;
      customer.address2 = address2 || customer.address2;
      customer.user = user || customer.user;

      const customerUpdate = await customer.save();
      await db.disconnect();

      return res
        .status(200)
        .json({ customerUpdate, message: "Editado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteCustomer = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id } = req.query;
  {
    await db.connect();
    const customer = await Customer.findOne({ _id });

    if (!customer) {
      return res.status(400).json({
        message: "cliente no existe",
      });
    }

    try {
      await customer.deleteOne();
      await db.disconnect();
      return res.status(200).json({ message: "Eliminado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const getCustomer = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id } = req.query;
  {
    await db.connect();
    const customer = await Customer.findOne({ _id });
    await db.disconnect();
    if (!customer) {
      return res.status(400).json({
        message: "cliente no existe",
      });
    }

    return res.status(200).json({ customer });
  }
};
