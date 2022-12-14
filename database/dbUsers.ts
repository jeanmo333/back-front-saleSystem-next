import bcrypt from "bcryptjs";
import { IUser } from "../interfaces";

import { User } from "../models";
import { db } from "./";

type Data = {
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
  };
};

export const checkUserEmailPassword = async (
  email: string,
  password: string
): Promise<{
  hasError?: boolean;
  message?: string;
  user?: { _id: string; email: string; name: string; role: string };
}> => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return {
      hasError: true,
      message: "Email o password no valido",
    };
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return {
      hasError: true,
      message: "Email o password no valido",
    };
  }

  const { role, name, _id } = user;

  return {
    user: {
      _id,
      email: email.toLocaleLowerCase(),
      role,
      name,
    },
  };
};

// Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "client",
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
