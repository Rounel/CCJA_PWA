import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL
    }),
    emailAndPassword: { enabled: true },
    socialProviders: {
        // google: {
        //     prompt: "select_account",
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        // },
        // linkedin: {
        //     clientId: process.env.LINKEDIN_CLIENT_ID as string,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
        // },
    },
    user: {
        additionalFields: {
            phone: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true,
            },
            profession: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true,
            },
            linkedinUrl: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true,
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "member",
                input: false,
            },
        },
    },
})
