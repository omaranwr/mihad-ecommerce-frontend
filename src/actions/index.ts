import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import {
  deleteAPIWithToken,
  getCartData,
  postAPI,
  postAPIWithToken,
} from "@/lib/db";
import { setAuthTokenCookie } from "@/lib/utils";
import { delayInSeconds } from "motion/react";

export const server = {
  signup: defineAction({
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    handler: async ({ username, password }) => {
      const response = await postAPI("/app/auth/register/", {
        username,
        password,
      });
      return response;
    },
  }),
  login: defineAction({
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    handler: async ({ username, password }, { cookies }) => {
      const response = await postAPI("/app/auth/login/", {
        username,
        password,
      });
      if (!response.success)
        throw new ActionError({
          code: "EXPECTATION_FAILED",
          message: response.message,
        });
      setAuthTokenCookie(response.token, cookies);
    },
  }),

  addItemToCart: defineAction({
    input: z.object({
      product_id: z.number(),
      color_id: z.number(),
      size_id: z.number(),
    }),
    handler: async (input, { cookies }) => {
      const response = await postAPIWithToken(
        "/app/api/cart/add/",
        cookies,
        input,
      );
      if (!response.success) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: response.message,
        });
      }
      return response;
    },
  }),
  updateCartItem: defineAction({
    input: z.object({
      id: z.number(),
      quantity: z.number(),
    }),
    handler: async ({ id, quantity }, { cookies }) => {
      const response = await postAPIWithToken(
        `/app/api/cart/update/${id}/`,
        cookies,
        { quantity },
      );
      if (!response.success) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: response.message,
        });
      }
      return response;
    },
  }),
  deleteCartItem: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async ({ id }, { cookies }) => {
      const response = await deleteAPIWithToken(
        `/app/api/cart/remove/${id}/`,
        cookies,
      );
      if (response.status >= 400) {
        throw new ActionError({
          code: "BAD_REQUEST",
        });
      }
    },
  }),

  checkCart: defineAction({
    input: z.object({
      cartItems: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          color: z.string(),
          size: z.string(),
          price: z.number(),
          quantity: z.number(),
        }),
      ),
    }),
    handler: async ({ cartItems }, { cookies }) => {
      const { items } = await getCartData(cookies);

      if (cartItems.length !== items.length) return false;

      for (let i = 0; i < cartItems.length; i++) {
        const clientItem = cartItems[i];
        const dbItem = items[i];
        if (
          clientItem.id !== dbItem.id ||
          clientItem.name !== dbItem.product_name ||
          clientItem.color !== dbItem.color_name ||
          clientItem.size !== dbItem.size_name ||
          clientItem.price !== Number(dbItem.product_price) ||
          clientItem.quantity !== dbItem.quantity
        )
          return false;
      }
      return true;
    },
  }),
  checkout: defineAction({
    input: z.object({
      fullName: z.string(),
      email: z.email(),
      phone: z.string(),
      address: z.string(),
      city: z.string(),
    }),
    handler: async ({ fullName, email, phone, address, city }, { cookies }) => {
      const response = await postAPIWithToken(
        "/app/api/cart/checkout/",
        cookies,
        {
          full_name: fullName,
          email,
          phone,
          address,
          city,
        },
      );
      console.log(response);
      if (response.error)
        throw new ActionError({
          code: "EXPECTATION_FAILED",
          message: response.error,
        });
    },
  }),
};
