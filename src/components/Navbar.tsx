'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">SyncSales</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
                        Pricing
                    </Link>
                    <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
                        FAQ
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                        Log in
                    </Button>
                    <Button size="sm"><Link href={"/checkout"}> Start Free Trial</Link> </Button>
                </div>
            </div>
        </header>
    )
}

