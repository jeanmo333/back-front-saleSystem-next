import type { NextApiRequest, NextApiResponse } from "next";

import User from "../../../../models/User";
import { db } from "../../../../database";

type Data = { message: string };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return confirmAccount(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const confirmAccount = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  //const { token = "" } = req.body as { token: string };
  // const {
  //   query: { token = "" },
  // } = req;

  const { token } = req.query;
  {
    await db.connect();
    const userConfirm = await User.findOne({ token });

    if (!userConfirm) {
      return res.status(400).json({
        message: "Token no válido",
      });
    }

    try {
      userConfirm.token = "";
      userConfirm.isActive = true;
      await userConfirm.save();
      await db.disconnect();

      return res.status(200).json({
        message: "Usuario Confirmado con exito",
      });
    } catch (error) {
      console.log(error);
    }
  }
};
