"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { authClient, AuthUser } from "@/lib/auth/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar({ className }: { className?: string }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      router.push("/");
    });
  }

  return (
    <header className={`fixed top-0 z-50 w-full md:h-20 ${className}`}>
      {/* Surface fades in once the page scrolls under it. */}
      <motion.div
        className="absolute inset-0 border-b backdrop-blur-xl"
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "hsl(var(--background) / 0.85)"
            : "hsl(var(--background) / 0)",
          borderColor: isScrolled
            ? "hsl(var(--border))"
            : "hsl(var(--border) / 0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Scroll progress bar */}
      <motion.div
        className="gradient-primary absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ scaleX }}
      />

      <div className="container relative">
        <div className="flex h-20 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <Link href="/" className="group flex items-center space-x-3">
              <div className="gradient-primary relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl shadow-sm">
                <span className="relative z-10 text-lg font-bold text-white">
                  S
                </span>
              </div>

              <span className="text-2xl font-bold text-foreground">
                SyncSales
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center gap-5">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Contact
              </Link>
            </motion.div>

            {!isLoading && (
              <>
                {!isAuthenticated ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/auth">
                      <Button variant="outline" size="sm">
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          className="relative h-11 w-11 rounded-full border border-border"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="gradient-primary font-semibold text-white">
                              {user?.name?.[0] || <User className="h-4 w-4" />}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </motion.div>
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
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button variant="brand" size="sm" asChild>
                <Link href="/contact?source=free-trial">
                  <span>Start Free Trial</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
