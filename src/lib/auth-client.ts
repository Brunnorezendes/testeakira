import { createAuthClient } from "better-auth/client";
import type { auth } from "./auth.ts";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "https://testeakira.vercel.app",
    plugins: [inferAdditionalFields<typeof auth>()],
});
