"use server";

import { db } from "@/db";
import { Resource, resources, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { and, count, desc, eq, ilike, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface GetResourceParameter {
  page: number;
  status: "all" | "pending" | "approved" | "declined";
}

const authGuard = async (roleGuard?: boolean) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthroized!");
  }

  if (roleGuard && !session.user.isAdmin) {
    throw new Error("Unauthroized!");
  }

  return session.user;
};

export const getMyResources = async ({
  page,
  status,
}: GetResourceParameter) => {
  try {
    const user = await authGuard();

    const filterate =
      status == "all"
        ? eq(resources.authorId, user.id!)
        : and(eq(resources.authorId, user.id!), eq(resources.status, status));

    const myResources = await db.query.resources.findMany({
      where: filterate,
      offset: (page - 1) * 10,
      limit: 10,
      orderBy: [desc(resources.createdAt)],
    });

    return myResources;
  } catch (error) {
    throw error;
  }
};

export const getAllResources = async ({
  page,
  status,
}: GetResourceParameter) => {
  try {
    await authGuard(true);

    const allResources = await db.query.resources.findMany({
      offset: (page - 1) * 10,
      limit: 10,
      orderBy: [desc(resources.createdAt)],
      with: { author: true },
      where: status == "all" ? undefined : eq(resources.status, status),
    });

    return allResources;
  } catch (error) {
    throw error;
  }
};

export const getResourcesForReader = async ({
  page,
  search,
}: {
  page: number;
  search?: string;
}) => {
  try {
    const filterate = !search
      ? eq(resources.status, "approved")
      : and(eq(resources.status, "approved"), ilike(resources.tags, `%${search}%`));

    const allResources = await db.query.resources.findMany({
      where: filterate,
      offset: (page - 1) * 10,
      limit: 10,
      orderBy: [desc(resources.createdAt)],
      with: { author: true },
    });

    return allResources;
  } catch (error) {
    throw error;
  }
};

export const getAllResourcesCount = async () => {
  try {
    await authGuard(true);
    const myResources = await db.select({ count: count() }).from(resources);

    return Math.ceil(myResources[0]?.count / 10);
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
      .where(eq(resources.authorId, user.id));

    return Math.ceil(myResources[0]?.count / 10);
  } catch (error) {
    throw error;
  }
};

export const getResourceById = async (id: string) => {
  try {
    const foundResource = await db.query.resources.findFirst({
      where: (resource, { eq }) => eq(resource.id, id),
      with: {
        author: true,
      },
    });
    return foundResource;
  } catch (error) {
    throw error;
  }
};

export const createResource = async (
  data: Pick<Resource, "description" | "tags" | "title" | "link"> & {
    coverImageBuffer: Uint8Array;
  }
) => {
  try {
    const user = await authGuard();

    const uploadedImg = await uploadToCloudinary(data.coverImageBuffer);

    const payload = {
      title: data.title,
      description: data.description,
      tags: data.tags,
      coverImage: uploadedImg?.secure_url || "",
      link: data.link,
      authorId: user.id,
    };

    const createdResource = await db
      .insert(resources)
      .values(payload)
      .returning();

    revalidatePath("/dashboard/my-resources");

    return createdResource[0];
  } catch (error) {
    throw error;
  }
};

export const editResource = async (
  id: string,
  data: Pick<Resource, "description" | "tags" | "title" | "link"> & {
    coverImageBuffer?: Uint8Array;
  }
) => {
  try {
    const user = await authGuard();

    const payload: Pick<Resource, "title" | "description" | "tags" | "link"> & {
      coverImage?: string;
    } = {
      title: data.title,
      description: data.description,
      tags: data.tags,
      link: data.link,
    };

    if (data.coverImageBuffer) {
      const uploadedImg = await uploadToCloudinary(data.coverImageBuffer);

      if (uploadedImg?.secure_url) {
        payload.coverImage = uploadedImg.secure_url;
      }
    }

    const updatedResource = await db
      .update(resources)
      .set(payload)
      .where(and(eq(resources.id, id), eq(resources.authorId, user.id)))
      .returning();

    revalidatePath("/dashboard/my-resources");

    return updatedResource;
  } catch (error) {
    throw error;
  }
};

export const updateResourceStatus = async (
  id: string,
  status: "pending" | "approved" | "declined"
) => {
  try {
    await authGuard(true);

    const updatedResource = await db
      .update(resources)
      .set({ status: status! })
      .where(eq(resources.id, id))
      .returning();

    revalidatePath("/dashboard/my-resources");
    revalidatePath("/dashboard/admin");

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
      .where(and(eq(resources.id, id), eq(resources.authorId, user.id)));

    revalidatePath("/dashboard/my-resources");
    return foundResource;
  } catch (error) {
    throw error;
  }
};
