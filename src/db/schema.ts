import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userType = sqliteTable("user_type", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  permissions: text().notNull(),
});

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text().notNull(),
  password: text().notNull(),
  userTypeId: integer("user_type_id")
    .notNull()
    .references(() => userType.id),
  phone: text(),
  isActive: integer("is_active", { mode: "boolean" }).notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const category = sqliteTable("category", {
  id: integer().primaryKey({ autoIncrement: true }),
  categoryName: text("category_name").notNull(),
  slug: text().notNull(),
});

export const product = sqliteTable("product", {
  id: integer().primaryKey({ autoIncrement: true }),
  productName: text("product_name").notNull(),
  productBaseImageId: integer("product_base_image_id").references(
    () => productBaseImage.id,
  ),
  productFrontImageId: integer("product_front_image_id").references(
    () => productFrontImage.id,
  ),
  description: text().notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const productImages = sqliteTable("product_images", {
  id: integer().primaryKey({ autoIncrement: true }),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  image: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const productFrontImage = sqliteTable("product_front_image", {
  id: integer().primaryKey({ autoIncrement: true }),
  image: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const productBaseImage = sqliteTable("product_base_image", {
  id: integer().primaryKey({ autoIncrement: true }),
  image: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const color = sqliteTable("color", {
  id: integer().primaryKey({ autoIncrement: true }),
  colorName: text("color_name").notNull(),
});

export const size = sqliteTable("size", {
  id: integer().primaryKey({ autoIncrement: true }),
  sizeName: text("size_name").notNull(),
});

export const productVariant = sqliteTable("product_variant", {
  id: integer().primaryKey({ autoIncrement: true }),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  sizeId: integer("size_id")
    .notNull()
    .references(() => size.id),
  colorId: integer("color_id")
    .notNull()
    .references(() => color.id),
  price: integer().notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull(),
});

export const statusOrder = sqliteTable("status_order", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  totalPrice: numeric("total_price", { mode: "number" }).notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const orderDetails = sqliteTable("order_details", {
  id: integer().primaryKey({ autoIncrement: true }),
  productVariantId: integer("product_variant_id")
    .notNull()
    .references(() => productVariant.id),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  statusOrderId: integer("status_order_id")
    .notNull()
    .references(() => statusOrder.id),
  quantity: integer().notNull(),
});

export const customerProfiles = sqliteTable("customer_profiles", {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  phone: text(),
  address: text(),
  city: text(),
  birthDate: integer("birth_date", { mode: "timestamp" }),
});
