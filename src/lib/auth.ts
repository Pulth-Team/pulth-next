import {betterAuth} from "better-auth";

import {prismaAdapter} from "better-auth/adapters/prisma";
import prisma from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
        debugLogs: {
            create: true
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
            },
            description: {
                type: "string",
                defaultValue: "Hi I'm new here!",
            }
        }
    },

    trustedOrigins: ["http://localhost:3000", process.env.BETTER_AUTH_URL!]
});