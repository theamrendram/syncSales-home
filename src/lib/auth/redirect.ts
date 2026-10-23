/**
 * Where to send a user once they are signed in.
 *
 * The CRM hands sign-in off to this app as /auth?redirect_url=<its own page>,
 * so the value arrives from the query string and is attacker-controllable:
 * anyone can send a victim to /auth?redirect_url=https://evil.example. Trusting
 * it blindly is an open redirect, and an open redirect on a sign-in page is
 * worth more than usual — the victim really did authenticate here, so the
 * landing page inherits this domain's credibility.
 *
 * Only this app's own origin and the CRM's are accepted. Anything else falls
 * back to the landing page rather than failing loudly, because a stale or
 * mistyped link should still leave the user signed in and somewhere sensible.
 */
const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "http://localhost:3001";

export function resolvePostAuthUrl(
  redirectUrl: string | null | undefined,
): string {
  if (!redirectUrl) return "/";

  // A path-relative target cannot leave this origin, so it needs no allowlist
  // check. "//evil.example" is protocol-relative rather than a path, which is
  // exactly the case a naive startsWith("/") would wave through.
  if (redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")) {
    return redirectUrl;
  }

  try {
    const target = new URL(redirectUrl);
    const allowed = [new URL(CRM_URL).origin];
    if (typeof window !== "undefined") allowed.push(window.location.origin);
    if (allowed.includes(target.origin)) return target.href;
  } catch {
    // Not a parseable absolute URL; fall through to the default.
  }

  return "/";
}

/**
 * Leaves for the post-sign-in destination.
 *
 * Always a full page load, never a client-side transition. The CRM is a
 * different origin, and App Router's `router.push` is for routes within this
 * app — handing it an absolute URL to another origin is not what it is for.
 * Same-origin destinations get the full load too, deliberately: the session
 * cookie has just changed, and reloading is the cheapest way to be sure nothing
 * is still holding state derived from the signed-out session.
 */
export function navigateAfterAuth(
  redirectUrl: string | null | undefined,
): void {
  window.location.href = resolvePostAuthUrl(redirectUrl);
}
