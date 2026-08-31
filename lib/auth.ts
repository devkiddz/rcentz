import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  appName: "Rcentz Systems",
  baseURL: process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["USER", "CLIENT", "STAFF", "ADMIN", "SUPER_ADMIN"],
        required: false,
        defaultValue: "USER",
        input: false,
      },
      status: {
        type: ["ACTIVE", "SUSPENDED", "DEACTIVATED"],
        required: false,
        defaultValue: "ACTIVE",
        input: false,
      },
    },
  },
});
