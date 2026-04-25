import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  orgId?: string | null;
  systemRole?: string;
  [key: string]: unknown;
};

type SessionData = {
  user: AuthUser;
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    [key: string]: unknown;
  };
};

type AuthError = {
  message: string;
  code?: string;
  statusText?: string;
};

type AuthResponse<T> = {
  data: T | null;
  error: AuthError | null;
};

type Callbacks<T> = {
  onSuccess?: (response: { data: T }) => void | Promise<void>;
  onError?: (response: { error: AuthError }) => void;
};

async function authFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<AuthResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        data: null,
        error: {
          message:
            json?.message || json?.error || res.statusText || "Request failed",
          code: json?.code,
          statusText: res.statusText,
        },
      };
    }

    return { data: json as T, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : "Network error" },
    };
  }
}

export const authClient = {
  signUp: {
    async email(
      data: {
        name: string;
        email: string;
        password: string;
        organization?: string;
      },
      callbacks?: Callbacks<{ user: AuthUser }>,
    ): Promise<AuthResponse<{ user: AuthUser }>> {
      const result = await authFetch<{ user: AuthUser }>("/sign-up/email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (result.error) callbacks?.onError?.({ error: result.error });
      else callbacks?.onSuccess?.({ data: result.data! });
      return result;
    },
  },

  signIn: {
    async email(
      data: { email: string; password: string },
      callbacks?: Callbacks<SessionData>,
    ): Promise<AuthResponse<SessionData>> {
      const result = await authFetch<SessionData>("/sign-in/email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (result.error) callbacks?.onError?.({ error: result.error });
      else await callbacks?.onSuccess?.({ data: result.data! });
      return result;
    },

    async social(data: {
      provider: string;
      callbackURL?: string;
    }): Promise<AuthResponse<{ url: string }>> {
      const result = await authFetch<{ url: string }>("/sign-in/social", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (result.data?.url) {
        window.location.href = result.data.url;
      }
      return result;
    },
  },

  async getSession(): Promise<AuthResponse<SessionData>> {
    return authFetch<SessionData>("/session");
  },

  useSession(): { data: SessionData | null; isPending: boolean } {
    const [data, setData] = useState<SessionData | null>(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
      authFetch<SessionData>("/session").then((result) => {
        setData(result.data);
        setIsPending(false);
      });
    }, []);

    return { data, isPending };
  },

  async signOut(): Promise<AuthResponse<unknown>> {
    return authFetch("/sign-out", { method: "POST" });
  },

  async requestPasswordReset(
    data: { email: string; redirectTo?: string },
    callbacks?: Callbacks<unknown>,
  ): Promise<AuthResponse<unknown>> {
    const result = await authFetch("/forget-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (result.error) callbacks?.onError?.({ error: result.error });
    else callbacks?.onSuccess?.({ data: result.data! });
    return result;
  },

  async sendVerificationEmail(data: {
    email: string;
    callbackURL?: string;
  }): Promise<AuthResponse<unknown>> {
    return authFetch("/send-verification-email", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async verifyEmail(
    data: { query: { token: string } },
    callbacks?: Callbacks<unknown>,
  ): Promise<AuthResponse<unknown>> {
    const result = await authFetch(
      `/verify-email?token=${data.query.token}`,
    );
    if (result.error) callbacks?.onError?.({ error: result.error });
    else callbacks?.onSuccess?.({ data: result.data! });
    return result;
  },
};
