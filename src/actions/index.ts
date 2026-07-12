import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { tokenName } from "@/lib/constants";

export const server = {
  setTokenCookie: defineAction({
    input: z.object({
      token: z.string(),
    }),
    handler: async ({ token }, { cookies }) => {
      try {
        cookies.set(tokenName, token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        return { success: true } as const;
      } catch (e) {
        return { success: false as const, message: e } as const;
      }
    },
  }),
};
