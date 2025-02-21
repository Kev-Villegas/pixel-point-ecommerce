"use server";

import { db } from "@/app/_lib/prisma";
import bcrypt from "bcryptjs";

export const signUp = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return "User already exists!";
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  await db.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return "User created successfully!";
};

// const message = await signUp(password, email)
// console.log(message)
