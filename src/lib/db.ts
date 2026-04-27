import { category } from "@/db/schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
});

export async function getCategories() {
  const categories = await db
    .select({ name: category.categoryName })
    .from(category);
  return categories.map((c) => c.name);
}
