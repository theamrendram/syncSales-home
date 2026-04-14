"use client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
  SupportedOAuthProviders,
} from "@/lib/auth/o-auth-providers";
import { SyncsalesActionButton } from "@/components/syncsales-action-button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

const SocialAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  return SUPPORTED_OAUTH_PROVIDERS.map((provider: SupportedOAuthProviders) => {
    const { Icon, name } = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider];
    return (
      <SyncsalesActionButton
        variant="outline"
        key={provider}
        action={async () => {
          try {
            if (!signIn || !isLoaded) {
              return { error: { message: "Authentication is still loading" } };
            }

            await signIn.authenticateWithRedirect({
              strategy: `oauth_${provider}`,
              redirectUrl: "/auth/callback",
              redirectUrlComplete: redirectUrl,
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
