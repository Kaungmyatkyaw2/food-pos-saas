"use server";

import { db } from "@/db";
import { Resource, resources } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getMyResources = async (page: number) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  const myResources = await db
    .select()
    .from(resources)
    .where(eq(resources.author, session.user.id!))
    .offset((page - 1) * 10)
    .limit(10);

  return myResources;
};

export const getMyResourcesCount = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  const myResources = await db
    .select({ count: count() })
    .from(resources)
    .where(eq(resources.author, session.user.id));

  return Math.ceil(myResources[0]?.count / 10);
};

export const createResource = async (
  data: Pick<Resource, "description" | "tags" | "title"> & {
    coverImageBuffer: Uint8Array;
  }
) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  const uploadedImg = await uploadToCloudinary(
    new Uint8Array(data.coverImageBuffer)
  );

  const payload = {
    title: data.title,
    description: data.description,
    tags: data.tags,
    coverImage: uploadedImg?.secure_url || "",
    author: session.user.id,
  };

  const createdResource = await db
    .insert(resources)
    .values(payload)
    .returning();

  revalidatePath("/dashboard/my-resources");

  return createdResource;
};
