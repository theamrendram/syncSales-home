"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient, signOut, useSession } from "@/lib/auth/auth-client";
import { InvitationAuth } from "./_components/invitation-auth";

const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "http://localhost:3001";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  manager: "Manager",
  viewer: "Viewer",
};

/** Shape of the API's GET /api/auth/invitation/preview. */
type InvitationPreview = {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  organizationName: string | null;
  inviterName: string | null;
  expiresAt: string;
  hasAccount: boolean;
};

/**
 * Landing page for the link in an organization invitation email
 * (`${APP_URL}/accept-invitation/<id>`, sent by the API's sendInvitationEmail).
 *
 * Open to signed-out visitors (src/proxy.ts does not guard it). The preview
 * endpoint answers without a session, so the page can say who invited whom
 * before asking anyone to sign in, then offer sign-up or sign-in for the
 * invited address. Sign-up from here needs no email verification; the API
 * treats the invitation link as proof of the inbox. Once signed in as the
 * recipient, the visitor accepts or declines — they never see onboarding.
 */
export default function AcceptInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, isPending: sessionPending, refetch } = useSession();

  const [invitation, setInvitation] = useState<InvitationPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<null | "accept" | "reject">(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await authClient.$fetch<InvitationPreview>(
        "/invitation/preview",
        { method: "GET", query: { id } },
      );
      if (cancelled) return;
      if (error || !data) {
        setError(error?.message ?? "This invitation could not be found.");
      } else {
        setInvitation(data);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const accept = async () => {
    if (!invitation) return;
    setBusy("accept");
    const { error } = await authClient.organization.acceptInvitation({
      invitationId: invitation.id,
    });
    if (error) {
      setBusy(null);
      toast.error(error.message ?? "Couldn't accept the invitation");
      return;
    }
    // Make the new organization the session's active one before the CRM reads it.
    await authClient.organization.setActive({
      organizationId: invitation.organizationId,
    });
    toast.success(`You've joined ${invitation.organizationName ?? "the organization"}`);
    window.location.href = CRM_URL;
  };

  const reject = async () => {
    if (!invitation) return;
    setBusy("reject");
    const { error } = await authClient.organization.rejectInvitation({
      invitationId: invitation.id,
    });
    setBusy(null);
    if (error) {
      toast.error(error.message ?? "Couldn't decline the invitation");
      return;
    }
    toast.success("Invitation declined");
    router.push("/");
  };

  const switchAccount = async () => {
    await signOut();
    await refetch();
  };

  const signedInEmail = session?.user?.email?.toLowerCase();
  const roleLabel = invitation ? (ROLE_LABELS[invitation.role] ?? invitation.role) : "";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {loading || sessionPending ? (
          <CardContent className="py-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
            <p className="mt-4 text-muted-foreground">Loading invitation…</p>
          </CardContent>
        ) : error || !invitation ? (
          <>
            <CardHeader>
              <CardTitle>Invitation unavailable</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => router.push("/")} className="w-full sm:w-auto">
                Go home
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>
                Join {invitation.organizationName ?? "an organization"} on SyncSales
              </CardTitle>
              <CardDescription>
                {invitation.inviterName
                  ? `${invitation.inviterName} invited you`
                  : "You've been invited"}{" "}
                as {roleLabel}.
              </CardDescription>
            </CardHeader>

            {!session ? (
              <CardContent>
                <InvitationAuth
                  invitationId={invitation.id}
                  email={invitation.email}
                  hasAccount={invitation.hasAccount}
                  onAuthenticated={() => refetch()}
                />
              </CardContent>
            ) : signedInEmail !== invitation.email ? (
              <>
                <CardContent className="text-sm text-muted-foreground">
                  This invitation is for{" "}
                  <span className="font-medium text-foreground">{invitation.email}</span>, but
                  you&apos;re signed in as{" "}
                  <span className="font-medium text-foreground">{session.user.email}</span>.
                </CardContent>
                <CardFooter>
                  <Button onClick={switchAccount} className="w-full sm:w-auto">
                    Sign out and continue as {invitation.email}
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardContent className="text-sm text-muted-foreground">
                  Signed in as{" "}
                  <span className="font-medium text-foreground">{invitation.email}</span>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={reject}
                    disabled={busy !== null}
                    className="w-full sm:w-auto">
                    {busy === "reject" ? "Declining…" : "Decline"}
                  </Button>
                  <Button onClick={accept} disabled={busy !== null} className="w-full sm:w-auto">
                    {busy === "accept" ? "Joining…" : "Accept invitation"}
                  </Button>
                </CardFooter>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
