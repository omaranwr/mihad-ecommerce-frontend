import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { deleteAPIWithToken, postAPI, postAPIWithToken } from "@/lib/db";
import { setAuthTokenCookie } from "@/lib/utils";

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
      console.log(id);
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
};
