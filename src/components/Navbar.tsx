"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useClerkAuth } from "@/hooks/useClerk";

import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, useScroll, useSpring } from "framer-motion";

export function Navbar({ className }: { className?: string }) {
  const { user, isAuthenticated, isLoading, logout } = useClerkAuth();

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Check if scroll position is greater than 100px
  const isScrolled = scrollY.get() > 100;

  return (
    <header className={`fixed top-0 z-50 w-full md:h-20 ${className}`}>
      {/* Liquid glass background with dynamic opacity and depth */}
      <motion.div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          backgroundColor: isScrolled
            ? "rgba(0, 0, 0, 0.85)"
            : "rgba(255, 255, 255, 0.08)",
        }}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(0, 0, 0, 0.85)"
            : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Subtle border with animated gradient */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          opacity: isScrolled ? 0.4 : 0.15,
        }}
        animate={{
          opacity: isScrolled ? 0.4 : 0.15,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated progress bar with glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ scaleX }}
      >
        <div className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-blue-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-500 opacity-50 blur-sm" />
      </motion.div>

      {/* Floating glass particles effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-4 h-2 w-2 rounded-full bg-white/20 blur-sm"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/3 top-8 h-1 w-1 rounded-full bg-amber-400/30 blur-sm"
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <div className="container relative">
        <div className="flex h-20 items-center justify-between">
          {/* Enhanced logo with liquid glass effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                  <span className="text-white font-bold text-lg relative z-10">
                    S
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60" />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div> */}

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-amber-400 opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
              </div>

              {/* Logo text with enhanced gradient */}
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-2xl font-bold text-transparent">
                SyncSales
              </span>
            </Link>
          </motion.div>

          {/* Removed navigation links to reduce distractions */}

          <div className="flex items-center gap-5">
            {!isLoading && (
              <>
                {!isAuthenticated ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/auth">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:shadow-xl"
                      >
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
                          className="relative h-11 w-11 rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={user?.imageUrl}
                              alt={user?.fullName || user?.firstName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-amber-400 font-semibold text-white">
                              {user?.firstName?.[0] || user?.fullName?.[0] || (
                                <User className="h-4 w-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64 border border-white/20 bg-black/80 shadow-2xl backdrop-blur-2xl"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-white">
                            {user?.fullName || user?.firstName}
                          </p>
                          <p className="text-xs leading-none text-gray-400">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/20" />
                      <DropdownMenuItem
                        onClick={logout}
                        className="cursor-pointer text-white transition-colors duration-200 hover:bg-white/10 focus:bg-white/10"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}

            {/* Enhanced CTA button with premium liquid glass effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                size="default"
                className="hover:shadow-3xl relative h-8 overflow-hidden rounded-lg border-0 bg-gradient-to-r from-blue-500 to-amber-400 px-4 py-3 font-semibold text-white shadow-2xl backdrop-blur-xl transition-all duration-500"
              >
                {/* Liquid glass overlay with animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                  animate={{
                    x: [-100, 100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Animated gradient background */}
                <div className="bg-size-200 animate-gradient absolute inset-0 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-500" />

                {/* Button content */}
                <Link
                  href={"/checkout"}
                  className="relative z-10 flex items-center gap-2"
                >
                  <span>Start Free Trial</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </Link>
              </Button>

              {/* Enhanced glow effect */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-amber-400 rounded-2xl blur-2xl opacity-40 -z-10" /> */}

              {/* Floating particles around button */}
              {/* <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400/60 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              /> */}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
