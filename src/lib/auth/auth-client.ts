/**
 * Better Auth client.
 *
 * This file used to hand-roll `fetch` calls against endpoints that did not
 * exist yet. Those endpoints are live now, so the real client replaces the
 * shim — deliberately keeping the same `authClient` export and method names so
 * the sign-in / sign-up / verification components did not have to change.
 *
 * Sessions live in a cookie set by the API. The marketing site never holds a
 * credential, which is why every request opts into sending cookies.
 */
import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [organizationClient()],
  fetchOptions: {
    // The API is a different origin from this app (a different port in
    // development, a sibling subdomain in production), so the session cookie
    // only travels when credentials are explicitly included.
    credentials: "include",
  },
});

/**
 * Shape returned by `getSession().data.user`.
 *
 * `firstName`/`lastName` are ours: Better Auth only knows `name`, and a
 * database hook on the API splits it so the rest of the product keeps working.
 */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
