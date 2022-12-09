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
      return confirmToken(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const confirmToken = async (
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
    const validToken = await User.findOne({ token });
    await db.disconnect();

    if (validToken) {
      return res.status(200).json({
        message: "Token válido y el usuario existe",
      });
    } else {
      return res.status(200).json({
        message: "Token no válido",
      });
    }
  }
};
