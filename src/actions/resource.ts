"use server";

import { db } from "@/db";
import { Resource, resources, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { and, count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const authGuard = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  return session.user;
};

export const getMyResources = async (page: number) => {
  try {
    const user = await authGuard();
    const myResources = await db
      .select()
      .from(resources)
      .where(eq(resources.author, user.id!))
      .offset((page - 1) * 10)
      .limit(10)
      .orderBy(resources.createdAt);

    return myResources;
  } catch (error) {
    throw error;
  }
};

export const getMyResourcesCount = async () => {
  try {
    const user = await authGuard();
    const myResources = await db
      .select({ count: count() })
      .from(resources)
      .where(eq(resources.author, user.id));

    return Math.ceil(myResources[0]?.count / 10);
  } catch (error) {
    throw error;
  }
};

export const getResourceById = async (id: string) => {
  try {
    const foundResource = await db.query.resources.findFirst({
      where: (resource, { eq }) => eq(resource.id, id),
    });
    return foundResource;
  } catch (error) {
    throw error;
  }
};

export const createResource = async (
  data: Pick<Resource, "description" | "tags" | "title"> & {
    coverImageBuffer: Uint8Array;
  }
) => {
  try {
    const user = await authGuard();

    const uploadedImg = await uploadToCloudinary(
      new Uint8Array(data.coverImageBuffer)
    );

    const payload = {
      title: data.title,
      description: data.description,
      tags: data.tags,
      coverImage: uploadedImg?.secure_url || "",
      author: user.id,
    };

    const createdResource = await db
      .insert(resources)
      .values(payload)
      .returning();

    revalidatePath("/dashboard/my-resources");

    return createdResource;
  } catch (error) {
    throw error;
  }
};

export const editResource = async (
  id: string,
  data: Pick<Resource, "description" | "tags" | "title"> & {
    coverImageBuffer?: Uint8Array;
  }
) => {
  try {
    const user = await authGuard();

    const payload: Pick<Resource, "title" | "description" | "tags"> & {
      coverImage?: string;
    } = {
      title: data.title,
      description: data.description,
      tags: data.tags,
    };

    if (data.coverImageBuffer) {
      const uploadedImg = await uploadToCloudinary(
        new Uint8Array(data.coverImageBuffer)
      );

      if (uploadedImg?.secure_url) {
        payload.coverImage = uploadedImg.secure_url;
      }
    }

    const updatedResource = await db
      .update(resources)
      .set(payload)
      .where(and(eq(resources.id, id), eq(resources.author, user.id)))
      .returning();

    revalidatePath("/dashboard/my-resources");

    return updatedResource;
  } catch (error) {
    throw error;
  }
};

export const deleteResource = async (id: string) => {
  try {
    const user = await authGuard();

    const toDelete = await getResourceById(id);

    const imagePublicId = toDelete?.coverImage
      ? toDelete.coverImage.substr(62, 20)
      : "";

    if (imagePublicId) {
      await deleteFromCloudinary(imagePublicId);
    }

    const foundResource = await db
      .delete(resources)
      .where(and(eq(resources.id, id), eq(resources.author, user.id)));

    revalidatePath("/dashboard/my-resources");
    return foundResource;
  } catch (error) {
    throw error;
  }
};
