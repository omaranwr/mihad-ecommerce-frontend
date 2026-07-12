import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { tokenName } from "@/lib/constants";

export const server = {
  setTokenCookie: defineAction({
    input: z.object({
      token: z.string(),
    }),
    handler: async ({ token }, { cookies }) => {
      console.log(token);
      console.log("klja;sldkfjasd");
      cookies.set(tokenName, token, { httpOnly: true, secure: true });
      return { success: true } as const;
    },
  }),
};
