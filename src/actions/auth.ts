"use server";

import { db } from "@/db";
import { User, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

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

export const updatePassword = async (data: {
  password: string;
  oldPassword: string;
}) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  const dbUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, session?.user.email!),
  });

  const isPasswordEqual = await bcrypt.compare(
    data.oldPassword,
    dbUser?.password || ""
  );

  if (!isPasswordEqual) {
    throw new Error("Old password isn't correct!");
  }

  const hashedPass = await bcrypt.hash(data.password!, 12);

  const updatedUser = await db
    .update(users)
    .set({ password: hashedPass })
    .where(eq(users.id, session.user.id))
    .returning();

  return updatedUser[0];
};

export const updateProfile = async (data: Pick<User, "name">) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  const updatedUser = await db
    .update(users)
    .set(data)
    .where(eq(users.id, session.user.id))
    .returning();

  return updatedUser[0];
};
