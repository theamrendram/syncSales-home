import { createAuthClient } from "better-auth/server";

export const authServer = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
