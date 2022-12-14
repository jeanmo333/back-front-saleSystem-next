import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "../../../database";
import { User } from "../../../models";
import { jwt, validations } from "../../../utils";
import emailRegister from "../../../helpers/emailRegister";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
    rut = "",
    phone = "",
    address2 = "",
    web = "",
  } = req.body as {
    email: string;
    password: string;
    name: string;
    rut: string;
    phone: string;
    address2: string;
    web: string;
  };

  if ([name, email, password].includes("")) {
    return res.status(400).json({
      message: "Hay campo vacio",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "contraseña minimo 6 caracteres",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "nombre minimo 2 caracteres",
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: "correo no valido",
    });
  }

  await db.connect();
  const userMail = await User.findOne({ email });
  if (userMail) {
    return res.status(400).json({
      message: " Email usuario ya existe",
    });
  }

  // const userRut = await User.findOne({ rut });
  // if (userRut) {
  //   return res.status(400).json({
  //     message: " Rut usuario ya existe",
  //   });
  // }

  // const userWeb = await User.findOne({ web });
  // if (userWeb) {
  //   return res.status(400).json({
  //     message: " Web usuario ya existe",
  //   });
  // }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }

  //send mail

  // Enviar el email
  // emailRegister({
  //   email,
  //   name,
  //   token: newUser.token,
  // });

  const { _id, role } = newUser;

  const token = jwt.signToken(_id);

  return res.status(200).json({
    message: "Revisa tu email para confirmar tu cuenta",
    token, //jwt
    user: {
      email,
      role,
      name,
    },
  });
};
