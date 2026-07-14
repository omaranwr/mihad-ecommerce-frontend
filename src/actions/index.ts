import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { postAPI } from "@/lib/db";
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
};
