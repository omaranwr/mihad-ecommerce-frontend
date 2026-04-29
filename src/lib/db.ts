import {
  category,
  product,
  productBaseImage,
  productFrontImage,
  productImages,
  productVariant,
} from "@/db/schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/libsql";
import { and, eq, sql } from "drizzle-orm";
import type { ProductCard } from "./types";

export const db = drizzle({
  connection: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
});

export async function getCategories() {
  const categories = await db.select().from(category);
  return categories;
}

export async function getCategoryById(id: number) {
  const result = await db.select().from(category).where(eq(category.id, id));
  if (result.length === 0) return null;
  return result[0];
}

export async function getProductCards(): Promise<ProductCard[]> {
  const variants = db
    .select({
      id: productVariant.id,
      productId: productVariant.productId,
      price: productVariant.price,
      rowNumber: sql`row_number() OVER (
        PARTITION BY ${productVariant.productId} 
        ORDER BY ${productVariant.price} ASC
      )`.as("row_number"),
    })
    .from(productVariant)
    .as("variants");
  const products = await db
    .select({
      name: product.productName,
      price: variants.price,
      image: productBaseImage.image,
      frontImage: productFrontImage.image,
    })
    .from(product)
    .leftJoin(
      productBaseImage,
      eq(product.productBaseImageId, productBaseImage.id),
    )
    .leftJoin(
      productFrontImage,
      eq(product.productFrontImageId, productFrontImage.id),
    )
    .innerJoin(variants, eq(product.id, variants.productId))
    .where(eq(variants.rowNumber, 1));
  return products;
}

export async function getProductCardsByCategoryId(categoryId: string) {
  const variants = db
    .select({
      id: productVariant.id,
      productId: productVariant.productId,
      price: productVariant.price,
      rowNumber: sql`row_number() OVER (
        PARTITION BY ${productVariant.productId} 
        ORDER BY ${productVariant.price} ASC
      )`.as("row_number"),
    })
    .from(productVariant)
    .as("variants");
  const products = await db
    .select({
      name: product.productName,
      price: variants.price,
      image: productBaseImage.image,
      frontImage: productFrontImage.image,
    })
    .from(product)
    .leftJoin(
      productBaseImage,
      eq(product.productBaseImageId, productBaseImage.id),
    )
    .leftJoin(
      productFrontImage,
      eq(product.productFrontImageId, productFrontImage.id),
    )
    .innerJoin(variants, eq(product.id, variants.productId))
    .where(and(eq(variants.rowNumber, 1), eq(product.categoryId, categoryId)));
  return products;
}
