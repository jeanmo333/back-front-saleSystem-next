import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import emailForgetPassword from "../../../helpers/emailForgetPassword";
import generateId from "../../../helpers/generateId";
import { User } from "../../../models";

type Data = { message: string }
 

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return forgetPassword(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const forgetPassword = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "usuario no existe" });
  }

  try {
    user.token = generateId();
    await user.save();
    await db.disconnect();
    // Enviar Email con instrucciones
    emailForgetPassword({
      email,
      name: user.name,
      token: user.token,
    });

    return res
      .status(200)
      .json({ message: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};
