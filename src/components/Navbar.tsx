"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignInModal } from "@/components/SignInModal";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SyncSales</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:underline underline-offset-4">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInModal>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInModal>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
          <Button size="sm">
            <Link href={"/checkout/free-trial"}>Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
