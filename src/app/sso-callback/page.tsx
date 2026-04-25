import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function SSOCallbackPage() {
  // Clerk handles the OAuth flow gracefully and redirects based on the URL configured in the component hook.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthenticateWithRedirectCallback 
        signUpForceRedirectUrl="/onboarding" 
        signInForceRedirectUrl="/onboarding"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  )
}
