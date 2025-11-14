"use client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
  SupportedOAuthProviders,
} from "@/lib/auth/o-auth-providers";
import { authClient } from "@/lib/auth/auth-client";
import { SyncsalesActionButton } from "@/components/syncsales-action-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SocialAuthButtons = () => {
  const router = useRouter();

  // Handle the OAuth callback when the component mounts
  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const session: Awaited<ReturnType<typeof authClient.getSession>> = await authClient.getSession();
        if (session?.data != null) {
          toast.success("Signed in successfully");
          router.push("/");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast.error("Authentication failed");
      }
    };

    // Check if we're returning from OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("code") || urlParams.get("error")) {
      handleOAuthCallback();
    }
  }, [router]);

  return SUPPORTED_OAUTH_PROVIDERS.map((provider: SupportedOAuthProviders) => {
    const { Icon, name } = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider];
    return (
      <SyncsalesActionButton
        variant="outline"
        key={provider}
        action={async () => {
          try {
            // This will redirect to the OAuth provider
            await authClient.signIn.social({
              provider,
              callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
            });
            return { error: null };
          } catch (error) {
            console.error("Social login error:", error);
            toast.error("Failed to initiate social login");
            return { error: { message: "Failed to initiate social login" } };
          }
        }}
        successMessage="Redirecting to sign in..."
        className="w-full cursor-pointer"
      >
        <Icon />
        Sign in with {name}
      </SyncsalesActionButton>
    );
  });
};

export default SocialAuthButtons;
