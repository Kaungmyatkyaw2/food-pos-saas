"use server";

import { db } from "@/db";
import { User, users } from "@/db/schema";
import bcrypt from "bcrypt";

export const createAccount = async (
  data: Pick<User, "email" | "name" | "password">
) => {
  const dbUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, data.email!),
  });

  if (dbUser) {
    throw new Error("Email is already in used!");
  }

  const hashedPass = await bcrypt.hash(data.password!, 12);

  const createdUser = await db
    .insert(users)
    .values({ ...data, password: hashedPass })
    .returning();

  return createdUser;
};
