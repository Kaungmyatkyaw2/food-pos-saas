"use server";

import { db } from "@/db";
import { Resource, resources } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

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

  return createdResource;
};
