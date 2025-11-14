import { ComponentProps, ElementType } from "react";
import { GoogleIcon } from "./o-auth-icons";
export const SUPPORTED_OAUTH_PROVIDERS = ["google"] as const;
export type SupportedOAuthProviders =
  (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<
  SupportedOAuthProviders,
  {
    name: string;
    Icon: ElementType<ComponentProps<"svg">>;
  }
> = {
  google: {
    name: "Google",
    Icon: GoogleIcon,
  },
};
