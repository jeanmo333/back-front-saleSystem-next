import type { NextApiRequest, NextApiResponse } from "next";

import User from "../../../../models/User";
import { db } from "../../../../database";
import bcrypt from 'bcryptjs';

type Data = { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return newPassword(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const newPassword = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  const { token } = req.query;
  const { password } = req.body;
  {
    await db.connect();
    const user = await User.findOne({ token });
 
    if (!user) {
      return res.status(400).json({
        message: "Hubo un error",
      });
    } 

    try {
      user.token = "";
      user.password = bcrypt.hashSync(password, 10) ;
      await user.save();
      await db.disconnect();

      return res.status(200).json({
        message: "Password modificado con exito",
      });
    } catch (error) {
      console.log(error);
    }
  }
};
