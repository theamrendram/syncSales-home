"use client";

import React from "react";
import { authClient } from "@/lib/auth/auth-client";

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  return session ? <>{children}</> : null;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  return !session ? <>{children}</> : null;
}
