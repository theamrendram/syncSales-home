"use client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
  SupportedOAuthProviders,
} from "@/lib/auth/o-auth-providers";
import { authClient } from "@/lib/auth/auth-client";
import { SyncsalesActionButton } from "@/components/syncsales-action-button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { navigateAfterAuth } from "@/lib/auth/redirect";

const SocialAuthButtons = ({ redirectUrl }: { redirectUrl?: string } = {}) => {
  const searchParams = useSearchParams();
  // Pages other than /auth (the invitation page) say where to come back to
  // directly rather than through the query string.
  const redirect_url = redirectUrl ?? searchParams.get("redirect_url");

  // Handle the OAuth callback when the component mounts
  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const session: Awaited<ReturnType<typeof authClient.getSession>> = await authClient.getSession();
        if (session?.data != null) {
          toast.success("Signed in successfully");
          navigateAfterAuth(redirect_url);
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
  }, [redirect_url]);

  return SUPPORTED_OAUTH_PROVIDERS.map((provider: SupportedOAuthProviders) => {
    const { Icon, name } = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider];
    return (
      <SyncsalesActionButton
        variant="outline"
        key={provider}
        action={async () => {
          try {
            // Google sends the browser back to callbackURL, so anything the
            // callback needs has to survive the round trip inside that URL.
            // Without redirect_url on it, a user who started at the CRM lands
            // on this app's home page instead of the dashboard they asked for.
            const callbackURL = new URL(
              "/auth/callback",
              process.env.NEXT_PUBLIC_APP_URL || window.location.origin,
            );
            if (redirect_url) {
              callbackURL.searchParams.set("redirect_url", redirect_url);
            }

            // This will redirect to the OAuth provider
            await authClient.signIn.social({
              provider,
              callbackURL: callbackURL.toString(),
            });
            return { error: null };
          } catch (error) {
            console.error("Social login error:", error);
            toast.error("Failed to initiate social login");
            return { error: { message: "Failed to initiate social login" } };
          }
        }}
        successMessage="Redirecting to sign in..."
        className="min-h-11 w-full cursor-pointer sm:min-h-10"
      >
        <Icon />
        Sign in with {name}
      </SyncsalesActionButton>
    );
  });
};

export default SocialAuthButtons;
