"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { User, LogOut, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { authClient, AuthUser } from "@/lib/auth/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar({ className }: { className?: string }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const session: Awaited<ReturnType<typeof authClient.getSession>> =
        await authClient.getSession();
      if (session?.data != null) {
        setUser(session?.data?.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

  // Close the mobile menu on Escape, and whenever the viewport grows past the
  // md breakpoint where the full nav is visible again.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Held in state and driven by a subscription. This used to be
  // `const isScrolled = scrollY.get() > 100`, read during render off a
  // MotionValue, which never triggered a re-render -- so the scrolled
  // treatment effectively never applied.
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  function handleSignOut() {
    authClient.signOut().then(() => {
      setIsAuthenticated(false);
      setUser(null);
      setMenuOpen(false);
      router.push("/");
    });
  }

  // The surface stays opaque while the mobile menu is open so the panel
  // never reads as floating over the page.
  const surfaceOpaque = isScrolled || menuOpen;

  return (
    <header className={`fixed top-0 z-50 w-full ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0 border-b backdrop-blur-xl"
        initial={false}
        animate={{
          backgroundColor: surfaceOpaque
            ? "hsl(var(--background) / 0.92)"
            : "hsl(var(--background) / 0)",
          borderColor: surfaceOpaque
            ? "hsl(var(--border))"
            : "hsl(var(--border) / 0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <motion.div
        className="gradient-primary absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ scaleX }}
      />

      <div className="container relative">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold text-white shadow-sm md:h-11 md:w-11 md:rounded-xl md:text-lg">
              S
            </span>
            <span className="text-xl font-bold text-foreground md:text-2xl">
              SyncSales
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>

            {!isLoading &&
              (!isAuthenticated ? (
                <Link href="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <AccountMenu user={user} onSignOut={handleSignOut} />
              ))}

            <Button variant="brand" size="sm" asChild>
              <Link href="/contact?source=free-trial">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile: account stays reachable, everything else folds into the menu */}
          <div className="flex items-center gap-2 md:hidden">
            {!isLoading && isAuthenticated && (
              <AccountMenu user={user} onSignOut={handleSignOut} />
            )}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="container flex flex-col gap-2 py-4">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                Contact
              </Link>

              {!isLoading && !isAuthenticated && (
                <Link href="/auth" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}

              <Link
                href="/contact?source=free-trial"
                onClick={() => setMenuOpen(false)}
              >
                <Button variant="brand" size="lg" className="w-full">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function AccountMenu({
  user,
  onSignOut,
}: {
  user: AuthUser | null;
  onSignOut: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-11 w-11 shrink-0 rounded-full border border-border p-0"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="gradient-primary font-semibold text-white">
              {user?.name?.[0] || <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || ""}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
