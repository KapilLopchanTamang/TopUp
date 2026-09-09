"use server";
import { prisma } from "./db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type RowInput = { amountLabel: string; price: string; isHighlighted?: boolean; sortOrder: number };
type GroupInput = { label?: string; sortOrder: number; rows: RowInput[] };

function sanitizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function validatePrice(price: string): boolean {
  const clean = price.replace(/[^0-9.]/g, "");
  const num = parseFloat(clean);
  return !isNaN(num) && num > 0;
}

export async function createGame(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const sortOrder = parseInt(String(formData.get("sortOrder") || "0"), 10) || 0;
  const isActive = formData.get("isActive") === "on";
  const groupsJson = String(formData.get("groupsJson") || "[]");
  let groups: GroupInput[] = [];
  try {
    groups = JSON.parse(groupsJson);
  } catch {
    throw new Error("Invalid groups data");
  }

  if (!name || !slug) throw new Error("Name and slug are required");

  // Sanitize slug
  slug = sanitizeSlug(slug);
  if (!slug) throw new Error("Invalid slug format");

  // Check for duplicate slug
  const existing = await prisma.game.findUnique({ where: { slug } });
  if (existing) throw new Error(`A game with slug "${slug}" already exists`);

  // Validate prices
  for (const g of groups) {
    for (const r of g.rows) {
      if (!validatePrice(r.price)) {
        throw new Error(`Invalid price: ${r.price}. Prices must be positive numbers.`);
      }
    }
  }

  // Use transaction for atomic operation
  await prisma.$transaction(async (tx) => {
    const game = await tx.game.create({
      data: { name, slug, imageUrl, sortOrder, isActive },
    });

    for (const g of groups) {
      const group = await tx.packageGroup.create({
        data: { gameId: game.id, label: g.label || null, sortOrder: g.sortOrder },
      });
      for (const r of g.rows) {
        await tx.packageRow.create({
          data: {
            groupId: group.id,
            amountLabel: r.amountLabel,
            price: r.price,
            isHighlighted: !!r.isHighlighted,
            sortOrder: r.sortOrder,
          },
        });
      }
    }
  });

  revalidatePath("/");
  revalidatePath("/games");
  revalidatePath("/admin");
  revalidatePath("/admin/games");
  try {
    revalidateTag("games", "max");
  } catch {}
  redirect("/admin");
}

export async function updateGame(id: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  const imageUrlInput = String(formData.get("imageUrl") || "").trim();

  const existing = await prisma.game.findUnique({ where: { id }, select: { imageUrl: true, slug: true } });
  if (!existing) throw new Error("Game not found");

  const imageUrl = formData.has("imageUrl") ? (imageUrlInput || null) : (existing.imageUrl || null);

  const sortOrder = parseInt(String(formData.get("sortOrder") || "0"), 10) || 0;
  const isActive = formData.get("isActive") === "on";
  const groupsJson = String(formData.get("groupsJson") || "[]");
  let groups: GroupInput[] = [];
  try {
    groups = JSON.parse(groupsJson);
  } catch {
    throw new Error("Invalid groups data");
  }

  if (!name || !slug) throw new Error("Name and slug are required");

  // Sanitize slug
  slug = sanitizeSlug(slug);
  if (!slug) throw new Error("Invalid slug format");

  // Check for duplicate slug (excluding current game)
  if (slug !== existing.slug) {
    const duplicate = await prisma.game.findUnique({ where: { slug } });
    if (duplicate) throw new Error(`A game with slug "${slug}" already exists`);
  }

  // Validate prices
  for (const g of groups) {
    for (const r of g.rows) {
      if (!validatePrice(r.price)) {
        throw new Error(`Invalid price: ${r.price}. Prices must be positive numbers.`);
      }
    }
  }

  // Use transaction for atomic operation
  await prisma.$transaction(async (tx) => {
    await tx.game.update({ where: { id }, data: { name, slug, imageUrl, sortOrder, isActive } });

    await tx.packageGroup.deleteMany({ where: { gameId: id } });
    for (const g of groups) {
      const group = await tx.packageGroup.create({
        data: { gameId: id, label: g.label || null, sortOrder: g.sortOrder },
      });
      for (const r of g.rows) {
        await tx.packageRow.create({
          data: {
            groupId: group.id,
            amountLabel: r.amountLabel,
            price: r.price,
            isHighlighted: r.isHighlighted || false,
            sortOrder: r.sortOrder,
          },
        });
      }
    }
  });

  // Clean up previous uploaded image if it was replaced
  if (existing.imageUrl && existing.imageUrl !== imageUrl && existing.imageUrl.startsWith('/api/images/')) {
    const oldImgId = existing.imageUrl.replace('/api/images/', '');
    if (oldImgId) {
      try {
        await prisma.uploadedImage.delete({ where: { id: oldImgId } });
      } catch {}
    }
  }


  revalidatePath("/");
  revalidatePath("/games");
  revalidatePath(`/games/${slug}`);
  if (existing.slug && existing.slug !== slug) {
    revalidatePath(`/games/${existing.slug}`);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/games");
  try {
    revalidateTag("games", "max");
  } catch {}
  redirect("/admin");
}

export async function deleteGame(id: string) {
  if (!id) throw new Error("Game ID is required");

  const existing = await prisma.game.findUnique({
    where: { id },
    select: { id: true, slug: true, imageUrl: true },
  });

  if (!existing) {
    throw new Error("Game not found or already deleted");
  }

  // Safe transactional deletion of rows, groups, and game
  await prisma.$transaction(async (tx) => {
    const groups = await tx.packageGroup.findMany({
      where: { gameId: id },
      select: { id: true },
    });
    const groupIds = groups.map((g) => g.id);
    if (groupIds.length > 0) {
      await tx.packageRow.deleteMany({
        where: { groupId: { in: groupIds } },
      });
    }
    await tx.packageGroup.deleteMany({
      where: { gameId: id },
    });
    await tx.game.delete({
      where: { id },
    });
  });

  // Clean up uploaded image if it was stored in the database
  if (existing.imageUrl?.startsWith('/api/images/')) {
    const imgId = existing.imageUrl.replace('/api/images/', '');
    if (imgId) {
      try {
        await prisma.uploadedImage.delete({ where: { id: imgId } });
      } catch {}
    }
  }


  revalidatePath("/admin");
  revalidatePath("/admin/games");
  revalidatePath("/");
  revalidatePath("/games");
  if (existing.slug) {
    revalidatePath(`/games/${existing.slug}`);
  }
  try {
    revalidateTag("games", "max");
  } catch {}

  return { success: true };
}

export async function updateSettings(formData: FormData) {
  const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
  const facebookUrl = String(formData.get("facebookUrl") || "").trim() || null;
  const messengerUrl = String(formData.get("messengerUrl") || "").trim() || null;
  const paymentMethodsText = String(formData.get("paymentMethodsText") || "").trim() || null;
  const promoBannerText = String(formData.get("promoBannerText") || "").trim() || null;

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { whatsappNumber, facebookUrl, messengerUrl, paymentMethodsText, promoBannerText },
    create: { id: 1, whatsappNumber, facebookUrl, messengerUrl, paymentMethodsText, promoBannerText },
  });

  revalidatePath("/");
  revalidatePath("/payment-methods");
  revalidatePath("/contact");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  try {
    revalidateTag("settings", "max");
  } catch {}
  redirect("/admin");
}
