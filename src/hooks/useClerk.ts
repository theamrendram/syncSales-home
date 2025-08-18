"use client";

import { useUser, useSignIn, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ClerkAuthHook {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  getUser: () => any;
}

export function useClerkAuth(): ClerkAuthHook {
  const { user, isLoaded } = useUser();
  const { signIn } = useSignIn();
  const { signOut } = useClerk();
  const router = useRouter();

  const getUser = () => {
    return user;
  };

  const login = async () => {
    try {
      await signIn?.create({
        strategy: "oauth_google",
        redirectUrl: "/user",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    isLoading: !isLoaded,
    isAuthenticated: !!user,
    login,
    logout,
    getUser,
  };
}
