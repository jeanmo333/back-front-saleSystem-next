import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { ISupplier } from "../../../interfaces";
import { Supplier } from "../../../models";

type Data =
  | { message: string }
  | { supplierUpdate: ISupplier | null }
  | { supplier: ISupplier }
  | { supplierDelete: ISupplier };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateSupplier(req, res);

    case "DELETE":
      return deleteSupplier(req, res);

    case "GET":
      return getSupplier(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const updateSupplier = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id } = req.query;
  const { name, rut, phone, email, web, address2, user, isActive } = req.body;
  {
    // if ([name, rut, phone, email, address2, user].includes("")) {
    //   return res.status(400).json({
    //     message: "Hay campo vacio",
    //   });
    // }

    await db.connect();
    const supplier = await Supplier.findOne({ _id });
    if (!supplier) {
      return res.status(400).json({
        message: "proveedor no existe",
      });
    }

    try {
      const supplierUpdate = await Supplier.findByIdAndUpdate(
        _id,
        { name, rut, phone, email, web, address2, user, isActive },
        { new: true }
      );
      // const supplier = new Supplier();
      // supplier.name = name || supplier.name;
      // supplier.rut = rut || supplier.rut;
      // supplier.isActive = isActive || supplier.isActive;
      // supplier.phone = phone || supplier.phone;
      // supplier.email = email || supplier.email;
      // supplier.web = web || supplier.web;
      // supplier.address2 = address2 || supplier.address2;
      // supplier.user = user || supplier.user;

      //const supplierUpdate = await supplier.updateOne();
      await db.disconnect();

      return res
        .status(200)
        .json({ supplierUpdate, message: "Editado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteSupplier = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id } = req.query;
  {
    await db.connect();
    const supplier = await Supplier.findOne({ _id });
    if (!supplier) {
      return res.status(400).json({
        message: "proveedor no existe",
      });
    }

    try {
      await supplier.deleteOne();
      await db.disconnect();
      return res.status(200).json({ message: "Eliminado con exito" });
    } catch (error) {
      console.log(error);
    }
  }
};

const getSupplier = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id } = req.query;
  {
    await db.connect();
    const supplier = await Supplier.findOne({ _id });
    if (!supplier) {
      return res.status(400).json({
        message: "proveedor no existe",
      });
    }

    return res.status(200).json({ supplier });
  }
};
